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
