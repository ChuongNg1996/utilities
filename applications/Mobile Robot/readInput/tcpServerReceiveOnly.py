import socket
import sys

def server_program():
    host = socket.gethostname()
    port = 5000  # Port number

    server_socket = socket.socket()
    server_socket.bind((host, port))

    server_socket.listen(2)
    print(f"Server listening on {host}:{port}")

    try:
        conn, address = server_socket.accept()  # Accept new connection
        print("Connection from: " + str(address))

        while True:
            data = conn.recv(1024).decode()
            print("From client: " + str(data))
            
    finally:
        conn.close()
        server_socket.close()
        sys.exit(0)

if __name__ == '__main__':
    try:
        server_program()
    except KeyboardInterrupt:
        print("\nServer exiting...")