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
