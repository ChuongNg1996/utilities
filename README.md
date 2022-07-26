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

Open Systems Interconnection model ([OSI model](https://en.wikipedia.org/wiki/OSI_model)) a conceptual model that describes the universal standard of communication functions of a telecommunication system or computing system, without any regard to the system's underlying internal technology and specific protocol suites.  

### 7. Application layer
* [Wiki](https://en.wikipedia.org/wiki/Application_layer): In the **Internet protocol (IP)** suite, the *application layer* contains the communications protocols and interface methods used in *process-to-process* communications. The **OSI model** defines the *application layer* as only the interface responsible for communicating with *host-based and user-facing applications*.
  ```sh
  EXAMPLES (Internet protocol suite)
  BGP DHCP(v6) DNS FTP HTTP HTTPS IMAP IRC LDAP MGCP MQTT NNTP NTP OSPF POP PTP ONC/RPC RTP RTSP RIP SIP SMTP SNMP SSH Telnet TLS/SSL XMPP more...
  ```
### 6. Presentation layer
* [Wiki](https://en.wikipedia.org/wiki/Presentation_layer): serves as the *data translator* for the network.
  ```sh
  EXAMPLES
  HyperText Transfer Protocol (HTTP), generally regarded as an application-layer protocol, has presentation-layer aspects such as the ability to identify character encoding for proper conversion, which is then done in the application layer. 
  ```

### 5. Session layer
### 4. Transport layer
### 3. Network layer
### 2. Data link layer
### 1. Physical layer
