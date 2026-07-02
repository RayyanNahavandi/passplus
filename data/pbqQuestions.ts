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
]

export function getPBQsForCert(cert: string): PBQQuestion[] {
  return pbqQuestions.filter((p) => p.cert === cert)
}

export function getPBQById(id: string): PBQQuestion | undefined {
  return pbqQuestions.find((p) => p.id === id)
}
