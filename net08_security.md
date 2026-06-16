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
