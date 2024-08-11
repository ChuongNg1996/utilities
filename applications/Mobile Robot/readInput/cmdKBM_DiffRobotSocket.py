# This script used AI - chatGPT for programming support
# pynput is event triggered - the function run if something happens
from pynput import keyboard
from pynput import mouse
import threading
import time
import socket
import sys

mouseCount = 1
mouseCountStop = 15
mouseCountMonitor = 0
mouseCountMonitorStop = 5
mouseCountTemp = 0
xStart = yStart = xEnd = yEnd = 0 
cmdMsg = 0
keyPress = 0
screen_width = 1920
screen_height = 1080

def on_press(key):
    global cmdMsg, keyPress
    try:
        # print(f'Key {key.char} pressed')
        keyPress = 1
        # Give command to Differential Mobile Robot
        if key.char == 'w':
            cmdMsg = 1
            print('Move Forward')
        elif key.char == 'a':
            cmdMsg = 2
            print('Rotate Left')
        elif key.char == 'd':
            cmdMsg = 3
            print('Rotate Right')
        elif key.char == 's':
            cmdMsg = 4
            print('Move Backward')

    except AttributeError:
        print(f'Special key {key} pressed')

def on_release(key):
    global cmdMsg
    cmdMsg = 0    
    # print(f'Key {key} released')
    if key == keyboard.Key.esc:
        # Stop listener
        return False

def move_mouse_to_middle():
    global screen_width, screen_height
    middle_x = screen_width  // 2
    middle_y = screen_height // 2
    mouse_controller.position = (middle_x, middle_y)
    print(f"Mouse position reset to middle: ({middle_x}, {middle_y})")

def on_move(x, y):
    # print(f'Pointer moved to ({x}, {y})')
    global mouseCount, mouseCountStop, xStart, yStart, xEnd, yEnd, cmdMsg, keyPress, screen_width, screen_height
    keyPress = 0

    if x <= 0 or x >= screen_width - 1 or y <= 0 or y >= screen_height - 1:
        move_mouse_to_middle()

    if mouseCount == 1:                 # Start of the count
        xStart = x
        yStart = y
        print(f'Pointer moved to ({xStart}, {yStart})')
            
    elif mouseCount == mouseCountStop:  # End of the count 
        mouseCount = 0
        xEnd = x
        yEnd = y
        xDiff = xEnd - xStart
        yDiff = yEnd - yStart
        print(f'Pointer moved to ({xEnd}, {yEnd})')

        if abs(yDiff) >= abs(xDiff):
            if yDiff < 0:
                cmdMsg = 1
                print('Move Forward')
            else:
                cmdMsg = 4 
                print('Move Backward')
        else:
            if xDiff < 0:
                cmdMsg = 2
                print('Rotate Left')
            else: 
                cmdMsg = 3
                print('Rotate Right')
    mouseCount += 1
    
def client_program():
    global cmdMsg
    message = str(cmdMsg)
    client_socket.send(message.encode())

# Create the Listener objects
listenerMouse = mouse.Listener(on_move=on_move)
listenerKeyboard = keyboard.Listener(on_press=on_press, on_release=on_release)

# Start the listeners in a separate thread
listenerMouse_thread = threading.Thread(target=listenerMouse.start)
listenerMouse_thread.start()

listenerKeyboard_thread = threading.Thread(target=listenerKeyboard.start)
listenerKeyboard_thread.start()

if __name__ == '__main__':
    try:
        # Start the TCP client
        host = socket.gethostname()
        port = 5000  # Port number
        client_socket = socket.socket()
        client_socket.connect((host, port))

        # Monitor mouse count
        mouseCountTemp = mouseCount

        mouse_controller = mouse.Controller()
        while True:
            client_program()
            if keyPress == 0:
                # Monitor mouse count to check whether the mouse stop moving or not
                mouseCountMonitor += 1
                if mouseCountMonitor == mouseCountMonitorStop:
                    mouseCountMonitor = 0
                    if mouseCountTemp == mouseCount:
                        cmdMsg = 0
                    mouseCountTemp = mouseCount                      

            # Keep the main thread alive to allow the listener to run
            time.sleep(0.01)
    except KeyboardInterrupt:
        client_socket.close()
        # Stop the listener when the user presses Ctrl+C
        listenerMouse.stop()
        listenerMouse_thread.join()  # Wait for the listener thread to finish

        listenerKeyboard.stop()
        listenerKeyboard_thread.join()  # Wait for the listener thread to finish

        print("Listener stopped.")
        sys.exit(0)