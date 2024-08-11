import socket
import sys

def client_program():
    host = socket.gethostname()
    port = 5000  # Port number

    client_socket = socket.socket()
    client_socket.connect((host, port))

    try:
        while True:
            message = input("Enter client message: ")
            client_socket.send(message.encode())

    finally:
        client_socket.close()
        sys.exit(0)

if __name__ == '__main__':
    try:
        client_program()
    except KeyboardInterrupt:
        print("\nClient exiting...")