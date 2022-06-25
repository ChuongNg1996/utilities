# Source
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

