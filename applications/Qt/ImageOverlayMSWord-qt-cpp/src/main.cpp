// main.cpp  —  Qt overlay locked to Microsoft Word (no MOC, no Q_OBJECT)

#include <QApplication>
#include <QWidget>
#include <QPainter>
#include <QTimer>
#include <QScreen>
#include <QGuiApplication>
#include <QDebug>

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <dwmapi.h>
#include <shellscalingapi.h>   // GetDpiForMonitor, PER_MONITOR_AWARE_V2
#pragma comment(lib, "Dwmapi.lib")
#pragma comment(lib, "Shcore.lib")

// ---------- Win32 helpers ----------

static HWND findWordByClass() {
    // Word's main frame class is typically "OpusApp"
    return FindWindowW(L"OpusApp", nullptr);
}

static BOOL CALLBACK enumWindowsProc(HWND h, LPARAM lp) {
    wchar_t title[512]; title[0] = 0;
    GetWindowTextW(h, title, 511);
    if (!IsWindowVisible(h) || !title[0]) return TRUE;
    // crude fallback: window title contains "Word"
    if (wcsstr(title, L"Word")) {
        *reinterpret_cast<HWND*>(lp) = h;
        return FALSE;
    }
    return TRUE;
}

static HWND findWordHwnd() {
    if (HWND h = findWordByClass()) return h;
    HWND found = nullptr;
    EnumWindows(enumWindowsProc, reinterpret_cast<LPARAM>(&found));
    return found;
}

static void makeClickThrough(HWND hwnd) {
    LONG_PTR ex = GetWindowLongPtrW(hwnd, GWL_EXSTYLE);
    ex |= WS_EX_LAYERED | WS_EX_TRANSPARENT | WS_EX_TOOLWINDOW; // layered & hit-test transparent
    SetWindowLongPtrW(hwnd, GWL_EXSTYLE, ex);
    SetLayeredWindowAttributes(hwnd, 0, 255, LWA_ALPHA);        // full alpha for painted pixels
}

static double dpiScaleForHwnd(HWND hwnd) {
    // Try GetDpiForWindow (Win10+) first
    static auto pGetDpiForWindow = reinterpret_cast<UINT (WINAPI*)(HWND)>(
        GetProcAddress(GetModuleHandleW(L"user32.dll"), "GetDpiForWindow"));
    if (pGetDpiForWindow) {
        return pGetDpiForWindow(hwnd) / 96.0;
    }
    // Fallback: per-monitor effective DPI
    HMONITOR mon = MonitorFromWindow(hwnd, MONITOR_DEFAULTTONEAREST);
    UINT dpiX = 96, dpiY = 96;
    if (SUCCEEDED(GetDpiForMonitor(mon, MDT_EFFECTIVE_DPI, &dpiX, &dpiY))) {
        return dpiX / 96.0;
    }
    return 1.0;
}

static QRect rectPxToDips(const RECT& rcPx, double scale) {
    const int x = qRound(rcPx.left  / scale);
    const int y = qRound(rcPx.top   / scale);
    const int w = qRound((rcPx.right  - rcPx.left) / scale);
    const int h = qRound((rcPx.bottom - rcPx.top)  / scale);
    return QRect(x, y, w, h);
}

// ---------- Overlay widget (no Q_OBJECT) ----------

class OverlayWidget : public QWidget {
public:
    explicit OverlayWidget(QWidget* parent = nullptr)
        : QWidget(parent)
    {
        // Transparent, frameless, topmost, and pass mouse clicks to apps below
        setWindowFlag(Qt::FramelessWindowHint, true);
        setWindowFlag(Qt::Tool, true);
        setWindowFlag(Qt::WindowStaysOnTopHint, true);
        setAttribute(Qt::WA_TranslucentBackground, true);
        setAttribute(Qt::WA_NoSystemBackground, true);
        setAttribute(Qt::WA_TransparentForMouseEvents, true);

        // Ensure native HWND exists, then apply Win32 extended styles
        winId();
        makeClickThrough(reinterpret_cast<HWND>(winId()));

        // Poll Word's position ~60 fps. (You can increase to 33–50 ms to save CPU.)
        m_timer.setInterval(16);
        QObject::connect(&m_timer, &QTimer::timeout, [this]{ syncToWord(); });
        m_timer.start();
    }

protected:
    void paintEvent(QPaintEvent*) override {
        QPainter p(this);
        p.setRenderHint(QPainter::Antialiasing, true);

        // If we are in "waiting badge" size, draw a compact indicator.
        if (width() <= 300 && height() <= 100) {
            p.setPen(Qt::NoPen);
            p.setBrush(QColor(0,0,0,160));
            p.drawRoundedRect(rect(), 10, 10);
            p.setPen(Qt::white);
            QFont f = p.font(); f.setPointSize(12); f.setBold(true); p.setFont(f);
            p.drawText(rect(), Qt::AlignCenter, "Waiting for MS Word…");
            return;
        }

        // Demo visuals so it's obvious the overlay is present:
        p.fillRect(rect(), QColor(0, 0, 0, 90));                 // dim everything
        p.setPen(QPen(Qt::yellow, 4));
        p.drawRect(rect().adjusted(2,2,-2,-2));                  // bright border

        QFont f = p.font(); f.setPointSize(26); f.setBold(true); p.setFont(f);
        p.setPen(Qt::white);
        p.drawText(rect(), Qt::AlignCenter, "✅ OVERLAY ON MS WORD");

        // Example: highlight a central region
        QRect highlight(rect().center() - QPoint(300,100), QSize(600,200));
        p.setPen(QPen(Qt::red, 3));
        p.drawRect(highlight);
        p.drawText(highlight.adjusted(0,-40,0,0), Qt::AlignHCenter|Qt::AlignTop, "Sample annotation area");
    }

private:
    void syncToWord() {
        HWND word = findWordHwnd();

        if (!word || IsIconic(word)) {
            // Show a small badge so you know the app is running
            const QRect wanted(40, 40, 260, 60);
            if (geometry() != wanted) setGeometry(wanted);
            if (!isVisible()) show();
            update();
            return;
        }

        RECT rcPx{};
        if (!GetWindowRect(word, &rcPx)) return;

        // Convert Word's pixel rect to Qt DIPs for our QWidget geometry
        const double s = dpiScaleForHwnd(word);
        QRect geomDip = rectPxToDips(rcPx, s);

        if (geometry() != geomDip) {
            setGeometry(geomDip);
        }

        // Also keep native HWND aligned/topmost in *pixels* (no activation)
        SetWindowPos(reinterpret_cast<HWND>(winId()), HWND_TOPMOST,
                     rcPx.left, rcPx.top,
                     rcPx.right - rcPx.left, rcPx.bottom - rcPx.top,
                     SWP_NOACTIVATE | SWP_SHOWWINDOW);

        if (!isVisible()) show();
        update();
    }

    QTimer m_timer;
};

// ---------- main ----------

int main(int argc, char* argv[]) {
    // Ask Windows for per-monitor DPI v2 (best for mixed-DPI, multi-monitor)
    SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);

    QApplication app(argc, argv);

    OverlayWidget w;
    w.show();            // will resize/position itself onto Word if found

    return app.exec();
}