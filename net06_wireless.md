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
