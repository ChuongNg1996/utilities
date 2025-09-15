#include <QtWidgets> // Brings in the whole Qt Widgets module (buttons, layouts, main window, etc.).
#include <windows.h> // Gives access to the Windows API, including SendInput, INPUT, and key event constants.

static void pressQ() {
    INPUT in[2] = {}; // Defines an array of two INPUT structs (for key press + key release), initializes them with zeros.
    in[0].type = INPUT_KEYBOARD; // The first INPUT is a keyboard event.
    in[0].ki.wVk = 'Q'; // Sets the virtual-key code to the 'Q' key.
    in[0].ki.wScan = MapVirtualKeyW('Q', MAPVK_VK_TO_VSC); // Converts the virtual key 'Q' into a hardware scan code, required for low-level input.
    in[1] = in[0]; // Copy the first INPUT into the second one (so it’s also 'Q').
    in[1].ki.dwFlags = KEYEVENTF_KEYUP; // Change the second event into a key release.
    SendInput(2, in, sizeof(INPUT)); // Sends both events (Q down and Q up) to the OS, so it looks like the user typed 'Q'.
}

class KeyPresser : public QWidget { // Defines a custom widget (a small window). Inherits from QWidget.
public:
    KeyPresser() { // Constructor where we set up the GUI.
        setWindowTitle("Auto Q Presser"); // Sets the window’s title bar text.
        btn.setText("Start"); // The button starts with the label Start.
        btn.setCheckable(true); // Makes the button a toggle button (click = ON, click again = OFF).
        auto layout = new QVBoxLayout(this); // Create a vertical layout inside this widget.
        layout->addWidget(&btn); // Add the button into the layout.

        // Runs the lambda whenever the button is toggled.
        connect(&btn, &QPushButton::toggled, this, [&](bool on){ 
            btn.setText(on ? "Stop" : "Start");

            // If on is true → change button text to Stop and start the timer every 100 ms.
            // If on is false → set button text to Start and stop the timer.
            on ? timer.start(100) : timer.stop();   // 100 ms
        });
        connect(&timer, &QTimer::timeout, this, pressQ); // Whenever the timer ticks (every 100 ms), call pressQ().
    }
private:
    QPushButton btn; // The toggle button.
    QTimer timer; // The repeating timer (fires every 100 ms).
};

int main(int argc, char** argv) {
    QApplication app(argc, argv); // Initializes the Qt application (must be first).
    KeyPresser w; w.show(); // Creates a KeyPresser window and shows it.
    return app.exec(); // Enters the Qt event loop, keeping the app running until closed.
}