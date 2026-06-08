// PassPlus - Original Security+ SY0-701 Practice Questions
// 255 completely original questions based on CompTIA public exam objectives
// No content derived from any copyrighted source

export interface Question {
  id: string;
  exam: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
  domain: number;
  tier: "free" | "locked";
}

export const questions: Question[] = [
  // ============================================
  // DOMAIN 1: General Security Concepts (Q001-Q059)
  // ============================================
  {
    id: "Q001", domain: 1, exam: "Original",
    question: "A security team is implementing controls to protect sensitive data. Which of the following BEST describes a control that prevents unauthorized access through technical means?",
    options: { A: "Security policy", B: "Access control list", C: "Security awareness training", D: "Background check" },
    answer: "B", tier: "free"
  },
  {
    id: "Q002", domain: 1, exam: "Original",
    question: "An organization wants to ensure that no single employee can complete a critical financial transaction alone. Which security principle does this BEST represent?",
    options: { A: "Least privilege", B: "Defense in depth", C: "Separation of duties", D: "Need to know" },
    answer: "C", tier: "free"
  },
  {
    id: "Q003", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a detective security control?",
    options: { A: "A firewall blocking unauthorized traffic", B: "An IDS alerting on suspicious network activity", C: "Encryption protecting data at rest", D: "A security policy preventing data sharing" },
    answer: "B", tier: "free"
  },
  {
    id: "Q004", domain: 1, exam: "Original",
    question: "A company requires employees to use badge readers to enter the server room and also enter a PIN. Which concept does this BEST demonstrate?",
    options: { A: "Single factor authentication", B: "Multi-factor authentication", C: "Role-based access control", D: "Discretionary access control" },
    answer: "B", tier: "free"
  },
  {
    id: "Q005", domain: 1, exam: "Original",
    question: "Which of the following is an example of a physical security control?",
    options: { A: "Antivirus software", B: "Data encryption", C: "Mantrap", D: "Firewall rules" },
    answer: "C", tier: "free"
  },
  {
    id: "Q006", domain: 1, exam: "Original",
    question: "An administrator grants a user only the permissions required to perform their job function and nothing more. Which principle is being followed?",
    options: { A: "Defense in depth", B: "Least privilege", C: "Zero trust", D: "Separation of duties" },
    answer: "B", tier: "free"
  },
  {
    id: "Q007", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a corrective security control?",
    options: { A: "A camera recording activity to support post-incident investigation", B: "A warning sign posted to discourage unauthorized physical access", C: "Restoring a system from backup after an attack", D: "Encrypting sensitive files to prevent unauthorized data disclosure" },
    answer: "C", tier: "free"
  },
  {
    id: "Q008", domain: 1, exam: "Original",
    question: "A security administrator wants to verify that a message has not been altered in transit. Which of the following should be used?",
    options: { A: "Symmetric encryption", B: "Hashing", C: "Public key infrastructure", D: "Steganography" },
    answer: "B", tier: "free"
  },
  {
    id: "Q009", domain: 1, exam: "Original",
    question: "Which of the following authentication factors is represented by a fingerprint scan?",
    options: { A: "Something you know", B: "Something you have", C: "Something you are", D: "Somewhere you are" },
    answer: "C", tier: "free"
  },
  {
    id: "Q010", domain: 1, exam: "Original",
    question: "A deterrent control is BEST described as which of the following?",
    options: { A: "A control that stops an attack from occurring", B: "A control that discourages potential attackers", C: "A control that identifies attacks in progress", D: "A control that recovers systems after an attack" },
    answer: "B", tier: "free"
  },
  {
    id: "Q011", domain: 1, exam: "Original",
    question: "Which of the following BEST describes non-repudiation?",
    options: { A: "Ensuring data is accessible when needed", B: "Preventing unauthorized access to data", C: "Ensuring a sender cannot deny sending a message", D: "Protecting data from unauthorized modification" },
    answer: "C", tier: "free"
  },
  {
    id: "Q012", domain: 1, exam: "Original",
    question: "An organization deploys multiple overlapping security controls to protect critical assets. Which principle does this BEST represent?",
    options: { A: "Least privilege", B: "Zero trust", C: "Defense in depth", D: "Separation of duties" },
    answer: "C", tier: "free"
  },
  {
    id: "Q013", domain: 1, exam: "Original",
    question: "Which of the following is an example of a compensating control?",
    options: { A: "Installing a vendor-supplied patch to directly remediate a known software vulnerability", B: "Using network segmentation when a vulnerable system cannot be patched", C: "Enabling full disk encryption on laptops to protect data if a device is lost or stolen", D: "Requiring MFA for all remote access sessions to reduce credential-based attack risk" },
    answer: "B", tier: "free"
  },
  {
    id: "Q014", domain: 1, exam: "Original",
    question: "A user presents a smart card and enters a PIN to access a system. The smart card represents which authentication factor?",
    options: { A: "Something you know", B: "Something you have", C: "Something you are", D: "Somewhere you are" },
    answer: "B", tier: "free"
  },
  {
    id: "Q015", domain: 1, exam: "Original",
    question: "Which of the following BEST describes the concept of zero trust?",
    options: { A: "Trusting all users inside the network perimeter without requiring further authentication", B: "Never trusting any user or device without verification regardless of location", C: "Blocking all external network traffic by default unless explicitly permitted by policy", D: "Requiring physical presence at a facility before granting any level of system access" },
    answer: "B", tier: "free"
  },
  {
    id: "Q016", domain: 1, exam: "Original",
    question: "An organization uses a honeypot to attract attackers. Which type of control is this?",
    options: { A: "Preventive", B: "Corrective", C: "Detective", D: "Compensating" },
    answer: "C", tier: "free"
  },
  {
    id: "Q017", domain: 1, exam: "Original",
    question: "Which of the following cryptographic concepts ensures that data remains unchanged during transmission?",
    options: { A: "Confidentiality", B: "Availability", C: "Integrity", D: "Authentication" },
    answer: "C", tier: "free"
  },
  {
    id: "Q018", domain: 1, exam: "Original",
    question: "A security policy requires that all administrative actions be performed by two authorized individuals simultaneously. Which principle does this implement?",
    options: { A: "Least privilege", B: "Dual control", C: "Need to know", D: "Defense in depth" },
    answer: "B", tier: "free"
  },
  {
    id: "Q019", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a directive control?",
    options: { A: "A firewall blocking malicious traffic", B: "A policy requiring employees to lock their screens", C: "An IPS stopping an active attack", D: "A backup system restoring lost data" },
    answer: "B", tier: "free"
  },
  {
    id: "Q020", domain: 1, exam: "Original",
    question: "An attacker attempts to access a system using stolen credentials. Which security control would MOST effectively detect this?",
    options: { A: "Password complexity requirements", B: "User behavior analytics", C: "Full disk encryption", D: "Network segmentation" },
    answer: "B", tier: "free"
  },
  {
    id: "Q021", domain: 1, exam: "Original",
    question: "Which of the following BEST describes asymmetric encryption?",
    options: { A: "Uses the same key for encryption and decryption", B: "Uses a public key for encryption and private key for decryption", C: "Uses a shared secret key distributed securely", D: "Uses hashing to protect data confidentiality" },
    answer: "B", tier: "free"
  },
  {
    id: "Q022", domain: 1, exam: "Original",
    question: "A certificate authority signs a digital certificate. Which security service does this PRIMARILY provide?",
    options: { A: "Confidentiality", B: "Availability", C: "Authentication", D: "Authorization" },
    answer: "C", tier: "free"
  },
  {
    id: "Q023", domain: 1, exam: "Original",
    question: "Which of the following is a characteristic of symmetric encryption?",
    options: { A: "Uses two mathematically related keys", B: "Slower than asymmetric encryption", C: "Uses the same key for encryption and decryption", D: "Primarily used for key exchange" },
    answer: "C", tier: "free"
  },
  {
    id: "Q024", domain: 1, exam: "Original",
    question: "An organization wants to ensure systems remain operational during an attack. Which component of the CIA triad does this address?",
    options: { A: "Confidentiality", B: "Integrity", C: "Availability", D: "Authentication" },
    answer: "C", tier: "free"
  },
  {
    id: "Q025", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a gap analysis in security?",
    options: { A: "Identifying vulnerabilities in network infrastructure", B: "Comparing current security posture to a desired state", C: "Testing systems for known exploits", D: "Reviewing user access permissions" },
    answer: "B", tier: "free"
  },
  {
    id: "Q026", domain: 1, exam: "Original",
    question: "A security team implements RBAC. Which of the following BEST describes this access control model?",
    options: { A: "Access is granted based on data classification levels", B: "Access is granted based on job function", C: "Resource owners determine access permissions", D: "Access is granted based on physical location" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q027", domain: 1, exam: "Original",
    question: "Which of the following authentication methods is considered the MOST secure?",
    options: { A: "Password only", B: "Smart card only", C: "Password and security question", D: "Password and hardware token" },
    answer: "D", tier: "locked"
  },
  {
    id: "Q028", domain: 1, exam: "Original",
    question: "A company stores password hashes with a unique random value added before hashing. What is this technique called?",
    options: { A: "Key stretching", B: "Salting", C: "Tokenization", D: "Obfuscation" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q029", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a PKI?",
    options: { A: "A system for managing symmetric encryption keys", B: "A framework for managing digital certificates and public keys", C: "A protocol for secure email communication", D: "A method for storing passwords securely" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q030", domain: 1, exam: "Original",
    question: "An administrator configures a system to lock after three failed login attempts. Which type of control is this?",
    options: { A: "Detective", B: "Corrective", C: "Preventive", D: "Compensating" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q031", domain: 1, exam: "Original",
    question: "Which of the following BEST describes steganography?",
    options: { A: "Encrypting data to prevent unauthorized access", B: "Hiding data within another file or medium", C: "Replacing sensitive data with tokens", D: "Hashing data to verify integrity" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q032", domain: 1, exam: "Original",
    question: "A security administrator implements mandatory access control. Which of the following BEST describes this model?",
    options: { A: "Resource owners individually assign and manage permissions for their own data", B: "Access is based on job roles defined and managed by system administrators", C: "Access is based on security labels assigned by the system", D: "Users can delegate or transfer their own access rights to other individuals" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q033", domain: 1, exam: "Original",
    question: "Which of the following is an example of a preventive control?",
    options: { A: "Security camera", B: "Intrusion detection system", C: "Data backup", D: "Firewall" },
    answer: "D", tier: "locked"
  },
  {
    id: "Q034", domain: 1, exam: "Original",
    question: "An organization requires all vendors to sign an agreement before accessing systems. Which type of agreement is this?",
    options: { A: "SLA", B: "NDA", C: "MOU", D: "BPA" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q035", domain: 1, exam: "Original",
    question: "Which of the following BEST describes tokenization?",
    options: { A: "Encrypting data with a symmetric key so only authorized parties can read it", B: "Replacing sensitive data with a non-sensitive placeholder", C: "Applying a one-way hash function to data to verify its integrity after transmission", D: "Adding a random salt value to data before hashing to prevent rainbow table attacks" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q036", domain: 1, exam: "Original",
    question: "A security team conducts a tabletop exercise. Which of the following BEST describes this activity?",
    options: { A: "Actively testing systems for vulnerabilities", B: "Simulating an incident response scenario through discussion", C: "Performing a full failover to a backup site", D: "Scanning the network for unauthorized devices" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q037", domain: 1, exam: "Original",
    question: "Which of the following cryptographic algorithms is considered asymmetric?",
    options: { A: "AES", B: "3DES", C: "RSA", D: "HMAC" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q038", domain: 1, exam: "Original",
    question: "An organization implements biometric authentication for data center access. Which authentication factor does this represent?",
    options: { A: "Something you know", B: "Something you have", C: "Something you are", D: "Somewhere you are" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q039", domain: 1, exam: "Original",
    question: "Which of the following BEST describes the purpose of a digital signature?",
    options: { A: "Encrypting message content using the recipient's public key to ensure confidentiality", B: "Verifying the identity of the sender and ensuring message integrity", C: "Storing private encryption keys securely within a hardware security module", D: "Providing sender anonymity so recipients cannot identify the message origin" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q040", domain: 1, exam: "Original",
    question: "A security administrator wants to implement the strongest password policy. Which of the following combinations is MOST effective?",
    options: { A: "Minimum 8 characters, no complexity requirements", B: "Minimum 12 characters with complexity and regular rotation", C: "Maximum 6 characters changed monthly", D: "Minimum 8 characters, no expiration" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q041", domain: 1, exam: "Original",
    question: "Which of the following is an example of a technical control?",
    options: { A: "Security awareness training", B: "Acceptable use policy", C: "Intrusion prevention system", D: "Background check" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q042", domain: 1, exam: "Original",
    question: "A company implements a clean desk policy. Which type of security control is this?",
    options: { A: "Technical", B: "Physical", C: "Administrative", D: "Compensating" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q043", domain: 1, exam: "Original",
    question: "Which of the following hashing algorithms produces a 256-bit output?",
    options: { A: "MD5", B: "SHA-1", C: "SHA-256", D: "SHA-512" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q044", domain: 1, exam: "Original",
    question: "An organization wants to prevent data from being accessed if a laptop is stolen. Which control is MOST effective?",
    options: { A: "Strong password policy", B: "Full disk encryption", C: "Network access control", D: "Screen lock timeout" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q045", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a certificate revocation list?",
    options: { A: "A list of certificate authorities trusted by browsers and operating systems", B: "A list of certificates that have been invalidated before expiration", C: "A centralized repository storing the public keys of all enrolled PKI users", D: "A historical log of all certificate signing requests submitted to the CA" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q046", domain: 1, exam: "Original",
    question: "A security team uses SIEM to correlate events from multiple sources. Which security function does this PRIMARILY support?",
    options: { A: "Prevention", B: "Detection", C: "Recovery", D: "Deterrence" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q047", domain: 1, exam: "Original",
    question: "Which of the following BEST describes discretionary access control?",
    options: { A: "Access is determined by security clearance levels", B: "The resource owner determines who can access the resource", C: "Access is based on job roles defined by administrators", D: "The system automatically assigns access based on rules" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q048", domain: 1, exam: "Original",
    question: "An organization deploys an HSM to manage encryption keys. Which security benefit does this PRIMARILY provide?",
    options: { A: "Accelerating bulk encryption operations using dedicated hardware processors", B: "Secure storage and management of cryptographic keys", C: "Automatically renewing certificates before they expire without administrator intervention", D: "Encrypting all inbound and outbound network traffic at the perimeter" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q049", domain: 1, exam: "Original",
    question: "Which of the following BEST describes key escrow?",
    options: { A: "Sharing encryption keys directly with authorized business partners for collaborative decryption", B: "Storing a copy of encryption keys with a trusted third party", C: "Wrapping encryption keys with another key before transmitting them to a remote recipient", D: "Automatically rotating encryption keys on a defined schedule to limit exposure windows" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q050", domain: 1, exam: "Original",
    question: "A company requires users to re-authenticate after 30 minutes of inactivity. Which security principle does this support?",
    options: { A: "Defense in depth", B: "Least privilege", C: "Session management", D: "Zero trust" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q051", domain: 1, exam: "Original",
    question: "Which of the following is the PRIMARY purpose of a TPM?",
    options: { A: "Providing transparent encryption for all network traffic leaving the device", B: "Storing cryptographic keys and enabling hardware-based security", C: "Managing multi-factor user authentication through software-based credential verification", D: "Collecting and reporting real-time performance metrics to a central management console" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q052", domain: 1, exam: "Original",
    question: "An administrator implements ABAC. Which of the following BEST describes this model?",
    options: { A: "Access granted based solely on a user's job title within the organizational hierarchy", B: "Access based on attributes of users, resources, and environment", C: "Access determined by government-assigned security clearance levels and need-to-know rules", D: "Access permissions set at the discretion of individual resource owners for their own assets" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q053", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a self-signed certificate?",
    options: { A: "A certificate signed by a trusted third-party CA", B: "A certificate signed by the entity that created it", C: "A certificate used only for internal email encryption", D: "A certificate that never expires" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q054", domain: 1, exam: "Original",
    question: "A security administrator wants to ensure only authorized devices can connect to the network. Which technology should be implemented?",
    options: { A: "VPN", B: "NAC", C: "IDS", D: "DLP" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q055", domain: 1, exam: "Original",
    question: "Which of the following BEST describes the purpose of OCSP?",
    options: { A: "Encrypting the full certificate payload when transmitting between PKI entities", B: "Checking the revocation status of a digital certificate in real time", C: "Automatically distributing trusted root CA certificates to all enrolled client devices", D: "Managing and tracking pending certificate renewal requests submitted to the CA" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q056", domain: 1, exam: "Original",
    question: "A company implements data masking on customer records in a test database. Which security goal does this PRIMARILY achieve?",
    options: { A: "Integrity", B: "Availability", C: "Confidentiality", D: "Non-repudiation" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q057", domain: 1, exam: "Original",
    question: "Which of the following BEST describes a wildcard certificate?",
    options: { A: "A certificate bound to exactly one fully qualified domain name with no subdomain coverage", B: "A certificate that secures a domain and all its subdomains", C: "A certificate jointly issued and signed by two or more certificate authorities simultaneously", D: "A certificate specifically designed to authenticate the publisher of software executables" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q058", domain: 1, exam: "Original",
    question: "An organization wants to implement SSO for all internal applications. Which PRIMARY benefit does this provide?",
    options: { A: "Enforcing stronger password length and complexity requirements across all applications", B: "Reduced password fatigue and improved user experience", C: "Complete elimination of the need for multi-factor authentication across the enterprise", D: "Automatically provisioning new user accounts when employees join the organization" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q059", domain: 1, exam: "Original",
    question: "Which of the following BEST describes federation in identity management?",
    options: { A: "Requiring users to re-authenticate at each application boundary regardless of prior session state", B: "Allowing users to use credentials from one organization to access resources in another", C: "Synchronizing password hashes across multiple identity directories to keep credentials consistent", D: "Migrating and centralizing all user accounts from distributed systems into one identity store" },
    answer: "B", tier: "locked"
  },

  // ============================================
  // DOMAIN 2: Threats, Vulnerabilities & Mitigations (Q060-Q113)
  // ============================================
  {
    id: "Q060", domain: 2, exam: "Original",
    question: "An attacker sends an email pretending to be from the CEO asking an employee to wire funds immediately. Which type of attack is this?",
    options: { A: "A text message-based phishing attack targeting victims via SMS on mobile devices", B: "A voice-based phishing attack where the attacker calls the victim over the phone", C: "Business email compromise", D: "An attack that compromises a website frequently visited by a specific target group" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q061", domain: 2, exam: "Original",
    question: "Which of the following threat actors is MOST likely motivated by financial gain?",
    options: { A: "Hacktivist", B: "Nation-state", C: "Organized crime", D: "Insider threat" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q062", domain: 2, exam: "Original",
    question: "An attacker compromises a website frequently visited by software developers to distribute malware. Which attack type is this?",
    options: { A: "Phishing", B: "Watering hole", C: "Typosquatting", D: "Drive-by download" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q063", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a zero-day vulnerability?",
    options: { A: "A vulnerability that has been patched but not deployed", B: "A vulnerability unknown to the vendor with no available patch", C: "A vulnerability that takes zero days to exploit", D: "A vulnerability found during a penetration test" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q064", domain: 2, exam: "Original",
    question: "An employee receives a text message claiming their bank account has been locked and must click a link to verify their identity. Which attack type is this?",
    options: { A: "Phishing", B: "Vishing", C: "Smishing", D: "Spear phishing" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q065", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a rootkit?",
    options: { A: "Malware that encrypts files and demands payment", B: "Malware that hides its presence by modifying the operating system", C: "Software that displays unwanted advertisements", D: "A program that replicates across networks" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q066", domain: 2, exam: "Original",
    question: "An attacker registers the domain gooogle.com to trick users. Which attack is this?",
    options: { A: "DNS poisoning", B: "Watering hole", C: "Typosquatting", D: "Domain hijacking" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q067", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a DDoS attack?",
    options: { A: "An attacker intercepts communications between two parties", B: "Multiple systems flood a target with traffic to make it unavailable", C: "An attacker injects malicious code into a database query", D: "An attacker gains unauthorized elevated privileges" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q068", domain: 2, exam: "Original",
    question: "A disgruntled employee deletes critical files before leaving the company. Which threat category does this represent?",
    options: { A: "Nation-state actor", B: "Hacktivist", C: "Insider threat", D: "Organized crime" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q069", domain: 2, exam: "Original",
    question: "Which of the following BEST describes ransomware?",
    options: { A: "Malware that silently records every keystroke to harvest credentials and sensitive data", B: "Malware that encrypts victim files and demands payment for decryption", C: "Malware that modifies browser settings and redirects traffic to attacker-controlled sites", D: "Malware that secretly consumes victim CPU and GPU resources to mine cryptocurrency for the attacker" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q070", domain: 2, exam: "Original",
    question: "An attacker calls a company's help desk pretending to be an external auditor from a compliance firm. The attacker claims they need immediate access to the payroll database to verify financial controls before a regulatory deadline. Which of the following social engineering tactics is PRIMARILY being used?",
    options: { A: "Vishing", B: "Pretexting", C: "Shoulder surfing", D: "Whaling" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q071", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a logic bomb?",
    options: { A: "Malware that spreads through network shares", B: "Malicious code that executes when specific conditions are met", C: "Software that disguises itself as legitimate applications", D: "Malware that redirects web traffic" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q072", domain: 2, exam: "Original",
    question: "A security scan reveals a critical vulnerability in a legacy system that cannot be patched. Which is the BEST mitigation?",
    options: { A: "Accept the vulnerability and document it as an approved exception in the risk register", B: "Implement network segmentation to isolate the system", C: "Increase password complexity requirements and enforce account lockout on the legacy system", D: "Enable full disk encryption on the legacy system to protect data stored locally" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q073", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a supply chain attack?",
    options: { A: "Attacking a company through its less-secure vendors or partners", B: "Intercepting products during shipping", C: "Compromising a company's inventory management system", D: "Stealing physical equipment from a warehouse" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q074", domain: 2, exam: "Original",
    question: "An attacker gains access to a system and installs software to capture all keystrokes. Which type of malware is this?",
    options: { A: "Ransomware", B: "Spyware", C: "Keylogger", D: "Adware" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q075", domain: 2, exam: "Original",
    question: "Which vulnerability scanning result indicates a security tool flagged a file as malicious when it was actually benign?",
    options: { A: "True positive", B: "False positive", C: "True negative", D: "False negative" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q076", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a man-in-the-middle attack?",
    options: { A: "Flooding a target system with excessive requests to exhaust its resources and deny service", B: "Intercepting and potentially altering communications between two parties", C: "Injecting malicious client-side scripts into a web application viewed by other users", D: "Performing offline dictionary or brute-force attacks against captured password hashes" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q077", domain: 2, exam: "Original",
    question: "An attacker sends highly targeted phishing emails to senior executives. Which attack type is this?",
    options: { A: "Smishing", B: "Whaling", C: "Vishing", D: "Generic phishing" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q078", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a buffer overflow attack?",
    options: { A: "Sending more data than a buffer can handle to overwrite adjacent memory", B: "Flooding a network with more traffic than its bandwidth can process to cause unavailability", C: "Injecting crafted SQL statements into an input field to manipulate a backend database query", D: "Capturing and reading unencrypted data packets traversing the network with a protocol analyzer" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q079", domain: 2, exam: "Original",
    question: "A threat actor group is believed to have resources and capabilities backed by a foreign government. Which threat actor type is this?",
    options: { A: "Hacktivist", B: "Script kiddie", C: "Nation-state", D: "Organized crime" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q080", domain: 2, exam: "Original",
    question: "Which of the following BEST describes cross-site scripting (XSS)?",
    options: { A: "Injecting malicious SQL into database queries", B: "Injecting malicious scripts into web pages viewed by other users", C: "Forging HTTP requests from authenticated users", D: "Intercepting web traffic between client and server" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q081", domain: 2, exam: "Original",
    question: "An organization discovers its DNS records have been modified to redirect users to malicious sites. Which attack occurred?",
    options: { A: "ARP poisoning", B: "DNS poisoning", C: "IP spoofing", D: "Session hijacking" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q082", domain: 2, exam: "Original",
    question: "Which of the following BEST describes SQL injection?",
    options: { A: "Inserting malicious HTML or JavaScript into a web page that other users view and execute", B: "Injecting malicious SQL commands into an application's database query", C: "Flooding a database server with excessive connection requests to exhaust available resources", D: "Gaining unauthorized access to unprotected backup files that contain exported database contents" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q083", domain: 2, exam: "Original",
    question: "A vulnerability scan returns no findings for a system that is actually vulnerable. Which term describes this result?",
    options: { A: "True positive", B: "False positive", C: "True negative", D: "False negative" },
    answer: "D", tier: "locked"
  },
  {
    id: "Q084", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a trojan horse?",
    options: { A: "Malware that autonomously replicates across network shares and connected devices without user interaction", B: "Malware disguised as legitimate software that performs malicious actions", C: "Malware that encrypts victim files and demands payment before providing the decryption key", D: "Malware that silently records user activity, keystrokes, and screenshots for exfiltration" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q085", domain: 2, exam: "Original",
    question: "An attacker follows an authorized employee through a secured door without using their own credentials. Which attack is this?",
    options: { A: "Shoulder surfing", B: "Tailgating", C: "Pretexting", D: "Dumpster diving" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q086", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a botnet?",
    options: { A: "A network of IP-connected cameras centrally monitored by a physical security team", B: "A collection of compromised devices controlled by an attacker", C: "An automated system that continuously scans networks and hosts for known vulnerabilities", D: "A coordinated set of honeypots deployed across the network to detect and study attackers" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q087", domain: 2, exam: "Original",
    question: "Which of the following BEST describes an on-path attack?",
    options: { A: "An attacker floods a network with traffic", B: "An attacker positions themselves between two communicating parties", C: "An attacker injects malicious code into a database", D: "An attacker guesses passwords through automation" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q088", domain: 2, exam: "Original",
    question: "A company's web application allows users to input data that is directly included in file system paths. Which vulnerability is present?",
    options: { A: "SQL injection", B: "Directory traversal", C: "Cross-site scripting", D: "Buffer overflow" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q089", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a replay attack?",
    options: { A: "Capturing and retransmitting valid network transmissions to gain unauthorized access", B: "Recording and replaying a victim's voice sample to trick a voice-based biometric system", C: "Resending the same crafted phishing email to many recipients to maximize the chance of success", D: "Repeatedly submitting password guesses against a login form until the correct one is accepted" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q090", domain: 2, exam: "Original",
    question: "An organization wants to identify vulnerabilities before attackers do. Which activity should be performed?",
    options: { A: "Security awareness training", B: "Penetration testing", C: "Business impact analysis", D: "Risk register creation" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q091", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a rainbow table attack?",
    options: { A: "Using precomputed hash values to crack passwords", B: "Trying every possible password combination", C: "Intercepting password hashes from network traffic", D: "Using social engineering to obtain passwords" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q092", domain: 2, exam: "Original",
    question: "A security researcher discovers a new attack technique not yet documented. Which term BEST describes this?",
    options: { A: "Known threat", B: "Advanced persistent threat", C: "Emerging threat", D: "Residual risk" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q093", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a brute force attack?",
    options: { A: "Using precomputed hashes to crack passwords", B: "Systematically trying all possible password combinations", C: "Intercepting passwords from network traffic", D: "Tricking users into revealing their passwords" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q094", domain: 2, exam: "Original",
    question: "An attacker uses multiple systems to overwhelm a target web server making it unavailable. Which attack is this?",
    options: { A: "An attack that injects malicious SQL statements into input fields to manipulate a database", B: "An attack that embeds malicious scripts into web pages executed by other users' browsers", C: "Distributed denial of service", D: "An attack that steals or forges a session token to impersonate an authenticated user" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q095", domain: 2, exam: "Original",
    question: "Which of the following BEST describes credential stuffing?",
    options: { A: "Creating synthetic fake credentials designed to bypass authentication controls entirely", B: "Using stolen username and password pairs from data breaches to gain access", C: "Automatically guessing passwords by systematically trying all possible character combinations", D: "Intercepting plaintext credentials transmitted over unencrypted network protocols" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q096", domain: 2, exam: "Original",
    question: "A hacktivist group defaces a government website to promote their political message. Which threat actor type is this?",
    options: { A: "Nation-state", B: "Organized crime", C: "Hacktivist", D: "Script kiddie" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q097", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a cross-site request forgery (CSRF) attack?",
    options: { A: "Injecting malicious client-side scripts into web pages that execute in other users' browsers", B: "Tricking authenticated users into submitting unauthorized requests", C: "Intercepting and stealing session cookies from network traffic to hijack active sessions", D: "Crafting requests with obfuscated payloads specifically designed to evade web application firewalls" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q098", domain: 2, exam: "Original",
    question: "An organization wants to reduce the attack surface of its web server. Which action is MOST effective?",
    options: { A: "Enable logging on all services", B: "Disable unused services and ports", C: "Increase password complexity requirements", D: "Deploy a honeypot on the network" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q099", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a spear phishing attack?",
    options: { A: "Mass phishing emails sent broadly to thousands of recipients with generic lure content", B: "Highly targeted phishing aimed at specific individuals using personalized content", C: "Phone call-based social engineering attacks designed to extract sensitive information verbally", D: "Text message-based phishing attacks sent to victims' mobile phones via SMS" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q100", domain: 2, exam: "Original",
    question: "A malicious actor gains access to a network and remains undetected for months gathering intelligence. Which threat type is this?",
    options: { A: "A network of compromised devices coordinated by an attacker to perform large-scale attacks", B: "Malware that encrypts victim files and demands payment before providing a decryption key", C: "Advanced persistent threat", D: "Malware that hides its presence by modifying core operating system components" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q101", domain: 2, exam: "Original",
    question: "Which of the following is the BEST way to protect against phishing attacks?",
    options: { A: "Configuring firewall rules to block known malicious IP addresses and phishing domains", B: "User security awareness training", C: "Deploying full disk encryption to protect data if a phishing attack leads to device theft", D: "Using network segmentation to limit the blast radius of a successful phishing compromise" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q102", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a vulnerability assessment?",
    options: { A: "Actively exploiting vulnerabilities to test defenses", B: "Identifying and prioritizing security weaknesses in systems", C: "Monitoring network traffic for anomalies", D: "Reviewing security policies for compliance" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q103", domain: 2, exam: "Original",
    question: "An attacker sends an email appearing to come from a legitimate bank with a link to a fake login page. Which attack is this?",
    options: { A: "Vishing", B: "Smishing", C: "Phishing", D: "Pretexting" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q104", domain: 2, exam: "Original",
    question: "Which of the following BEST describes shimming as an attack technique?",
    options: { A: "Intercepting API calls between applications and the OS", B: "Inserting malicious code between hardware components", C: "Exploiting gaps in physical security controls", D: "Bypassing firewalls using tunneling" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q105", domain: 2, exam: "Original",
    question: "A company wants to prevent sensitive data from leaving the network via email. Which technology should be deployed?",
    options: { A: "IDS", B: "DLP", C: "WAF", D: "SIEM" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q106", domain: 2, exam: "Original",
    question: "Which of the following BEST describes privilege escalation?",
    options: { A: "An attacker exploits a vulnerability to gain their very first foothold on a target system", B: "An attacker gains higher levels of access than originally authorized", C: "An attacker uses compromised credentials to move between systems within the same network", D: "An attacker installs backdoors or scheduled tasks to maintain access after initial compromise" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q107", domain: 2, exam: "Original",
    question: "An attacker uses an employee's lost ID badge to enter a secure facility. Which attack type is this?",
    options: { A: "Tailgating", B: "Pretexting", C: "Impersonation", D: "Shoulder surfing" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q108", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a fileless malware attack?",
    options: { A: "Malware stored in hidden files on the system", B: "Malware that operates in memory without writing to disk", C: "Malware disguised as legitimate system files", D: "Malware that deletes itself after execution" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q109", domain: 2, exam: "Original",
    question: "A security team wants to proactively search for threats that have evaded existing security controls. Which activity should be performed?",
    options: { A: "Vulnerability scanning", B: "Threat hunting", C: "Penetration testing", D: "Security auditing" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q110", domain: 2, exam: "Original",
    question: "Which of the following BEST describes an indicator of compromise (IOC)?",
    options: { A: "A documented security weakness in software awaiting a vendor-supplied patch or workaround", B: "Evidence that a system or network has been compromised", C: "A recorded instance of an employee violating an acceptable use or security policy", D: "A single failed authentication attempt logged by an access control or identity system" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q111", domain: 2, exam: "Original",
    question: "An attacker uses publicly available information about a company to plan an attack. Which technique is being used?",
    options: { A: "Active reconnaissance", B: "Passive reconnaissance", C: "Social engineering", D: "Vulnerability scanning" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q112", domain: 2, exam: "Original",
    question: "Which of the following BEST describes a birthday attack?",
    options: { A: "An attack timed to occur on a specific date", B: "An attack that exploits hash function collisions", C: "An attack targeting user birthday information", D: "An attack using anniversary-based password guessing" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q113", domain: 2, exam: "Original",
    question: "A company discovers malware that uses the victim's system resources to mine cryptocurrency. Which malware type is this?",
    options: { A: "Ransomware", B: "Spyware", C: "Cryptominer", D: "Adware" },
    answer: "C", tier: "locked"
  },

  // ============================================
  // DOMAIN 3: Security Architecture (Q114-Q157)
  // ============================================
  {
    id: "Q114", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a screened subnet?",
    options: { A: "A dedicated subnet reserved exclusively for privileged administrative management traffic", B: "A network segment between the internet and internal network for hosting public services", C: "An isolated subnet with no outbound internet connectivity used for sensitive internal systems", D: "A network segment dedicated to wireless access points and their associated client devices" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q115", domain: 3, exam: "Original",
    question: "An organization wants to separate its financial systems from its general IT network. Which technology should be used?",
    options: { A: "VPN", B: "VLAN", C: "NAT", D: "Proxy server" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q116", domain: 3, exam: "Original",
    question: "Which of the following cloud deployment models provides dedicated resources for a single organization?",
    options: { A: "Public cloud", B: "Community cloud", C: "Private cloud", D: "Hybrid cloud" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q117", domain: 3, exam: "Original",
    question: "A company wants to ensure its applications remain available during a server failure. Which technology provides this capability?",
    options: { A: "Data encryption", B: "Load balancing", C: "Network segmentation", D: "Patch management" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q118", domain: 3, exam: "Original",
    question: "Which of the following BEST describes infrastructure as code?",
    options: { A: "Writing security policies and compliance rules using scripting or programming languages", B: "Managing and provisioning infrastructure through machine-readable configuration files", C: "Embedding security validation logic and controls directly into application source code", D: "Using scripts to automatically encrypt storage volumes and network components at deployment" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q119", domain: 3, exam: "Original",
    question: "An organization uses a third-party provider to host its email servers. Which cloud service model does this represent?",
    options: { A: "IaaS", B: "PaaS", C: "SaaS", D: "FaaS" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q120", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a jump server?",
    options: { A: "A server that distributes incoming client requests across multiple backend application servers", B: "A hardened system used to access devices in separate security zones", C: "A dedicated server that terminates and manages encrypted VPN tunnels for remote users", D: "A standby server kept in reserve that takes over automatically when the primary server fails" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q121", domain: 3, exam: "Original",
    question: "A company runs its applications in isolated environments to prevent one compromised application from affecting others. Which technology enables this?",
    options: { A: "Full disk encryption", B: "Containerization", C: "Network segmentation", D: "Load balancing" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q122", domain: 3, exam: "Original",
    question: "Which of the following BEST describes an air gap?",
    options: { A: "The required physical clearance space between server rack rows for cooling and maintenance access", B: "Complete physical isolation of a system from all external networks", C: "The minimum required distance between wireless access points to reduce co-channel interference", D: "A logical separation between firewall security zones enforced by policy-based access rules" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q123", domain: 3, exam: "Original",
    question: "An organization wants to secure wireless communications. Which protocol provides the STRONGEST security?",
    options: { A: "WEP", B: "WPA", C: "WPA2", D: "WPA3" },
    answer: "D", tier: "locked"
  },
  {
    id: "Q124", domain: 3, exam: "Original",
    question: "Which of the following BEST describes software-defined networking (SDN)?",
    options: { A: "Applying software-defined encryption to all traffic flowing between network segments", B: "Separating the network control plane from the data plane for centralized management", C: "Defining and enforcing network security policies entirely through software without hardware appliances", D: "Replacing physical routers and switches with virtual network appliances running on hypervisors" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q125", domain: 3, exam: "Original",
    question: "A company wants to create an isolated network for testing malware without risking production systems. Which approach should be used?",
    options: { A: "A screened subnet that exposes limited services to the internet while shielding internal systems", B: "Sandbox environment", C: "A decoy system designed to attract and monitor attackers without running real malware", D: "A logically segmented network partition that isolates traffic using 802.1Q tagging" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q126", domain: 3, exam: "Original",
    question: "Which of the following BEST describes the shared responsibility model in cloud computing?",
    options: { A: "Cloud provider and customer split all infrastructure and operational costs equally between them", B: "Security responsibilities are divided between the cloud provider and the customer", C: "The cloud provider assumes full responsibility for every security control across all service layers", D: "The customer retains complete ownership and accountability for every aspect of cloud security" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q127", domain: 3, exam: "Original",
    question: "An organization deploys a next-generation firewall. Which capability does this provide beyond traditional firewalls?",
    options: { A: "Stateless packet filtering using source and destination IP addresses only", B: "Application-layer inspection and user identity awareness", C: "Port-based filtering allowing or blocking traffic by protocol and port number", D: "Layer 2 filtering based on device hardware addresses to control switch port access" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q128", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a proxy server?",
    options: { A: "A server that dynamically assigns IP addresses and network configuration to clients", B: "An intermediary that forwards requests between clients and servers", C: "A server that translates human-readable domain names into numeric IP addresses", D: "A server that maintains replicated copies of data for recovery and redundancy" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q129", domain: 3, exam: "Original",
    question: "A company wants to protect its internal web applications from internet-based attacks. Which technology should be deployed?",
    options: { A: "IDS", B: "WAF", C: "VPN", D: "NAC" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q130", domain: 3, exam: "Original",
    question: "Which of the following BEST describes microsegmentation?",
    options: { A: "Dividing a network into large broadcast domains", B: "Creating granular security zones around individual workloads", C: "Segmenting networks by department", D: "Using VLANs to separate voice and data traffic" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q131", domain: 3, exam: "Original",
    question: "An organization wants to ensure communications between remote sites are encrypted. Which technology should be implemented?",
    options: { A: "Remote access VPN", B: "IPsec transport mode", C: "Site-to-site VPN", D: "SSL VPN gateway" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q132", domain: 3, exam: "Original",
    question: "Which of the following cloud service models gives customers the MOST control over the operating system?",
    options: { A: "SaaS", B: "PaaS", C: "IaaS", D: "FaaS" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q133", domain: 3, exam: "Original",
    question: "A company wants to implement a solution that combines network security functions into a single cloud-delivered service. Which architecture should be used?",
    options: { A: "SDN", B: "SASE", C: "Zero trust", D: "DMZ" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q134", domain: 3, exam: "Original",
    question: "Which of the following BEST describes network access control (NAC)?",
    options: { A: "Restricting and auditing access to cloud-hosted applications based on user identity", B: "Enforcing security policies on devices before allowing network access", C: "Controlling file and folder permissions assigned to users on shared network storage", D: "Inspecting and controlling traffic flows based on source and destination IP address rules" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q135", domain: 3, exam: "Original",
    question: "An organization deploys systems that appear vulnerable to attract attackers and gather intelligence. Which technology is being used?",
    options: { A: "Sinkhole", B: "Honeypot", C: "Tarpit", D: "Darknet" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q136", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a cold site?",
    options: { A: "A fully operational backup site ready to take over immediately", B: "A backup facility with basic infrastructure but no equipment or data", C: "A site that is partially equipped and can be operational within hours", D: "A mobile facility that can be deployed anywhere" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q137", domain: 3, exam: "Original",
    question: "A company wants to ensure its website remains available even during hardware failures. Which approach provides the BEST availability?",
    options: { A: "Data encryption at rest using AES-256 to protect stored content", B: "Redundant systems with automatic failover", C: "Scheduled vulnerability scanning to identify weaknesses before exploitation", D: "Employee awareness training to reduce human error and social engineering risk" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q138", domain: 3, exam: "Original",
    question: "Which of the following BEST describes the purpose of network segmentation?",
    options: { A: "Improving throughput by reducing broadcast domain collision and congestion overhead", B: "Limiting the spread of attacks by dividing the network into zones", C: "Reducing public IP address consumption by using private addressing with NAT", D: "Simplifying administration by consolidating all devices onto a single flat network" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q139", domain: 3, exam: "Original",
    question: "An organization wants to ensure IoT devices on its network cannot communicate with corporate systems. Which control is MOST effective?",
    options: { A: "Applying vendor firmware updates to address known IoT device vulnerabilities", B: "Placing IoT devices on a separate VLAN with firewall restrictions", C: "Deploying endpoint protection software on IoT devices to scan for malware activity", D: "Requiring certificate-based authentication before any IoT device joins the network" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q140", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a hot site?",
    options: { A: "A site with no equipment that requires setup before use", B: "A fully equipped backup site that can take over operations immediately", C: "A site that is partially equipped requiring some setup time", D: "A temporary site used only during construction" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q141", domain: 3, exam: "Original",
    question: "Which of the following BEST describes an intrusion prevention system (IPS)?",
    options: { A: "A system that detects and alerts on suspicious activity", B: "A system that detects and actively blocks malicious traffic", C: "A system that encrypts network communications", D: "A system that manages user access permissions" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q142", domain: 3, exam: "Original",
    question: "A company wants to back up data and ensure it can be restored within two hours. Which metric defines this requirement?",
    options: { A: "RPO", B: "MTBF", C: "RTO", D: "MTTR" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q143", domain: 3, exam: "Original",
    question: "Which of the following BEST describes the purpose of a CASB?",
    options: { A: "Providing encrypted remote access tunnels for users connecting to corporate infrastructure", B: "Enforcing security policies between cloud service users and providers", C: "Issuing and renewing TLS certificates for externally facing cloud-hosted applications", D: "Capturing and analyzing traffic on internal network segments for anomaly detection" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q144", domain: 3, exam: "Original",
    question: "An organization wants to prevent employees from using unauthorized cloud storage services. Which technology is MOST appropriate?",
    options: { A: "IDS", B: "CASB", C: "VPN", D: "NAC" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q145", domain: 3, exam: "Original",
    question: "Which of the following BEST describes the recovery point objective (RPO)?",
    options: { A: "The maximum time to restore systems after failure", B: "The maximum acceptable amount of data loss measured in time", C: "The average time between system failures", D: "The average time to repair a failed system" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q146", domain: 3, exam: "Original",
    question: "A company implements a solution where all network traffic passes through a security inspection point regardless of source or destination. Which architecture is this?",
    options: { A: "Hub and spoke", B: "East-west traffic inspection", C: "Zero trust network access", D: "Flat network architecture" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q147", domain: 3, exam: "Original",
    question: "Which of the following BEST describes deception technology in network security?",
    options: { A: "Hiding network topology from external attackers", B: "Using fake assets to detect and mislead attackers", C: "Encrypting network traffic to hide contents", D: "Using steganography to conceal data" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q148", domain: 3, exam: "Original",
    question: "An organization wants to encrypt all traffic between its data center and cloud provider. Which solution should be implemented?",
    options: { A: "SSL/TLS certificate", B: "IPsec VPN tunnel", C: "Network segmentation", D: "Proxy server" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q149", domain: 3, exam: "Original",
    question: "Which of the following BEST describes infrastructure as a service (IaaS)?",
    options: { A: "Providing complete applications over the internet", B: "Providing virtualized computing resources over the internet", C: "Providing development platforms over the internet", D: "Providing security services over the internet" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q150", domain: 3, exam: "Original",
    question: "A company wants to protect against data exfiltration through email. Which technology is MOST appropriate?",
    options: { A: "Email encryption", B: "Data loss prevention", C: "Anti-spam filtering", D: "Email archiving" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q151", domain: 3, exam: "Original",
    question: "Which of the following BEST describes geographic dispersal in business continuity?",
    options: { A: "Distributing operational workload across regional teams to improve business responsiveness", B: "Placing redundant systems in different physical locations to survive regional disasters", C: "Recruiting staff across multiple countries to reduce workforce concentration risk", D: "Operating data centers across time zones to provide follow-the-sun support coverage" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q152", domain: 3, exam: "Original",
    question: "An organization implements a solution that allows users to access applications without a traditional VPN. Which technology is this?",
    options: { A: "Cloud access security broker", B: "Zero trust network access", C: "Secure access service edge", D: "Network access control" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q153", domain: 3, exam: "Original",
    question: "Which of the following BEST describes a warm site?",
    options: { A: "A fully operational backup site with live data replication ready for immediate failover", B: "A site with some equipment that requires configuration before use", C: "A site with only basic power and connectivity but no equipment pre-installed", D: "A trailer-mounted portable recovery unit that can be deployed at any location" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q154", domain: 3, exam: "Original",
    question: "A company wants to implement 802.1X port-based authentication on its network switches. Which component authenticates users?",
    options: { A: "Supplicant", B: "Authenticator", C: "Authentication server", D: "Certificate authority" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q155", domain: 3, exam: "Original",
    question: "Which of the following BEST describes the purpose of network address translation (NAT)?",
    options: { A: "Encrypting all traffic between endpoints using symmetric keys negotiated at session start", B: "Translating private IP addresses to public addresses for internet access", C: "Filtering inbound and outbound traffic based on configured port and protocol rules", D: "Dynamically assigning addresses and network configuration to connecting client devices" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q156", domain: 3, exam: "Original",
    question: "An organization wants to implement security controls that verify every request regardless of whether it originates inside or outside the network. Which model should be adopted?",
    options: { A: "Defense in depth", B: "Zero trust", C: "Perimeter security", D: "Layered security" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q157", domain: 3, exam: "Original",
    question: "Which of the following BEST describes serverless computing?",
    options: { A: "A deployment model eliminating the need for any underlying compute or storage resources", B: "A model where the cloud provider manages server infrastructure and scales automatically", C: "A model that exclusively uses virtual machines provisioned and managed by the customer", D: "A model where customers retain full ownership and control over all server-side resources" },
    answer: "B", tier: "locked"
  },

  // ============================================
  // DOMAIN 4: Security Operations (Q158-Q226)
  // ============================================
  {
    id: "Q158", domain: 4, exam: "Original",
    question: "A security analyst discovers a system sending large amounts of data to an external IP address at unusual hours. Which is the FIRST step in incident response?",
    options: { A: "Threat eradication and cleanup", B: "System recovery and restoration", C: "Identification and containment", D: "Post-incident lessons review" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q159", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security baseline?",
    options: { A: "Establishing minimum security requirements for systems", B: "Documenting the current state of security incidents", C: "Setting the maximum security budget", D: "Defining the perimeter of the network" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q160", domain: 4, exam: "Original",
    question: "An organization wants to ensure that terminated employees cannot access systems. Which process addresses this?",
    options: { A: "Onboarding", B: "Background checks", C: "Account deprovisioning", D: "Security awareness training" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q161", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the chain of custody in digital forensics?",
    options: { A: "The process of encrypting digital evidence", B: "The documented history of who handled evidence and when", C: "The process of analyzing digital artifacts", D: "The procedure for reporting security incidents" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q162", domain: 4, exam: "Original",
    question: "A company wants to identify which assets are most critical to business operations. Which process should be performed?",
    options: { A: "Vulnerability assessment", B: "Business impact analysis", C: "Penetration testing", D: "Gap analysis" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q163", domain: 4, exam: "Original",
    question: "Which of the following is the correct order of incident response phases?",
    options: { A: "Preparation, Identification, Containment, Eradication, Recovery, Lessons learned", B: "Identification, Preparation, Containment, Recovery, Eradication, Lessons learned", C: "Containment, Identification, Preparation, Eradication, Recovery, Lessons learned", D: "Preparation, Containment, Identification, Recovery, Eradication, Lessons learned" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q164", domain: 4, exam: "Original",
    question: "An administrator wants to monitor all changes to critical system files. Which tool is MOST appropriate?",
    options: { A: "Antivirus software", B: "File integrity monitoring", C: "Network IDS", D: "Vulnerability scanner" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q165", domain: 4, exam: "Original",
    question: "Which of the following BEST describes patch management?",
    options: { A: "Repairing hardware faults and replacing damaged components in the IT infrastructure", B: "The process of identifying, acquiring, testing, and installing software updates", C: "Reviewing and approving changes to firewall rules through a formal change control board", D: "Recording and maintaining current diagrams of all network device interconnections" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q166", domain: 4, exam: "Original",
    question: "A forensic investigator creates an exact copy of a hard drive before analysis. What is this called?",
    options: { A: "Differential backup", B: "Verified clone", C: "Forensic image", D: "Encrypted archive" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q167", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a SOC?",
    options: { A: "Drafting and maintaining the organization's information security policies and procedures", B: "Monitoring, detecting, and responding to security incidents in real time", C: "Provisioning, modifying, and revoking user accounts and their associated permissions", D: "Simulating adversary attacks to identify exploitable vulnerabilities in production systems" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q168", domain: 4, exam: "Original",
    question: "An organization wants to automate its incident response playbooks. Which technology enables this?",
    options: { A: "SIEM", B: "SOAR", C: "EDR", D: "DLP" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q169", domain: 4, exam: "Original",
    question: "Which of the following BEST describes data sanitization?",
    options: { A: "Encrypting data before storage", B: "Permanently destroying data so it cannot be recovered", C: "Removing personally identifiable information from datasets", D: "Archiving old data to secondary storage" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q170", domain: 4, exam: "Original",
    question: "A security team wants to understand how attackers think and operate. Which framework maps adversary tactics and techniques?",
    options: { A: "NIST CSF", B: "MITRE ATT&CK", C: "ISO 27001", D: "CIS Controls" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q171", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of log aggregation?",
    options: { A: "Reducing the size of log files using compression algorithms to conserve storage capacity", B: "Collecting logs from multiple sources into a central location for analysis", C: "Applying cryptographic signatures to log entries to ensure they have not been modified", D: "Automatically purging log entries that exceed the configured retention period" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q172", domain: 4, exam: "Original",
    question: "An organization discovers an employee has been accessing files beyond their job requirements. Which process would have detected this earlier?",
    options: { A: "Penetration testing", B: "User and entity behavior analytics", C: "Vulnerability scanning", D: "Security awareness training" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q173", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the eradication phase of incident response?",
    options: { A: "Detecting suspicious activity and formally acknowledging that an incident has occurred", B: "Removing malware and closing attack vectors after containment", C: "Rebuilding and returning affected systems to normal production operation", D: "Reviewing the incident to identify improvements for future response capabilities" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q174", domain: 4, exam: "Original",
    question: "A company wants to ensure its mobile devices can be wiped if lost or stolen. Which capability is needed?",
    options: { A: "MDM with remote wipe", B: "Full disk encryption only", C: "GPS tracking", D: "Biometric authentication" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q175", domain: 4, exam: "Original",
    question: "Which of the following BEST describes endpoint detection and response (EDR)?",
    options: { A: "A tool that scans endpoints for known vulnerabilities", B: "A solution that monitors endpoints for threats and enables rapid response", C: "Software that manages endpoint software updates", D: "A tool that enforces endpoint security policies" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q176", domain: 4, exam: "Original",
    question: "An organization needs to retain security logs for compliance purposes. Which policy governs this?",
    options: { A: "Acceptable use policy", B: "Data retention policy", C: "Incident response policy", D: "Change management policy" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q177", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the concept of least functionality?",
    options: { A: "Granting users only the permissions required to perform their assigned job functions", B: "Configuring systems to provide only necessary functions and no others", C: "Selecting the least complex security controls to reduce operational overhead", D: "Reducing the number of deployed security tools to streamline the security stack" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q178", domain: 4, exam: "Original",
    question: "A security team wants to track all changes made to production systems. Which process should be implemented?",
    options: { A: "Vulnerability management", B: "Change management", C: "Incident response", D: "Risk management" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q179", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of network flow analysis?",
    options: { A: "Capturing and deep-inspecting full packet payloads to reconstruct application sessions", B: "Analyzing metadata about network connections to identify anomalies", C: "Measuring throughput and utilization across links to support capacity planning", D: "Applying stateful inspection rules to permit or deny traffic flows at the perimeter" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q180", domain: 4, exam: "Original",
    question: "An organization wants to verify that security controls are operating effectively. Which activity should be performed?",
    options: { A: "Business impact analysis", B: "Security control assessment", C: "Risk register creation", D: "Disaster recovery planning" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q181", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a runbook in security operations?",
    options: { A: "High-level documentation describing the organization's overall security requirements and intent", B: "Step-by-step procedures for handling specific security events", C: "A historical record of all detected and reported security incidents and their outcomes", D: "A rotating schedule defining on-call assignments and shift coverage for the security team" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q182", domain: 4, exam: "Original",
    question: "A company wants to ensure employees only access systems they are authorized to use. Which process addresses this?",
    options: { A: "Security awareness training", B: "Access reviews and recertification", C: "Password complexity requirements", D: "Multi-factor authentication" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q183", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a penetration test?",
    options: { A: "Running automated scans to enumerate known vulnerabilities across systems and applications", B: "Authorized simulation of attacks to identify exploitable vulnerabilities", C: "Auditing security policies and configurations against a compliance framework standard", D: "Passively capturing and analyzing network traffic flows to detect unusual patterns" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q184", domain: 4, exam: "Original",
    question: "An organization wants to ensure backup data can actually be restored. Which activity should be performed regularly?",
    options: { A: "Backup scheduling", B: "Backup restoration testing", C: "Data encryption of backups", D: "Off-site backup storage" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q185", domain: 4, exam: "Original",
    question: "Which of the following BEST describes identity and access management (IAM)?",
    options: { A: "Controlling physical entry to buildings and sensitive areas using badge and biometric systems", B: "Policies and technologies for managing digital identities and access rights", C: "Tracking and analyzing how users authenticate and access network resources over time", D: "Protecting stored and transmitted user credentials using hashing and encryption algorithms" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q186", domain: 4, exam: "Original",
    question: "A security team captures network traffic during an incident for later analysis. Which term describes this activity?",
    options: { A: "Network scanning", B: "Packet capture", C: "Log aggregation", D: "Traffic shaping" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q187", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security information and event management (SIEM) system?",
    options: { A: "Preventing intrusions at the network perimeter", B: "Aggregating and correlating security events to identify threats", C: "Managing encryption keys across the organization", D: "Enforcing data loss prevention policies" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q188", domain: 4, exam: "Original",
    question: "An organization wants to harden its servers by removing unnecessary software. Which security principle does this implement?",
    options: { A: "Defense in depth", B: "Least functionality", C: "Zero trust", D: "Separation of duties" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q189", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a legal hold?",
    options: { A: "Placing restrictions on employee computer access during an investigation", B: "Preserving potentially relevant data when litigation is anticipated", C: "Blocking access to legal documents", D: "Encrypting sensitive legal files" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q190", domain: 4, exam: "Original",
    question: "A company wants to test its incident response capabilities without disrupting operations. Which exercise should be conducted?",
    options: { A: "Full-scale simulation", B: "Tabletop exercise", C: "Penetration test", D: "Vulnerability assessment" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q191", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of multifactor authentication?",
    options: { A: "Increasing password complexity requirements", B: "Requiring two or more verification factors to authenticate", C: "Using biometrics instead of passwords", D: "Implementing single sign-on across applications" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q192", domain: 4, exam: "Original",
    question: "An incident responder wants to preserve volatile data before powering off a compromised system. Which data should be captured FIRST?",
    options: { A: "Hard drive contents and file system artifacts", B: "Running processes and memory contents", C: "System and application log files", D: "Windows registry hive entries" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q193", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security audit?",
    options: { A: "Actively testing systems by simulating attacker techniques to find exploitable weaknesses", B: "Systematically evaluating security controls against established criteria", C: "Continuously inspecting live network traffic for indicators of compromise or policy violations", D: "Drafting and updating security policies to reflect new regulatory and business requirements" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q194", domain: 4, exam: "Original",
    question: "A company implements a system that automatically responds to detected threats without human intervention. Which capability does this represent?",
    options: { A: "Security information and event management", B: "Endpoint detection and response", C: "Security orchestration and automated response", D: "User and entity behavior analytics" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q195", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a known environment penetration test?",
    options: { A: "Testing with no prior knowledge of the target", B: "Testing with full knowledge of the target environment", C: "Testing with partial knowledge of the target", D: "Testing conducted by an internal team" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q196", domain: 4, exam: "Original",
    question: "An organization wants to reduce the time to detect security incidents. Which metric measures detection effectiveness?",
    options: { A: "Recovery time objective", B: "Mean time between failures", C: "Mean time to detect", D: "Mean time to repair" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q197", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a credentialed vulnerability scan?",
    options: { A: "A scan using administrator credentials to identify vulnerabilities from inside the system", B: "An unauthenticated scan that tests password complexity and lockout policies externally", C: "A red team scan conducted from the perspective of a credential-holding threat actor", D: "A scan formally authorized and signed off by senior management before execution" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q198", domain: 4, exam: "Original",
    question: "A security team wants to share threat intelligence with peer organizations. Which platform facilitates this?",
    options: { A: "SIEM", B: "ISAC", C: "SOC", D: "SOAR" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q199", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the recovery phase of incident response?",
    options: { A: "Identifying the full scope of compromised systems and establishing the incident timeline", B: "Removing malware and attacker footholds from all affected systems and endpoints", C: "Restoring systems to normal operations and verifying functionality", D: "Conducting a post-incident review and updating procedures to prevent recurrence" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q200", domain: 4, exam: "Original",
    question: "An organization wants to ensure that software changes do not introduce new vulnerabilities. Which process should be implemented?",
    options: { A: "Change management with security review", B: "Scheduled penetration testing to identify vulnerabilities in existing production code", C: "Developer security awareness training to improve secure coding knowledge and practices", D: "Network segmentation to isolate development environments from production systems" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q201", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a bring your own device (BYOD) policy?",
    options: { A: "A policy requiring employees to use company-provided devices", B: "A policy that allows employees to use personal devices for work purposes", C: "A policy for bringing equipment to off-site meetings", D: "A policy governing device recycling" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q202", domain: 4, exam: "Original",
    question: "A forensic analyst wants to verify that evidence has not been tampered with. Which technique should be used?",
    options: { A: "Asymmetric encryption to protect evidence files during transmission", B: "Hashing to create a digital fingerprint", C: "Digital signatures to authenticate the investigator's identity", D: "Steganographic watermarking to embed hidden metadata in the evidence file" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q203", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a gray box penetration test?",
    options: { A: "Testing with no knowledge of the target environment", B: "Testing with full knowledge of the target environment", C: "Testing with partial knowledge of the target environment", D: "Testing conducted entirely remotely" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q204", domain: 4, exam: "Original",
    question: "An organization wants to ensure continuity of operations after a natural disaster. Which plan addresses this?",
    options: { A: "Incident response plan", B: "Business continuity plan", C: "Vulnerability management plan", D: "Risk management plan" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q205", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of threat modeling?",
    options: { A: "Producing architectural diagrams that visualize current network topology and trust boundaries", B: "Identifying potential threats and vulnerabilities early in system design", C: "Building statistical models to forecast attack likelihood and predict breach frequency", D: "Delivering structured training to security staff on emerging threat actor techniques" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q206", domain: 4, exam: "Original",
    question: "An organization wants to verify that its security controls comply with industry standards. Which activity should be performed?",
    options: { A: "Penetration testing", B: "Compliance audit", C: "Vulnerability assessment", D: "Threat hunting" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q207", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a disaster recovery plan?",
    options: { A: "Preventing disasters from occurring", B: "Restoring IT systems and operations after a disruptive event", C: "Training employees on emergency procedures", D: "Insuring against financial losses from disasters" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q208", domain: 4, exam: "Original",
    question: "A security analyst notices unusual outbound traffic patterns. Which tool would provide the MOST detailed information about the traffic?",
    options: { A: "Vulnerability scanner", B: "Packet analyzer", C: "Port scanner", D: "Password cracker" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q209", domain: 4, exam: "Original",
    question: "Which of the following BEST describes application whitelisting?",
    options: { A: "Blocking known malicious applications", B: "Allowing only approved applications to execute", C: "Scanning applications for vulnerabilities", D: "Encrypting application data" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q210", domain: 4, exam: "Original",
    question: "An organization discovers that an attacker has been present in its network for six months. Which term describes this type of attack?",
    options: { A: "Zero-day attack", B: "Ransomware attack", C: "Advanced persistent threat", D: "Denial of service attack" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q211", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of endpoint protection platforms?",
    options: { A: "Protecting edge network devices such as routers and switches from external attacks", B: "Providing comprehensive security for end-user devices", C: "Tracking CPU, memory, and disk utilization to ensure server health and capacity", D: "Controlling which devices are permitted to join the network based on compliance posture" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q212", domain: 4, exam: "Original",
    question: "A company wants to ensure sensitive data is destroyed when hard drives are decommissioned. Which method provides the HIGHEST assurance?",
    options: { A: "Performing a full format to overwrite all existing partition and file system structures", B: "Manually deleting all files and emptying the recycle bin before re-imaging the drive", C: "Physical destruction or degaussing", D: "Encrypting the drive contents with a key that is then securely discarded" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q213", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a black box penetration test?",
    options: { A: "Testing with full knowledge of the internal systems", B: "Testing with no prior knowledge of the target environment", C: "Testing focused only on black-listed applications", D: "Testing conducted in a dark environment" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q214", domain: 4, exam: "Original",
    question: "An organization wants to implement continuous monitoring of its security posture. Which approach is MOST effective?",
    options: { A: "Annual penetration tests simulating attacker techniques against production systems", B: "Real-time security monitoring with SIEM and automated alerting", C: "Quarterly vulnerability assessments scanning for unpatched software and misconfigurations", D: "Monthly security policy reviews to verify documentation remains current and accurate" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q215", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of security orchestration?",
    options: { A: "Playing security training videos to employees", B: "Coordinating and automating security tools and processes", C: "Organizing the security team hierarchy", D: "Scheduling security maintenance windows" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q216", domain: 4, exam: "Original",
    question: "A company wants to implement a solution that analyzes user behavior to detect insider threats. Which technology should be deployed?",
    options: { A: "SIEM", B: "UEBA", C: "DLP", D: "IDS" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q217", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security assessment report?",
    options: { A: "Documenting successfully implemented controls and configurations for compliance records", B: "Communicating security findings, risks, and recommendations to stakeholders", C: "Recording daily security alerts and events observed by the monitoring team", D: "Tracking approved security expenditures and forecasting future budget requirements" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q218", domain: 4, exam: "Original",
    question: "An organization implements a process where all code changes require review by another developer before deployment. Which security principle does this implement?",
    options: { A: "Least privilege access control", B: "Defense in depth layering", C: "Peer review as separation of duties", D: "Need-to-know information access" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q219", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of security awareness training?",
    options: { A: "Teaching employees hands-on technical skills such as scripting and penetration testing", B: "Reducing human risk by educating employees about security threats and best practices", C: "Training employees to operate security tools such as SIEM platforms and vulnerability scanners", D: "Preparing employees to earn vendor-neutral or vendor-specific security certifications" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q220", domain: 4, exam: "Original",
    question: "A security team wants to identify all devices on the network. Which tool should be used?",
    options: { A: "Password auditor", B: "Network scanner", C: "Log analyzer", D: "Vulnerability database" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q221", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of threat intelligence?",
    options: { A: "Automatically blocking detected threats in real time without requiring analyst intervention", B: "Providing actionable information about current and emerging threats to inform defenses", C: "Identifying software vulnerabilities through automated scanning and patch assessment", D: "Training security analysts to recognize and respond to the latest attack techniques" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q222", domain: 4, exam: "Original",
    question: "An organization wants to enforce configuration standards across all servers. Which approach is MOST efficient?",
    options: { A: "Manually configuring each server individually according to the published hardening guide", B: "Configuration management tools with baseline templates", C: "Quarterly security audits reviewing server settings against the current baseline", D: "Security awareness training for administrators covering hardening and patch procedures" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q223", domain: 4, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security champion program?",
    options: { A: "Recognizing and rewarding the highest-performing security analyst with a formal designation", B: "Embedding security-minded individuals within development teams to promote security practices", C: "Incentivizing employees who proactively report security vulnerabilities or incidents", D: "Running a competitive evaluation process to select approved security tools and vendors" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q224", domain: 4, exam: "Original",
    question: "A company wants to ensure that its cloud provider meets security requirements. Which document should be reviewed?",
    options: { A: "The cloud provider's marketing materials", B: "The cloud provider's SOC 2 report or security certifications", C: "The cloud provider's pricing documentation", D: "The cloud provider's employee handbook" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q225", domain: 4, exam: "Original",
    question: "Which of the following BEST describes a red team exercise?",
    options: { A: "A defensive team that monitors alerts and responds to active attacks in real time", B: "An offensive team that simulates real-world attacks against an organization", C: "A team responsible for reviewing and updating security policies and procedures", D: "A team that delivers security awareness training and phishing simulation exercises" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q226", domain: 4, exam: "Original",
    question: "An organization wants to test both offensive and defensive security capabilities simultaneously. Which exercise should be conducted?",
    options: { A: "Red team exercise", B: "Blue team exercise", C: "Purple team exercise", D: "Tabletop exercise" },
    answer: "C", tier: "locked"
  },

  // ============================================
  // DOMAIN 5: Security Program Management (Q227-Q245)
  // ============================================
  {
    id: "Q227", domain: 5, exam: "Original",
    question: "Which of the following BEST describes risk appetite?",
    options: { A: "The total inherent risk exposure across all assets before any controls are applied", B: "The amount of risk an organization is willing to accept in pursuit of its objectives", C: "The residual risk that persists after security controls have been evaluated and applied", D: "The maximum risk threshold beyond which the organization would face regulatory or financial failure" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q228", domain: 5, exam: "Original",
    question: "An organization purchases cyber insurance to address financial losses from breaches. Which risk response strategy is this?",
    options: { A: "Risk avoidance", B: "Risk mitigation", C: "Risk transference", D: "Risk acceptance" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q229", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a risk register?",
    options: { A: "Logging all detected security incidents with timestamps and severity classifications", B: "Documenting identified risks, their likelihood, impact, and treatment plans", C: "Maintaining an inventory of approved security tools, software licenses, and renewal dates", D: "Tracking which employees hold current security certifications and their expiration dates" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q230", domain: 5, exam: "Original",
    question: "An organization wants to calculate the financial impact of a specific risk. Which calculation combines asset value, exposure factor, and annualized rate of occurrence?",
    options: { A: "Total cost of ownership", B: "Return on security investment", C: "Annualized loss expectancy", D: "Single loss expectancy" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q231", domain: 5, exam: "Original",
    question: "Which of the following BEST describes a data classification policy?",
    options: { A: "A policy that organizes data records chronologically by creation or modification date", B: "A policy that categorizes data by sensitivity level to guide protection requirements", C: "A policy that specifies how frequently different data types must be backed up and retained", D: "A policy that assigns custodianship and accountability for each category of organizational data" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q232", domain: 5, exam: "Original",
    question: "An organization must comply with regulations requiring specific security controls for payment card data. Which standard applies?",
    options: { A: "HIPAA", B: "GDPR", C: "PCI DSS", D: "FISMA" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q233", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a security policy?",
    options: { A: "Providing technical instructions for security configurations", B: "Establishing management's intent and requirements for information security", C: "Documenting security incidents and responses", D: "Defining the technical architecture of security systems" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q234", domain: 5, exam: "Original",
    question: "An organization wants to evaluate a new vendor's security practices before signing a contract. Which process should be followed?",
    options: { A: "Penetration testing", B: "Third-party risk assessment", C: "Vulnerability scanning", D: "Business impact analysis" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q235", domain: 5, exam: "Original",
    question: "Which of the following regulations protects the privacy of healthcare information in the United States?",
    options: { A: "GDPR", B: "PCI DSS", C: "HIPAA", D: "SOX" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q236", domain: 5, exam: "Original",
    question: "An organization decides to accept a low-impact risk because the cost of controls exceeds the potential loss. Which risk strategy is this?",
    options: { A: "Risk avoidance", B: "Risk mitigation", C: "Risk transference", D: "Risk acceptance" },
    answer: "D", tier: "locked"
  },
  {
    id: "Q237", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a service level agreement (SLA)?",
    options: { A: "Defining the minimum security controls required for a cloud or managed service provider", B: "Documenting the expected performance and availability standards for a service", C: "Establishing confidentiality obligations and non-disclosure requirements between parties", D: "Defining the scope, rules of engagement, and boundaries for a penetration test" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q238", domain: 5, exam: "Original",
    question: "An organization wants to implement a framework for managing information security. Which standard provides guidance?",
    options: { A: "PCI DSS", B: "HIPAA", C: "ISO 27001", D: "NIST CSF" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q239", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a memorandum of understanding (MOU)?",
    options: { A: "A legally binding contract that creates enforceable obligations between the signing parties", B: "A non-binding agreement outlining intentions for cooperation between parties", C: "A formal agreement specifying performance metrics and availability targets for a service", D: "A data sharing agreement governing how regulated or sensitive information is exchanged" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q240", domain: 5, exam: "Original",
    question: "An organization implements security controls to reduce the likelihood of a risk occurring. Which risk strategy is this?",
    options: { A: "Risk acceptance", B: "Risk avoidance", C: "Risk mitigation", D: "Risk transference" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q241", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a business impact analysis (BIA)?",
    options: { A: "Identifying all security vulnerabilities in business systems", B: "Determining the impact of disruptions to critical business functions", C: "Analyzing the financial performance of the security department", D: "Evaluating the effectiveness of security awareness training" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q242", domain: 5, exam: "Original",
    question: "An organization wants to ensure its security program aligns with business objectives. Which approach is MOST effective?",
    options: { A: "Deploying cutting-edge security technologies to address the most advanced threat scenarios", B: "Aligning security strategy with organizational risk appetite and business goals", C: "Expanding the security team headcount to increase monitoring and response coverage", D: "Increasing the annual security budget to fund additional tools and third-party assessments" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q243", domain: 5, exam: "Original",
    question: "Which regulation requires organizations to protect personal data of EU citizens and residents?",
    options: { A: "HIPAA", B: "PCI DSS", C: "GDPR", D: "SOX" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q244", domain: 5, exam: "Original",
    question: "An organization wants to ensure vendors with access to its systems meet security requirements. Which document should be used?",
    options: { A: "Non-disclosure agreement prohibiting vendors from sharing proprietary information externally", B: "Memorandum of understanding establishing shared expectations without legally binding obligations", C: "Right-to-audit clause in vendor contracts", D: "Service level agreement specifying uptime guarantees and response time commitments" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q245", domain: 5, exam: "Original",
    question: "Which of the following BEST describes the purpose of a privacy impact assessment?",
    options: { A: "Calculating the monetary losses and regulatory fines resulting from a data breach event", B: "Identifying and addressing privacy risks in systems that handle personal data", C: "Surveying employees to understand their concerns about workplace monitoring and data collection", D: "Auditing the public-facing privacy policy to verify it accurately reflects data handling practices" },
    answer: "B", tier: "locked"
  },
  // ============================================
  // EXAM-STYLE QUESTIONS (Q246-Q255)
  // ============================================
  {
    id: "Q246", domain: 4, exam: "Original",
    question: "A SOC analyst reviewing SIEM logs notices unusual outbound traffic from an endpoint to an external IP. The CISO requests immediate containment. Which of the following should the analyst do FIRST?",
    options: { A: "Update the IDS signatures", B: "Isolate the endpoint using NAC", C: "Run a vulnerability scan against the CVE database", D: "Alert the MSSP via the ticketing system" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q247", domain: 1, exam: "Original",
    question: "An organization is implementing a PKI to support S/MIME for internal communications. Which of the following is required for a user to decrypt an encrypted email?",
    options: { A: "The sender's public key", B: "The CA's CRL", C: "The recipient's private key", D: "An OCSP stapling certificate" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q248", domain: 1, exam: "Original",
    question: "A CISO wants to reduce the attack surface of the organization's IAM system. Which of the following would BEST accomplish this?",
    options: { A: "Implementing SAML-based SSO with MFA", B: "Deploying a WAF in front of the IdP", C: "Enabling LDAP over TLS for all directory queries", D: "Configuring RBAC with quarterly access recertification" },
    answer: "A", tier: "locked"
  },
  {
    id: "Q249", domain: 4, exam: "Original",
    question: "During a purple team exercise, the red team successfully exfiltrates data using DNS tunneling. Which of the following controls would MOST effectively detect this TTP?",
    options: { A: "Deploying a CASB to enforce data loss prevention policies on cloud application traffic", B: "Implementing DNS sinkholing and monitoring with a SIEM", C: "Enabling endpoint DLP agents to block unauthorized transfers of sensitive file types", D: "Configuring IPS signatures to detect and block traffic matching known CVE exploit patterns" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q250", domain: 5, exam: "Original",
    question: "An organization's ISSO discovers that a third-party SaaS application stores PII without encrypting data at rest. The vendor's SLA does not address encryption requirements. Which of the following should be done FIRST?",
    options: { A: "Immediately terminate the SaaS contract and migrate all data to an approved internal system", B: "Conduct a full business impact analysis to quantify the risk of continuing the relationship", C: "Escalate to the CISO and initiate a vendor risk assessment", D: "Deploy a CASB to enforce DLP policies and encrypt data in transit to the SaaS application" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q251", domain: 2, exam: "Original",
    question: "A penetration tester uses OSINT to identify an organization's externally exposed RDP and SMB ports. Which of the following BEST describes the risk presented?",
    options: { A: "Increased likelihood of a volumetric DDoS attack disrupting internet-facing services", B: "Expanded attack surface vulnerable to lateral movement and exploitation", C: "Risk of DNS hijacking through BGP route manipulation redirecting traffic to attacker infrastructure", D: "Exposure to adversary-in-the-middle attacks targeting the organization's PKI certificate validation" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q252", domain: 4, exam: "Original",
    question: "An organization deploys a SOAR platform to automate incident response. Which of the following BEST describes the primary benefit of SOAR over a traditional SIEM?",
    options: { A: "SOAR provides better log aggregation than SIEM", B: "SOAR automates response actions reducing MTTD and MTTR", C: "SOAR replaces the need for EDR on endpoints", D: "SOAR encrypts all IOCs before sharing with threat intelligence feeds" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q253", domain: 3, exam: "Original",
    question: "A security architect is designing a zero trust architecture. Which of the following components is MOST critical for enforcing identity-based access to microservices?",
    options: { A: "NGFW with deep packet inspection", B: "An IdP integrated with OAuth 2.0 and OIDC", C: "A VLAN-based microsegmentation strategy", D: "A PAM solution with just-in-time access provisioning" },
    answer: "B", tier: "locked"
  },
  {
    id: "Q254", domain: 4, exam: "Original",
    question: "An MDM solution detects that a managed device has been jailbroken. Per the organization's BYOD policy, which of the following should occur AUTOMATICALLY?",
    options: { A: "The device should be added to the MDM blocklist", B: "A remote wipe should be initiated on the device", C: "The device should be quarantined and corporate data removed", D: "An alert should be sent to the SOC for manual review" },
    answer: "C", tier: "locked"
  },
  {
    id: "Q255", domain: 3, exam: "Original",
    question: "During a risk assessment, an organization identifies that its RPO is 4 hours and its RTO is 2 hours. Which of the following backup strategies BEST meets these requirements?",
    options: { A: "Daily full backups stored offsite with a cold site DR plan", B: "Hourly incremental backups with a warm site failover capability", C: "Weekly differential backups replicated to a cloud DR environment", D: "Continuous data replication to a hot site with automated failover" },
    answer: "D", tier: "locked"
  },
];

export default questions;
