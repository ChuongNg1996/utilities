#include <QApplication>
#include <QPushButton>
#include <QMessageBox>

int main(int argc, char* argv[]) {
    QApplication app(argc, argv);

    QPushButton btn("Click me");
    QObject::connect(&btn, &QPushButton::clicked, [] {
        QMessageBox::information(nullptr, "Hi", "Hello from Qt!");
    });

    btn.resize(200, 60);
    btn.show();
    return app.exec();
}