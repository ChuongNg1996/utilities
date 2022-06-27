# SSH Tunneling

## SSH Tunneling: LAN only example
Source: [phoenixnap.com](https://phoenixnap.com/kb/ssh-to-connect-to-remote-server-linux-or-windows)
* My setup: 2 PCs/Laptops, one uses Ubuntu 18.04, one uses Ubuntu 20.04.
* Each PC/Laptop can be either server or client. Firstly, install both `OpenSSH Client` and `OpenSSH Server` on both (it's possible that both are already installed):
  ```sh
  sudo apt-get update
  sudo apt-get install openssh-client
  sudo apt-get install openssh-server
  ```
  To check after install:
  ```sh
  ssh # for OpenSSH Client
  sudo service ssh status # for OpenSSH Server
  ssh localhost # for OpenSSH Server
  ```
* For further configuration, use `sudo nano /etc/ssh/sshd_config` then need to restart `sudo service ssh restart`.
* 
