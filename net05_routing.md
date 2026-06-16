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
