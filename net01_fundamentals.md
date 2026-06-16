# SECTION 1: Networking Fundamentals

---

## 1.1 What Is a Network?

A **computer network** is a collection of interconnected devices (nodes) that can communicate and share resources. Networks enable file sharing, internet access, communication, centralized management, and distributed computing.

**Key components of any network:**
- **End devices (hosts):** Computers, phones, servers, printers, IoT devices
- **Intermediary devices:** Routers, switches, firewalls, access points
- **Media:** The physical or wireless path data travels (cables, radio waves, fiber)
- **Services:** DHCP, DNS, HTTP, email — what the network provides

**Network representations:**
- **Physical topology:** The actual physical layout — where cables run, device locations
- **Logical topology:** How data flows — IP addressing, routing paths

---

## 1.2 The OSI Reference Model (Deep Dive)

The **OSI (Open Systems Interconnection)** model is a conceptual framework that standardizes network communication into 7 layers. It was developed by ISO in 1984. It is **not** a protocol itself — it is a *model* for understanding and designing networks.

**Mnemonic (top to bottom):** "All People Seem To Need Data Processing"  
**Mnemonic (bottom to top):** "Please Do Not Throw Sausage Pizza Away"

---

### Layer 7 — Application

**Function:** Interface between user applications and the network. This is NOT the user application itself, but the protocols that applications use.

**Key protocols:**
- **HTTP/HTTPS** — Web browsing (ports 80/443)
- **FTP/FTPS** — File transfer (ports 21/20 and 990)
- **SMTP** — Sending email (ports 25/587/465)
- **POP3/IMAP** — Receiving email (ports 110/995 and 143/993)
- **DNS** — Name resolution (port 53)
- **DHCP** — IP assignment (ports 67/68)
- **SSH** — Secure remote shell (port 22)
- **Telnet** — Insecure remote shell (port 23)
- **SNMP** — Network management (ports 161/162)
- **NTP** — Time synchronization (port 123)
- **LDAP/LDAPS** — Directory services (ports 389/636)
- **RDP** — Remote desktop (port 3389)
- **SIP** — VoIP signaling (ports 5060/5061)
- **SMB** — File sharing (port 445)

**Data unit:** Data

---

### Layer 6 — Presentation

**Function:** Data translation, encoding, compression, and encryption/decryption. Ensures data from the application layer of one system can be read by the application layer of another.

**Key functions:**
- **Encoding/decoding:** ASCII, Unicode, EBCDIC
- **Encryption/decryption:** TLS/SSL operates here
- **Compression:** JPEG, MPEG, GIF compression
- **Serialization:** Converting objects to transmittable format (JSON, XML)

**Examples:** JPEG, MPEG, TLS, SSL, ASCII, Unicode, MIME

**Data unit:** Data

---

### Layer 5 — Session

**Function:** Establishes, manages, and terminates communication sessions between applications. Handles session checkpointing and recovery.

**Key functions:**
- **Session establishment:** Creating a dialogue between applications
- **Session maintenance:** Keeping the session alive
- **Session termination:** Properly closing connections
- **Dialog control:** Half-duplex vs full-duplex management
- **Synchronization:** Checkpoints for long data transfers

**Examples:** NetBIOS, RPC (Remote Procedure Call), SQL sessions, NFS, SMB sessions, PPTP

**Data unit:** Data

---

### Layer 4 — Transport

**Function:** End-to-end reliable (or unreliable) delivery between applications. Provides port numbering for multiplexing, segmentation, flow control, and error correction.

**Key protocols:**
- **TCP (Transmission Control Protocol):**
  - Connection-oriented — 3-way handshake (SYN, SYN-ACK, ACK)
  - Guaranteed delivery — acknowledgments (ACKs)
  - Ordered delivery — sequence numbers
  - Flow control — sliding window
  - Congestion control — slow start, congestion avoidance
  - Error detection — checksum
  - Use: HTTP, SSH, FTP, SMTP, IMAP

- **UDP (User Datagram Protocol):**
  - Connectionless — no handshake
  - Best-effort delivery — no ACKs
  - No ordering — datagrams may arrive out of order
  - Fast and lightweight — low overhead
  - Use: DNS, DHCP, streaming video/audio, VoIP, gaming, TFTP, SNMP

**TCP vs UDP comparison:**

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | 3-way handshake | None |
| Reliability | Guaranteed (ACK) | Best-effort |
| Ordering | Sequence numbers | No guarantee |
| Speed | Slower (overhead) | Faster |
| Header size | 20–60 bytes | 8 bytes |
| Flow control | Yes (window) | No |
| Error recovery | Yes (retransmit) | No |
| Use case | Web, email, file | Streaming, DNS, VoIP |

**TCP 3-Way Handshake:**
```
Client                    Server
  |------- SYN (seq=x) ------->|   "I want to connect"
  |<-- SYN-ACK (seq=y,ack=x+1)--|   "OK, I agree"
  |------- ACK (ack=y+1) ------>|   "Acknowledged"
  |======= DATA TRANSFER ========|
```

**TCP 4-Way Termination:**
```
Client                    Server
  |-------- FIN ----------->|
  |<------- ACK ------------|
  |<------- FIN ------------|
  |-------- ACK ----------->|
```

**TCP Header fields:**
- Source Port (16 bits)
- Destination Port (16 bits)
- Sequence Number (32 bits)
- Acknowledgment Number (32 bits)
- Data Offset / Flags (SYN, ACK, FIN, RST, PSH, URG)
- Window Size (16 bits) — flow control
- Checksum (16 bits)
- Urgent Pointer (16 bits)

**TCP Flags:**
- **SYN** — Synchronize (initiate connection)
- **ACK** — Acknowledge
- **FIN** — Finish (graceful close)
- **RST** — Reset (abrupt close)
- **PSH** — Push (don't buffer, deliver immediately)
- **URG** — Urgent data
- **ECE** — ECN Echo
- **CWR** — Congestion Window Reduced

**Port ranges:**
- **Well-known ports:** 0–1023 (assigned by IANA, require root/admin)
- **Registered ports:** 1024–49151 (registered applications)
- **Dynamic/Ephemeral ports:** 49152–65535 (temporary client ports)

**Data unit:** Segment (TCP) / Datagram (UDP)

---

### Layer 3 — Network

**Function:** Logical addressing and routing. Determines the best path from source to destination across multiple networks.

**Key protocols:**
- **IPv4** — 32-bit logical addressing
- **IPv6** — 128-bit logical addressing
- **ICMP** — Internet Control Message Protocol (ping, traceroute, errors)
- **ICMPv6** — ICMP for IPv6 (includes Neighbor Discovery)
- **OSPF** — Open Shortest Path First (routing protocol)
- **EIGRP** — Enhanced Interior Gateway Routing Protocol
- **BGP** — Border Gateway Protocol (internet routing)
- **RIP** — Routing Information Protocol (legacy)
- **ARP** — Address Resolution Protocol (Layer 2/3 boundary)

**Devices:** Routers, Layer 3 switches, firewalls

**Key functions:**
- Logical addressing (IP addresses)
- Routing (forwarding packets)
- Path determination (best route)
- Packet fragmentation (splitting for MTU)
- TTL (Time to Live) — prevents infinite loops

**IPv4 Packet Header:**
- Version (4 bits) — 4 for IPv4
- IHL — Internet Header Length
- DSCP/ECN — QoS markings
- Total Length
- Identification, Flags, Fragment Offset
- TTL (8 bits) — decremented at each hop; drop at 0
- Protocol (8 bits) — 6=TCP, 17=UDP, 1=ICMP, 89=OSPF
- Header Checksum
- Source IP (32 bits)
- Destination IP (32 bits)
- Options (variable)

**Data unit:** Packet

---

### Layer 2 — Data Link

**Function:** Physical addressing (MAC addresses), framing, error detection on a single link. Governs access to the physical medium.

**Sub-layers:**
- **LLC (Logical Link Control):** Interface between Layer 2 and Layer 3; identifies upper-layer protocol
- **MAC (Media Access Control):** Physical addressing, access control to the medium

**Key protocols:**
- **Ethernet (802.3)** — Wired LAN
- **Wi-Fi (802.11)** — Wireless LAN
- **PPP** — Point-to-Point Protocol (WAN links)
- **HDLC** — High-Level Data Link Control (Cisco default serial)
- **Frame Relay** — Legacy WAN (mostly obsolete)
- **ATM** — Asynchronous Transfer Mode (legacy)
- **ARP** — Address Resolution Protocol (maps IP to MAC)

**Devices:** Switches, bridges, NICs

**MAC Addresses:**
- 48-bit (6-byte) hardware address burned into NIC
- Written as hexadecimal: `00:1A:2B:3C:4D:5E`
- First 3 bytes = OUI (Organizationally Unique Identifier) — manufacturer
- Last 3 bytes = Device identifier
- **Unicast:** Specific device (LSB of first byte = 0)
- **Multicast:** Group of devices (LSB of first byte = 1)
- **Broadcast:** All devices on segment (`FF:FF:FF:FF:FF:FF`)

**Ethernet Frame:**
```
| Preamble | SFD | Dest MAC | Src MAC | EtherType/Len | Payload | FCS |
|  7 bytes | 1 B |  6 bytes | 6 bytes |    2 bytes    | 46-1500B| 4 B |
```
- **Preamble:** 10101010... — clock synchronization
- **SFD (Start Frame Delimiter):** 10101011 — marks start
- **EtherType:** 0x0800=IPv4, 0x0806=ARP, 0x86DD=IPv6, 0x8100=VLAN tagged
- **FCS (Frame Check Sequence):** CRC error detection

**Data unit:** Frame

---

### Layer 1 — Physical

**Function:** Transmits raw bits over a physical medium. Defines electrical signals, voltages, frequencies, and connector types.

**Key standards:**
- **Ethernet:** IEEE 802.3 — defines copper and fiber physical layer
- **Wi-Fi:** IEEE 802.11 — wireless physical and MAC layer
- **USB, Bluetooth, RS-232**

**Devices:** Hubs, repeaters, cables, connectors, modems (physical aspects)

**Signal types:**
- **Digital:** Discrete states (0 or 1) — used by most modern networks
- **Analog:** Continuous waveform — used in DSL, cable modems
- **Optical:** Light pulses in fiber — fastest, longest distance

**Data unit:** Bit

**Transmission modes:**
- **Simplex:** One direction only (radio broadcast)
- **Half-duplex:** Both directions, not simultaneously (walkie-talkie, hub)
- **Full-duplex:** Both directions simultaneously (switch, modern NICs)

---

## 1.3 Encapsulation and Decapsulation

As data moves **down** the OSI stack at the sender, each layer adds its own header (and sometimes trailer). This is **encapsulation**.

```
Application: [  DATA  ]
Transport:   [ TCP HDR |  DATA  ]  ← Segment
Network:     [ IP HDR | TCP HDR | DATA ]  ← Packet
Data Link:   [ ETH HDR | IP HDR | TCP HDR | DATA | FCS ]  ← Frame
Physical:    01101000110101...  ← Bits
```

At the receiver, each layer **decapsulates** (removes its header) and passes the data up.

**Protocol Data Units (PDUs) by layer:**
- Layer 7/6/5: **Message / Data**
- Layer 4: **Segment** (TCP) / **Datagram** (UDP)
- Layer 3: **Packet**
- Layer 2: **Frame**
- Layer 1: **Bit**

---

## 1.4 The TCP/IP Model

The TCP/IP model (also called the Internet model or DoD model) is the practical model used by the internet. It consolidates the OSI layers:

| TCP/IP Layer | OSI Equivalent | Key Protocols |
|-------------|----------------|--------------|
| Application | 5, 6, 7 | HTTP, FTP, DNS, SMTP, SSH |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 1, 2 | Ethernet, Wi-Fi, PPP |

---

## 1.5 Network Communication Types

**Unicast:** One-to-one communication. A single source sends to a single destination.
- Example: Web browser → web server

**Broadcast:** One-to-all communication. Sent to all devices on a network segment.
- IPv4 broadcast: `255.255.255.255` (limited) or `x.x.x.255` (directed)
- Layer 2 broadcast: `FF:FF:FF:FF:FF:FF`
- IPv6 has NO broadcast — uses multicast instead

**Multicast:** One-to-many communication. Sent only to devices that have joined a multicast group.
- IPv4 multicast range: `224.0.0.0 – 239.255.255.255` (Class D)
- IPv6 multicast prefix: `FF00::/8`
- Used by: streaming video, routing protocols (OSPF uses 224.0.0.5/6)

**Anycast:** One-to-nearest. Packet sent to nearest member of a group.
- Used by: IPv6, CDNs, DNS root servers
- Multiple servers share the same IP; routing sends to closest

---

## 1.6 Network Bandwidth and Throughput Concepts

**Bandwidth:** Maximum theoretical data rate a medium can support (e.g., 1 Gbps Ethernet). Measured in bits per second (bps).

**Throughput:** Actual data rate achieved in practice. Always less than bandwidth due to overhead, collisions, protocol inefficiency.

**Goodput:** Useful application-level throughput. Excludes protocol headers and retransmissions.

**Latency:** Time for a packet to travel from source to destination. Measured in milliseconds (ms).
- **Propagation delay:** Time for signal to travel the medium (speed of light)
- **Transmission delay:** Time to push all bits onto the wire (packet size ÷ bandwidth)
- **Processing delay:** Time for device to process packet (routing table lookup)
- **Queuing delay:** Time packet waits in buffer

**Jitter:** Variation in latency between packets. Critical for VoIP and video.

**RTT (Round Trip Time):** Time for packet to reach destination and reply to return. What `ping` measures.

**Bandwidth delay product:** Bandwidth × Latency = How much data can be "in flight"

**Speed units:**
- 1 Kbps = 1,000 bps
- 1 Mbps = 1,000,000 bps
- 1 Gbps = 1,000,000,000 bps
- Note: Storage uses bytes (KB/MB/GB), networking uses bits (Kbps/Mbps/Gbps)
- 1 byte = 8 bits

---

## 1.7 Key Networking Protocols Reference

### ICMP (Internet Control Message Protocol)
- Layer 3 protocol used for error reporting and diagnostics
- **Type 0** — Echo Reply (ping response)
- **Type 3** — Destination Unreachable (with codes: 0=net, 1=host, 3=port, 4=fragmentation needed)
- **Type 5** — Redirect
- **Type 8** — Echo Request (ping)
- **Type 11** — Time Exceeded (TTL expired — used by traceroute)
- **Type 12** — Parameter Problem
- Does NOT use TCP or UDP — directly encapsulated in IP (Protocol 1)

### ARP (Address Resolution Protocol)
- Resolves IPv4 address → MAC address on local segment
- **ARP Request:** Broadcast asking "Who has IP x.x.x.x? Tell IP y.y.y.y"
- **ARP Reply:** Unicast response with MAC address
- **ARP Cache:** Table of IP→MAC mappings (cached for efficiency)
- **Gratuitous ARP:** Device announces its own IP→MAC (used for updates or attacks)
- **Proxy ARP:** Router responds to ARP requests on behalf of another host
- ARP is IPv4 only; IPv6 uses **Neighbor Discovery Protocol (NDP)** with ICMPv6

### NDP (Neighbor Discovery Protocol) — IPv6
- Replaces ARP for IPv6
- Uses ICMPv6 message types:
  - **133 — Router Solicitation (RS):** Hosts request router info
  - **134 — Router Advertisement (RA):** Routers announce prefix info
  - **135 — Neighbor Solicitation (NS):** Like ARP request (find MAC)
  - **136 — Neighbor Advertisement (NA):** Like ARP reply
  - **137 — Redirect:** Inform host of better next-hop

### DNS (Domain Name System)
- Translates domain names to IP addresses
- Port 53 (UDP for queries, TCP for zone transfers and large responses)
- Hierarchical distributed database

**DNS Resolution process:**
```
1. Client checks local cache
2. Client queries Recursive Resolver (ISP or 8.8.8.8)
3. Resolver queries Root Nameservers (13 root servers, a-m.root-servers.net)
4. Root refers to TLD nameserver (.com, .org, .net)
5. TLD refers to Authoritative nameserver (ns1.example.com)
6. Authoritative returns the IP address
7. Resolver caches and returns to client (TTL governs cache time)
```

**DNS record types:**

| Record | Purpose | Example |
|--------|---------|---------|
| A | IPv4 address | example.com → 93.184.216.34 |
| AAAA | IPv6 address | example.com → 2606:2800::1 |
| CNAME | Canonical name (alias) | www → example.com |
| MX | Mail exchanger | 10 mail.example.com |
| NS | Nameserver | ns1.example.com |
| PTR | Reverse DNS | 34.216.184.93.in-addr.arpa → example.com |
| SOA | Start of Authority | Zone metadata, serial, refresh |
| TXT | Text record | SPF, DKIM, domain verification |
| SRV | Service locator | _sip._tcp.example.com |
| CAA | CA Authorization | Which CAs can issue certs |

**DNS security:**
- **DNSSEC:** Digitally signs DNS records to prevent spoofing
- **DoT (DNS over TLS):** Encrypts DNS queries (port 853)
- **DoH (DNS over HTTPS):** DNS in HTTPS (port 443)

### DHCP (Dynamic Host Configuration Protocol)
- Automatically assigns IP configuration to clients
- Ports: 67 (server), 68 (client)
- Uses UDP broadcast

**DORA Process:**
```
Client → DHCP Discover  (broadcast — "I need an IP")
Server → DHCP Offer     (unicast — "Here's an IP offer")
Client → DHCP Request   (broadcast — "I accept that IP")
Server → DHCP ACK       (unicast — "Confirmed, here's the lease")
```

**DHCP provides:**
- IP address
- Subnet mask
- Default gateway
- DNS server(s)
- Lease duration
- WINS server (legacy)
- Domain name
- NTP server
- TFTP server (for PXE boot)

**DHCP options (common):**
- Option 3: Router (default gateway)
- Option 6: DNS server
- Option 15: Domain name
- Option 43: Vendor-specific info
- Option 51: Lease time
- Option 53: DHCP message type
- Option 66: TFTP server
- Option 82: Relay agent info

**DHCP Relay Agent:** Forwards DHCP broadcasts across router boundaries. Configured with `ip helper-address` on Cisco routers.

**DHCPv6:** IPv6 equivalent
- **Stateful DHCPv6:** Assigns full IPv6 address + info (like DHCP)
- **Stateless DHCPv6 (SLAAC+):** Provides options (DNS, NTP) but not address
- **SLAAC (Stateless Address Autoconfiguration):** IPv6 client generates own address from prefix

---

## 1.8 Network Topologies

### Physical Topologies

**Bus:**
- All devices connected to a single cable (backbone)
- Termination resistors at each end
- Single point of failure — one break kills the network
- Cheap but not scalable; legacy (10Base2, 10Base5)

**Star:**
- All devices connect to a central device (switch/hub)
- Most common modern topology
- Failure of central device kills network; single device failure isolated
- Easy to add/remove nodes

**Ring:**
- Devices connected in a circle
- Data travels in one or both directions
- Used by: Token Ring (IEEE 802.5), SONET, FDDI
- Dual ring provides redundancy

**Mesh:**
- Every device connected to every other device
- Full mesh: n(n-1)/2 connections needed
- Highly redundant, expensive, complex
- Used by WAN cores, internet backbone

**Partial mesh:**
- Most nodes meshed, some not
- Balance of redundancy and cost

**Hybrid:**
- Combination of topologies (e.g., star-bus, star-ring)

**Tree (Hierarchical):**
- Layered star topology
- Root → Distribution → Access layers
- Used in enterprise campus networks

### Logical Topologies

How data flows, regardless of physical layout:
- **Logical bus:** Even in physical star, hubs create logical bus (shared medium)
- **Logical ring:** Token passing even in physical ring or star (Token Ring)

---

## 1.9 LAN, WAN, MAN, PAN, and Other Network Types

| Type | Full Name | Coverage | Example |
|------|-----------|---------|---------|
| PAN | Personal Area Network | ~10 meters | Bluetooth headset, USB |
| LAN | Local Area Network | Building/campus | Office network |
| WLAN | Wireless LAN | Building/campus | Wi-Fi |
| CAN | Campus Area Network | Multiple buildings | University campus |
| MAN | Metropolitan Area Network | City/region | City fiber ring |
| WAN | Wide Area Network | Country/world | Internet, MPLS |
| SAN | Storage Area Network | Datacenter | Fiber Channel |
| VLAN | Virtual LAN | Logical (any size) | Segmented switch |
| VPN | Virtual Private Network | Overlay | Encrypted tunnel |
| SDWAN | Software-Defined WAN | WAN | Centrally managed WAN |

---

## 1.10 Network Architecture Models

### Client-Server
- Centralized servers provide resources; clients request them
- Advantages: Centralized management, security, backups
- Disadvantages: Server = single point of failure, cost
- Examples: Web servers, file servers, email servers

### Peer-to-Peer (P2P)
- Each device acts as both client and server
- No dedicated servers
- Advantages: Simple, cheap, no single point of failure
- Disadvantages: Hard to manage, decentralized security
- Examples: Home networks, BitTorrent, blockchain

### Three-Tier Architecture
- **Access Layer:** Connects end users (access switches)
- **Distribution Layer:** Aggregates access layer, applies policies (routing, ACLs)
- **Core Layer:** High-speed backbone, maximum performance

### Spine-Leaf Architecture
- Modern datacenter design
- **Spine:** High-capacity backbone switches
- **Leaf:** Access switches (servers connect here)
- Every leaf connects to every spine (2-hop maximum)
- Eliminates STP, supports ECMP

### Software-Defined Networking (SDN)
- Separates **control plane** (decisions) from **data plane** (forwarding)
- **Controller:** Centralized intelligence (OpenFlow controller)
- **Southbound APIs:** Controller to devices (OpenFlow, NETCONF)
- **Northbound APIs:** Applications to controller (REST APIs)
- Benefits: Centralized management, automation, programmability

---

## 1.11 Network Standards Bodies

| Organization | Focus |
|-------------|-------|
| **IEEE** | LAN/MAN standards (802.3 Ethernet, 802.11 Wi-Fi) |
| **IETF** | Internet protocols (RFCs for TCP/IP, HTTP, DNS) |
| **IANA** | IP address allocation, port assignments, protocol numbers |
| **ARIN/RIPE/APNIC** | Regional IP address allocation |
| **ITU** | International telecom standards |
| **ISO** | OSI model, international standards |
| **TIA/EIA** | Physical cabling standards (TIA-568) |
| **ANSI** | US national standards |
| **3GPP** | Cellular (LTE, 5G) |

---
