# chatGPT prompt: "python script reading mouse input on Windows with pynput without using pip install"
# Go to Github of pynput: https://github.com/moses-palmer/pynput and donwload the folder
# Copy/Paste "pynput" folder from "lib" folder into the main project folder
# Now we can use pynput

from pynput import mouse

def on_move(x, y):
    print(f'Pointer moved to ({x}, {y})')

def on_click(x, y, button, pressed):
    if pressed:
        print(f'{button} pressed at ({x}, {y})')
    else:
        print(f'{button} released at ({x}, {y})')

def on_scroll(x, y, dx, dy):
    direction = 'down' if dy < 0 else 'up'
    print(f'Scrolled {direction} at ({x}, {y})')

# Collect events until released
with mouse.Listener(on_move=on_move, on_click=on_click, on_scroll=on_scroll) as listener:
    listener.join()