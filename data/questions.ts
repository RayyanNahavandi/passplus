export interface Question {
  id: string
  exam: string
  question: string
  options: { A: string; B: string; C: string; D: string }
  answer: "A" | "B" | "C" | "D"
  tier: "free" | "locked"
}

export const questions: Question[] = [
  {
    id: "Q001",
    exam: "Original",
    question: "A security analyst notices that an attacker used a legitimate admin tool already present on a compromised system to move laterally. Which technique does this describe?",
    options: {
      A: "Zero-day exploitation",
      B: "Living off the land",
      C: "Fileless malware injection",
      D: "Rootkit installation"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q002",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a SOAR platform in a security operations center?",
    options: {
      A: "It replaces the need for human analysts entirely",
      B: "It automates repetitive security tasks and orchestrates incident response workflows",
      C: "It stores long-term threat intelligence feeds for offline analysis",
      D: "It provides endpoint detection and response capabilities"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q003",
    exam: "Original",
    question: "An organization wants to ensure that data stored in the cloud cannot be read by the cloud provider. Which control BEST addresses this requirement?",
    options: {
      A: "Data masking",
      B: "Tokenization",
      C: "Client-side encryption with customer-managed keys",
      D: "Data loss prevention policies"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q004",
    exam: "Original",
    question: "A penetration tester has obtained credentials from a phishing attack and is now accessing internal systems. Which phase of the penetration test does this represent?",
    options: {
      A: "Reconnaissance",
      B: "Scanning",
      C: "Exploitation",
      D: "Post-exploitation"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q005",
    exam: "Original",
    question: "Which of the following certificate types is used to validate the identity of an entire organization and displays the company name in the browser address bar?",
    options: {
      A: "Domain Validated (DV)",
      B: "Organization Validated (OV)",
      C: "Extended Validation (EV)",
      D: "Wildcard"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q006",
    exam: "Original",
    question: "A company requires that no single employee can both approve and execute a financial transaction. Which security principle does this implement?",
    options: {
      A: "Least privilege",
      B: "Separation of duties",
      C: "Need to know",
      D: "Defense in depth"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q007",
    exam: "Original",
    question: "An attacker sends millions of small packets to a target, exhausting its connection table. Which type of attack is this?",
    options: {
      A: "Smurf attack",
      B: "Ping of death",
      C: "SYN flood",
      D: "DNS amplification"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q008",
    exam: "Original",
    question: "A forensic investigator needs to ensure that collected evidence has not been tampered with since collection. Which mechanism BEST provides this assurance?",
    options: {
      A: "Chain of custody documentation",
      B: "Write-blocking hardware",
      C: "Cryptographic hash verification",
      D: "Evidence bag sealing"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q009",
    exam: "Original",
    question: "Which of the following BEST describes the difference between authentication and authorization?",
    options: {
      A: "Authentication verifies what a user can do; authorization verifies who the user is",
      B: "Authentication verifies who the user is; authorization determines what the user is allowed to do",
      C: "Authentication and authorization are the same process in most systems",
      D: "Authorization uses passwords; authentication uses permissions"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q010",
    exam: "Original",
    question: "A security engineer wants to prevent lateral movement within a data center by limiting traffic between servers that have no business reason to communicate. Which control achieves this?",
    options: {
      A: "North-south firewall rules",
      B: "Microsegmentation",
      C: "Network address translation",
      D: "Intrusion prevention system"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q011",
    exam: "Original",
    question: "An organization discovers that an insider is slowly copying sensitive data to a personal cloud storage account over several weeks. Which type of threat actor does this describe?",
    options: {
      A: "Advanced persistent threat",
      B: "Script kiddie",
      C: "Malicious insider",
      D: "Hacktivist"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q012",
    exam: "Original",
    question: "Which cryptographic algorithm is considered a post-quantum candidate and is based on the difficulty of solving lattice problems?",
    options: {
      A: "RSA-4096",
      B: "CRYSTALS-Kyber",
      C: "Diffie-Hellman",
      D: "AES-256"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q013",
    exam: "Original",
    question: "A developer stores API keys directly in application source code that is published to a public repository. Which type of vulnerability does this create?",
    options: {
      A: "Insecure deserialization",
      B: "Hardcoded credentials",
      C: "SQL injection",
      D: "Path traversal"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q014",
    exam: "Original",
    question: "Which of the following BEST describes a honeynet?",
    options: {
      A: "A network segment used for vulnerability scanning",
      B: "A collection of honeypots designed to simulate an entire network environment to attract attackers",
      C: "A firewall configured to log all denied traffic",
      D: "An intrusion detection system tuned to reduce false positives"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q015",
    exam: "Original",
    question: "A user receives an email claiming to be from the company's IT helpdesk asking them to verify their credentials. The email contains a link to a convincing fake login page. Which attack type is this?",
    options: {
      A: "Vishing",
      B: "Smishing",
      C: "Spear phishing",
      D: "Whaling"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q016",
    exam: "Original",
    question: "An organization needs to classify data that is only available to specific individuals with a verified business need. Which classification label BEST fits?",
    options: {
      A: "Public",
      B: "Internal",
      C: "Confidential",
      D: "Restricted"
    },
    answer: "D",
    tier: "free"
  },
  {
    id: "Q017",
    exam: "Original",
    question: "Which of the following is a PRIMARY benefit of using infrastructure as code (IaC) from a security perspective?",
    options: {
      A: "It eliminates the need for network segmentation",
      B: "It allows consistent, repeatable, and auditable environment deployments",
      C: "It removes the requirement for patch management",
      D: "It replaces the need for access control lists"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q018",
    exam: "Original",
    question: "A security analyst wants to identify outdated software on all workstations by comparing installed versions against a known-good baseline. Which process does this describe?",
    options: {
      A: "Vulnerability scanning",
      B: "Configuration management",
      C: "Asset inventory",
      D: "Security benchmarking"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q019",
    exam: "Original",
    question: "Which of the following attack techniques uses a fake wireless access point to intercept traffic between users and a legitimate network?",
    options: {
      A: "Replay attack",
      B: "Evil twin",
      C: "Rogue DHCP server",
      D: "ARP poisoning"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q020",
    exam: "Original",
    question: "An employee's laptop is stolen. The hard drive is encrypted with full disk encryption and the attacker does not know the password. Which security objective does this MOST directly protect?",
    options: {
      A: "Availability",
      B: "Integrity",
      C: "Confidentiality",
      D: "Non-repudiation"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q021",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a bug bounty program?",
    options: {
      A: "To reward employees who fix the most software defects internally",
      B: "To compensate external researchers who responsibly disclose security vulnerabilities",
      C: "To fund automated penetration testing tools",
      D: "To provide legal protection for offensive security teams"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q022",
    exam: "Original",
    question: "A cloud architect designs a system where a compromised container cannot access the host operating system or other containers. Which principle does this architecture apply?",
    options: {
      A: "Defense in depth",
      B: "Least functionality",
      C: "Isolation",
      D: "Immutability"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q023",
    exam: "Original",
    question: "Which of the following is the MOST effective control to prevent credential stuffing attacks on a web application?",
    options: {
      A: "Requiring complex passwords",
      B: "Implementing multi-factor authentication",
      C: "Enforcing account lockout after five failed attempts",
      D: "Using CAPTCHA on login pages"
    },
    answer: "B",
    tier: "free"
  },
  {
    id: "Q024",
    exam: "Original",
    question: "A security policy states that users must log out of systems after 15 minutes of inactivity. Which type of control is this?",
    options: {
      A: "Technical control",
      B: "Physical control",
      C: "Administrative control",
      D: "Compensating control"
    },
    answer: "C",
    tier: "free"
  },
  {
    id: "Q025",
    exam: "Original",
    question: "An attacker registers the domain 'micros0ft.com' to trick users into thinking they are visiting the legitimate Microsoft website. Which attack technique is this?",
    options: {
      A: "DNS hijacking",
      B: "Typosquatting",
      C: "URL redirection",
      D: "BGP hijacking"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q026",
    exam: "Original",
    question: "Which of the following BEST describes the concept of data sovereignty?",
    options: {
      A: "The ability to encrypt data before it leaves the organization",
      B: "The requirement that data is subject to the laws of the country where it is stored",
      C: "The organization's right to delete customer data on request",
      D: "The process of classifying data based on sensitivity"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q027",
    exam: "Original",
    question: "A security team uses threat intelligence feeds to proactively search for indicators of compromise on their network. What is this activity called?",
    options: {
      A: "Penetration testing",
      B: "Vulnerability assessment",
      C: "Threat hunting",
      D: "Red teaming"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q028",
    exam: "Original",
    question: "Which of the following is an example of a physical security control?",
    options: {
      A: "Role-based access control",
      B: "Biometric door locks",
      C: "Firewall rules",
      D: "Security awareness training"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q029",
    exam: "Original",
    question: "An analyst observes that a web application is returning verbose error messages including database table names and query structure. Which vulnerability does this represent?",
    options: {
      A: "Cross-site scripting",
      B: "Improper error handling / information disclosure",
      C: "XML external entity injection",
      D: "Server-side request forgery"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q030",
    exam: "Original",
    question: "A company wants to use a third party to test the security of its applications without giving the testers any prior knowledge about the system. Which type of testing is this?",
    options: {
      A: "White-box testing",
      B: "Gray-box testing",
      C: "Black-box testing",
      D: "Regression testing"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q031",
    exam: "Original",
    question: "Which protocol is commonly used to provide secure remote access to network devices using key-based or password authentication over an encrypted channel?",
    options: {
      A: "Telnet",
      B: "FTP",
      C: "SSH",
      D: "SNMP v2"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q032",
    exam: "Original",
    question: "A risk manager determines that the cost of implementing a control exceeds the value of the asset it would protect. Which risk response is MOST appropriate?",
    options: {
      A: "Risk avoidance",
      B: "Risk transfer",
      C: "Risk acceptance",
      D: "Risk mitigation"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q033",
    exam: "Original",
    question: "Which of the following BEST describes a supply chain attack?",
    options: {
      A: "Compromising a target by attacking a less-secure vendor or partner they rely on",
      B: "Physically intercepting hardware shipments to install implants",
      C: "Poisoning a competitor's product with malware",
      D: "Attacking logistics software to disrupt delivery"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q034",
    exam: "Original",
    question: "Which of the following encryption modes provides both confidentiality and data integrity in a single operation?",
    options: {
      A: "ECB",
      B: "CBC",
      C: "GCM",
      D: "CTR"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q035",
    exam: "Original",
    question: "An organization wants to receive notifications when a critical vulnerability is published that affects software in its environment. Which resource BEST fulfills this need?",
    options: {
      A: "SIEM dashboard",
      B: "CVE/NVD alerts or vendor security advisories",
      C: "Penetration test reports",
      D: "Security awareness training platform"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q036",
    exam: "Original",
    question: "A user reports that their computer is significantly slower than usual and is generating unusual network traffic at night. Which type of malware is MOST likely responsible?",
    options: {
      A: "Ransomware",
      B: "Spyware",
      C: "Bot/botnet malware",
      D: "Keylogger"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q037",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a privacy impact assessment (PIA)?",
    options: {
      A: "To test whether encryption implementations meet regulatory requirements",
      B: "To identify and mitigate privacy risks before a project or system is deployed",
      C: "To audit employee compliance with data handling policies",
      D: "To calculate the financial impact of a data breach"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q038",
    exam: "Original",
    question: "Which of the following is the MOST secure method for storing user passwords in a database?",
    options: {
      A: "MD5 hash",
      B: "SHA-1 hash",
      C: "AES-256 encryption",
      D: "Bcrypt with per-user salt"
    },
    answer: "D",
    tier: "locked"
  },
  {
    id: "Q039",
    exam: "Original",
    question: "An attacker modifies the ARP cache of a switch to associate their MAC address with a legitimate IP address and intercepts traffic. Which attack is this?",
    options: {
      A: "DNS poisoning",
      B: "ARP spoofing",
      C: "IP spoofing",
      D: "MAC flooding"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q040",
    exam: "Original",
    question: "A security analyst needs to identify all devices currently connected to the corporate network, including unmanaged IoT devices. Which tool is BEST suited for this task?",
    options: {
      A: "Vulnerability scanner",
      B: "Network discovery/asset discovery tool",
      C: "Intrusion detection system",
      D: "Security information and event management"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q041",
    exam: "Original",
    question: "Which of the following BEST describes the role of a certificate authority (CA) in a public key infrastructure?",
    options: {
      A: "It encrypts communications between parties",
      B: "It issues and signs digital certificates, binding public keys to identities",
      C: "It provides key escrow services for law enforcement",
      D: "It manages private keys on behalf of certificate holders"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q042",
    exam: "Original",
    question: "An organization uses a federated identity system to allow employees to log into partner applications using their corporate credentials. Which standard is MOST commonly used for this?",
    options: {
      A: "LDAP",
      B: "SAML or OAuth/OIDC",
      C: "RADIUS",
      D: "Kerberos"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q043",
    exam: "Original",
    question: "Which of the following BEST describes the concept of defense in depth?",
    options: {
      A: "Using the strongest possible single control to protect an asset",
      B: "Layering multiple independent security controls so that failure of one does not result in compromise",
      C: "Placing all security controls at the network perimeter",
      D: "Prioritizing detection over prevention"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q044",
    exam: "Original",
    question: "A web application allows users to include file paths in a request parameter to load resources. An attacker uses '../../../etc/passwd' to read sensitive files. Which vulnerability is this?",
    options: {
      A: "SQL injection",
      B: "Command injection",
      C: "Directory traversal / path traversal",
      D: "SSRF"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q045",
    exam: "Original",
    question: "Which type of malware disguises itself as legitimate software but performs malicious actions once installed?",
    options: {
      A: "Worm",
      B: "Trojan horse",
      C: "Rootkit",
      D: "Logic bomb"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q046",
    exam: "Original",
    question: "A company's DR plan calls for bringing systems back online within four hours of a disaster. What metric does this represent?",
    options: {
      A: "Recovery point objective",
      B: "Mean time to repair",
      C: "Recovery time objective",
      D: "Mean time between failures"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q047",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of input validation in secure application development?",
    options: {
      A: "To verify that users have proper authorization before processing requests",
      B: "To ensure that data entered by users conforms to expected formats and values, preventing injection attacks",
      C: "To encrypt user-supplied data before storing it in the database",
      D: "To log all user input for auditing purposes"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q048",
    exam: "Original",
    question: "An attacker intercepts an authentication token and replays it to gain unauthorized access. Which attack does this describe?",
    options: {
      A: "Pass-the-hash",
      B: "Token replay attack",
      C: "Session fixation",
      D: "Cross-site request forgery"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q049",
    exam: "Original",
    question: "Which of the following is a preventive control specifically designed to detect and stop malicious code execution on endpoints?",
    options: {
      A: "SIEM",
      B: "EDR (Endpoint Detection and Response)",
      C: "DLP",
      D: "CASB"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q050",
    exam: "Original",
    question: "A compliance officer needs to verify that the organization's security controls meet the requirements of NIST SP 800-53. Which activity satisfies this requirement?",
    options: {
      A: "Vulnerability scanning",
      B: "Security control assessment",
      C: "Penetration testing",
      D: "Risk quantification"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q051",
    exam: "Original",
    question: "Which of the following wireless security protocols provides the STRONGEST protection using simultaneous authentication of equals (SAE)?",
    options: {
      A: "WEP",
      B: "WPA2-Personal",
      C: "WPA3-Personal",
      D: "WPA2-Enterprise"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q052",
    exam: "Original",
    question: "A security engineer discovers that a service account has local administrator rights on hundreds of workstations even though it only needs to query a single database. Which security principle is being violated?",
    options: {
      A: "Separation of duties",
      B: "Least privilege",
      C: "Need to know",
      D: "Accountability"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q053",
    exam: "Original",
    question: "Which of the following BEST describes the function of a web application firewall (WAF)?",
    options: {
      A: "It blocks all inbound traffic from untrusted networks",
      B: "It inspects HTTP/HTTPS traffic to detect and block application-layer attacks such as SQLi and XSS",
      C: "It provides VPN connectivity for remote users",
      D: "It filters email for spam and phishing content"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q054",
    exam: "Original",
    question: "An administrator wants to prevent any unauthorized software from running on corporate endpoints. Which control BEST enforces this?",
    options: {
      A: "Antivirus software",
      B: "Application allowlisting",
      C: "Host-based intrusion detection",
      D: "Group policy software restriction"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q055",
    exam: "Original",
    question: "A company signs a contract with a cloud provider that specifies 99.99% uptime and outlines penalties for downtime. What type of document is this?",
    options: {
      A: "Memorandum of understanding",
      B: "Non-disclosure agreement",
      C: "Service level agreement",
      D: "Business associate agreement"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q056",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of network access control (NAC)?",
    options: {
      A: "Encrypting network traffic between endpoints",
      B: "Enforcing security policy compliance checks before granting devices access to the network",
      C: "Monitoring bandwidth consumption by user",
      D: "Blocking known malicious IP addresses"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q057",
    exam: "Original",
    question: "An attacker sends a malicious script in a URL parameter. When an unsuspecting admin clicks the link, the script runs in their browser using the admin's session cookies. Which attack type is this?",
    options: {
      A: "Stored XSS",
      B: "Reflected XSS",
      C: "DOM-based XSS",
      D: "CSRF"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q058",
    exam: "Original",
    question: "Which of the following is the PRIMARY reason organizations implement log aggregation and correlation using a SIEM?",
    options: {
      A: "To replace manual security reviews entirely",
      B: "To detect patterns and anomalies across multiple sources that would not be visible in individual logs",
      C: "To archive logs to meet a five-year retention requirement",
      D: "To automate patch deployment across endpoints"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q059",
    exam: "Original",
    question: "A mobile device management policy requires that all company-owned phones encrypt local storage, enforce a PIN, and wipe after ten failed attempts. Which security objective does device wipe PRIMARILY protect?",
    options: {
      A: "Availability",
      B: "Integrity",
      C: "Confidentiality",
      D: "Non-repudiation"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q060",
    exam: "Original",
    question: "A security analyst reviewing firewall logs notices repeated connection attempts from the same external IP to TCP port 3389. Which service is the attacker most likely targeting?",
    options: {
      A: "SSH",
      B: "RDP",
      C: "HTTPS",
      D: "SMB"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q061",
    exam: "Original",
    question: "An organization uses a process to automatically revoke digital certificates when a private key is compromised. Which mechanism facilitates this?",
    options: {
      A: "OCSP stapling",
      B: "Certificate transparency log",
      C: "Certificate revocation list (CRL) or OCSP",
      D: "Key escrow"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q062",
    exam: "Original",
    question: "A developer writes code that checks for buffer boundaries before writing to memory. Which vulnerability class does this PRIMARILY prevent?",
    options: {
      A: "SQL injection",
      B: "Buffer overflow",
      C: "Race condition",
      D: "Integer overflow"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q063",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a data loss prevention (DLP) solution?",
    options: {
      A: "To encrypt all data at rest across the enterprise",
      B: "To monitor, detect, and block unauthorized transfer of sensitive data",
      C: "To replace backup solutions for regulated data",
      D: "To prevent malware from encrypting files"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q064",
    exam: "Original",
    question: "An organization wants to ensure that a vendor's security controls meet contractual requirements before sharing sensitive data. Which process addresses this?",
    options: {
      A: "Security assessment or audit of the vendor",
      B: "Signing an NDA",
      C: "Requesting the vendor's SOC 2 report",
      D: "Both A and C are appropriate approaches"
    },
    answer: "D",
    tier: "locked"
  },
  {
    id: "Q065",
    exam: "Original",
    question: "Which of the following BEST describes the difference between a vulnerability and an exploit?",
    options: {
      A: "A vulnerability is a known weakness; an exploit is code or technique that takes advantage of that weakness",
      B: "An exploit is a theoretical risk; a vulnerability is a confirmed attack",
      C: "A vulnerability only affects software; an exploit can affect hardware too",
      D: "They are the same concept described from different perspectives"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q066",
    exam: "Original",
    question: "A company stores credit card data in a database but replaces the actual number with a randomly generated token for use in business applications. Which technique is this?",
    options: {
      A: "Encryption",
      B: "Hashing",
      C: "Tokenization",
      D: "Data masking"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q067",
    exam: "Original",
    question: "Which authentication factor category does a fingerprint scan represent?",
    options: {
      A: "Something you know",
      B: "Something you have",
      C: "Something you are",
      D: "Somewhere you are"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q068",
    exam: "Original",
    question: "An attacker plants false records in a DNS resolver's cache so that users are directed to a malicious website instead of the legitimate one. Which attack is this?",
    options: {
      A: "DNS hijacking",
      B: "DNS cache poisoning",
      C: "BGP route hijacking",
      D: "HOSTS file modification"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q069",
    exam: "Original",
    question: "Which of the following is an example of a compensating control?",
    options: {
      A: "Implementing MFA to replace a weak password policy that cannot currently be changed",
      B: "Installing antivirus software on all endpoints",
      C: "Applying the latest security patches",
      D: "Creating a firewall rule to block malicious traffic"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q070",
    exam: "Original",
    question: "A security policy requires that all removable media be scanned for malware before use on corporate systems. Which type of control is this policy?",
    options: {
      A: "Technical",
      B: "Physical",
      C: "Administrative",
      D: "Detective"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q071",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a security operations center (SOC)?",
    options: {
      A: "To develop security policies and procedures",
      B: "To centrally monitor, detect, analyze, and respond to cybersecurity incidents",
      C: "To conduct penetration testing against the organization's systems",
      D: "To manage the organization's risk register"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q072",
    exam: "Original",
    question: "A threat actor uses a USB drive loaded with malware and leaves it in a company parking lot, hoping an employee will pick it up and plug it in. Which attack technique is this?",
    options: {
      A: "Tailgating",
      B: "Pretexting",
      C: "Baiting",
      D: "Quid pro quo"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q073",
    exam: "Original",
    question: "Which of the following is the MAIN goal of a business continuity plan (BCP)?",
    options: {
      A: "To restore IT systems as quickly as possible after a disaster",
      B: "To ensure critical business functions continue during and after a disruption",
      C: "To provide legal documentation of the organization's response to incidents",
      D: "To train employees on emergency evacuation procedures"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q074",
    exam: "Original",
    question: "A security engineer implements TLS 1.3 across all web services. Which security properties does TLS 1.3 provide by default that TLS 1.2 does not always guarantee?",
    options: {
      A: "Non-repudiation and availability",
      B: "Forward secrecy on all cipher suites",
      C: "Mutual authentication without certificates",
      D: "Data integrity without encryption"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q075",
    exam: "Original",
    question: "An organization's security policy requires that employees use only company-approved devices. An employee accesses corporate email from a personal tablet. Which risk category BEST describes this scenario?",
    options: {
      A: "Shadow IT",
      B: "Insider threat",
      C: "BYOD risk",
      D: "Data exfiltration"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q076",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of the MITRE ATT&CK framework?",
    options: {
      A: "A scoring system for vulnerability severity",
      B: "A knowledge base of adversary tactics, techniques, and procedures based on real-world observations",
      C: "A compliance framework for financial services organizations",
      D: "A tool for automating threat intelligence sharing"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q077",
    exam: "Original",
    question: "A security audit reveals that several critical servers have not been patched in over a year. Which vulnerability management process step has been neglected?",
    options: {
      A: "Vulnerability discovery",
      B: "Vulnerability assessment",
      C: "Remediation / patch management",
      D: "Vulnerability prioritization"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q078",
    exam: "Original",
    question: "Which of the following is a PRIMARY use of steganography in a cyberattack?",
    options: {
      A: "Encrypting command-and-control traffic",
      B: "Hiding malicious code or data within innocent-looking files like images",
      C: "Disguising malware as legitimate software",
      D: "Bypassing firewalls using tunneled protocols"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q079",
    exam: "Original",
    question: "An organization requires that any code committed to the production repository must be reviewed and approved by a second developer. Which security principle does this implement?",
    options: {
      A: "Least privilege",
      B: "Separation of duties",
      C: "Defense in depth",
      D: "Accountability"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q080",
    exam: "Original",
    question: "A security team receives an alert that a user account logged in from two countries simultaneously. Which type of detection is this?",
    options: {
      A: "Signature-based detection",
      B: "Anomaly / behavioral detection",
      C: "Heuristic detection",
      D: "Reputation-based detection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q081",
    exam: "Original",
    question: "Which of the following is the BEST description of a zero-trust architecture?",
    options: {
      A: "A network model that blocks all external traffic by default",
      B: "A security model where no user or device is trusted by default, and all access requests are continuously verified",
      C: "A model that restricts access based solely on user roles",
      D: "A perimeter-based security model with strict firewall rules"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q082",
    exam: "Original",
    question: "An attacker exploits a vulnerability in a web server to gain a command shell. The attacker then uses that access to compromise an internal database server that is not internet-facing. Which technique is this second step?",
    options: {
      A: "Privilege escalation",
      B: "Pivoting / lateral movement",
      C: "Persistence",
      D: "Exfiltration"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q083",
    exam: "Original",
    question: "A company processes personal data of EU residents. Under GDPR, which role is responsible for determining the purposes and means of processing personal data?",
    options: {
      A: "Data subject",
      B: "Data processor",
      C: "Data controller",
      D: "Data protection officer"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q084",
    exam: "Original",
    question: "A security analyst finds that an attacker used PowerShell to download and execute a payload entirely in memory, leaving no files on disk. Which malware category BEST describes this?",
    options: {
      A: "Rootkit",
      B: "Fileless malware",
      C: "Trojan horse",
      D: "Logic bomb"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q085",
    exam: "Original",
    question: "Which of the following is the PRIMARY purpose of a tabletop exercise?",
    options: {
      A: "To test backup restoration procedures under realistic conditions",
      B: "To walk through an incident response scenario in a discussion-based format to identify gaps",
      C: "To simulate a full-scale cyberattack on production systems",
      D: "To evaluate vendor response times during a simulated outage"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q086",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a digital signature?",
    options: {
      A: "To encrypt data so only the recipient can read it",
      B: "To verify the authenticity and integrity of a message and provide non-repudiation",
      C: "To hash a message so it can be compared for corruption",
      D: "To establish a shared symmetric key between two parties"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q087",
    exam: "Original",
    question: "An attacker calls a help desk employee, impersonates a new manager, and convinces them to reset a user's password. Which attack technique is this?",
    options: {
      A: "Phishing",
      B: "Vishing",
      C: "Pretexting",
      D: "Impersonation"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q088",
    exam: "Original",
    question: "A company wants to prevent users from accessing known malicious websites by blocking DNS queries to malicious domains. Which solution implements this?",
    options: {
      A: "Web proxy",
      B: "DNS sinkholing",
      C: "Network-based IDS",
      D: "URL filtering on the firewall"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q089",
    exam: "Original",
    question: "An organization stores backup encryption keys with a trusted third party so they can recover data if the primary keys are lost. Which practice is this?",
    options: {
      A: "Key rotation",
      B: "Key escrow",
      C: "Key derivation",
      D: "Key wrapping"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q090",
    exam: "Original",
    question: "Which of the following BEST describes the concept of a threat vector?",
    options: {
      A: "The likelihood that a threat will exploit a vulnerability",
      B: "The path or method an attacker uses to gain access to a target",
      C: "The potential damage that could result from a successful attack",
      D: "The set of assets that are exposed to external threats"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q091",
    exam: "Original",
    question: "A security team wants to test its incident response process without involving actual production systems. Which type of exercise is BEST suited for this?",
    options: {
      A: "Red team exercise",
      B: "Penetration test",
      C: "Simulation or tabletop exercise",
      D: "Purple team exercise"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q092",
    exam: "Original",
    question: "Which of the following access control models assigns permissions based on user roles within an organization?",
    options: {
      A: "Discretionary access control (DAC)",
      B: "Mandatory access control (MAC)",
      C: "Role-based access control (RBAC)",
      D: "Attribute-based access control (ABAC)"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q093",
    exam: "Original",
    question: "A penetration tester successfully elevates their privileges from a standard user account to a local administrator on a Windows system. Which phase is this?",
    options: {
      A: "Lateral movement",
      B: "Privilege escalation",
      C: "Persistence",
      D: "Credential access"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q094",
    exam: "Original",
    question: "An organization wants to reduce the attack surface of its web servers. Which action BEST accomplishes this?",
    options: {
      A: "Enable all available server features to support future use cases",
      B: "Disable unused services, ports, and features",
      C: "Install a WAF in front of all web servers",
      D: "Enable verbose logging on all servers"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q095",
    exam: "Original",
    question: "Which of the following BEST describes the function of a CASB (Cloud Access Security Broker)?",
    options: {
      A: "It provides VPN access to cloud applications",
      B: "It acts as an intermediary between users and cloud services to enforce security policies",
      C: "It replaces on-premises firewalls for cloud-first organizations",
      D: "It manages identity federation between cloud providers"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q096",
    exam: "Original",
    question: "A forensic analyst images a hard drive using a write blocker. Why is the write blocker important in this process?",
    options: {
      A: "It speeds up the imaging process",
      B: "It ensures that the imaging software cannot accidentally modify the original evidence",
      C: "It encrypts the image for secure transfer",
      D: "It verifies the hash of the image automatically"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q097",
    exam: "Original",
    question: "Which of the following protocols provides network time synchronization and, if not secured, can be abused in amplification attacks?",
    options: {
      A: "SNMP",
      B: "NTP",
      C: "ICMP",
      D: "DNS"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q098",
    exam: "Original",
    question: "A company's risk assessment identifies a risk with high likelihood and high impact. Which risk treatment is typically MOST appropriate as a first response?",
    options: {
      A: "Accept the risk",
      B: "Transfer the risk to insurance",
      C: "Mitigate the risk by implementing controls",
      D: "Avoid the risk by stopping the associated business activity"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q099",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of endpoint detection and response (EDR) solutions?",
    options: {
      A: "To block all inbound network connections to endpoints",
      B: "To continuously monitor endpoint activity, detect threats, and enable investigation and response",
      C: "To encrypt endpoint storage drives automatically",
      D: "To manage software licenses on endpoints"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q100",
    exam: "Original",
    question: "An attacker sends specially crafted input to an application that causes it to execute arbitrary SQL commands against a backend database. Which vulnerability is being exploited?",
    options: {
      A: "Cross-site scripting",
      B: "SQL injection",
      C: "LDAP injection",
      D: "Command injection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q101",
    exam: "Original",
    question: "A company publishes its public key in a digital certificate signed by a trusted CA. Which property does the CA's signature provide?",
    options: {
      A: "Encryption of the public key",
      B: "Proof that the public key belongs to the stated entity",
      C: "Guarantee that the private key is secure",
      D: "Authorization of the certificate holder's actions"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q102",
    exam: "Original",
    question: "Which of the following BEST describes an insider threat program's PRIMARY goal?",
    options: {
      A: "To monitor all employee communications for compliance",
      B: "To detect, deter, and respond to threats posed by current or former employees or contractors",
      C: "To enforce acceptable use policies",
      D: "To provide security awareness training"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q103",
    exam: "Original",
    question: "A system administrator enables automatic updates on all servers. Which security objective does this PRIMARILY support?",
    options: {
      A: "Confidentiality",
      B: "Integrity",
      C: "Availability",
      D: "Vulnerability management"
    },
    answer: "D",
    tier: "locked"
  },
  {
    id: "Q104",
    exam: "Original",
    question: "Which of the following is the MOST significant risk introduced by using open-source software components in an application?",
    options: {
      A: "Open-source software always has worse performance than proprietary software",
      B: "Unpatched vulnerabilities in dependencies can be inherited by the application",
      C: "Open-source licenses prevent commercial use in most cases",
      D: "Open-source software cannot be audited by third parties"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q105",
    exam: "Original",
    question: "A security analyst identifies a service that is listening on all network interfaces on a server that only provides internal application services. Which remediation step is MOST appropriate?",
    options: {
      A: "Install a host-based firewall and block external access",
      B: "Reconfigure the service to bind only to the internal interface",
      C: "Move the server to a DMZ",
      D: "Enable IDS on the external interface"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q106",
    exam: "Original",
    question: "An organization has a policy that critical production changes must be approved by two separate managers. Which security concept does this enforce?",
    options: {
      A: "Dual control / two-person integrity",
      B: "Separation of duties",
      C: "Job rotation",
      D: "Mandatory vacation"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q107",
    exam: "Original",
    question: "Which of the following BEST describes the function of DNSSEC?",
    options: {
      A: "It encrypts DNS queries to prevent eavesdropping",
      B: "It digitally signs DNS records to allow resolvers to verify authenticity and integrity",
      C: "It provides a private DNS resolver for internal networks",
      D: "It blocks DNS queries to known malicious domains"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q108",
    exam: "Original",
    question: "A user reports receiving a text message asking them to click a link to verify their bank account. Which type of attack is this?",
    options: {
      A: "Phishing",
      B: "Vishing",
      C: "Smishing",
      D: "Spear phishing"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q109",
    exam: "Original",
    question: "Which of the following BEST describes the principle of least functionality as applied to operating systems?",
    options: {
      A: "Using the operating system with the fewest features available",
      B: "Removing or disabling all unnecessary services, roles, and features from a system",
      C: "Running applications with minimal computational resources",
      D: "Restricting users to only the applications they need"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q110",
    exam: "Original",
    question: "An organization uses a third-party security firm to continuously attempt to compromise its environment using real attacker techniques. Which activity is this?",
    options: {
      A: "Vulnerability assessment",
      B: "Penetration test",
      C: "Red team engagement",
      D: "Bug bounty program"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q111",
    exam: "Original",
    question: "Which of the following hash functions is considered cryptographically broken and should NOT be used for security purposes?",
    options: {
      A: "SHA-256",
      B: "SHA-3",
      C: "MD5",
      D: "BLAKE2"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q112",
    exam: "Original",
    question: "A company wants to ensure that all changes to a critical configuration file are logged and that any unauthorized changes trigger an alert. Which technology provides this capability?",
    options: {
      A: "Data loss prevention",
      B: "File integrity monitoring",
      C: "Security information and event management",
      D: "Network behavior analysis"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q113",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a penetration testing rules of engagement document?",
    options: {
      A: "To define the legal terms of the engagement contract",
      B: "To specify the scope, boundaries, authorized techniques, and communication protocols for a penetration test",
      C: "To document findings and recommendations after testing",
      D: "To establish the payment terms for the testing team"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q114",
    exam: "Original",
    question: "A company enables multi-factor authentication for all privileged accounts but not for standard user accounts. Which risk does this create?",
    options: {
      A: "Standard user accounts could be used for lateral movement or privilege escalation after compromise",
      B: "Privileged accounts become more susceptible to brute force attacks",
      C: "MFA increases complexity and reduces availability for administrators",
      D: "Standard users will bypass MFA requirements using shared accounts"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q115",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a secure software development lifecycle (SSDLC)?",
    options: {
      A: "To accelerate software releases by automating testing",
      B: "To integrate security activities into each phase of development to reduce vulnerabilities in the final product",
      C: "To document code changes for compliance audits",
      D: "To train developers on secure coding practices only"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q116",
    exam: "Original",
    question: "An analyst notices that an internal server is sending large volumes of encrypted data to an external IP at 2 AM every night. Which security concern does this MOST suggest?",
    options: {
      A: "The server is performing scheduled backups",
      B: "The server may be compromised and exfiltrating data",
      C: "The server's NTP is misconfigured",
      D: "The server is performing legitimate software updates"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q117",
    exam: "Original",
    question: "Which of the following is a characteristic of asymmetric encryption compared to symmetric encryption?",
    options: {
      A: "Asymmetric encryption is faster than symmetric encryption",
      B: "Asymmetric encryption uses two mathematically related keys, while symmetric uses the same key for both encryption and decryption",
      C: "Asymmetric encryption cannot be used for digital signatures",
      D: "Asymmetric encryption provides weaker security than symmetric encryption"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q118",
    exam: "Original",
    question: "A web server's SSL/TLS certificate was issued by an internal CA that is not trusted by public browsers. What will users experience when they visit the site?",
    options: {
      A: "The connection will be blocked entirely",
      B: "A certificate warning saying the certificate is not trusted",
      C: "The connection will fall back to HTTP",
      D: "The browser will automatically add the CA to its trust store"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q119",
    exam: "Original",
    question: "A company conducts regular social engineering assessments by sending simulated phishing emails to employees. What is the PRIMARY goal of this activity?",
    options: {
      A: "To identify employees who should be terminated",
      B: "To measure and improve employee security awareness and resilience to phishing",
      C: "To test email filtering controls",
      D: "To fulfill regulatory audit requirements"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q120",
    exam: "Original",
    question: "Which of the following BEST describes the function of SIEM in the context of compliance?",
    options: {
      A: "It automatically remediates compliance violations",
      B: "It aggregates and retains logs from across the environment to support audit and compliance reporting",
      C: "It enforces security policies on endpoints",
      D: "It scans applications for compliance-related vulnerabilities"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q121",
    exam: "Original",
    question: "An attacker compromises a website frequently visited by a target organization's employees and embeds malware that exploits browser vulnerabilities. Which attack technique is this?",
    options: {
      A: "Spear phishing",
      B: "Watering hole attack",
      C: "Drive-by download",
      D: "Malvertising"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q122",
    exam: "Original",
    question: "Which of the following protocols is used to securely transfer files over a network using SSH as the underlying transport?",
    options: {
      A: "FTPS",
      B: "SFTP",
      C: "SCP only",
      D: "HTTPS"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q123",
    exam: "Original",
    question: "A company's security team discovers an attacker has been present in the environment for several months, slowly gathering intelligence. Which threat actor type BEST describes this?",
    options: {
      A: "Script kiddie",
      B: "Hacktivist",
      C: "Advanced persistent threat (APT)",
      D: "Opportunistic attacker"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q124",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of network segmentation?",
    options: {
      A: "Increasing network throughput by separating traffic types",
      B: "Limiting the blast radius of a compromise by isolating network zones",
      C: "Reducing the number of IP addresses required",
      D: "Providing redundant network paths"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q125",
    exam: "Original",
    question: "An employee is terminated and their access to all systems should be immediately revoked. Which process ensures this happens?",
    options: {
      A: "Privileged access management",
      B: "Identity lifecycle management / offboarding process",
      C: "Data loss prevention",
      D: "Security awareness training"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q126",
    exam: "Original",
    question: "A security architect designs a system where containers run with read-only file systems and drop all Linux capabilities except those strictly required. Which security principle does this implement?",
    options: {
      A: "Defense in depth",
      B: "Least privilege and least functionality",
      C: "Zero trust",
      D: "Fail secure"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q127",
    exam: "Original",
    question: "Which of the following BEST describes what a CVE (Common Vulnerabilities and Exposures) entry provides?",
    options: {
      A: "A severity score and remediation steps for a vulnerability",
      B: "A unique identifier and description for a publicly known vulnerability",
      C: "A complete exploit code for a vulnerability",
      D: "A list of systems affected by a vulnerability"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q128",
    exam: "Original",
    question: "A company's security policy requires that all sensitive emails be encrypted using S/MIME. Which component is required on the recipient's side to decrypt the messages?",
    options: {
      A: "The sender's public key",
      B: "The recipient's private key",
      C: "A shared symmetric key",
      D: "The CA's root certificate only"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q129",
    exam: "Original",
    question: "An organization discovers that a contractor installed unauthorized remote access software on a critical server before their contract ended. Which type of attack does this represent?",
    options: {
      A: "Supply chain attack",
      B: "Malicious insider / backdoor installation",
      C: "Watering hole attack",
      D: "Persistence via rootkit"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q130",
    exam: "Original",
    question: "Which of the following is the PRIMARY benefit of using a password manager?",
    options: {
      A: "It eliminates the need for multi-factor authentication",
      B: "It allows users to use strong, unique passwords for every account without memorizing them",
      C: "It encrypts all network traffic to websites",
      D: "It provides single sign-on for all applications"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q131",
    exam: "Original",
    question: "A security team member is assigned to continuously monitor attacker forums and dark web markets for stolen credentials belonging to the organization. What is this activity called?",
    options: {
      A: "Threat hunting",
      B: "Dark web monitoring / threat intelligence",
      C: "Vulnerability research",
      D: "Digital forensics"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q132",
    exam: "Original",
    question: "An attacker uses a known vulnerability in an unpatched VPN appliance to gain initial access to a corporate network. Which category of attack does this represent?",
    options: {
      A: "Social engineering",
      B: "Known/unpatched vulnerability exploitation",
      C: "Zero-day exploitation",
      D: "Physical access attack"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q133",
    exam: "Original",
    question: "Which of the following BEST describes the concept of 'privacy by design'?",
    options: {
      A: "Adding privacy controls after a system is built",
      B: "Integrating privacy protections into the design and architecture of systems from the beginning",
      C: "Documenting privacy policies for regulatory compliance",
      D: "Encrypting all data at rest and in transit"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q134",
    exam: "Original",
    question: "A company uses geofencing to restrict access to its corporate applications from outside approved countries. Which type of control is this?",
    options: {
      A: "Physical control",
      B: "Technical / logical control",
      C: "Administrative control",
      D: "Compensating control"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q135",
    exam: "Original",
    question: "A server generates an alert every time a new user account is created outside of business hours. Which type of detection is this?",
    options: {
      A: "Signature-based detection",
      B: "Anomaly-based detection",
      C: "Rule-based detection",
      D: "Heuristic detection"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q136",
    exam: "Original",
    question: "An organization purchases cyber liability insurance to cover costs from a data breach. Which risk response strategy does this represent?",
    options: {
      A: "Risk avoidance",
      B: "Risk mitigation",
      C: "Risk transfer",
      D: "Risk acceptance"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q137",
    exam: "Original",
    question: "A security analyst is performing threat modeling. They identify the attack surface, enumerate threats, and prioritize them. Which methodology BEST aligns with this approach?",
    options: {
      A: "PASTA",
      B: "STRIDE",
      C: "DREAD",
      D: "CVSS"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q138",
    exam: "Original",
    question: "An administrator configures a system so that if an intrusion is detected, all services shut down and the system enters a safe state. Which security concept does this describe?",
    options: {
      A: "Fail open",
      B: "Fail secure / fail closed",
      C: "High availability",
      D: "Defense in depth"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q139",
    exam: "Original",
    question: "An organization wants to determine which of its critical assets are most exposed to external threats. Which process BEST addresses this?",
    options: {
      A: "Business impact analysis",
      B: "Attack surface analysis",
      C: "Vulnerability scanning",
      D: "Risk register maintenance"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q140",
    exam: "Original",
    question: "Which of the following BEST explains why employees are often considered the weakest link in security?",
    options: {
      A: "Employees intentionally try to undermine security policies",
      B: "Employees are frequently targeted by social engineering and may make mistakes that bypass technical controls",
      C: "Employees have too many privileges by default",
      D: "Employees do not understand how to use security tools"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q141",
    exam: "Original",
    question: "Which of the following is the BEST example of a detective control?",
    options: {
      A: "Encryption of data at rest",
      B: "Intrusion detection system alerts",
      C: "Firewall blocking inbound traffic",
      D: "Security awareness training"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q142",
    exam: "Original",
    question: "An application allows users to upload files but does not validate the file type. An attacker uploads a PHP script and executes it on the server. Which vulnerability is this?",
    options: {
      A: "Command injection",
      B: "Unrestricted file upload leading to remote code execution",
      C: "Directory traversal",
      D: "Cross-site scripting"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q143",
    exam: "Original",
    question: "A company implements a policy requiring employees to take at least one week of consecutive leave per year. Which security benefit does this PRIMARILY provide?",
    options: {
      A: "It reduces burnout and improves performance",
      B: "It allows detection of fraudulent activity that requires the employee's continuous presence to conceal",
      C: "It ensures employees maintain security certifications",
      D: "It provides time for mandatory security training"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q144",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of an acceptable use policy (AUP)?",
    options: {
      A: "To define technical access control rules",
      B: "To define what is and is not acceptable behavior when using organizational IT resources",
      C: "To document the organization's incident response procedures",
      D: "To specify data classification standards"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q145",
    exam: "Original",
    question: "A security engineer hardens a Linux server by disabling unused daemons, removing unnecessary packages, and configuring a host-based firewall. What process does this describe?",
    options: {
      A: "Patch management",
      B: "System hardening",
      C: "Vulnerability remediation",
      D: "Security baseline deployment"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q146",
    exam: "Original",
    question: "Which of the following BEST describes the role of a data steward?",
    options: {
      A: "The individual responsible for protecting the technical infrastructure that stores data",
      B: "The individual responsible for ensuring data quality, classification, and appropriate handling within a business unit",
      C: "The executive accountable for the overall data security program",
      D: "The individual who performs backups and recovery operations"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q147",
    exam: "Original",
    question: "An organization deploys a system that requires employees to authenticate with their smart card AND a PIN. Which authentication concept does this implement?",
    options: {
      A: "Single-factor authentication using something you have",
      B: "Multi-factor authentication combining something you have and something you know",
      C: "Multi-factor authentication combining something you have and something you are",
      D: "Two-step authentication using the same factor type"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q148",
    exam: "Original",
    question: "Which type of malware is specifically designed to encrypt victim files and demand payment for the decryption key?",
    options: {
      A: "Spyware",
      B: "Ransomware",
      C: "Adware",
      D: "Worm"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q149",
    exam: "Original",
    question: "A company is evaluating two sites for disaster recovery: one that can be operational within hours (with hardware pre-installed) and one that requires days to set up. Which term describes the faster site?",
    options: {
      A: "Cold site",
      B: "Warm site",
      C: "Hot site",
      D: "Mobile site"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q150",
    exam: "Original",
    question: "An application developer uses parameterized queries in all database interactions. Which vulnerability does this PRIMARILY prevent?",
    options: {
      A: "Cross-site scripting",
      B: "SQL injection",
      C: "Buffer overflow",
      D: "XML injection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q151",
    exam: "Original",
    question: "Which of the following BEST describes the concept of non-repudiation?",
    options: {
      A: "The ability to verify that a message has not been altered in transit",
      B: "The assurance that a party cannot deny having sent or received a message or performed an action",
      C: "The guarantee that information is accessible when needed",
      D: "The process of confirming a user's identity"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q152",
    exam: "Original",
    question: "Which network device examines traffic based on predefined rules and operates at Layers 3 and 4 of the OSI model to permit or deny packets?",
    options: {
      A: "Layer 7 WAF",
      B: "Stateless packet filtering firewall",
      C: "Next-generation firewall",
      D: "IDS sensor"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q153",
    exam: "Original",
    question: "A security analyst uses the CVSS base score to prioritize vulnerability patching. A vulnerability has a CVSS score of 9.8. How should this be prioritized?",
    options: {
      A: "Low priority — CVSS scores above 9 indicate theoretical vulnerabilities",
      B: "Critical priority — scores above 9.0 indicate critical severity and should be remediated immediately",
      C: "Medium priority — high CVSS scores are common and do not always require immediate action",
      D: "It depends on the asset value regardless of CVSS score"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q154",
    exam: "Original",
    question: "Which of the following types of backups only copies data that has changed since the last full backup?",
    options: {
      A: "Incremental backup",
      B: "Differential backup",
      C: "Mirror backup",
      D: "Full backup"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q155",
    exam: "Original",
    question: "An employee plugs a personal wireless access point into a corporate network port. Which security risk does this create?",
    options: {
      A: "The AP broadcasts the corporate SSID to nearby attackers",
      B: "A rogue access point that bypasses network security controls and provides unauthorized wireless access",
      C: "The employee's devices receive DHCP addresses from the corporate server",
      D: "The corporate firewall is bypassed by wireless traffic"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q156",
    exam: "Original",
    question: "A company conducts annual security awareness training for all employees. Which security goal does this PRIMARILY support?",
    options: {
      A: "Regulatory compliance only",
      B: "Reducing human error and improving the organization's security culture",
      C: "Detecting insider threats through monitoring",
      D: "Fulfilling ISO 27001 audit requirements"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q157",
    exam: "Original",
    question: "An organization stores the most current customer data in a production database and maintains a read replica in a geographically separate data center. What disaster recovery strategy does this support?",
    options: {
      A: "Cold site recovery",
      B: "Database mirroring / geographic redundancy",
      C: "Incremental backup strategy",
      D: "Point-in-time recovery"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q158",
    exam: "Original",
    question: "A security analyst reviews a report that shows a large number of outbound connections from internal hosts to a single external IP on port 443 at regular 60-second intervals. What does this MOST likely indicate?",
    options: {
      A: "Normal HTTPS web browsing",
      B: "Command-and-control beaconing from malware",
      C: "Legitimate software performing automatic updates",
      D: "Network time synchronization"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q159",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a jump server (bastion host)?",
    options: {
      A: "A server that distributes load across multiple backend servers",
      B: "A hardened, monitored intermediary server used to access systems in a secure network zone",
      C: "A server that provides DNS resolution for internal networks",
      D: "A server used to terminate VPN connections"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q160",
    exam: "Original",
    question: "A company uses separate development, testing, and production environments with no direct connectivity between them. Which security principle does this implement?",
    options: {
      A: "Least privilege",
      B: "Environment segregation",
      C: "Defense in depth",
      D: "Fail secure"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q161",
    exam: "Original",
    question: "A developer performs a static analysis of source code before compiling. Which security activity is this?",
    options: {
      A: "Dynamic application security testing (DAST)",
      B: "Static application security testing (SAST)",
      C: "Interactive application security testing (IAST)",
      D: "Fuzz testing"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q162",
    exam: "Original",
    question: "A company's network engineer implements 802.1X authentication on all switch ports. What does this require for devices to connect to the network?",
    options: {
      A: "A valid MAC address registered in the MAC address table",
      B: "Authentication using credentials or certificates before being granted network access",
      C: "A valid DHCP lease from the corporate server",
      D: "A static IP address pre-configured by the administrator"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q163",
    exam: "Original",
    question: "Which of the following BEST describes the function of a reverse proxy?",
    options: {
      A: "It forwards client requests to multiple backend servers and hides their internal addresses",
      B: "It routes outbound traffic from internal clients to the internet",
      C: "It encrypts traffic between remote users and the corporate network",
      D: "It filters inbound email for spam and malware"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q164",
    exam: "Original",
    question: "An organization needs to securely destroy hard drives containing classified data before disposal. Which method provides the HIGHEST assurance that data cannot be recovered?",
    options: {
      A: "Three-pass overwrite with random data",
      B: "Degaussing",
      C: "Physical destruction (shredding or disintegrating)",
      D: "Formatting the drive"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q165",
    exam: "Original",
    question: "A company's security team implements privileged access workstations (PAWs) for administrative tasks. What is the PRIMARY security benefit?",
    options: {
      A: "Administrators can access both regular and privileged systems from a single device",
      B: "Privileged tasks are performed from dedicated, hardened systems isolated from general-purpose browsing and email",
      C: "PAWs replace the need for MFA on privileged accounts",
      D: "PAWs provide faster access to administrative consoles"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q166",
    exam: "Original",
    question: "An organization encrypts sensitive data before sending it to a cloud storage provider and retains the encryption keys on-premises. Which security concern does this PRIMARILY address?",
    options: {
      A: "Availability of data in the cloud",
      B: "Unauthorized access to data by the cloud provider or in the event of a cloud-side breach",
      C: "Data integrity during transmission",
      D: "Compliance with cloud provider security standards"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q167",
    exam: "Original",
    question: "Which of the following BEST describes a logic bomb?",
    options: {
      A: "Malware that replicates itself across networks",
      B: "Malicious code that activates when specific conditions are met, such as a date or user action",
      C: "A type of ransomware that encrypts only specific file types",
      D: "A rootkit that hides processes from the operating system"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q168",
    exam: "Original",
    question: "A security analyst is investigating an alert and needs to determine if a suspicious file has been seen before in other incidents. Which tool or resource would be MOST useful?",
    options: {
      A: "Vulnerability scanner",
      B: "Threat intelligence platform or malware sandbox with hash lookup",
      C: "Network traffic analyzer",
      D: "SIEM query for failed authentication"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q169",
    exam: "Original",
    question: "An organization stores customer data in multiple countries. Which regulation PRIMARILY governs the handling of EU residents' personal data regardless of where the company is located?",
    options: {
      A: "HIPAA",
      B: "PCI DSS",
      C: "GDPR",
      D: "SOX"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q170",
    exam: "Original",
    question: "A company deploys sensors throughout its network to detect unusual traffic patterns and automatically adjusts firewall rules in response. Which type of system is this?",
    options: {
      A: "Intrusion detection system (IDS)",
      B: "Intrusion prevention system (IPS)",
      C: "SIEM",
      D: "SOAR"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q171",
    exam: "Original",
    question: "Which of the following BEST describes the concept of a risk appetite?",
    options: {
      A: "The maximum amount of risk an organization can absorb before experiencing significant harm",
      B: "The amount and type of risk an organization is willing to accept in pursuit of its objectives",
      C: "The residual risk remaining after controls are implemented",
      D: "The likelihood of a threat actor exploiting a specific vulnerability"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q172",
    exam: "Original",
    question: "An attacker uses stolen credentials to log into a corporate VPN from a country where the company has no employees. Which control would MOST likely detect or prevent this?",
    options: {
      A: "Password complexity requirements",
      B: "Impossible travel detection / conditional access policies",
      C: "Full disk encryption on employee devices",
      D: "Regular password rotation policy"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q173",
    exam: "Original",
    question: "A company's development team uses a container registry that automatically scans images for known vulnerabilities before they are deployed. Which DevSecOps practice does this represent?",
    options: {
      A: "Infrastructure as code scanning",
      B: "Shift-left security — integrating security scanning early in the CI/CD pipeline",
      C: "Runtime application self-protection",
      D: "Penetration testing of container environments"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q174",
    exam: "Original",
    question: "Which of the following BEST describes a rootkit?",
    options: {
      A: "Malware that uses the victim's resources to mine cryptocurrency",
      B: "Malware designed to hide its presence and the presence of other malware from the operating system and security tools",
      C: "A tool used by attackers to crack password hashes",
      D: "Software that redirects browser traffic to malicious sites"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q175",
    exam: "Original",
    question: "A security engineer reviews a network diagram and notes that the authentication server can communicate directly with all internal servers. Which security improvement should be recommended?",
    options: {
      A: "Enable DNSSEC on the authentication server",
      B: "Implement network segmentation to restrict the authentication server's communications to only what is necessary",
      C: "Deploy an IPS on the authentication server",
      D: "Enable full disk encryption on the authentication server"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q176",
    exam: "Original",
    question: "Which of the following cloud deployment models provides cloud services exclusively to a single organization?",
    options: {
      A: "Public cloud",
      B: "Community cloud",
      C: "Hybrid cloud",
      D: "Private cloud"
    },
    answer: "D",
    tier: "locked"
  },
  {
    id: "Q177",
    exam: "Original",
    question: "An organization's security team conducts a business impact analysis (BIA). What is the PRIMARY output of a BIA?",
    options: {
      A: "A list of all known vulnerabilities in the organization's systems",
      B: "Identification of critical business functions and the potential impact of their disruption",
      C: "A risk register of all identified threats",
      D: "A disaster recovery plan with RTOs and RPOs"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q178",
    exam: "Original",
    question: "Which of the following BEST describes the primary purpose of a security awareness training program?",
    options: {
      A: "To eliminate all human error from security operations",
      B: "To educate employees on recognizing threats and following secure practices to reduce organizational risk",
      C: "To test employee compliance with security policies",
      D: "To replace technical controls with human vigilance"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q179",
    exam: "Original",
    question: "An analyst runs a vulnerability scan and discovers many false positives on a critical server. Which action should the analyst take FIRST?",
    options: {
      A: "Immediately patch all reported vulnerabilities",
      B: "Validate the findings by manually verifying whether the reported vulnerabilities actually exist on the system",
      C: "Disable the vulnerability scanner",
      D: "Report all findings to management without further investigation"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q180",
    exam: "Original",
    question: "A security team implements a solution that intercepts all outbound web traffic, decrypts it, inspects it for threats, and re-encrypts it before forwarding. Which technology is this?",
    options: {
      A: "Network-based IDS",
      B: "TLS/SSL inspection proxy",
      C: "DNS sinkhole",
      D: "Web application firewall"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q181",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a security baseline?",
    options: {
      A: "A documented minimum set of security configurations and controls that must be applied to all systems",
      B: "The result of a vulnerability scan used to compare against future scans",
      C: "A tool that measures the current security posture against industry benchmarks",
      D: "A list of approved software for installation on corporate systems"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q182",
    exam: "Original",
    question: "An attacker uses a technique that gradually increases access privileges by chaining together multiple small vulnerabilities instead of exploiting one critical vulnerability. Which concept does this describe?",
    options: {
      A: "Privilege escalation",
      B: "Vulnerability chaining",
      C: "Lateral movement",
      D: "Persistence"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q183",
    exam: "Original",
    question: "Which of the following is the MOST appropriate use case for a hardware security module (HSM)?",
    options: {
      A: "Encrypting backup tapes",
      B: "Securely generating, storing, and managing cryptographic keys in a tamper-resistant device",
      C: "Scanning network traffic for malware",
      D: "Providing redundant power to critical servers"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q184",
    exam: "Original",
    question: "A company performs quarterly access reviews to identify and remove accounts that no longer require access. Which security practice does this represent?",
    options: {
      A: "Identity proofing",
      B: "Access recertification / user access review",
      C: "Privileged access management",
      D: "Role-based access assignment"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q185",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a network TAP (Test Access Point)?",
    options: {
      A: "To block malicious traffic on a network segment",
      B: "To passively copy network traffic to monitoring or analysis tools without affecting traffic flow",
      C: "To perform load balancing across multiple network paths",
      D: "To test network connectivity and latency"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q186",
    exam: "Original",
    question: "A threat actor sends millions of requests to a DNS server using forged source IP addresses set to the victim's IP, causing the DNS server to flood the victim with responses. Which type of attack is this?",
    options: {
      A: "DDoS volumetric attack",
      B: "DNS amplification / reflection attack",
      C: "DNS cache poisoning",
      D: "Smurf attack"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q187",
    exam: "Original",
    question: "A security engineer wants to prevent web application users from performing cross-site request forgery (CSRF) attacks. Which control is MOST effective?",
    options: {
      A: "Input validation on all form fields",
      B: "Anti-CSRF tokens that are validated with each state-changing request",
      C: "Enforcing HTTPS on all pages",
      D: "Content security policy headers"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q188",
    exam: "Original",
    question: "An organization discovers that a software vendor has embedded a backdoor in a widely deployed product. Which type of attack does this represent?",
    options: {
      A: "Zero-day attack",
      B: "Supply chain compromise",
      C: "Insider threat",
      D: "Malware injection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q189",
    exam: "Original",
    question: "A security team wants to share threat intelligence with peer organizations in the same industry. Which format is MOST commonly used for machine-readable threat intelligence sharing?",
    options: {
      A: "PDF reports",
      B: "STIX/TAXII",
      C: "CSV files",
      D: "OpenIOC"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q190",
    exam: "Original",
    question: "A company implements a policy that system logs must be retained for at least 90 days and must be stored on a separate, access-controlled log server. Which security goal does this PRIMARILY serve?",
    options: {
      A: "Preventing log tampering and ensuring logs are available for incident investigation and compliance",
      B: "Reducing storage costs on production systems",
      C: "Enabling real-time threat detection",
      D: "Satisfying software licensing requirements"
    },
    answer: "A",
    tier: "locked"
  },
  {
    id: "Q191",
    exam: "Original",
    question: "An analyst reviews network traffic and sees connections from an internal server to multiple external IP addresses over uncommon high-numbered ports. Which threat does this MOST likely represent?",
    options: {
      A: "Port scanning originating from the internal server",
      B: "Command-and-control activity or data exfiltration",
      C: "Normal web browsing behavior",
      D: "An NTP misconfiguration"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q192",
    exam: "Original",
    question: "A developer uses a third-party library without reviewing it. The library contains a vulnerability that is later exploited. Which risk category does this represent?",
    options: {
      A: "Insider threat",
      B: "Software supply chain risk",
      C: "Zero-day vulnerability",
      D: "Misconfiguration risk"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q193",
    exam: "Original",
    question: "Which of the following is the BEST way to protect against brute force attacks on a web application login page?",
    options: {
      A: "Requiring passwords of at least 8 characters",
      B: "Implementing account lockout, CAPTCHA, and rate limiting",
      C: "Logging all failed login attempts",
      D: "Using HTTPS to protect credentials in transit"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q194",
    exam: "Original",
    question: "An organization implements a policy that requires two-person authorization for any access to the encryption key vault. Which control type is this?",
    options: {
      A: "Detective control",
      B: "Preventive control implementing dual control / two-person integrity",
      C: "Compensating control",
      D: "Corrective control"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q195",
    exam: "Original",
    question: "A company uses an AI-based security tool that learns normal user behavior and alerts on deviations. Which detection methodology does this represent?",
    options: {
      A: "Signature-based detection",
      B: "User and entity behavior analytics (UEBA)",
      C: "Rule-based detection",
      D: "Reputation-based detection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q196",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a security champions program?",
    options: {
      A: "To train all employees on basic cybersecurity hygiene",
      B: "To embed security-focused individuals within development teams to advocate for and implement security practices",
      C: "To provide advanced red team training for the security operations team",
      D: "To certify developers in secure coding standards"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q197",
    exam: "Original",
    question: "An attacker calls an employee pretending to be from the company's bank and convinces them to provide wire transfer information. Which attack type is this?",
    options: {
      A: "Phishing",
      B: "Vishing",
      C: "Business email compromise",
      D: "Smishing"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q198",
    exam: "Original",
    question: "A company discovers that its proprietary source code was found on a public GitHub repository. Which type of data loss event does this represent?",
    options: {
      A: "Intentional insider exfiltration",
      B: "Unintentional data exposure through misconfigured repository permissions",
      C: "A supply chain attack targeting the code repository",
      D: "A web application injection attack"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q199",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of vulnerability disclosure policies?",
    options: {
      A: "To allow organizations to hide vulnerabilities from the public indefinitely",
      B: "To establish a framework for researchers to report vulnerabilities responsibly and for organizations to remediate them before public disclosure",
      C: "To require immediate public disclosure of all discovered vulnerabilities",
      D: "To protect organizations from legal liability when vulnerabilities are discovered"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q200",
    exam: "Original",
    question: "A company deploys multi-factor authentication across all user accounts. An attacker compromises one user's password. What additional factor must the attacker bypass to gain access?",
    options: {
      A: "Nothing — the password is sufficient for authentication",
      B: "A second factor such as a hardware token, authenticator app code, or biometric",
      C: "The user's security questions",
      D: "The user's email confirmation"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q201",
    exam: "Original",
    question: "A security analyst identifies a vulnerability in a critical system that cannot be patched immediately due to operational constraints. Which response is MOST appropriate?",
    options: {
      A: "Accept the risk without further action",
      B: "Implement compensating controls such as network isolation, enhanced monitoring, or a WAF rule to reduce risk while patching is scheduled",
      C: "Shut down the system until the patch is applied",
      D: "Escalate to management and wait for approval before doing anything"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q202",
    exam: "Original",
    question: "An organization is evaluating whether to deploy on-premises or cloud-based security solutions. Which factor MOST directly affects the decision from a compliance perspective?",
    options: {
      A: "Total cost of ownership",
      B: "Data residency and regulatory requirements governing where data must be stored",
      C: "The vendor's market share",
      D: "The availability of technical support"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q203",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of an open authorization (OAuth) framework?",
    options: {
      A: "To provide encrypted tunnels between services",
      B: "To allow third-party applications to access resources on behalf of a user without sharing the user's credentials",
      C: "To authenticate users with username and password",
      D: "To federate identities across multiple organizations"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q204",
    exam: "Original",
    question: "A company requires that every access to sensitive data be logged, including who accessed it, when, and what actions were taken. Which security principle does this support?",
    options: {
      A: "Confidentiality",
      B: "Accountability / auditability",
      C: "Availability",
      D: "Integrity"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q205",
    exam: "Original",
    question: "An organization suffers a breach and the CISO needs to notify affected customers within 72 hours. Which regulation MOST likely mandates this requirement?",
    options: {
      A: "HIPAA",
      B: "PCI DSS",
      C: "GDPR",
      D: "SOX"
    },
    answer: "C",
    tier: "locked"
  },
  {
    id: "Q206",
    exam: "Original",
    question: "A network engineer wants to prevent a switch port from learning more than one MAC address to stop MAC flooding attacks. Which port security feature achieves this?",
    options: {
      A: "802.1X port authentication",
      B: "Port security with MAC address limiting",
      C: "BPDU guard",
      D: "Dynamic ARP inspection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q207",
    exam: "Original",
    question: "Which of the following BEST describes the concept of a software bill of materials (SBOM)?",
    options: {
      A: "A list of all software licenses used by an organization",
      B: "A comprehensive inventory of all components, libraries, and dependencies in a software product",
      C: "A report of all software vulnerabilities discovered during testing",
      D: "A document listing all approved software for deployment"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q208",
    exam: "Original",
    question: "A security team monitors DNS queries and notices that internal hosts are querying unusual subdomains of a legitimate domain at high frequency. Which type of attack does this MOST likely indicate?",
    options: {
      A: "DNS cache poisoning",
      B: "DNS tunneling for data exfiltration or C2 communication",
      C: "DDoS amplification attack",
      D: "BGP route hijacking"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q209",
    exam: "Original",
    question: "An organization's policy requires that any employee who suspects a security incident must report it to the security team within one hour. Which type of control is this?",
    options: {
      A: "Technical control",
      B: "Administrative control",
      C: "Physical control",
      D: "Corrective control"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q210",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a security information sharing community (ISAC)?",
    options: {
      A: "To provide incident response services to member organizations",
      B: "To facilitate sharing of threat intelligence and security information among organizations in the same sector",
      C: "To certify security products and solutions",
      D: "To provide regulatory compliance guidance to member organizations"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q211",
    exam: "Original",
    question: "A developer implements output encoding before displaying user-supplied data in a web page. Which vulnerability does this PRIMARILY prevent?",
    options: {
      A: "SQL injection",
      B: "Cross-site scripting (XSS)",
      C: "Command injection",
      D: "XML external entity injection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q212",
    exam: "Original",
    question: "An organization uses a privileged access management (PAM) solution to check out time-limited credentials for accessing critical systems. Which security benefit does this PRIMARILY provide?",
    options: {
      A: "It eliminates the need for multi-factor authentication",
      B: "It ensures privileged credentials are not shared, are rotated automatically, and access is fully audited",
      C: "It provides a single sign-on experience for privileged users",
      D: "It replaces the need for network segmentation around privileged systems"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q213",
    exam: "Original",
    question: "A company implements a policy where security patches must be applied within 30 days of release for non-critical systems and within 72 hours for critical systems. Which security practice does this represent?",
    options: {
      A: "Vulnerability assessment",
      B: "Patch management with risk-based prioritization",
      C: "Configuration management",
      D: "Change management"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q214",
    exam: "Original",
    question: "An attacker uses a compromised web server to launch attacks against other servers on the same internal network. Which technique is this?",
    options: {
      A: "Privilege escalation",
      B: "Pivoting",
      C: "Persistence",
      D: "Defense evasion"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q215",
    exam: "Original",
    question: "Which of the following BEST describes the difference between a hot site and a cold site in disaster recovery?",
    options: {
      A: "A hot site is operated by a third party; a cold site is owned by the organization",
      B: "A hot site is fully equipped and can assume operations with minimal delay; a cold site provides only basic infrastructure and requires significant setup time",
      C: "A hot site is used for data backups; a cold site is used for application recovery",
      D: "A hot site has no redundancy; a cold site has full hardware redundancy"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q216",
    exam: "Original",
    question: "An organization wants to detect compromised accounts being used outside of normal business hours. Which tool or feature provides this capability?",
    options: {
      A: "Data loss prevention",
      B: "UEBA or SIEM with behavioral analytics and time-based alerting",
      C: "Endpoint detection and response",
      D: "Network traffic analyzer"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q217",
    exam: "Original",
    question: "A security engineer designs a system where each microservice only has credentials for the specific databases and APIs it needs, with no excess permissions. Which security principle is applied?",
    options: {
      A: "Defense in depth",
      B: "Least privilege",
      C: "Separation of duties",
      D: "Zero trust"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q218",
    exam: "Original",
    question: "Which of the following BEST describes the function of a content delivery network (CDN) from a security perspective?",
    options: {
      A: "It encrypts all data in transit between servers",
      B: "It can absorb DDoS attacks and reduce load on origin servers while caching content closer to users",
      C: "It provides web application firewall capabilities for all customers",
      D: "It monitors traffic for indicators of compromise"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q219",
    exam: "Original",
    question: "An organization sends automated alerts to all customers whose accounts were accessed from a new device or location. Which security concept does this support?",
    options: {
      A: "Non-repudiation",
      B: "User notification and account activity transparency to help detect unauthorized access",
      C: "Availability",
      D: "Data integrity"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q220",
    exam: "Original",
    question: "A security policy mandates that system clocks across all servers must be synchronized to a reliable time source. Why is this important for security?",
    options: {
      A: "It ensures user sessions expire at the correct time",
      B: "Accurate and consistent timestamps are critical for log correlation, forensic investigations, and detecting anomalies",
      C: "It prevents replay attacks on authentication protocols",
      D: "It ensures certificate validity periods are accurate"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q221",
    exam: "Original",
    question: "An incident responder discovers an attacker has created a scheduled task on a compromised Windows host to re-launch malware after reboot. Which attacker goal does this represent?",
    options: {
      A: "Lateral movement",
      B: "Persistence",
      C: "Exfiltration",
      D: "Privilege escalation"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q222",
    exam: "Original",
    question: "A company uses role-based access control and periodically reviews whether employee roles have changed. Employees whose roles changed still retain permissions from their old role. Which issue does this describe?",
    options: {
      A: "Excessive shared accounts",
      B: "Permission creep / privilege creep",
      C: "Improper role assignment",
      D: "Shadow IT access"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q223",
    exam: "Original",
    question: "Which of the following is the MOST effective way to prevent SQL injection in a web application?",
    options: {
      A: "Encrypting the database connection string",
      B: "Using parameterized queries or prepared statements for all database interactions",
      C: "Filtering out all special characters from user input",
      D: "Running the database under a least-privilege service account"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q224",
    exam: "Original",
    question: "A company's incident response plan defines steps to take after containing an incident to prevent it from recurring. Which phase of the incident response lifecycle does this represent?",
    options: {
      A: "Containment",
      B: "Eradication",
      C: "Recovery",
      D: "Lessons learned"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q225",
    exam: "Original",
    question: "A security architect recommends implementing network monitoring that captures and analyzes all packet payloads on a sensitive network segment. Which tool enables this?",
    options: {
      A: "Network flow analysis",
      B: "Packet capture and deep packet inspection",
      C: "Port mirroring only",
      D: "SNMP polling"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q226",
    exam: "Original",
    question: "An organization's acceptable use policy prohibits use of personal cloud storage for company data. An employee regularly uploads work files to a personal Dropbox account. Which risk does this create?",
    options: {
      A: "Violation of acceptable use policy only",
      B: "Data stored outside of organization control, potentially exposing it to unauthorized access and regulatory violations",
      C: "Increased bandwidth consumption on the corporate network",
      D: "Legal liability if the employee's personal account is hacked"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q227",
    exam: "Original",
    question: "A security analyst receives an alert that an employee's account is logging in from both New York and Tokyo within a 30-minute window. Which control MOST directly generated this alert?",
    options: {
      A: "Signature-based intrusion detection",
      B: "Impossible travel / anomaly-based behavioral analytics",
      C: "Firewall geo-blocking rule",
      D: "Data loss prevention policy"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q228",
    exam: "Original",
    question: "An organization uses a third-party auditor to issue an independent report on the design and operating effectiveness of security controls relevant to service commitments. Which type of report is this?",
    options: {
      A: "Penetration test report",
      B: "SOC 2 Type II report",
      C: "Internal audit report",
      D: "Vulnerability assessment report"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q229",
    exam: "Original",
    question: "A developer stores session tokens in URL parameters instead of cookies. Why is this a security risk?",
    options: {
      A: "URL parameters cannot be transmitted over HTTPS",
      B: "URLs are often stored in server logs, browser history, and referrer headers, which can expose session tokens",
      C: "Session tokens in URLs are not encrypted by TLS",
      D: "URL parameters are limited in size and can cause session expiration"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q230",
    exam: "Original",
    question: "Which of the following BEST describes the purpose of a software composition analysis (SCA) tool?",
    options: {
      A: "To perform dynamic testing of web applications for injection vulnerabilities",
      B: "To identify open-source components and their known vulnerabilities within an application's codebase",
      C: "To measure code quality and cyclomatic complexity",
      D: "To perform static analysis for coding errors and logic flaws"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q231",
    exam: "Original",
    question: "A company's IT team installs a new web server and forgets to change the default administrator credentials. An attacker exploits this. Which root cause best describes this vulnerability?",
    options: {
      A: "Unpatched software vulnerability",
      B: "Misconfiguration — use of default credentials",
      C: "Insider threat",
      D: "Zero-day exploitation"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q232",
    exam: "Original",
    question: "A security analyst wants to determine if a specific threat actor group is likely to target their organization based on the type of industry and the actor's known motivations. Which intelligence concept does this represent?",
    options: {
      A: "Indicator of compromise analysis",
      B: "Threat actor attribution and targeting analysis",
      C: "Vulnerability threat mapping",
      D: "Attack surface analysis"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q233",
    exam: "Original",
    question: "An organization deploys a canary token — a fake credential embedded in a document — to detect if an attacker accesses it. Which detection technique is this?",
    options: {
      A: "Signature-based detection",
      B: "Deception technology / honeytokens",
      C: "Behavioral analytics",
      D: "File integrity monitoring"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q234",
    exam: "Original",
    question: "Which of the following describes the MAIN purpose of a bring-your-own-device (BYOD) policy?",
    options: {
      A: "To prohibit personal devices from accessing corporate resources",
      B: "To define the acceptable use, security requirements, and organizational rights regarding personal devices used for work",
      C: "To provide guidance on purchasing personally owned devices",
      D: "To specify the technical controls deployed on corporate-owned devices"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q235",
    exam: "Original",
    question: "An application uses JWT (JSON Web Tokens) for session management. An attacker changes the algorithm in the token header to 'none' to bypass signature verification. Which vulnerability is being exploited?",
    options: {
      A: "Token replay attack",
      B: "JWT algorithm confusion / 'alg:none' attack",
      C: "Cross-site scripting",
      D: "Session fixation"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q236",
    exam: "Original",
    question: "A company implements geo-IP blocking at its firewall to prevent connections from countries it does not operate in. Which limitation should the security team be aware of?",
    options: {
      A: "Geo-IP blocking is not supported on modern next-generation firewalls",
      B: "Attackers can bypass geo-IP blocking using VPNs, proxies, or compromised hosts in allowed countries",
      C: "Geo-IP blocking violates net neutrality regulations",
      D: "Geo-IP databases are always 100% accurate, making false positives impossible"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q237",
    exam: "Original",
    question: "Which of the following BEST describes the concept of a shared responsibility model in cloud computing?",
    options: {
      A: "The cloud provider is responsible for all security aspects of the deployment",
      B: "Security responsibilities are divided between the cloud provider and the customer, with each responsible for different layers depending on the service model",
      C: "The customer is responsible for all security in cloud environments",
      D: "Security responsibilities are negotiated individually in each SLA"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q238",
    exam: "Original",
    question: "A security engineer adds HTTP security headers including Content-Security-Policy and X-Frame-Options to a web application. Which attacks do these headers PRIMARILY help mitigate?",
    options: {
      A: "SQL injection and CSRF",
      B: "Cross-site scripting (XSS) and clickjacking",
      C: "Buffer overflow and path traversal",
      D: "Brute force and credential stuffing"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q239",
    exam: "Original",
    question: "A company implements a policy that all employees must complete security awareness training annually and that results are tracked. Which risk management function does this PRIMARILY serve?",
    options: {
      A: "Risk quantification",
      B: "Risk reduction through employee education and measurable compliance tracking",
      C: "Risk transfer",
      D: "Risk avoidance"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q240",
    exam: "Original",
    question: "An attacker gains access to a session cookie by injecting a script into a web page that sends the cookie to an external server. Which attack type is this?",
    options: {
      A: "CSRF",
      B: "Stored XSS leading to session hijacking",
      C: "Clickjacking",
      D: "SQL injection"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q241",
    exam: "Original",
    question: "An organization deploys security cameras, motion sensors, and guards at its data center. These controls are designed to stop physical intrusions before they occur. Which control type are these?",
    options: {
      A: "Detective controls",
      B: "Preventive physical controls",
      C: "Corrective controls",
      D: "Compensating controls"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q242",
    exam: "Original",
    question: "A security analyst is investigating a compromised Linux server and wants to identify all active network connections and listening ports. Which command should they run?",
    options: {
      A: "ifconfig -a",
      B: "ss -tulnp or netstat -tulnp",
      C: "ps aux",
      D: "lsof -i"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q243",
    exam: "Original",
    question: "Which of the following BEST explains the purpose of a SOC 2 Type I report compared to a SOC 2 Type II report?",
    options: {
      A: "Type I evaluates operational effectiveness over a period of time; Type II evaluates design at a point in time",
      B: "Type I evaluates whether controls are suitably designed at a point in time; Type II evaluates the operating effectiveness of controls over a period of time",
      C: "Type I is performed by internal auditors; Type II is performed by external auditors",
      D: "Type I covers security controls only; Type II covers all trust service criteria"
    },
    answer: "B",
    tier: "locked"
  },
  {
    id: "Q244",
    exam: "Original",
    question: "A healthcare organization implements strict access controls so that medical staff can only access records for patients currently under their care. Which principle does this apply?",
    options: {
      A: "Separation of duties",
      B: "Need to know",
      C: "Least privilege",
      D: "Both B and C apply"
    },
    answer: "D",
    tier: "locked"
  },
  {
    id: "Q245",
    exam: "Original",
    question: "An organization's security team discovers that all of the organization's public-facing IP addresses are listed in an attacker's reconnaissance document. Which action should the security team take FIRST?",
    options: {
      A: "Immediately change all public IP addresses",
      B: "Conduct a thorough review of all exposed services on those IPs and prioritize hardening the most critical or vulnerable ones",
      C: "Block all inbound traffic to those IPs",
      D: "Shut down all internet-facing systems"
    },
    answer: "B",
    tier: "locked"
  }
]

export default questions
