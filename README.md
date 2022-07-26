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

Open Systems Interconnection model ([OSI model](https://en.wikipedia.org/wiki/OSI_model)) a conceptual model that describes the universal standard of communication functions of a telecommunication system or computing system, without any regard to the system's underlying internal technology and specific protocol suites (for *modularity* purpose). [Image source](https://linuxhint.com/network-osi-layers-explained/) 

<p align="center">
  <img width="600" height="327"  style="background-color:#33475b" src="https://linuxhint.com/wp-content/uploads/2021/07/image1-39.png">
</p>


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
* [Wiki](https://en.wikipedia.org/wiki/Session_layer): The session layer provides the mechanism for *opening, closing and managing a session* between end-user application processes, (i.e., a semi-permanent dialogue). 
* Communication sessions consist of *requests and responses* that occur between applications. Session-layer services are commonly used in application environments that make use of *remote procedure calls (RPCs)*. 

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
* [Wiki](https://en.wikipedia.org/wiki/Transport_layer): The protocols of this layer provide end-to-end communication *services* for applications. 
* It provides services such as *connection-oriented communication, reliability, flow control, congestion avoidance* and *multiplexing*, ... 

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
* [Wiki](https://en.wikipedia.org/wiki/Network_layer): The network layer is responsible for *packet forwarding* including routing through intermediate routers. The network layer provides the means of transferring variable-length network packets from a source to a destination host via one or more networks. Within the service layering semantics of the OSI network architecture, the network layer *responds to service requests from the transport layer* and *issues service requests to the data link layer*.
* Functions of the network layer include: *Connectionless communication, Host addressing, Message forwarding*.

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
* [Wiki](https://en.wikipedia.org/wiki/Data_link_layer): This layer is the protocol layer that *transfers data between nodes* on a network segment across the *physical layer*.
*  The data link layer provides the *functional and procedural means to transfer data* between network entities and may also provide the means to *detect and possibly correct errors* that can occur in the physical layer. The service provided by the data link layer are: *Encapsulation of network layer data packets into frames*; *Frame synchronization*; In the **logical link control (LLC)** sublayer: *Error control, Flow control*; In the **medium access control (MAC)** sublayer: *Multiple access methods, Physical addressing (MAC addressing), LAN switching (packet switching), Data packet queuing or scheduling, Store-and-forward switching or cut-through switching, Quality of service (QoS) control, Virtual LANs (VLAN)*.  
 
  ```sh
    ARCnet
    ATM
    Cisco Discovery Protocol (CDP)
    Controller Area Network (CAN)
    Econet
    Ethernet
    Ethernet Automatic Protection Switching (EAPS)
    Fiber Distributed Data Interface (FDDI)
    Frame Relay
    High-Level Data Link Control (HDLC)
    IEEE 802.2 (provides LLC functions to IEEE 802 MAC layers)
    IEEE 802.11 wireless LAN
    I²C
    LattisNet
    Link Layer Discovery Protocol (LLDP)
    LocalTalk
    MIL-STD-1553
    Multiprotocol Label Switching (MPLS)
    Nortel Discovery Protocol (NDP)
    Point-to-Point Protocol (PPP)
    Profibus
    SpaceWire
    Serial Line Internet Protocol (SLIP) (obsolete)
    Split multi-link trunking (SMLT)
    IEEE 802.1aq - Shortest Path Bridging
    Spanning Tree Protocol
    StarLan
    Token Ring
    TRILL (TRansparent Interconnection of Lots of Links)
    Unidirectional Link Detection (UDLD)
    UNI/O
    1-Wire
    and most forms of serial communication e.g. USB, PCI Express.

  ```

### 1. Physical layer
* [Wiki](https://en.wikipedia.org/wiki/Physical_layer): The physical layer provides an *electrical, mechanical, and procedural interface* to the transmission medium. The shapes and properties of the electrical connectors, the frequencies to broadcast on, the line code to use and similar low-level parameters, are specified by the physical layer. 
* The physical layer defines the means of transmitting a *stream of raw bits* over a physical data link connecting network nodes. 

  ```sh
    1-Wire
    ARINC 818 Avionics Digital Video Bus
    Bluetooth physical layer
    CAN bus (controller area network) physical layer
    DSL
    EIA RS-232, EIA-422, EIA-423, RS-449, RS-485
    Etherloop
    Ethernet physical layer Including 10BASE-T, 10BASE2, 10BASE5, 100BASE-TX, 100BASE-FX, 1000BASE-T, 1000BASE-SX and other varieties
    G.hn/G.9960 physical layer
    GSM Um air interface physical layer
    IEEE 802.15.4 physical layers
    IEEE 1394 interface
    IRDA physical layer
    ISDN
    ITU Recommendations: see ITU-T
    I²C, I²S
    LoRa
    Low-voltage differential signaling
    Mobile Industry Processor Interface physical layer
    Modulated ultrasound
    Optical Transport Network (OTN)
    SMB
    SONET/SDH
    SPI
    T1 and other T-carrier links, and E1 and other E-carrier links
    Telephone network modems — V.92
    TransferJet physical layer
    USB physical layer
    PCI Express physical layer
    802.11 Wi-Fi physical layer
    Visible light communication co-ordinated under IEEE 802.15.7
    X10
    
  ```

