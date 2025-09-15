#include <QtWidgets/QApplication> // runs the GUI event loop.
#include <QtWidgets/QLabel> // used to show the captured image or error messages.

// handle images/screenshots.
#include <QtGui/QScreen> 
#include <QtGui/QPixmap> 
#include <QtGui/QImage> 
// ------------------------ // 

// saving file with timestamp + debug logging.
#include <QtCore/QDateTime> 
#include <QtCore/QFileInfo>
#include <QtCore/QDebug>
// ------------------------ // 

#include <memory> // is C++ for smart pointers (std::unique_ptr).
#include <windows.h> // gives us HWND, HDC, PrintWindow, etc.
// HWND: Handle to a Window, A unique identifier (handle) that Windows uses to refer to a window.
// HDC: Handle to a Device Context, A drawing surface — an object that defines where graphics can be drawn.
// PrintWindow: Copies (renders) the contents of a window (HWND) into a device context (HDC).

#include <dwmapi.h> 

// MinGW headers may not define this flag:
#ifndef PW_RENDERFULLCONTENT
#define PW_RENDERFULLCONTENT 0x00000002
#endif

// Optional: make the process DPI aware (good with multiple monitors / scaling)
static void makeProcessDpiAware() {
    HMODULE hUser32 = LoadLibraryW(L"user32.dll");
    if (hUser32) {
        using SetAwarenessCtxFn = BOOL (WINAPI*)(DPI_AWARENESS_CONTEXT);
        auto pSetAwarenessCtx = reinterpret_cast<SetAwarenessCtxFn>(
            GetProcAddress(hUser32, "SetProcessDpiAwarenessContext"));
        if (pSetAwarenessCtx) {
            pSetAwarenessCtx(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);
            FreeLibrary(hUser32);
            return;
        }
        FreeLibrary(hUser32);
    }
    HMODULE hShcore = LoadLibraryW(L"Shcore.dll");
    if (hShcore) {
        using SetProcessDpiAwarenessFn = HRESULT (WINAPI*)(int);
        auto SetProcessDpiAwareness = reinterpret_cast<SetProcessDpiAwarenessFn>(
            GetProcAddress(hShcore, "SetProcessDpiAwareness"));
        if (SetProcessDpiAwareness) {
            SetProcessDpiAwareness(2); // PROCESS_PER_MONITOR_DPI_AWARE
            FreeLibrary(hShcore);
            return;
        }
        FreeLibrary(hShcore);
    }
    HMODULE hUser = LoadLibraryW(L"user32.dll");
    if (hUser) {
        using SetProcessDPIAwareFn = BOOL (WINAPI*)();
        auto SetProcessDPIAware = reinterpret_cast<SetProcessDPIAwareFn>(
            GetProcAddress(hUser, "SetProcessDPIAware"));
        if (SetProcessDPIAware) SetProcessDPIAware();
        FreeLibrary(hUser);
    }
}

// Find MS Word top-level window (class "OpusApp")
static HWND findWordWindow() {
    struct Ctx { HWND result = nullptr; } ctx;
    EnumWindows([](HWND hWnd, LPARAM lparam)->BOOL { // to loop through all top-level windows.
        if (!IsWindowVisible(hWnd)) return TRUE; // skips hidden ones.
 
        wchar_t cls[256]{0};
        GetClassNameW(hWnd, cls, 256); // checks if class is "OpusApp" (Word’s class name).

        wchar_t title[512]{0};
        GetWindowTextW(hWnd, title, 512);  // checks if title contains "Microsoft Word".

        // If found, stores the window handle (HWND) into ctx.result and stops.
        auto *c = reinterpret_cast<Ctx*>(lparam);
        if (wcscmp(cls, L"OpusApp") == 0) {
            c->result = hWnd;
            return FALSE;
        }
        if (wcsstr(title, L"Microsoft Word") || wcsstr(title, L"Word")) {
            c->result = hWnd;
            return FALSE;
        }
        return TRUE;
    }, reinterpret_cast<LPARAM>(&ctx));
    return ctx.result;
}

// Capture HWND to QImage using PrintWindow (fallback to BitBlt if needed)
static QImage captureWindowToQImage(HWND hWnd) {
    if (!hWnd || !IsWindow(hWnd)) return {}; // Validates the handle.

    RECT rc{};
    if (!GetWindowRect(hWnd, &rc)) return {}; // gets window bounds in screen coordinates.
    // Calculates width/height.
    int w = rc.right - rc.left;
    int h = rc.bottom - rc.top;
    if (w <= 0 || h <= 0) return {};

    // Creates a memory device context (hdcMem) and bitmap (hbm) where we’ll draw the window.
    HDC hdcScreen = GetDC(nullptr);
    HDC hdcMem = CreateCompatibleDC(hdcScreen);
    HBITMAP hbm = CreateCompatibleBitmap(hdcScreen, w, h);
    HGDIOBJ old = SelectObject(hdcMem, hbm);

    BOOL ok = PrintWindow(hWnd, hdcMem, PW_RENDERFULLCONTENT);
    if (!ok) {
        // Fallback: copy from screen (requires window visible / not fully covered)
        ok = BitBlt(hdcMem, 0, 0, w, h, hdcScreen, rc.left, rc.top, SRCCOPY);
    }

    QImage image;
    if (ok) {
        BITMAP bmp{};
        GetObject(hbm, sizeof(BITMAP), &bmp);

        BITMAPINFO bi{};
        bi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
        bi.bmiHeader.biWidth = bmp.bmWidth;
        bi.bmiHeader.biHeight = -bmp.bmHeight; // top-down
        bi.bmiHeader.biPlanes = 1;
        bi.bmiHeader.biBitCount = 32;
        bi.bmiHeader.biCompression = BI_RGB;

        const int bytes = bmp.bmWidth * bmp.bmHeight * 4;
        std::unique_ptr<uchar[]> buf(new uchar[bytes]);

        if (GetDIBits(hdcMem, hbm, 0, bmp.bmHeight, buf.get(), &bi, DIB_RGB_COLORS)) {
            image = QImage(buf.get(), bmp.bmWidth, bmp.bmHeight, QImage::Format_ARGB32).copy();
        }
    }

    SelectObject(hdcMem, old);
    DeleteObject(hbm);
    DeleteDC(hdcMem);
    ReleaseDC(nullptr, hdcScreen);

    return image;
}

int main(int argc, char *argv[])
{
    makeProcessDpiAware();
    QApplication app(argc, argv);

    HWND wordHwnd = findWordWindow();
    if (!wordHwnd) {
        auto *err = new QLabel("Microsoft Word window not found.\nOpen a document and try again.");
        err->setMinimumSize(480, 160);
        err->setAlignment(Qt::AlignCenter);
        err->show();
        return app.exec();
    }

    QImage img = captureWindowToQImage(wordHwnd);
    if (img.isNull()) {
        auto *err = new QLabel("Capture failed (window might be protected or not renderable).");
        err->setMinimumSize(480, 160);
        err->setAlignment(Qt::AlignCenter);
        err->show();
        return app.exec();
    }

    auto *viewer = new QLabel;
    viewer->setWindowTitle("MS Word Capture");
    viewer->setPixmap(QPixmap::fromImage(img));
    viewer->setScaledContents(true);

    QSize screenSz = QApplication::primaryScreen()->availableGeometry().size();
    QSize fit = img.size().boundedTo(screenSz * 0.8);
    viewer->resize(fit);
    viewer->show();

    const QString outName =
        QDateTime::currentDateTime().toString("'word_capture_'yyyyMMdd_HHmmss'.png'");
    if (img.save(outName)) {
        qDebug() << "Saved to" << QFileInfo(outName).absoluteFilePath();
    } else {
        qDebug() << "Failed to save screenshot.";
    }

    return app.exec();
}