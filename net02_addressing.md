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
