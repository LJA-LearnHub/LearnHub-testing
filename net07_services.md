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
