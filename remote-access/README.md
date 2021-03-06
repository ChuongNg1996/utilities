# SSH Tunneling

## tmate
* Found from [this](https://www.saashub.com/teleconsole-alternatives), main source [this](https://tmate.io/?utm_source=saashub&utm_medium=marketplace&utm_campaign=saashub). Keyword: "Terminal Sharing"
  ```sh
  sudo apt-get update
  sudo apt-get install tmate
  ```
* On server side:
  ```sh
  tmate
  ssh-keygen -t rsa -f ~/.ssh/id_rsa # if  SSH keys not found
  tmate show-messages # Copy & Paste the @key
  ```
* On client side:
  ```sh
  ssh @key # e.g.: ssh 2Ykf3JzrWHQ6ypWHpUZZ7Djjc@sgp1.tmate.io               
  ```

## LAN example with OpenSSH
Source: [phoenixnap.com-1](https://phoenixnap.com/kb/ssh-to-connect-to-remote-server-linux-or-windows), [phoenixnap.com-2](https://phoenixnap.com/kb/ssh-port-forwarding)
* My setup: 2 PCs/Laptops, one uses Ubuntu 18.04 (called PC1), one uses Ubuntu 20.04 (called PC2).
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
* Register both devices to the Network by `ssh your_username@host_ip_address` where `your_username` and `host_ip_address` is exclusive. For example:

  PC1 has `chuong` as username, so `your_username` is `chuong`. Next, my IP Address on the LAN Network (use `ifconfig` to show) is `192.168.0.118`, so `host_ip_address` is `192.168.0.118`. So `ssh your_username@host_ip_address` becomes `ssh chuong@192.168.0.118` -> yes to create.
  
  
  PC2 has `chuong` as username, so `your_username` is `chuong`. Next, my IP Address on the LAN Network (use `ifconfig` to show) is `192.168.0.108`, so `host_ip_address` is `192.168.0.108`. So `ssh your_username@host_ip_address` becomes `ssh chuong@192.168.0.108` -> yes to create.
  
* Quick Test with Local Port Forwarding. 
  ```sh
  ssh -L local_port:destination_server_ip:remote_port ssh_server_hostname
  ```
  means "port `local_port` on the local client is being **forwarded to** port `remote_port` of the destination remote server (with `ssh_server_hostname` is `ssh your_username@host_ip_address`)".
  
  Thus, on PC1 (Ubuntu 18.04) (as client), to forward to PC2 (Ubuntu 20.04) (as server), i can use:
  ```sh
  ssh -L 8011:192.168.0.108:8090 chuong@192.168.0.108
  ```
  The result on PC1 should shows `Welcome to Ubuntu 20.04...` which is PC2.
 
* Quick Test with Remote Port Forwarding.
  ```sh
  ssh -R remote_port:localhost:local_port ssh_server_hostname
  ```
  means "port `remote_port` on the remote server (with `ssh_server_hostname` is `ssh your_username@host_ip_address`) is being **forwarded to** port local_port` of the client".
  
  Thus, on PC1 (Ubuntu 18.04) (as client), to being forwarded to by PC2 (Ubuntu 20.04) (as server), i can use:
  ```sh
  ssh -R 8001:localhost:8012 chuong@192.168.0.108
  ```
  The result on PC1 should shows `Welcome to Ubuntu 20.04...` which is PC2.
  
## Teleport
  * Descendants of `teleconsole`, [website](https://goteleport.com/).
  
# Others
  
## ngrok
  source: [linuxhint](https://linuxhint.com/public_ip_address_ngrok_ssh_tunneling/)
  
  Open web service with `server_1.py`, [source](https://www.tutorialspoint.com/python/python_networking.htm), then run `ngrok`
    ```sh
    sudo chmod +x server_1.py
    python server_1.py
    snap install ngrok
    ngrok http 5000
    ```

 ## Waveshare sim7600G-H Dongle
  * Source: [phillipdavidstearns](https://github.com/phillipdavidstearns/simcom_wwan-setup), [Issues Installing SIM7600G-H 4G for Jetson Nano](https://forums.developer.nvidia.com/t/issues-installing-sim7600g-h-4g-for-jetson-nano/129826), [SIM7600X 4G DONGLE (Official)](https://www.waveshare.com/wiki/SIM7600G-H_4G_DONGLE)
