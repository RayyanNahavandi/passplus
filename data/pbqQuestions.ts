// Performance Based Questions (PBQs). Each PBQ counts as one question with
// partial credit: every correct placement, position, or blank is worth an
// equal fraction of the question.

export interface PBQBase {
  id: string
  cert: "secplus" | "netplus" | "aplus"
  domain: number
  title: string
  instructions: string
  // Free-tier sample PBQs. Fixed set so free users always see the same ones.
  free?: boolean
}

export interface MatchingPBQ extends PBQBase {
  type: "matching"
  pairs: { prompt: string; answer: string }[]
}

export interface OrderingPBQ extends PBQBase {
  type: "ordering"
  // Steps listed in the correct order. They are shuffled for the user.
  steps: string[]
}

export interface FillBlankPBQ extends PBQBase {
  type: "fill-blank"
  intro?: string
  blanks: { label: string; accepted: string[]; placeholder?: string }[]
}

export type PBQQuestion = MatchingPBQ | OrderingPBQ | FillBlankPBQ

export const pbqQuestions: PBQQuestion[] = [
  {
    id: "pbq-sec-attacks",
    cert: "secplus",
    domain: 2,
    free: true,
    type: "matching",
    title: "Match the Attack to Its Description",
    instructions:
      "Drag each attack type onto the description it matches, or tap an attack and then tap a description slot.",
    pairs: [
      {
        prompt: "Phishing",
        answer:
          "An email claiming to be from the help desk asks employees to confirm their passwords via a linked form",
      },
      {
        prompt: "Ransomware",
        answer:
          "Files across the network are encrypted and a note demands cryptocurrency payment for the decryption key",
      },
      {
        prompt: "On-path attack",
        answer:
          "An attacker positioned between a user and a website silently intercepts and relays their traffic",
      },
      {
        prompt: "DDoS",
        answer:
          "Thousands of compromised devices flood a web server with traffic until legitimate users cannot connect",
      },
      {
        prompt: "SQL injection",
        answer:
          "A login form input of ' OR 1=1 -- returns every record in the user database",
      },
    ],
  },
  {
    id: "pbq-sec-ir-order",
    cert: "secplus",
    domain: 4,
    free: true,
    type: "ordering",
    title: "Order the Incident Response Lifecycle",
    instructions:
      "Arrange the incident response phases in the correct order, from first to last. Drag the handle or use the arrow buttons.",
    steps: [
      "Preparation",
      "Detection",
      "Analysis",
      "Containment",
      "Eradication",
      "Recovery",
      "Lessons learned",
    ],
  },
  {
    id: "pbq-sec-ports",
    cert: "secplus",
    domain: 3,
    type: "matching",
    title: "Match Each Protocol to Its Port",
    instructions:
      "Drag each protocol onto its default port number, or tap a protocol and then tap a port slot.",
    pairs: [
      { prompt: "SSH", answer: "Port 22" },
      { prompt: "SMTP", answer: "Port 25" },
      { prompt: "DNS", answer: "Port 53" },
      { prompt: "HTTPS", answer: "Port 443" },
      { prompt: "LDAPS", answer: "Port 636" },
      { prompt: "RDP", answer: "Port 3389" },
    ],
  },
  {
    id: "pbq-sec-firewall",
    cert: "secplus",
    domain: 4,
    type: "fill-blank",
    title: "Complete the Firewall Rule",
    instructions:
      "Fill in each field of the firewall rule to satisfy the scenario. Answers are not case sensitive.",
    intro:
      "Scenario: A new web server at 10.0.1.20 must accept HTTPS traffic from any external host. Complete the inbound firewall rule.",
    blanks: [
      {
        label: "Action",
        accepted: ["allow", "permit", "accept"],
        placeholder: "e.g. allow or deny",
      },
      {
        label: "Protocol",
        accepted: ["tcp"],
        placeholder: "e.g. tcp or udp",
      },
      {
        label: "Source",
        accepted: ["any", "0.0.0.0/0", "*"],
        placeholder: "IP, CIDR, or any",
      },
      {
        label: "Destination",
        accepted: ["10.0.1.20"],
        placeholder: "IP address",
      },
      {
        label: "Destination port",
        accepted: ["443"],
        placeholder: "port number",
      },
    ],
  },
  {
    id: "pbq-sec-hardening",
    cert: "secplus",
    domain: 2,
    type: "ordering",
    title: "Order the Server Hardening Steps",
    instructions:
      "Arrange the steps to securely deploy and harden a new server, from first to last. Drag the handle or use the arrow buttons.",
    steps: [
      "Install the OS from trusted, verified media",
      "Apply all current patches and updates",
      "Change all default credentials",
      "Disable unnecessary services and ports",
      "Configure the host-based firewall",
      "Enable audit logging and forward logs to the SIEM",
      "Document the secure baseline configuration",
    ],
  },
  {
    id: "pbq-net-devices",
    cert: "netplus",
    domain: 1,
    free: true,
    type: "matching",
    title: "Match the Network Device to Its Function",
    instructions:
      "Drag each device onto the function it performs, or tap a device and then tap a function slot.",
    pairs: [
      {
        prompt: "Router",
        answer: "Forwards packets between different IP networks using routing tables",
      },
      {
        prompt: "Switch",
        answer: "Forwards frames within a LAN based on MAC addresses",
      },
      {
        prompt: "Firewall",
        answer: "Permits or blocks traffic based on a configured security rule set",
      },
      {
        prompt: "Load balancer",
        answer: "Distributes incoming requests across multiple servers to prevent overload",
      },
      {
        prompt: "Access point",
        answer: "Bridges wireless clients onto the wired network",
      },
    ],
  },
  {
    id: "pbq-net-troubleshoot-order",
    cert: "netplus",
    domain: 5,
    free: true,
    type: "ordering",
    title: "Order the Network Troubleshooting Methodology",
    instructions:
      "Arrange the CompTIA troubleshooting methodology steps in the correct order, from first to last. Drag the handle or use the arrow buttons.",
    steps: [
      "Identify the problem",
      "Establish a theory of probable cause",
      "Test the theory to determine the cause",
      "Establish a plan of action",
      "Implement the solution or escalate",
      "Verify full system functionality",
      "Document findings, actions, and outcomes",
    ],
  },
  {
    id: "pbq-net-subnet",
    cert: "netplus",
    domain: 1,
    type: "fill-blank",
    title: "Work Out the Subnet Details",
    instructions:
      "A workstation is assigned to the 192.168.10.0/26 subnet. Fill in each value for this subnet.",
    intro:
      "Scenario: Your team is documenting the 192.168.10.0/26 network. Complete the subnet worksheet.",
    blanks: [
      {
        label: "Subnet mask (dotted decimal)",
        accepted: ["255.255.255.192"],
        placeholder: "e.g. 255.255.255.0",
      },
      {
        label: "Number of usable host addresses",
        accepted: ["62"],
        placeholder: "number",
      },
      {
        label: "First usable host address",
        accepted: ["192.168.10.1"],
        placeholder: "IP address",
      },
      {
        label: "Broadcast address",
        accepted: ["192.168.10.63"],
        placeholder: "IP address",
      },
    ],
  },
  {
    id: "pbq-net-switch-security",
    cert: "netplus",
    domain: 4,
    type: "matching",
    title: "Match the Security Feature to the Threat It Stops",
    instructions:
      "Drag each switch or network security feature onto the threat it mitigates, or tap a feature and then tap a slot.",
    pairs: [
      {
        prompt: "Port security",
        answer: "An unauthorized device is plugged into an office wall jack and joins the LAN",
      },
      {
        prompt: "DHCP snooping",
        answer: "A rogue DHCP server hands out malicious gateway addresses to clients",
      },
      {
        prompt: "802.1X",
        answer: "Devices must authenticate to a RADIUS server before getting network access",
      },
      {
        prompt: "Dynamic ARP inspection",
        answer: "An attacker poisons ARP caches to intercept traffic between hosts",
      },
      {
        prompt: "ACL",
        answer: "Traffic from a specific subnet must be blocked from reaching the finance VLAN",
      },
    ],
  },
  {
    id: "pbq-net-wifi-standards",
    cert: "netplus",
    domain: 2,
    type: "matching",
    title: "Match the Wireless Standard to Its Characteristics",
    instructions:
      "Drag each 802.11 standard onto its matching characteristics, or tap a standard and then tap a slot.",
    pairs: [
      {
        prompt: "802.11g",
        answer: "2.4 GHz only with a maximum data rate of 54 Mbps",
      },
      {
        prompt: "802.11n",
        answer: "Wi-Fi 4: first standard to use MIMO on both 2.4 GHz and 5 GHz",
      },
      {
        prompt: "802.11ac",
        answer: "Wi-Fi 5: 5 GHz only with multi-gigabit rates using MU-MIMO",
      },
      {
        prompt: "802.11ax",
        answer: "Wi-Fi 6: OFDMA efficiency improvements on 2.4 GHz, 5 GHz, and 6 GHz",
      },
    ],
  },
  {
    id: "pbq-aplus-mobile-wireless",
    cert: "aplus",
    domain: 1,
    free: true,
    type: "matching",
    title: "Match the Mobile Technology to Its Use Case",
    instructions:
      "Drag each wireless technology onto the scenario where it is used, or tap a technology and then tap a slot.",
    pairs: [
      {
        prompt: "NFC",
        answer: "Tapping a phone on a payment terminal to complete a contactless purchase",
      },
      {
        prompt: "Bluetooth",
        answer: "Pairing wireless earbuds with a smartphone",
      },
      {
        prompt: "Wi-Fi",
        answer: "Connecting a tablet to the office wireless LAN for internet access",
      },
      {
        prompt: "Cellular",
        answer: "Streaming video on a phone while away from any wireless LAN",
      },
      {
        prompt: "GPS",
        answer: "A navigation app determines the device's exact location outdoors",
      },
    ],
  },
  {
    id: "pbq-aplus-static-ip",
    cert: "aplus",
    domain: 2,
    type: "fill-blank",
    title: "Configure a Static IP Address",
    instructions:
      "Fill in the network settings for the workstation described in the scenario.",
    intro:
      "Scenario: A workstation must use a static address on the 192.168.1.0/24 office network. The router at 192.168.1.1 is the default gateway and also provides DNS. Assign the workstation the host address 50.",
    blanks: [
      {
        label: "IP address",
        accepted: ["192.168.1.50"],
        placeholder: "IP address",
      },
      {
        label: "Subnet mask",
        accepted: ["255.255.255.0", "/24"],
        placeholder: "e.g. 255.255.255.0",
      },
      {
        label: "Default gateway",
        accepted: ["192.168.1.1"],
        placeholder: "IP address",
      },
      {
        label: "DNS server",
        accepted: ["192.168.1.1"],
        placeholder: "IP address",
      },
    ],
  },
  {
    id: "pbq-aplus-laser-order",
    cert: "aplus",
    domain: 3,
    free: true,
    type: "ordering",
    title: "Order the Laser Printer Imaging Process",
    instructions:
      "Arrange the seven steps of the laser printer imaging process in the correct order. Drag the handle or use the arrow buttons.",
    steps: [
      "Processing",
      "Charging",
      "Exposing",
      "Developing",
      "Transferring",
      "Fusing",
      "Cleaning",
    ],
  },
  {
    id: "pbq-aplus-cloud",
    cert: "aplus",
    domain: 4,
    type: "matching",
    title: "Match the Cloud Model to the Scenario",
    instructions:
      "Drag each cloud model onto the scenario that describes it, or tap a model and then tap a slot.",
    pairs: [
      {
        prompt: "IaaS",
        answer: "Renting virtual machines and storage while managing the OS yourself",
      },
      {
        prompt: "PaaS",
        answer: "Deploying code to a managed platform without maintaining servers",
      },
      {
        prompt: "SaaS",
        answer: "Using a web-based email suite where the vendor manages everything",
      },
      {
        prompt: "Public cloud",
        answer: "Services shared across many organizations on a provider's infrastructure",
      },
      {
        prompt: "Private cloud",
        answer: "Cloud infrastructure dedicated to and operated for a single organization",
      },
    ],
  },
  {
    id: "pbq-aplus-symptoms",
    cert: "aplus",
    domain: 5,
    type: "matching",
    title: "Match the Symptom to the Most Likely Cause",
    instructions:
      "Drag each hardware symptom onto its most likely cause, or tap a symptom and then tap a slot.",
    pairs: [
      {
        prompt: "No POST, repeating beep code",
        answer: "RAM module unseated or failed",
      },
      {
        prompt: "PC shuts down under load",
        answer: "Overheating from a failed fan or clogged heatsink",
      },
      {
        prompt: "Continuous reboot loop before OS loads",
        answer: "Failing power supply delivering unstable voltage",
      },
      {
        prompt: "Clicking noise then missing drive",
        answer: "Mechanical hard drive failure",
      },
      {
        prompt: "Artifacts and distorted colors on screen",
        answer: "Faulty GPU or video memory",
      },
    ],
  },
  {
    id: "pbq-sec-controls",
    cert: "secplus",
    domain: 1,
    type: "matching",
    title: "Match the Control Type to the Scenario",
    instructions:
      "Drag each control type onto the scenario that best describes it, or tap a control and then tap a slot.",
    pairs: [
      {
        prompt: "Preventive",
        answer: "A firewall rule blocks all inbound Telnet connections before they reach hosts",
      },
      {
        prompt: "Deterrent",
        answer: "Warning signs state that the facility is under video surveillance",
      },
      {
        prompt: "Detective",
        answer: "A SIEM alert fires when a user logs in from two countries within an hour",
      },
      {
        prompt: "Corrective",
        answer: "Infected files are quarantined and restored from a clean backup after an incident",
      },
      {
        prompt: "Compensating",
        answer: "A legacy system that cannot be patched is isolated on its own monitored VLAN",
      },
    ],
  },
  {
    id: "pbq-sec-crypto",
    cert: "secplus",
    domain: 1,
    type: "matching",
    title: "Match the Cryptographic Concept to Its Use",
    instructions:
      "Drag each cryptographic concept onto the description it matches, or tap a concept and then tap a slot.",
    pairs: [
      {
        prompt: "Symmetric encryption",
        answer: "One shared key encrypts and decrypts a large database quickly",
      },
      {
        prompt: "Asymmetric encryption",
        answer: "A public key encrypts a message that only the private key holder can read",
      },
      {
        prompt: "Hashing",
        answer: "A one-way function verifies a downloaded file has not been altered",
      },
      {
        prompt: "Digital signature",
        answer: "A sender's private key proves a message came from them and was not modified",
      },
      {
        prompt: "Key escrow",
        answer: "Copies of encryption keys are held by a trusted third party for recovery",
      },
    ],
  },
  {
    id: "pbq-sec-volatility-order",
    cert: "secplus",
    domain: 4,
    type: "ordering",
    title: "Order the Evidence by Volatility",
    instructions:
      "During forensic collection, evidence must be captured from most volatile to least volatile. Arrange the sources in the correct collection order.",
    steps: [
      "CPU registers and cache",
      "RAM contents",
      "Swap file and temporary files",
      "Data on local disk",
      "Remote logs and monitoring data",
      "Archived backups",
    ],
  },
  {
    id: "pbq-sec-log-analysis",
    cert: "secplus",
    domain: 4,
    type: "fill-blank",
    title: "Analyze the Authentication Log",
    instructions:
      "Review the log excerpt and fill in each answer. Answers are not case sensitive.",
    intro:
      "Log excerpt: 04:12:01 sshd: Failed password for admin from 203.0.113.50. The same message repeats 400 times in 10 minutes, each attempt using a different password.",
    blanks: [
      {
        label: "Attack type",
        accepted: ["brute force", "brute-force", "password brute force", "brute force attack"],
        placeholder: "type of attack",
      },
      {
        label: "Targeted service",
        accepted: ["ssh", "sshd", "secure shell"],
        placeholder: "service name",
      },
      {
        label: "Default port of the targeted service",
        accepted: ["22"],
        placeholder: "port number",
      },
      {
        label: "Attacker IP address",
        accepted: ["203.0.113.50"],
        placeholder: "IP address",
      },
      {
        label: "Account policy that limits repeated failed logins",
        accepted: ["account lockout", "lockout", "account lockout policy", "lockout policy"],
        placeholder: "policy name",
      },
    ],
  },
  {
    id: "pbq-sec-appliances",
    cert: "secplus",
    domain: 3,
    type: "matching",
    title: "Match the Security Appliance to Its Role",
    instructions:
      "Drag each appliance onto the role it performs, or tap an appliance and then tap a slot.",
    pairs: [
      {
        prompt: "IDS",
        answer: "Monitors traffic and raises alerts but does not block anything",
      },
      {
        prompt: "IPS",
        answer: "Sits inline and actively drops malicious traffic in real time",
      },
      {
        prompt: "WAF",
        answer: "Inspects HTTP requests to block SQL injection and XSS against a web app",
      },
      {
        prompt: "Forward proxy",
        answer: "Makes web requests on behalf of internal clients and filters content",
      },
      {
        prompt: "Jump server",
        answer: "A hardened host admins must connect through to manage sensitive systems",
      },
    ],
  },
  {
    id: "pbq-net-ports",
    cert: "netplus",
    domain: 1,
    type: "matching",
    title: "Match Each Protocol to Its Port",
    instructions:
      "Drag each protocol onto its default port number, or tap a protocol and then tap a port slot.",
    pairs: [
      { prompt: "FTP", answer: "Port 21" },
      { prompt: "Telnet", answer: "Port 23" },
      { prompt: "TFTP", answer: "Port 69" },
      { prompt: "HTTP", answer: "Port 80" },
      { prompt: "NTP", answer: "Port 123" },
      { prompt: "SNMP", answer: "Port 161" },
    ],
  },
  {
    id: "pbq-net-dhcp-order",
    cert: "netplus",
    domain: 1,
    type: "ordering",
    title: "Order the DHCP Lease Process",
    instructions:
      "Arrange the four DHCP messages in the order they occur when a client obtains an address (DORA).",
    steps: [
      "Discover: client broadcasts to find a DHCP server",
      "Offer: server proposes an available IP address",
      "Request: client asks to use the offered address",
      "Acknowledge: server confirms and finalizes the lease",
    ],
  },
  {
    id: "pbq-net-vlan",
    cert: "netplus",
    domain: 2,
    type: "fill-blank",
    title: "Configure the Switch Ports",
    instructions:
      "Fill in the switch configuration values for the scenario. Answers are not case sensitive.",
    intro:
      "Scenario: A new workstation must join the Accounting VLAN (VLAN 30). Its switch port connects only that workstation. A separate uplink port carries traffic for all VLANs to another switch.",
    blanks: [
      {
        label: "Port mode for the workstation port",
        accepted: ["access"],
        placeholder: "access or trunk",
      },
      {
        label: "VLAN ID assigned to the workstation port",
        accepted: ["30", "vlan 30"],
        placeholder: "VLAN number",
      },
      {
        label: "Port mode for the uplink between switches",
        accepted: ["trunk"],
        placeholder: "access or trunk",
      },
      {
        label: "Tagging protocol used on the uplink",
        accepted: ["802.1q", "dot1q", "802.1 q"],
        placeholder: "IEEE standard",
      },
    ],
  },
  {
    id: "pbq-net-topologies",
    cert: "netplus",
    domain: 1,
    type: "matching",
    title: "Match the Topology to Its Description",
    instructions:
      "Drag each network topology onto the description it matches, or tap a topology and then tap a slot.",
    pairs: [
      {
        prompt: "Star",
        answer: "Every node connects to a central switch; one cable failure affects one node",
      },
      {
        prompt: "Full mesh",
        answer: "Every node connects directly to every other node for maximum redundancy",
      },
      {
        prompt: "Point-to-point",
        answer: "A single dedicated link connects exactly two endpoints",
      },
      {
        prompt: "Hub-and-spoke",
        answer: "Branch sites each connect to one central site that relays traffic between them",
      },
      {
        prompt: "Hybrid",
        answer: "A network combining two or more different topology types",
      },
    ],
  },
  {
    id: "pbq-net-tools",
    cert: "netplus",
    domain: 5,
    type: "matching",
    title: "Match the Tool to the Troubleshooting Task",
    instructions:
      "Drag each tool onto the task it is best suited for, or tap a tool and then tap a slot.",
    pairs: [
      {
        prompt: "Cable tester",
        answer: "Verify the wiring pinout and continuity of a patch cable",
      },
      {
        prompt: "Toner probe",
        answer: "Locate the far end of an unlabeled cable inside a crowded patch panel",
      },
      {
        prompt: "ping",
        answer: "Confirm basic reachability of a remote host by IP address",
      },
      {
        prompt: "traceroute",
        answer: "Identify which hop along a path is dropping or delaying traffic",
      },
      {
        prompt: "Protocol analyzer",
        answer: "Capture and inspect individual packets to diagnose an application issue",
      },
    ],
  },
  {
    id: "pbq-aplus-connectors",
    cert: "aplus",
    domain: 3,
    type: "matching",
    title: "Match the Connector to Its Purpose",
    instructions:
      "Drag each connector onto the purpose it serves, or tap a connector and then tap a slot.",
    pairs: [
      {
        prompt: "USB-C",
        answer: "Reversible connector that can carry data, video, and device charging",
      },
      {
        prompt: "HDMI",
        answer: "Carries digital video and audio to a monitor or TV over one cable",
      },
      {
        prompt: "RJ45",
        answer: "Terminates twisted-pair Ethernet cable for wired network connections",
      },
      {
        prompt: "SATA",
        answer: "Connects an internal hard drive or SSD to the motherboard",
      },
      {
        prompt: "Lightning",
        answer: "Apple proprietary connector used to charge and sync older iPhones",
      },
    ],
  },
  {
    id: "pbq-aplus-ram-order",
    cert: "aplus",
    domain: 3,
    type: "ordering",
    title: "Order the Steps to Install RAM Safely",
    instructions:
      "Arrange the steps to safely upgrade the memory in a desktop PC, from first to last.",
    steps: [
      "Power down the PC and unplug it from the wall",
      "Attach an ESD strap to your wrist and ground it",
      "Open the case and locate the memory slots",
      "Seat the module until both retention clips click",
      "Close the case and reconnect power",
      "Boot and verify the OS reports the new memory total",
    ],
  },
  {
    id: "pbq-aplus-soho-wifi",
    cert: "aplus",
    domain: 2,
    type: "fill-blank",
    title: "Configure the SOHO Wireless Router",
    instructions:
      "Fill in the wireless settings for the scenario. Answers are not case sensitive.",
    intro:
      "Scenario: You are securing a small office wireless router. Nearby networks are congesting 2.4 GHz channels 3 and 9. The router supports the newest wireless security protocol.",
    blanks: [
      {
        label: "Most secure wireless protocol to enable",
        accepted: ["wpa3", "wpa 3"],
        placeholder: "security protocol",
      },
      {
        label: "A non-overlapping 2.4 GHz channel to use",
        accepted: ["1", "6", "11", "channel 1", "channel 6", "channel 11"],
        placeholder: "channel number",
      },
      {
        label: "Band that offers higher speeds at shorter range",
        accepted: ["5 ghz", "5ghz", "5"],
        placeholder: "frequency band",
      },
      {
        label: "Setting that hides the network name from casual view",
        accepted: ["disable ssid broadcast", "ssid broadcast", "hide ssid", "disable ssid"],
        placeholder: "router setting",
      },
    ],
  },
  {
    id: "pbq-aplus-virtualization",
    cert: "aplus",
    domain: 4,
    type: "matching",
    title: "Match the Virtualization Concept to Its Description",
    instructions:
      "Drag each concept onto the description it matches, or tap a concept and then tap a slot.",
    pairs: [
      {
        prompt: "Type 1 hypervisor",
        answer: "Runs directly on server hardware with no host operating system underneath",
      },
      {
        prompt: "Type 2 hypervisor",
        answer: "Runs as an application on top of a normal desktop operating system",
      },
      {
        prompt: "Virtual machine",
        answer: "A complete guest OS with its own virtual hardware, isolated from the host",
      },
      {
        prompt: "Container",
        answer: "Packages an app and its dependencies while sharing the host OS kernel",
      },
      {
        prompt: "Sandbox",
        answer: "An isolated test environment for safely running untrusted software",
      },
    ],
  },
  {
    id: "pbq-aplus-printers",
    cert: "aplus",
    domain: 3,
    type: "matching",
    title: "Match the Printer Type to Its Characteristics",
    instructions:
      "Drag each printer type onto its matching characteristics, or tap a printer type and then tap a slot.",
    pairs: [
      {
        prompt: "Laser",
        answer: "Uses toner fused to the page with heat; fast with a low cost per page",
      },
      {
        prompt: "Inkjet",
        answer: "Sprays liquid ink through nozzles; great photo quality but pricier ink",
      },
      {
        prompt: "Thermal",
        answer: "Heats special paper to print receipts; no ink or toner required",
      },
      {
        prompt: "Impact",
        answer: "Pins strike a ribbon, so it can print through multi-part carbon forms",
      },
      {
        prompt: "3D printer",
        answer: "Builds physical objects layer by layer, commonly from melted filament",
      },
    ],
  },
]

export function getPBQsForCert(cert: string): PBQQuestion[] {
  return pbqQuestions.filter((p) => p.cert === cert)
}

export function getFreePBQsForCert(cert: string): PBQQuestion[] {
  return pbqQuestions.filter((p) => p.cert === cert && p.free)
}

export function getPBQById(id: string): PBQQuestion | undefined {
  return pbqQuestions.find((p) => p.id === id)
}
