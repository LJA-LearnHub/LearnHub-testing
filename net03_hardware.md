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
