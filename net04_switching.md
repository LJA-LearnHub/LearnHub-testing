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
