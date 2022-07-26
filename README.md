# Utilities
My Basic Utilities

## CONTENTS
* Inter-process Communication (for OS): [Wiki](https://en.wikipedia.org/wiki/Inter-process_communication#Approaches).

## CLASSICAL PHYSICS
* For constant acceleration `a_c`, for each time step:

  ```sh
  p_f = p_i + v_i*delta_t + (1/2)*a_c*(delta_t)^2 ( = p_i + v_f*delta_t - (1/2)*a_c*(delta_t)^2 = p_i + v_a*delta_t )
  v_f = v_i + a_c*delta_t ( -> v_f*delta_t = v_i*delta_t + a_c*(delta_t)^2 -> v_i*delta_t = v_f*delta_t - a_c*(delta_t)^2 )
  v_a = (v_f - v_i)/2
  ```
  
  where `p_i` and `p_f` are initial and final position; `v_i` `v_f` `v_a` are initial, final and average velocity.

## NETWORKING 

Open Systems Interconnection model ([OSI model](https://en.wikipedia.org/wiki/OSI_model)) a conceptual model that describes the universal standard of communication functions of a telecommunication system or computing system, without any regard to the system's underlying internal technology and specific protocol suites (for *modularity* purpose).  

### 7. Application layer
* [Wiki](https://en.wikipedia.org/wiki/Application_layer): In the **Internet protocol (IP)** suite, the *application layer* contains the communications protocols and interface methods used in *process-to-process* communications. The **OSI model** defines the *application layer* as only the interface responsible for communicating with *host-based and user-facing applications*.
  ```sh
  EXAMPLES
  BGP DHCP(v6) DNS FTP HTTP HTTPS IMAP IRC LDAP MGCP MQTT NNTP NTP OSPF POP PTP ONC/RPC RTP RTSP RIP SIP SMTP SNMP SSH Telnet TLS/SSL XMPP more...
  ```
### 6. Presentation layer
* [Wiki](https://en.wikipedia.org/wiki/Presentation_layer): serves as the *data translator* for the network.
  ```sh
  EXAMPLES
  HyperText Transfer Protocol (HTTP), generally regarded as an application-layer protocol, has presentation-layer aspects such as the ability to identify character encoding for proper conversion, which is then done in the application layer. 
  
  Apple Filing Protocol (AFP)
  Independent Computing Architecture (ICA), the Citrix system core protocol
  Lightweight Presentation Protocol (LPP)
  NetWare Core Protocol (NCP)
  Network Data Representation (NDR)
  Tox, The Tox protocol is sometimes regarded as part of both the presentation and application layer
  eXternal Data Representation (XDR)
  X.25 Packet Assembler/Disassembler Protocol (PAD)
  ```

### 5. Session layer
* [Wiki](https://en.wikipedia.org/wiki/Session_layer): The session layer provides the mechanism for *opening, closing and managing a session* between end-user application processes, (i.e., a semi-permanent dialogue). Communication sessions consist of *requests and responses* that occur between applications. Session-layer services are commonly used in application environments that make use of *remote procedure calls (RPCs)*. 

  ```sh
  EXAMPLES
  
  ADSP, AppleTalk Data Stream Protocol
  ASP, AppleTalk Session Protocol
  H.245, Call Control Protocol for Multimedia Communication
  ISO-SP, OSI session-layer protocol (X.225, ISO 8327)
  iSNS, Internet Storage Name Service
  L2F, Layer 2 Forwarding Protocol
  L2TP, Layer 2 Tunneling Protocol
  NetBIOS, Network Basic Input Output System
  PAP, Password Authentication Protocol
  PPTP, Point-to-Point Tunneling Protocol
  RPC, Remote Procedure Call Protocol
  RTCP, Real-time Transport Control Protocol
  SMPP, Short Message Peer-to-Peer
  SCP, Session Control Protocol
  SOCKS, the SOCKS internet protocol
  ZIP, Zone Information Protocol
  SDP, Sockets Direct Protocol
    
  ```

### 4. Transport layer
* [Wiki](https://en.wikipedia.org/wiki/Transport_layer): The protocols of this layer provide end-to-end communication *services* for applications. It provides services such as *connection-oriented communication, reliability, flow control, congestion avoidance* and *multiplexing*, ... 

  ```sh
  EXAMPLES 
  
  ATP, AppleTalk Transaction Protocol
  CUDP, Cyclic UDP[4]
  DCCP, Datagram Congestion Control Protocol
  FCP, Fibre Channel Protocol
  IL, IL Protocol
  MPTCP, Multipath TCP
  NORM, NACK-Oriented Reliable Multicast
  RDP, Reliable Data Protocol
  RUDP, Reliable User Datagram Protocol
  SCTP, Stream Control Transmission Protocol
  SPX, Sequenced Packet Exchange
  SST, Structured Stream Transport
  TCP, Transmission Control Protocol
  UDP, User Datagram Protocol
  UDP-Lite
  µTP, Micro Transport Protocol

  ```

### 3. Network layer
* [Wiki](https://en.wikipedia.org/wiki/Network_layer): The network layer is responsible for *packet forwarding* including routing through intermediate routers.

  ```sh
  EXAMPLES
  
  CLNS, Connectionless-mode Network Service
  DDP, Datagram Delivery Protocol
  EGP, Exterior Gateway Protocol
  EIGRP, Enhanced Interior Gateway Routing Protocol
  ICMP, Internet Control Message Protocol
  IGMP, Internet Group Management Protocol
  IPsec, Internet Protocol Security
  IPv4/IPv6, Internet Protocol
  IPX, Internetwork Packet Exchange
  LLARP, Low Latency Anonymous Routing Protocol
  OSPF, Open Shortest Path First
  PIM, Protocol Independent Multicast
  RIP, Routing Information Protocol

  ```

### 2. Data link layer
### 1. Physical layer
