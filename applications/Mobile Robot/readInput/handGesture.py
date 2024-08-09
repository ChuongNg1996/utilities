import sys
# Add your custom path to sys.path
sys.path.append(r'C:\Users\ASUS\AppData\Local\Programs\Python\Python311\Lib\site-packages')

# pip install imageio[ffmpeg] pillow
import imageio
import tkinter as tk
from PIL import Image, ImageTk
import mediapipe as mp

class WebcamApp:
    def __init__(self, window, window_title):
        self.window = window
        self.window.title(window_title)
        self.video_source = '<video0>'
        
        # Open video source
        self.vid = imageio.get_reader(self.video_source, 'ffmpeg')
        
        # Get the first frame to determine the size
        self.frame = self.vid.get_next_data()
        self.height, self.width, _ = self.frame.shape
        
        # Create a canvas that will fit the above video source size
        self.canvas = tk.Canvas(window, width=self.width, height=self.height)
        self.canvas.pack()
        
        self.delay = 15
        self.update()
        
        self.window.mainloop()

    def update(self):
        # Get a frame from the video source
        try:
            frame = self.vid.get_next_data()
            frame = Image.fromarray(frame)
            frame = ImageTk.PhotoImage(frame)
            
            # Update the canvas with the new frame
            self.canvas.create_image(0, 0, image=frame, anchor=tk.NW)
            
            # Keep a reference to the image to prevent garbage collection
            self.canvas.image = frame
            
            self.window.after(self.delay, self.update)
        except RuntimeError:
            print("Could not read frame.")
        except Exception as e:
            print(e)

if __name__ == "__main__":
    # Create a window and pass it to the WebcamApp class
    WebcamApp(tk.Tk(), "Webcam Feed")