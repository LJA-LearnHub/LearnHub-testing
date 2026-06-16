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
