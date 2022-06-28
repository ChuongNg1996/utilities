# Interprocess Communication

## TCP/IP, UDP/IP
* single-server-single-client: 

  [geeksforgeeks](https://www.geeksforgeeks.org/socket-programming-cc/?ref=lbp)
  
  ```sh
  gcc server_1.cpp -o server_1
  gcc client_1.cpp -o client_1
  ./server_1 #ON TERMINAL 1
  ./client_1 #ON TERMINAL 2
  ```

* single-server-multiple-client: 

  [geeksforgeeks](https://www.geeksforgeeks.org/socket-programming-in-cc-handling-multiple-clients-on-server-without-multi-threading/?ref=lbp): multithreading is not scalable with large clients -> use **select()** linux command.
  
  ```sh
  gcc server_1.cpp -o server_1
  ./server_1 #ON TERMINAL 1
  telnet localhost 8888 #ON TERMINAL 2
  telnet 127.0.0.1 8888 #ON TERMINAL 3
  telnet localhost 8888 #ON TERMINAL 4
  ```

## NamedPipe FIFO:

  [geeksforgeeks](https://www.geeksforgeeks.org/named-pipe-fifo-example-c-program/): a named pipe appears as a **file** and generally processes attach to it for inter-process communication. A **FIFO file** is a special kind of **file** on the local storage which allows two or more processes to communicate with each other by reading/writing to/from this **file**.

  ```sh
  gcc program_1.cpp -o program_1
  gcc program_2.cpp -o program_2
  ./program_1 #ON TERMINAL 1
  ./program_2 #ON TERMINAL 2
  Hello #ON TERMINAL 1
  Hi #ON TERMINAL 2
  ```

## Shared Memory:

  [geeksforgeeks](https://www.geeksforgeeks.org/ipc-shared-memory/): The **problem** with **pipes, fifo and message queue** – is that for two process to exchange information. The information has to go through the **kernel**. ... A total of **four copies of data** are required (2 read and 2 write). So, shared memory provides a way by letting two or more processes share a memory segment. With **Shared Memory** the **data is only copied twice** – from input file into shared memory and from shared memory to the output file.
  
  ```sh
  # Failed. Tested on Ubunttu 18.04
  g++ writer.cpp -o writer
  g++ reader.cpp -o reader
  ./writer #ON TERMINAL 1
  ./reader #ON TERMINAL 2
  ```

## Unix Ports
  
* Commands to find devices (path):
  ```sh
  dmesg # Got "failed to send h2c command" with cheap mouse, driver issue, ended up with no clear path
  lsusb # Quick check, device with driver issue gets no name on the left
  lsusb -v | grep '^Bus\|iSerial'# lsusb shows more detail
  usb-devices
  ls /dev/* # ls /dev/usb* || ls /dev/sda* || ls /dev/tty*  
  df -h
  ```
* [Linux Serial Ports Using C/C++ (blog.mbedded.ninja)](https://blog.mbedded.ninja/programming/operating-systems/linux/linux-serial-ports-using-c-cpp/): In typical UNIX style, serial ports are represented by files within the operating system. These files usually pop-up in /dev/, and begin with the name tty*.
  ```sh
  gcc linux_serial_1.c -o linux_serial_1
  ./linux_serial_1
  ```
