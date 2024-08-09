# This script used AI - chatGPT for programming support

from pynput import keyboard
from pynput import mouse
import threading
import time

mouseCount = 1
mouseCountStop = 15
xStart = yStart = xEnd = yEnd = 0 

def on_press(key):
    try:
        # print(f'Key {key.char} pressed')

        # Give command to Differential Mobile Robot
        if key.char == 'w':
            print('Move Forward')
        elif key.char == 'a':
            print('Rotate Left')
        elif key.char == 'd':
            print('Rotate Right')
        elif key.char == 's':
            print('Move Backward')

    except AttributeError:
        print(f'Special key {key} pressed')

def on_release(key):
    # print(f'Key {key} released')
    if key == keyboard.Key.esc:
        # Stop listener
        return False

def on_move(x, y):
    # print(f'Pointer moved to ({x}, {y})')
    global mouseCount, mouseCountStop, xStart, yStart, xEnd, yEnd
   
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
            if yDiff <= 0:
                print('Move Forward')
            else: 
                print('Move Backward')
        else:
            if xDiff >= 0:
                print('Rotate Right')
            else: 
                print('Rotate Left')
    mouseCount += 1
    

# Create the Listener objects
listenerMouse = mouse.Listener(on_move=on_move)
listenerKeyboard = keyboard.Listener(on_press=on_press, on_release=on_release)

# Start the listeners in a separate thread
listenerMouse_thread = threading.Thread(target=listenerMouse.start)
listenerMouse_thread.start()

listenerKeyboard_thread = threading.Thread(target=listenerKeyboard.start)
listenerKeyboard_thread.start()

try:
    while True:
        # Keep the main thread alive to allow the listener to run
        time.sleep(1)
except KeyboardInterrupt:

    # Stop the listener when the user presses Ctrl+C
    listenerMouse.stop()
    listenerMouse_thread.join()  # Wait for the listener thread to finish

    listenerKeyboard.stop()
    listenerKeyboard_thread.join()  # Wait for the listener thread to finish

    print("Listener stopped.")