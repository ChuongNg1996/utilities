// main.cpp — Qt overlay: text-only, click-through, only when Word is active
// Qt 6 Widgets, MSVC/MinGW, Windows 10/11

#include <QApplication>
#include <QWidget>
#include <QPainter>
#include <QTimer>
#include <QScreen>
#include <QGuiApplication>

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <shellscalingapi.h>   // PER_MONITOR_AWARE_V2
#pragma comment(lib, "Shcore.lib")

// --- Find MS Word (class "OpusApp", fallback by title) ---
static HWND findWordByClass() { return FindWindowW(L"OpusApp", nullptr); }
static BOOL CALLBACK enumWindowsProc(HWND h, LPARAM lp) {
    if (!IsWindowVisible(h)) return TRUE;
    wchar_t title[512] = {0}; GetWindowTextW(h, title, 511);
    if (title[0] && wcsstr(title, L"Word")) { *reinterpret_cast<HWND*>(lp) = h; return FALSE; }
    return TRUE;
}
static HWND findWordHwnd() {
    if (HWND h = findWordByClass()) return h;
    HWND found = nullptr; EnumWindows(enumWindowsProc, reinterpret_cast<LPARAM>(&found)); return found;
}

// --- Overlay widget (no Q_OBJECT) ---
class OverlayWidget : public QWidget {
public:
    OverlayWidget() {
        // Frameless, tool (no taskbar), topmost, transparent background, no focus, click-through
        setWindowFlag(Qt::FramelessWindowHint, true);
        setWindowFlag(Qt::Tool, true);
        setWindowFlag(Qt::WindowStaysOnTopHint, true);
        setWindowFlag(Qt::WindowDoesNotAcceptFocus, true);
        setAttribute(Qt::WA_TranslucentBackground, true);
        setAttribute(Qt::WA_NoSystemBackground, true);
        setAttribute(Qt::WA_TransparentForMouseEvents, true);
        setAttribute(Qt::WA_ShowWithoutActivating, true);
        setFocusPolicy(Qt::NoFocus);

        winId(); // ensure HWND exists

        // Make the native window hit-test transparent & non-activating
        LONG_PTR ex = GetWindowLongPtrW(HWND(winId()), GWL_EXSTYLE);
        ex |= WS_EX_LAYERED | WS_EX_TRANSPARENT | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE;
        SetWindowLongPtrW(HWND(winId()), GWL_EXSTYLE, ex);

        // Poll ~30–60 Hz to follow Word
        m_timer.setInterval(33);
        QObject::connect(&m_timer, &QTimer::timeout, [this]{ syncToWord(); });
        m_timer.start();
    }

protected:
    void paintEvent(QPaintEvent*) override {
        QPainter p(this);
        p.setRenderHint(QPainter::Antialiasing, true);

        // Text-only HUD near top center
        const QString msg = u"OVERLAY ON MS WORD"_qs;
        QFont f = p.font(); f.setBold(true); f.setPointSize(22); p.setFont(f);

        // background pill for readability (semi-transparent)
        QFontMetrics fm(f);
        QSize textSize = fm.size(Qt::TextSingleLine, msg);
        int pad = 12;
        QRect box((width() - (textSize.width() + 2*pad)) / 2, 18,
                  textSize.width() + 2*pad, textSize.height() + 2*pad);

        p.setPen(Qt::NoPen);
        p.setBrush(QColor(0, 0, 0, 140));
        p.drawRoundedRect(box, 12, 12);

        p.setPen(Qt::white);
        p.drawText(box, Qt::AlignCenter, msg);
    }

private:
    void syncToWord() {
        HWND word = findWordHwnd();
        if (!word) { if (isVisible()) hide(); return; }

        // Only overlay when Word is the active (foreground) window
        HWND fg = GetForegroundWindow();
        if (!fg) { if (isVisible()) hide(); return; }
        // Normalize to top-level owner of foreground window
        fg = GetAncestor(fg, GA_ROOT);
        if (fg != word) { if (isVisible()) hide(); return; }

        // Word is active → follow its rect
        RECT rcPx{}; if (!GetWindowRect(word, &rcPx)) { if (isVisible()) hide(); return; }

        // Use the overlay's current screen DPR for DIP conversion
        QScreen* scr = this->screen();
        if (!scr) scr = QGuiApplication::screenAt(QPoint(rcPx.left, rcPx.top));
        if (!scr) scr = QGuiApplication::primaryScreen();
        const qreal dpr = scr ? scr->devicePixelRatio() : 1.0;

        const int xDip = qRound(rcPx.left / dpr);
        const int yDip = qRound(rcPx.top  / dpr);
        const int wDip = qRound((rcPx.right  - rcPx.left) / dpr);
        const int hDip = qRound((rcPx.bottom - rcPx.top)  / dpr);
        const QRect wanted(xDip, yDip, wDip, hDip);

        if (geometry() != wanted) setGeometry(wanted);

        // Keep on top without moving/resizing or activating
        SetWindowPos(HWND(winId()), HWND_TOPMOST, 0,0,0,0,
                     SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE | SWP_SHOWWINDOW);

        if (!isVisible()) show();
        update();
    }

    QTimer m_timer;
};

int main(int argc, char* argv[]) {
    // Best behavior on mixed-DPI / multi-monitor
    SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);

    QApplication app(argc, argv);
    OverlayWidget w;  // starts hidden until Word is active
    return app.exec();
}