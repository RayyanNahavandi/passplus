// Performance Based Questions (PBQs). Each PBQ counts as one question with
// partial credit: every correct placement, position, or blank is worth an
// equal fraction of the question.

export interface PBQBase {
  id: string
  cert: "secplus" | "netplus" | "aplus"
  domain: number
  title: string
  instructions: string
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
]

export function getPBQsForCert(cert: string): PBQQuestion[] {
  return pbqQuestions.filter((p) => p.cert === cert)
}

export function getPBQById(id: string): PBQQuestion | undefined {
  return pbqQuestions.find((p) => p.id === id)
}
