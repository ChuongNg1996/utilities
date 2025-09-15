#include <QtWidgets> // Qt Widgets (UI)
#include <windows.h> // Win32 core API
#include <psapi.h> // process info helpers

// Ensures newer Win32 APIs are available (Vista+ level)
#ifndef _WIN32_WINNT
#define _WIN32_WINNT 0x0600
#endif

// ---- Helpers ---------------------------------------------------------------

// Check if the process is MS Word or NOT
static bool isWordWindow(HWND h) {
    DWORD pid = 0;

    // Gets the process ID owning window h
    GetWindowThreadProcessId(h, &pid); 
    if (!pid) return false; 

    HANDLE ph = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION | PROCESS_VM_READ, FALSE, pid);
    if (!ph) return false;

    // Opens the process so we can read its executable path.
    wchar_t exe[MAX_PATH] = L"";
    DWORD n = MAX_PATH;
    bool ok = QueryFullProcessImageNameW(ph, 0, exe, &n);
    CloseHandle(ph);
    if (!ok) return false;

    const wchar_t* base = wcsrchr(exe, L'\\');
    base = base ? base + 1 : exe;
    return _wcsicmp(base, L"WINWORD.EXE") == 0;
}

// Find MS Word pane (child window class is usually "_WwG")
static HWND findWordDocPane() {
    HWND wordMain = nullptr;

    // 1) Find Word top-level window by class "OpusApp" or by process check
    // Try by class first (fast):
    wordMain = FindWindowW(L"OpusApp", nullptr);

    // Fallback: enumerate top-level windows and pick the first owned by WINWORD.EXE
    if (!wordMain) {
        EnumWindows([](HWND h, LPARAM lp) -> BOOL {
            if (!IsWindowVisible(h)) return TRUE;
            if (isWordWindow(h)) { *reinterpret_cast<HWND*>(lp) = h; return FALSE; }
            return TRUE;
        }, reinterpret_cast<LPARAM>(&wordMain));
    }
    if (!wordMain) return nullptr;

    // 2) Find the document pane child. Historically class is "_WwG".
    HWND doc = nullptr;
    EnumChildWindows(wordMain, [](HWND child, LPARAM lp) -> BOOL {
        wchar_t cls[64] = L"";
        GetClassNameW(child, cls, 64);
        if (_wcsicmp(cls, L"_WwG") == 0) { *reinterpret_cast<HWND*>(lp) = child; return FALSE; }
        return TRUE;
    }, reinterpret_cast<LPARAM>(&doc));

    // If not found, try returning the main window as a last resort.
    return doc ? doc : wordMain;
}

// Post a single 'q' character to target HWND (works even if not foreground)
static void postCharQ(HWND target) {
    if (!IsWindow(target)) return;

    // Typical ordering: WM_KEYDOWN, WM_CHAR, WM_KEYUP
    const WPARAM vk = 'Q';
    const WPARAM ch = L'q'; // lowercase character to insert
    const LPARAM lparamDown = 1;     // minimal repeat/scan info
    const LPARAM lparamUp   = (1 << 31) | (1 << 30); // transition+previous state

    PostMessageW(target, WM_KEYDOWN, vk, lparamDown);
    PostMessageW(target, WM_CHAR,   ch, 1);
    PostMessageW(target, WM_KEYUP,  vk, lparamUp);
}

// ---- UI --------------------------------------------------------------------
class KeyPresser : public QWidget {
public:
    KeyPresser() {
        setWindowTitle("Auto Q → Microsoft Word (background)");
        btn.setText("Start");
        btn.setCheckable(true);

        info.setWordWrap(true);
        info.setText("Sends 'q' to Microsoft Word every 100 ms, even if Word is not the active window.");

        auto layout = new QVBoxLayout(this);
        layout->addWidget(&btn);
        layout->addWidget(&info);

        connect(&btn, &QPushButton::toggled, this, [&](bool on){
            btn.setText(on ? "Stop" : "Start");
            if (on) {
                wordDocHwnd = findWordDocPane();
                if (!wordDocHwnd) {
                    QMessageBox::warning(this, "Not found", "Couldn't find Microsoft Word window.");
                    btn.setChecked(false);
                    return;
                }
                timer.start(100); // 100 ms
            } else {
                timer.stop();
            }
        });

        connect(&timer, &QTimer::timeout, this, [&]{
            // Re-check window validity occasionally
            if (!IsWindow(wordDocHwnd)) {
                wordDocHwnd = findWordDocPane();
                if (!wordDocHwnd) return;
            }
            postCharQ(wordDocHwnd);
        });
    }

private:
    QPushButton btn;
    QLabel info;rytryr
    QTimer timer;
    HWND wordDocHwnd = nullptr;
};

int main(int argc, char** argv) {
    QApplication app(argc, argv);
    KeyPresser w; w.show();
    return app.exec();
}