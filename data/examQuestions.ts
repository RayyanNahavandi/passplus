// PassPlus - Exam Mode Questions
// 245 original exam-style questions based on CompTIA SY0-701 exam objectives
// Acronym-heavy, scenario-based, CompTIA style wording
// No content derived from any copyrighted source

export interface ExamQuestion {
  id: string;
  exam: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
  tier: "free" | "locked";
  domain: number;
}

export const examQuestions: ExamQuestion[] = ([] as ExamQuestion[]).concat([
{
    id: "EQ001", exam: "Exam",
    question: "A security engineer is reviewing an organization's IAM implementation. Users in the finance department have been granted access to HR systems due to a misconfigured RBAC policy. Which of the following should the engineer implement FIRST to remediate this issue?",
    options: { A: "Deploy a PAM solution to vault and monitor all privileged access to sensitive HR systems", B: "Conduct an access recertification campaign and remove non-compliant permissions", C: "Implement JIT provisioning with time-limited elevated access for all cross-department requests", D: "Enable MFA for all HR system logins to reduce unauthorized access risk" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ002", exam: "Exam",
    question: "An organization is deploying a PKI to issue certificates for internal services. The CA signs a certificate for a web server, but clients report the certificate is untrusted. Which of the following is the MOST likely cause?",
    options: { A: "The leaf certificate's validity period has expired and must be renewed by the CA", B: "The CRL distribution point is unreachable causing the client to reject the certificate", C: "The root CA certificate is not in the client trust store", D: "OCSP stapling is not configured causing certificate status checks to fail at the client" },
    answer: "C", tier: "free", domain: 1
  },
  {
    id: "EQ003", exam: "Exam",
    question: "A CISO requires that all data at rest be protected using AES-256. A database administrator reports that the current DBMS uses 3DES for column-level encryption. Which of the following BEST describes the risk?",
    options: { A: "3DES is susceptible to rainbow table attacks against its 56-bit underlying DES key schedule", B: "3DES has a shorter effective key length and is considered deprecated for new implementations", C: "3DES lacks native support for authenticated encryption modes such as GCM or CCM", D: "3DES operates on a 64-bit block size making it vulnerable to birthday attacks in high-volume scenarios" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ004", exam: "Exam",
    question: "A systems administrator implements a GPO that prevents users from installing software, limits USB storage, and enforces screen lock after five minutes of inactivity. Which security principle does this BEST represent?",
    options: { A: "Defense in depth", B: "Least functionality", C: "Separation of duties", D: "Zero trust" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ005", exam: "Exam",
    question: "During an audit, a reviewer discovers that a single administrator has the ability to create vendor accounts, approve purchase orders, and process payments. Which of the following controls would BEST mitigate this risk?",
    options: { A: "Implement PAM with session recording", B: "Enforce MFA for all financial transactions", C: "Apply separation of duties across the three functions", D: "Require dual authorization for payments over a threshold" },
    answer: "C", tier: "free", domain: 1
  },
  {
    id: "EQ006", exam: "Exam",
    question: "An organization uses HSMs to protect cryptographic keys. The HSM vendor announces end-of-life for the current firmware. Which of the following is the MOST important action for the security team to take?",
    options: { A: "Migrate all keys to software-based key storage immediately", B: "Assess the risk and plan a firmware upgrade or hardware replacement", C: "Generate new keys and revoke all existing certificates", D: "Enable key escrow with a third-party provider" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ007", exam: "Exam",
    question: "A developer requests access to a production database to debug an application issue. The request is granted for two hours and automatically revoked upon expiration. Which IAM concept does this BEST describe?",
    options: { A: "RBAC with time-based constraints", B: "JIT access provisioning", C: "DAC with temporary delegation", D: "ABAC with environmental attributes" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ008", exam: "Exam",
    question: "An organization discovers that a certificate issued by its internal CA was used to sign malicious code. The CA administrator needs to invalidate the certificate immediately. Which of the following is the FASTEST method?",
    options: { A: "Update the CRL and republish it to all distribution points", B: "Revoke the certificate and enable OCSP for real-time status checking", C: "Delete the certificate from the CA database", D: "Reissue the CA root certificate to invalidate all child certificates" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ009", exam: "Exam",
    question: "A security analyst is reviewing authentication logs and notices that a service account is authenticating using NTLM instead of Kerberos. Which of the following is the MOST significant concern?",
    options: { A: "NTLM does not support MFA", B: "NTLM is vulnerable to pass-the-hash attacks", C: "NTLM cannot be used with LDAP over TLS", D: "NTLM does not support certificate-based authentication" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ010", exam: "Exam",
    question: "An organization wants to implement SSO across all SaaS applications. The IdP must support attribute-based access and federated identity. Which protocol combination is MOST appropriate?",
    options: { A: "LDAP and RADIUS", B: "SAML 2.0 and OAuth 2.0", C: "Kerberos and NTLM", D: "TACACS+ and DIAMETER" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "EQ011", exam: "Exam",
    question: "A security engineer needs to ensure that API keys stored in a CI/CD pipeline cannot be accessed by developers with repository access. Which of the following BEST addresses this requirement?",
    options: { A: "Store API keys as environment variables in the code repository", B: "Use a secrets management solution integrated with the pipeline", C: "Encrypt the API keys using AES-256 and store in the repository", D: "Rotate API keys after every deployment" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ012", exam: "Exam",
    question: "An organization implements MAC for its classified document system. A user with SECRET clearance attempts to read a TOP SECRET document. Which of the following will occur?",
    options: { A: "Access is granted based solely on verified need-to-know regardless of the clearance level mismatch", B: "Access is denied because the user's clearance does not meet the data classification label", C: "Access is granted because SECRET clearance exceeds the minimum baseline threshold for the system", D: "Access is escalated to the data owner who can grant temporary override approval" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ013", exam: "Exam",
    question: "A security team is implementing a digital signature solution for email. Which of the following key operations must occur for a recipient to verify the sender's signature?",
    options: { A: "Decrypt the message using the sender's private key", B: "Verify the signature using the sender's public key", C: "Hash the message using SHA-256 and compare with the CA hash", D: "Decrypt the signature using the recipient's private key" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ014", exam: "Exam",
    question: "An organization stores password hashes in its user database. An attacker obtains the database and begins a dictionary attack. Which of the following would MOST effectively slow the attack?",
    options: { A: "Using SHA-256 instead of MD5 for hashing", B: "Implementing salting combined with bcrypt or Argon2", C: "Encrypting the hash database with AES-256", D: "Storing hashes in a separate database with restricted access" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ015", exam: "Exam",
    question: "A security administrator is configuring 802.1X on the organization's wired network. Which component is responsible for granting or denying network access based on authentication results?",
    options: { A: "Supplicant", B: "Authenticator", C: "RADIUS server", D: "IdP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ016", exam: "Exam",
    question: "An organization implements a TPM on all endpoints to support measured boot. Which of the following BEST describes the security benefit of this configuration?",
    options: { A: "Prevents unauthorized software installation", B: "Detects changes to the boot sequence by storing hash measurements", C: "Encrypts the boot partition using AES-256", D: "Prevents cold boot attacks by wiping RAM on shutdown" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ017", exam: "Exam",
    question: "A penetration tester discovers that a web application uses JWT for session management but does not validate the signature algorithm. The tester changes the algorithm to none and forges a token. Which vulnerability is being exploited?",
    options: { A: "CSRF attack forging authenticated requests using the victim's active browser session", B: "Algorithm confusion attack on JWT", C: "Session fixation attack forcing a known session identifier before user authentication", D: "OIDC token replay attack reusing a stolen ID token to impersonate the original user" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ018", exam: "Exam",
    question: "An organization is deploying FIDO2 authentication for all remote access. Which of the following BEST describes the cryptographic mechanism used?",
    options: { A: "Symmetric key exchange using ECDH to derive a shared session secret between client and server", B: "Asymmetric key pair where the private key never leaves the appliance", C: "TOTP generated using HMAC-SHA1 with a shared secret synchronized to the authentication server", D: "PKI certificates issued by an internal CA and stored in the device's secure element" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ019", exam: "Exam",
    question: "A security engineer is reviewing the organization's key management policy. The policy requires that encryption keys be recoverable in the event of employee termination. Which of the following controls satisfies this requirement?",
    options: { A: "Key rotation on a 90-day cycle", B: "Key escrow with a trusted third party", C: "HSM with FIPS 140-2 Level 3 compliance", D: "Dual control for key generation" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ020", exam: "Exam",
    question: "A user reports that after clicking a link in an email, they were redirected to a site identical to their company's SSO portal and entered credentials before noticing the URL was different. Which attack BEST describes this?",
    options: { A: "MITM attack using SSL stripping to downgrade the connection and intercept plaintext credentials", B: "Adversary-in-the-middle phishing with credential harvesting", C: "DNS cache poisoning redirecting the SSO portal hostname to an attacker-controlled IP address", D: "CSRF attack exploiting the SSO session cookie to perform unauthorized cross-origin requests" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ021", exam: "Exam",
    question: "An organization requires that all administrative access to cloud infrastructure use ephemeral credentials that expire after 15 minutes. Which of the following BEST satisfies this requirement?",
    options: { A: "IAM users with rotating API keys every 15 minutes", B: "IAM roles with STS-issued temporary credentials", C: "Service accounts with TOTP-based MFA", D: "PAM solution with session recording and checkout" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ022", exam: "Exam",
    question: "A wildcard certificate is installed on a load balancer serving multiple subdomains. A security analyst raises a concern about the certificate scope. Which of the following is the MOST valid concern?",
    options: { A: "Wildcard certificates cannot be used with EV validation", B: "Compromise of the private key affects all subdomains simultaneously", C: "Wildcard certificates are incompatible with HSTS preloading", D: "Wildcard certificates do not support SAN extensions" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ023", exam: "Exam",
    question: "An organization implements certificate pinning in its mobile application. After a CA-issued certificate is renewed, users report the application fails to connect. Which of the following is the MOST likely cause?",
    options: { A: "The renewed certificate uses a different cipher suite", B: "The pinned certificate hash no longer matches the new certificate", C: "The CRL distribution point has changed", D: "OCSP stapling is not supported by the mobile OS" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ024", exam: "Exam",
    question: "A SOC analyst discovers that an attacker obtained a valid session token by intercepting an unencrypted cookie. Which HTTP response header would have MOST effectively prevented this attack?",
    options: { A: "X-Frame-Options: DENY", B: "Set-Cookie: Secure; HttpOnly; SameSite=Strict", C: "Content-Security-Policy: default-src 'self'", D: "Strict-Transport-Security: max-age=31536000" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ025", exam: "Exam",
    question: "An organization uses ABAC for its cloud resource access policy. A contractor is denied access to a storage bucket despite having the correct role. Which of the following should be reviewed FIRST?",
    options: { A: "The contractor's RBAC group membership to verify they are assigned the correct role for this resource", B: "The environmental and resource tag conditions in the ABAC policy do not match the request context", C: "The contractor's MFA registration status which may be blocking policy evaluation for their session", D: "The storage bucket's ACL configuration which could be overriding the ABAC policy decision" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ026", exam: "Exam",
    question: "A security engineer is configuring a zero trust architecture. All users must be verified before accessing any resource regardless of network location. Which component is the control plane for enforcement?",
    options: { A: "NGFW with application-layer inspection", B: "Policy decision point integrated with IdP and device health signals", C: "VPN concentrator with split tunneling disabled", D: "NAC solution enforcing 802.1X on all network ports" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ027", exam: "Exam",
    question: "An organization migrates to passwordless authentication using FIDO2 passkeys. A user loses their device. Which of the following BEST describes the recovery process?",
    options: { A: "The user's passkey is stored in the IdP and can be reissued", B: "A backup passkey registered on a secondary device or recovery code is used", C: "The CA reissues a certificate to the replacement device", D: "TOTP is used as a fallback authentication method" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ028", exam: "Exam",
    question: "A developer implements a REST API using OAuth 2.0 with the implicit grant flow. A security reviewer flags this as a vulnerability. Which of the following BEST explains the concern?",
    options: { A: "The implicit flow does not support refresh tokens", B: "Access tokens are exposed in the URL fragment and browser history", C: "The implicit flow requires client secrets which cannot be stored securely", D: "OAuth 2.0 does not support API authentication" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ029", exam: "Exam",
    question: "An organization implements a KMS to manage encryption keys for cloud storage. The CISO requires that no cloud provider employee can access the plaintext keys. Which of the following BEST satisfies this requirement?",
    options: { A: "Customer-managed keys stored in the cloud provider's KMS", B: "Customer-managed keys using BYOK with an HSM operated by the organization", C: "Server-side encryption with provider-managed keys", D: "Envelope encryption using a DEK wrapped by a KEK" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ030", exam: "Exam",
    question: "A user's account is locked after five failed login attempts. An attacker exploits this by systematically locking out all user accounts. Which attack does this BEST describe?",
    options: { A: "Credential stuffing using a list of previously breached username and password pairs", B: "Account enumeration using timing differences to identify valid usernames in the directory", C: "Denial of service via account lockout", D: "Password spraying attempting a single common password against many accounts to avoid lockout" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ031", exam: "Exam",
    question: "A security architect designs a system where the private key is split into three parts and any two parts are required to reconstruct it. Which cryptographic concept does this implement?",
    options: { A: "Key escrow storing a copy of the private key with a trusted third-party custodian for recovery", B: "Shamir's Secret Sharing", C: "Dual control requiring two administrators to simultaneously present their key shares for access", D: "M-of-N key recovery distributing shares across N custodians and requiring any M to reconstruct" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ032", exam: "Exam",
    question: "An organization requires non-repudiation for all financial transactions. Which of the following cryptographic mechanisms BEST provides this assurance?",
    options: { A: "AES-256 encryption of transaction records", B: "Digital signatures using the sender's private key", C: "HMAC-SHA256 applied to transaction logs", D: "TLS 1.3 with mutual certificate authentication" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ033", exam: "Exam",
    question: "A security team implements PIM for all privileged accounts. Administrators must request elevated access and provide justification before any privileged operations. Which security principle does this MOST directly support?",
    options: { A: "Defense in depth layering multiple independent security controls to reduce overall risk exposure", B: "Least privilege with just-in-time access", C: "Separation of duties ensuring no single administrator can complete a sensitive task independently", D: "Zero trust network access verifying identity and device health before granting any resource access" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ034", exam: "Exam",
    question: "An organization implements certificate transparency logs. A security analyst receives an alert about an unauthorized certificate issued for the company's domain. Which of the following should the analyst do FIRST?",
    options: { A: "Revoke all internal CA-issued certificates and reissue them to ensure no other unauthorized certs exist", B: "Contact the issuing CA to revoke the unauthorized certificate and submit a CAA record update", C: "Implement CAA DNS records to restrict which CAs are authorized to issue certificates for the domain", D: "Enable HSTS preloading for all company domains to enforce encrypted connections and prevent stripping" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ035", exam: "Exam",
    question: "A cloud security engineer needs to ensure data stored in object storage is encrypted and encryption keys are rotated annually without re-encrypting the data. Which of the following BEST achieves this?",
    options: { A: "Server-side encryption with provider-managed keys and automatic rotation", B: "Envelope encryption where the KEK is rotated and the DEK is re-wrapped", C: "Client-side encryption with AES-256 and manual key rotation", D: "BYOK with annual key generation and data re-encryption" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ036", exam: "Exam",
    question: "A security engineer reviews authentication logs and notices users authenticating with valid credentials from two geographically distant locations within minutes. Which of the following BEST describes this indicator?",
    options: { A: "Brute force attack using distributed proxies", B: "Impossible travel indicating compromised credentials", C: "VPN split tunneling causing dual geolocation", D: "DNS rebinding attack on the authentication portal" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ037", exam: "Exam",
    question: "An organization implements a SDP to replace its legacy VPN. Users connect to an encrypted overlay network and only see resources they are authorized to access. Which security concept does SDP MOST closely align with?",
    options: { A: "Defense in depth with perimeter security", B: "Zero trust with microsegmentation and identity-based access", C: "Network segmentation using VLANs and ACLs", D: "SASE with cloud-delivered security services" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ038", exam: "Exam",
    question: "A security engineer implements DANE to improve the security of TLS connections. Which of the following BEST describes what DANE accomplishes?",
    options: { A: "Pins a specific CA as the only trusted issuer via DNS records", B: "Associates TLS certificates with domain names using DNSSEC-signed TLSA records", C: "Enables HSTS for all subdomains via DNS-based preloading", D: "Validates certificate transparency logs using DNS lookups" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ039", exam: "Exam",
    question: "An organization uses a federated identity model where partner employees access internal resources. The partner's IdP authenticates users and passes assertions to the organization's SP. Which protocol BEST describes this architecture?",
    options: { A: "RADIUS with EAP-TLS", B: "SAML 2.0 with IdP-initiated SSO", C: "OAuth 2.0 with authorization code flow", D: "Kerberos with cross-realm trust" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ040", exam: "Exam",
    question: "A security analyst reviews a certificate and notices the key usage extension includes keyCertSign and cRLSign. Which of the following BEST describes this certificate?",
    options: { A: "An end-entity certificate for a web server", B: "A CA certificate authorized to issue and revoke certificates", C: "A code signing certificate for software distribution", D: "A client authentication certificate for 802.1X" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ041", exam: "Exam",
    question: "An organization implements continuous access evaluation for all SaaS applications. A user's session is terminated mid-session after their device compliance status changes. Which of the following BEST describes this capability?",
    options: { A: "CASB enforcing DLP policies on active sessions", B: "Zero trust policy engine revoking access based on real-time risk signals", C: "MDM issuing a remote wipe command to the non-compliant device", D: "SIEM alerting the SOC about the compliance violation" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ042", exam: "Exam",
    question: "A security engineer discovers that a legacy application stores session tokens in URL parameters. Which of the following attacks is this MOST susceptible to?",
    options: { A: "CSRF using forged cross-origin requests that reuse the victim's authenticated session state", B: "Session token exposure via browser history, referrer headers, and server logs", C: "XSS injecting malicious scripts to extract tokens from the DOM or local storage", D: "Clickjacking embedding the application in an invisible iframe to capture user interactions" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ043", exam: "Exam",
    question: "An organization deploys a secrets vault to manage credentials for automated pipelines. A security review finds that service accounts are using long-lived static credentials instead of dynamic secrets. Which of the following is the PRIMARY risk?",
    options: { A: "Static credentials cannot be rotated without pipeline downtime", B: "Compromised static credentials provide persistent access until manually revoked", C: "Static credentials cannot be audited by the SIEM", D: "Long-lived credentials violate PCI DSS rotation requirements" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ044", exam: "Exam",
    question: "A security team implements SCIM to automate user provisioning across multiple SaaS applications. When an employee is terminated in the HR system, their accounts are automatically disabled. Which security principle does this MOST directly support?",
    options: { A: "Least privilege ensuring users receive only the minimum permissions required for their job function", B: "Timely account deprovisioning reducing orphaned account risk and attack surface", C: "Separation of duties preventing a single individual from controlling an entire sensitive process", D: "Defense in depth layering multiple controls so that no single failure leads to a complete compromise" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ045", exam: "Exam",
    question: "A penetration tester exploits a vulnerability where the application uses predictable session IDs based on timestamps. Which of the following BEST describes this vulnerability?",
    options: { A: "Session fixation", B: "Insecure direct object reference", C: "Weak session token entropy", D: "CSRF token bypass" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ046", exam: "Exam",
    question: "An organization wants to implement MFA that is resistant to phishing and SIM swapping attacks. Which of the following is MOST appropriate?",
    options: { A: "TOTP-based authenticator app", B: "SMS OTP sent to the user's mobile number", C: "FIDO2 hardware security key", D: "Push notification-based approval" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ047", exam: "Exam",
    question: "A security architect is evaluating cipher suites for TLS 1.3. Which of the following cipher suites provides perfect forward secrecy?",
    options: { A: "TLS_RSA_WITH_AES_256_CBC_SHA256", B: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384", C: "TLS_RSA_WITH_3DES_EDE_CBC_SHA", D: "TLS_DH_anon_WITH_AES_128_CBC_SHA" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ048", exam: "Exam",
    question: "An organization implements a PAM solution that requires two administrators to simultaneously authenticate before accessing critical infrastructure. Which control does this BEST represent?",
    options: { A: "Separation of duties", B: "Dual control", C: "Least privilege", D: "Need to know" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ049", exam: "Exam",
    question: "A security engineer is implementing data tokenization for a payment processing system. Which of the following BEST describes how tokenization differs from encryption?",
    options: { A: "Tokenization is reversible through a vault lookup while encryption requires the original key for decryption", B: "Tokenization replaces sensitive data with a non-sensitive substitute that has no exploitable value", C: "Tokenization uses symmetric vault-based substitution while encryption relies on a mathematical key operation", D: "Tokenization protects data integrity by replacing values with format-preserving surrogates in the database" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ050", exam: "Exam",
    question: "A security team discovers that an internal CA has been compromised. Which of the following should be done FIRST?",
    options: { A: "Reissue all certificates signed by the compromised CA", B: "Revoke the CA certificate and add it to the trust store CRL", C: "Notify all relying parties and initiate an incident response plan", D: "Generate a new CA key pair and begin reissuing certificates" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ051", exam: "Exam",
    question: "An organization implements homomorphic encryption for a cloud analytics platform. Which of the following BEST describes the primary benefit?",
    options: { A: "Data can be processed in the cloud without decryption", B: "Encryption keys never leave the organization's premises", C: "Data integrity is preserved during cloud storage", D: "Encrypted data can be searched using keyword matching" },
    answer: "A", tier: "locked", domain: 1
  },
  {
    id: "EQ052", exam: "Exam",
    question: "A security engineer reviews an organization's PKI policy and notes that leaf certificates have a validity period of five years. Which of the following is the PRIMARY concern?",
    options: { A: "Long validity periods increase the risk of key compromise going undetected", B: "Five-year certificates are not supported by modern browsers", C: "Long validity periods violate CA/Browser Forum baseline requirements", D: "Certificate pinning becomes difficult with long-lived certificates" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ053", exam: "Exam",
    question: "A security analyst discovers that an attacker performed a birthday attack against the organization's file integrity monitoring system. Which hashing algorithm is MOST vulnerable to this attack?",
    options: { A: "SHA-256", B: "SHA-3", C: "MD5", D: "BLAKE2" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ054", exam: "Exam",
    question: "An organization needs to ensure that vendor-supplied firmware has not been tampered with before installation. Which of the following BEST accomplishes this?",
    options: { A: "Verify the firmware hash against the vendor's published checksum using SHA-256", B: "Validate the digital signature on the firmware using the vendor's public key", C: "Scan the firmware with an EDR solution before installation", D: "Compare the firmware binary against a known-good baseline using FIM" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ055", exam: "Exam",
    question: "A security team implements a BYOK solution for cloud storage encryption. The organization generates keys using an on-premises HSM and imports them to the cloud KMS. Which of the following is the PRIMARY limitation?",
    options: { A: "The cloud provider can inspect plaintext key material during the secure transfer and wrapping process", B: "BYOK keys cannot be automatically rotated without re-encrypting all data protected by the original key", C: "Once imported, the key material may be accessible to the cloud provider undermining confidentiality", D: "BYOK mandates FIPS 140-2 Level 4 certified HSMs for key generation which few organizations can provide" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "EQ056", exam: "Exam",
    question: "A security architect is designing authentication for an API consumed by both mobile apps and third-party integrations. Which of the following flows is MOST appropriate for the mobile app use case?",
    options: { A: "Client credentials flow for confidential clients", B: "Authorization code flow with PKCE for public clients", C: "Implicit flow for browser-based authentication", D: "Resource owner password credentials flow" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ057", exam: "Exam",
    question: "A security engineer is implementing a solution to prevent lateral movement after an endpoint compromise. Which of the following BEST addresses this at the identity layer?",
    options: { A: "Deploy EDR on all endpoints to detect and block lateral movement", B: "Implement tiered administration with separate accounts for different privilege levels", C: "Enable host-based firewalls to block SMB traffic between endpoints", D: "Segment the network using VLANs to isolate workstations" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ058", exam: "Exam",
    question: "An organization implements a deception technology platform deploying fake credentials throughout the environment. When an attacker uses these credentials, an alert is triggered. Which of the following BEST describes this technique?",
    options: { A: "Honeypot deployment", B: "Credential canaries or honey tokens", C: "UEBA anomaly detection", D: "Threat intelligence correlation" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "EQ059", exam: "Exam",
    question: "A security team is implementing a solution to detect when administrative credentials are used outside of approved maintenance windows. Which of the following BEST accomplishes this?",
    options: { A: "PAM with session recording and time-based access restrictions", B: "SIEM correlation rule alerting on privileged account activity outside defined time windows", C: "MDM policy preventing device access during non-business hours", D: "NAC enforcing time-of-day access policies at the network layer" },
    answer: "B", tier: "locked", domain: 1
  },,
{
    id: "EQ060", exam: "Exam",
    question: "A threat intelligence analyst receives an IOC report indicating that a nation-state APT group is using a C2 framework with beaconing intervals of 300 seconds. Which detection strategy would MOST effectively identify this TTP?",
    options: { A: "Signature-based IDS rules matching known C2 domain names and IP addresses from threat feeds", B: "Network traffic analysis detecting periodic outbound connections to a C2 server", C: "EDR behavioral rules flagging process injection and hollow process creation techniques", D: "DNS sinkholing of known C2 infrastructure redirecting malware callbacks to an analyst-controlled server" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ061", exam: "Exam",
    question: "A SOC analyst is investigating an alert. The SIEM shows a PowerShell process spawned by winword.exe, followed by network connections to an external IP. Which MITRE ATT&CK tactic does this MOST likely represent?",
    options: { A: "Initial access via spear phishing delivering a malicious attachment to a targeted user", B: "Execution via macro-enabled document launching a PowerShell payload", C: "Persistence via scheduled task creation registering a malicious payload at system startup", D: "Lateral movement via pass-the-hash using captured NTLM credentials to authenticate remotely" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ062", exam: "Exam",
    question: "An organization's vulnerability scanner identifies a critical CVE on a production server. The patch requires a reboot during business hours. The server hosts a critical application with a 99.9% SLA. Which of the following is the MOST appropriate immediate action?",
    options: { A: "Apply the patch immediately and accept the SLA violation", B: "Implement a compensating control and schedule patching during the next maintenance window", C: "Accept the risk indefinitely until a zero-downtime patch is available", D: "Isolate the server from the network until the patch can be applied" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ063", exam: "Exam",
    question: "A threat hunter discovers that an attacker is using DNS over HTTPS to bypass the organization's DNS filtering controls. Which of the following BEST mitigates this technique?",
    options: { A: "Block all outbound DNS traffic on port 53 using perimeter firewall egress rules", B: "Implement SSL/TLS inspection and block DoH to unauthorized resolvers", C: "Deploy DNSSEC to cryptographically validate DNS responses and detect tampering", D: "Configure the SIEM to correlate and alert on abnormally high DNS query volumes per host" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ064", exam: "Exam",
    question: "A security analyst discovers that an attacker exfiltrated data by encoding it in the subdomain labels of DNS queries to an attacker-controlled domain. Which of the following BEST describes this technique?",
    options: { A: "DNS cache poisoning", B: "DNS tunneling for data exfiltration", C: "DNS amplification attack", D: "Fast flux domain generation" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ065", exam: "Exam",
    question: "An attacker gains initial access to a workstation and uses LSASS memory dumping to extract credential hashes. Which of the following controls would MOST effectively prevent this technique?",
    options: { A: "Enable Windows Defender Credential Guard to isolate LSASS", B: "Deploy EDR with behavioral detection for memory scraping", C: "Implement a PAM solution for all privileged accounts", D: "Enable PowerShell constrained language mode" },
    answer: "A", tier: "locked", domain: 2
  },
  {
    id: "EQ066", exam: "Exam",
    question: "A security team identifies that an attacker is performing LLMNR poisoning on the internal network to capture NTLMv2 hashes. Which of the following is the MOST effective mitigation?",
    options: { A: "Enable SMB signing on all systems", B: "Disable LLMNR and NetBIOS-NS via GPO", C: "Deploy a network IPS to detect and block LLMNR responses", D: "Implement 802.1X authentication on all network ports" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ067", exam: "Exam",
    question: "An organization discovers that an attacker maintained persistence by creating a scheduled task running a base64-encoded PowerShell command. Which detection control would have MOST likely identified this?",
    options: { A: "FIM monitoring for unauthorized changes to critical Windows registry keys and values", B: "SIEM correlation rule alerting on scheduled task creation with encoded commands", C: "EDR policy blocking execution of all scripts containing base64-encoded command strings", D: "Application whitelisting policy preventing execution of any unsigned PowerShell scripts" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ068", exam: "Exam",
    question: "A vulnerability assessment reveals that an internet-facing application is susceptible to XXE injection. Which of the following is the MOST effective remediation?",
    options: { A: "Deploy a WAF rule to filter XML input", B: "Disable external entity processing in the XML parser configuration", C: "Implement input validation to reject XML with DOCTYPE declarations", D: "Migrate the application to JSON-based APIs" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ069", exam: "Exam",
    question: "A threat intelligence report indicates that a ransomware group targets organizations by exploiting unpatched VPN appliances to gain initial access. Which of the following is the MOST effective preventive control?",
    options: { A: "Deploy MFA on all VPN connections to prevent unauthorized remote access using stolen credentials", B: "Implement a patch management program with priority patching for internet-facing systems", C: "Segment the network using VLANs and ACLs to contain the blast radius after a VPN compromise", D: "Enable EDR on VPN concentrators and authentication servers to detect active exploitation attempts" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ070", exam: "Exam",
    question: "A security analyst is reviewing web application logs and identifies requests containing ../../../etc/passwd in URL parameters. Which vulnerability is being exploited?",
    options: { A: "SQL injection targeting the backend database", B: "Path traversal attempting to read files outside the web root", C: "LFI executing server-side scripts via crafted paths", D: "SSRF proxying requests to internal services" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ071", exam: "Exam",
    question: "A researcher submits a bug bounty report demonstrating that user-supplied input is reflected in error messages without sanitization. Which vulnerability type does this MOST likely represent?",
    options: { A: "Stored XSS persisting malicious scripts in the database", B: "Reflected XSS where the payload is returned in the HTTP response", C: "DOM-based XSS manipulating the client-side document object model", D: "CSRF forcing authenticated users to submit malicious requests" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ072", exam: "Exam",
    question: "A penetration tester discovers that a web application constructs SQL queries using string concatenation with user input and extracts the entire user database using UNION-based injection. Which remediation is MOST effective?",
    options: { A: "Implement a WAF to filter SQL keywords from user input", B: "Use parameterized queries or prepared statements in all database interactions", C: "Sanitize user input by removing special characters before query construction", D: "Restrict database user permissions to SELECT only" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ073", exam: "Exam",
    question: "A SOC analyst observes that a compromised endpoint is making outbound connections to multiple internal hosts on port 445 after initial infection. Which MITRE ATT&CK tactic does this MOST likely represent?",
    options: { A: "Exfiltration over C2 channel", B: "Lateral movement using SMB exploitation", C: "Discovery scanning for network shares", D: "Persistence via remote service installation" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ074", exam: "Exam",
    question: "A threat analyst reviews a malware sample that modifies the MBR to execute before the OS loads. Which of the following malware types does this BEST describe?",
    options: { A: "Rootkit operating at the kernel level", B: "Bootkit persisting below the OS in the boot sector", C: "Firmware implant embedded in UEFI", D: "Logic bomb triggered during the boot process" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ075", exam: "Exam",
    question: "An organization's red team successfully exfiltrates data using steganography embedded in images uploaded to an approved cloud storage service. Which control would MOST effectively detect this technique?",
    options: { A: "DLP inspecting all outbound traffic for sensitive data patterns", B: "CASB with content inspection and steganalysis capabilities", C: "Network IPS rules blocking uploads to cloud storage", D: "UEBA detecting anomalous file access patterns" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ076", exam: "Exam",
    question: "A security analyst discovers that an attacker used Kerberoasting to extract service account credential hashes. Which of the following BEST mitigates this attack?",
    options: { A: "Disable SPN registration for all service accounts removing them as Kerberoasting targets", B: "Use managed service accounts with long randomly generated passwords and enable AES encryption for Kerberos", C: "Implement a PAM solution to vault service account credentials and enable session recording", D: "Enable Kerberos armoring via FAST to protect TGT requests from offline brute force attacks" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ077", exam: "Exam",
    question: "A vulnerability scanner returns a finding classified as a false positive. The security team verifies that the application is not susceptible to the reported vulnerability. Which of the following BEST describes the appropriate action?",
    options: { A: "Accept the risk, document it in the risk register, and schedule a follow-up review", B: "Document the exception, mark as false positive, and tune the scanner to reduce recurrence", C: "Suppress all future scans of this specific asset to eliminate recurring false positive alerts", D: "Escalate to the scanner vendor with evidence requesting an updated plugin or signature fix" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ078", exam: "Exam",
    question: "An attacker registers the domain micros0ft.com and hosts a convincing replica of an internal portal. Employees receive emails directing them to this site. Which of the following BEST describes this attack?",
    options: { A: "Homograph attack using Unicode lookalike characters", B: "Typosquatting exploiting common typing errors", C: "Subdomain takeover of a legitimate Microsoft domain", D: "Domain generation algorithm creating random domains" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ079", exam: "Exam",
    question: "A SOC analyst is triaging an alert where a process injected code into lsass.exe and then spawned a new process with SYSTEM privileges. Which MITRE ATT&CK technique does this MOST represent?",
    options: { A: "T1059 - Command and Scripting Interpreter for executing malicious commands via the shell", B: "T1055 - Process Injection combined with T1068 - Exploitation for Privilege Escalation", C: "T1078 - Valid Accounts for maintaining persistence using legitimately obtained credentials", D: "T1003 - OS Credential Dumping to harvest credentials from LSASS memory" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ080", exam: "Exam",
    question: "An organization implements a vulnerability management program. After scanning, the team discovers 500 critical vulnerabilities across 200 systems. Which of the following should be prioritized FIRST?",
    options: { A: "Patch all systems alphabetically to ensure systematic coverage", B: "Prioritize internet-facing systems with exploitable vulnerabilities and active exploit code", C: "Patch systems with the highest CVSS base scores regardless of context", D: "Remediate vulnerabilities on systems processing PII first" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ081", exam: "Exam",
    question: "A security analyst identifies that an attacker performed ARP cache poisoning on the local network segment to intercept traffic between two hosts. Which control would MOST effectively prevent this attack?",
    options: { A: "Enable port security on switches to limit MAC addresses per port", B: "Implement dynamic ARP inspection on managed switches", C: "Deploy 802.1X to authenticate all network devices", D: "Enable VLAN segmentation to isolate sensitive systems" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ082", exam: "Exam",
    question: "A threat intelligence report indicates that a threat actor is using living off the land techniques. Which of the following BEST describes this approach?",
    options: { A: "Using zero-day exploits to avoid detection by signature-based tools", B: "Leveraging built-in OS tools and legitimate software to perform malicious actions", C: "Staging malware in trusted repositories to bypass application whitelisting", D: "Using encrypted C2 channels to evade network-based detection" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ083", exam: "Exam",
    question: "A security team discovers that an attacker used a supply chain attack to embed a backdoor in a widely used open-source library used in 50 internal applications. Which of the following should be done FIRST?",
    options: { A: "Patch all applications using the compromised library", B: "Identify all systems using the compromised library version and assess exposure", C: "Block all inbound and outbound traffic from affected systems", D: "Notify the open-source maintainers of the backdoor" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ084", exam: "Exam",
    question: "An organization conducts a credentialed vulnerability scan and discovers a critical CVSS 9.8 vulnerability on an internal database server with a public PoC exploit. Which factor MOST increases the urgency of remediation?",
    options: { A: "The high CVSS base score indicating critical severity without contextual risk adjustment", B: "The availability of a public PoC exploit increasing the likelihood of exploitation", C: "The internal network location that reduces direct exposure from the public internet", D: "The database server's role in processing PII increasing data breach regulatory impact" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ085", exam: "Exam",
    question: "A penetration tester successfully exploits a SSRF vulnerability to access the cloud instance metadata service and retrieves IAM credentials. Which of the following BEST mitigates this attack vector?",
    options: { A: "Implement a WAF to block SSRF payloads", B: "Require IMDSv2 with session-oriented authentication for the metadata service", C: "Disable the instance metadata service on all cloud instances", D: "Implement network segmentation to isolate the application server" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ086", exam: "Exam",
    question: "A threat analyst is reviewing a malware sample that uses process hollowing to inject malicious code into a legitimate Windows process. Which EDR capability would MOST effectively detect this technique?",
    options: { A: "Signature-based detection matching known malware hashes in file-based threat intelligence databases", B: "Behavioral detection monitoring for memory allocation in legitimate processes followed by code execution", C: "Network-based detection and blocking of C2 channel communications originating from the injected process", D: "Application whitelisting policies that prevent the host process from spawning unexpected child processes" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ087", exam: "Exam",
    question: "An organization is assessing the risk of a vulnerability with a CVSS base score of 7.5 but no known public exploits affecting only internally accessible systems. Which of the following BEST describes the appropriate response?",
    options: { A: "Treat as critical and initiate emergency patching immediately based solely on the CVSS base score", B: "Use contextual risk factors to assign a lower effective risk rating and schedule remediation appropriately", C: "Accept the risk indefinitely since no known public exploits exist for this vulnerability", D: "Transfer the residual financial risk by purchasing cyber insurance covering ransomware events" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ088", exam: "Exam",
    question: "A security analyst discovers that an attacker used a golden ticket attack to forge Kerberos TGTs. Which of the following is the MOST effective remediation?",
    options: { A: "Reset all user passwords to force reauthentication and prevent use of harvested credentials", B: "Reset the KRBTGT account password twice to invalidate all existing tickets", C: "Rebuild the domain controller from a verified clean backup taken before the compromise", D: "Implement Kerberos armoring via FAST to validate ticket integrity and prevent forging" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ089", exam: "Exam",
    question: "A red team discovers that the organization's email gateway does not validate DMARC policies for inbound email. An attacker sends spoofed emails appearing to come from the CEO's domain. Which control would MOST effectively prevent this?",
    options: { A: "Configure SPF records for the organization's domain", B: "Enforce DMARC policy validation on the inbound email gateway", C: "Implement email encryption using S/MIME", D: "Deploy a secure email gateway with sandboxing" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ090", exam: "Exam",
    question: "A threat analyst observes that an advanced threat actor uses domain fronting to route C2 traffic through a legitimate CDN. Which of the following BEST detects this technique?",
    options: { A: "Block all traffic to known CDN IP ranges using threat intelligence-based perimeter firewall rules", B: "Implement TLS inspection and compare the SNI header with the HTTP Host header", C: "Deploy a DNS filtering solution categorizing and blocking known CDN provider domains", D: "Enable NetFlow analysis to identify and flag endpoints generating high-volume CDN traffic" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ091", exam: "Exam",
    question: "A security team identifies that an attacker could manipulate the redirect_uri parameter in an OAuth flow to steal authorization codes. Which mitigation BEST addresses this threat?",
    options: { A: "Use cryptographically random state parameters to prevent CSRF attacks in OAuth authorization flows", B: "Implement strict redirect_uri validation and whitelist approved URIs in the authorization server", C: "Require PKCE for all public OAuth clients using the authorization code flow", D: "Use short-lived authorization codes with a strict 60-second expiration and single-use enforcement" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ092", exam: "Exam",
    question: "A vulnerability scan identifies that a web server supports TLS 1.0 and is susceptible to the BEAST attack. Which of the following is the MOST appropriate remediation?",
    options: { A: "Disable CBC cipher suites and enable GCM-based cipher suites", B: "Disable TLS 1.0 and 1.1 and configure the server to support only TLS 1.2 and 1.3", C: "Enable HSTS to force all connections over TLS 1.2 or higher", D: "Implement a WAF to filter BEAST attack payloads" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ093", exam: "Exam",
    question: "An organization discovers that a threat actor used a watering hole attack to compromise employees visiting an industry forum. The malicious code exploited a browser vulnerability. Which control would MOST effectively mitigate this attack vector?",
    options: { A: "Deploy email filtering to block phishing links", B: "Implement browser isolation to execute web content in a remote container", C: "Enable application whitelisting to prevent unauthorized code execution", D: "Deploy a CASB to monitor cloud application usage" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ094", exam: "Exam",
    question: "A security analyst reviews an alert showing that a user's account performed a large number of failed authentication attempts against multiple internal systems within a short timeframe. Which of the following BEST describes this activity?",
    options: { A: "Credential stuffing using a list of compromised username and password pairs", B: "Lateral movement with password spraying using a compromised account", C: "Brute force attack against a single target system", D: "Kerberoasting extracting service ticket hashes from Active Directory" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ095", exam: "Exam",
    question: "A penetration tester discovers that the organization uses an outdated version of OpenSSL vulnerable to Heartbleed. Which of the following is the PRIMARY risk associated with this vulnerability?",
    options: { A: "An attacker can decrypt all previously recorded TLS sessions retroactively using the stolen private key", B: "An attacker can read arbitrary memory from the server potentially exposing private keys and session data", C: "An attacker can perform a protocol downgrade attack forcing negotiation of a weak deprecated cipher", D: "An attacker can inject forged records into active TLS sessions to tamper with encrypted content" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ096", exam: "Exam",
    question: "An organization implements a threat intelligence platform ingesting STIX/TAXII feeds. A new IOC is received indicating a known APT group is targeting the organization's industry. Which action should be taken FIRST?",
    options: { A: "Share the IOC with peer organizations via the ISAC to enable broader community detection", B: "Correlate the IOC against current SIEM logs to determine if the organization is already compromised", C: "Block the IOC at the perimeter firewall and email gateway to prevent future delivery attempts", D: "Initiate a proactive threat hunt using the APT group's full MITRE ATT&CK TTP profile" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ097", exam: "Exam",
    question: "A security engineer discovers that an attacker used BGP hijacking to redirect traffic from the organization's IP range through an attacker-controlled AS. Which control would MOST effectively prevent this?",
    options: { A: "Implement DNSSEC to validate DNS responses", B: "Deploy RPKI to cryptographically validate BGP route origins", C: "Use encrypted VPN tunnels for all inter-site communication", D: "Enable BFD on all BGP peering sessions" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ098", exam: "Exam",
    question: "A threat hunter discovers evidence of DCSync activity in Active Directory logs. The attacker used a compromised account to replicate all password hashes from the domain controller. Which permissions did the attacker MOST likely abuse?",
    options: { A: "SeDebugPrivilege enabling memory access to domain controller processes", B: "Replicating Directory Changes and Replicating Directory Changes All permissions", C: "Domain Admin membership enabling direct LSASS access", D: "Backup Operators group membership enabling VSS shadow copy access" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ099", exam: "Exam",
    question: "A vulnerability assessment identifies that several Linux servers are running services as root unnecessarily. Which of the following is the MOST appropriate remediation?",
    options: { A: "Implement a PAM solution to control root access", B: "Configure services to run under dedicated low-privilege service accounts", C: "Enable SELinux to enforce mandatory access controls", D: "Implement sudo rules to restrict root command execution" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ100", exam: "Exam",
    question: "A security team discovers that an attacker exfiltrated 50GB of data over three months without triggering any alerts. Which of the following was MOST likely absent from the security architecture?",
    options: { A: "A SIEM with real-time log correlation rules tuned for insider threat and data staging indicators", B: "DLP with baseline behavioral analysis detecting anomalous data transfers", C: "A WAF configured to inspect and block suspicious outbound HTTP and HTTPS traffic patterns", D: "EDR platform monitoring process execution chains and file access events on user endpoints" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ101", exam: "Exam",
    question: "An organization uses automated vulnerability scanning. A new zero-day is publicly disclosed affecting a widely used library. The scanner does not yet have a signature for this CVE. Which of the following BEST compensates for this gap?",
    options: { A: "Increase scan frequency until the signature is available", B: "Initiate manual threat hunting based on the vulnerability's known exploitation indicators", C: "Accept the risk until the scanner vendor releases the signature", D: "Isolate all systems using the affected library from the network" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ102", exam: "Exam",
    question: "A penetration tester performs a man-in-the-browser attack by injecting malicious JavaScript into a banking application. The script modifies transaction details after the user submits but before transmission. Which of the following BEST mitigates this attack?",
    options: { A: "Implement HSTS to prevent SSL stripping attacks on browser sessions to the banking application", B: "Use transaction verification with out-of-band confirmation sent to a registered mobile device", C: "Deploy a WAF with rules to detect and block malicious JavaScript injection attempts", D: "Implement Content Security Policy headers to prevent execution of injected inline scripts" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ103", exam: "Exam",
    question: "A security analyst discovers that a phishing email bypassed the organization's secure email gateway. The email contained a QR code linking to a credential harvesting site. Which of the following BEST explains why the gateway failed?",
    options: { A: "The email was sent from a domain with valid DMARC, SPF, and DKIM records", B: "The gateway does not inspect image-based content such as QR codes for embedded URLs", C: "The phishing domain was registered too recently to appear in threat intelligence feeds", D: "The email used encryption preventing the gateway from inspecting the content" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ104", exam: "Exam",
    question: "A threat intelligence analyst assesses that a financially motivated threat actor with moderate sophistication is targeting the organization. Which of the following BEST describes this actor's profile?",
    options: { A: "Nation-state APT with advanced persistent access capabilities", B: "Organized cybercriminal group likely using commodity ransomware or BEC techniques", C: "Hacktivist group targeting the organization for ideological reasons", D: "Insider threat with access to sensitive financial systems" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ105", exam: "Exam",
    question: "A security engineer reviewing web application logs identifies requests where the User-Agent header contains sqlmap. Which of the following BEST describes this activity?",
    options: { A: "A legitimate security scanner performing authorized vulnerability assessment", B: "Automated SQL injection testing tool potentially being used by an attacker or unauthorized tester", C: "A WAF testing tool verifying protection against SQL injection", D: "A web crawler indexing the application for search engine optimization" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ106", exam: "Exam",
    question: "A vulnerability scanner discovers that a legacy PLC in industrial control systems is running an unpatched OS with several critical CVEs. The vendor no longer supports the system. Which of the following is the MOST appropriate risk treatment?",
    options: { A: "Accept the risk since the PLC operates on an isolated OT network with no IT connectivity", B: "Implement network segmentation, strict ACLs, and compensating controls while planning for hardware replacement", C: "Virtualize the PLC operating environment to enable patching without replacing physical hardware", D: "Immediately replace the PLC hardware regardless of operational cost or production disruption" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ107", exam: "Exam",
    question: "A threat analyst discovers that malware is using process doppelganging to evade detection. Which of the following BEST describes this technique?",
    options: { A: "Injecting shellcode directly into a legitimate process's allocated memory via WriteProcessMemory", B: "Creating a malicious process image using NTFS transactions to replace a legitimate executable without writing to disk", C: "Process hollowing by unmapping a legitimate process image and injecting malicious code into the cleared space", D: "DLL side-loading by placing a malicious library in the search path of a trusted signed application" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ108", exam: "Exam",
    question: "A SOC analyst receives an alert indicating that a user downloaded 10,000 files from a SharePoint site in 30 minutes. The user is in sales and has never accessed this site before. Which of the following BEST describes this behavior?",
    options: { A: "Ransomware staging large files prior to encryption and ransom demand deployment", B: "Potential insider threat or compromised account performing data exfiltration", C: "Legitimate bulk file download by a recently onboarded employee accessing shared resources", D: "An authorized automated backup process executing under a standard user account credential" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ109", exam: "Exam",
    question: "A penetration tester uses Responder to capture NTLMv2 hashes and then uses hashcat to crack a hash offline. Which of the following would MOST effectively prevent the cracked hash from being usable for further access?",
    options: { A: "Enforce progressive account lockout policies to throttle credential stuffing and brute force attempts", B: "Implement network segmentation to limit Responder's broadcast and multicast listener visibility", C: "Require mandatory LDAP channel binding and signing to prevent relay and downgrade attacks", D: "Enforce long complex passwords and disable NTLM authentication in favor of Kerberos" },
    answer: "D", tier: "locked", domain: 2
  },
  {
    id: "EQ110", exam: "Exam",
    question: "A security analyst reviews threat intelligence and identifies that a known APT group uses spear phishing with weaponized PDF attachments exploiting a reader vulnerability. Which of the following is the MOST effective defensive control?",
    options: { A: "Block all PDF and Office attachments at the email gateway as a broad preventive measure", B: "Deploy sandboxing to detonate attachments in an isolated environment before delivery", C: "Implement targeted user training to recognize and report suspicious attachment-based phishing", D: "Configure document readers to disable macros by default for all untrusted content sources" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ111", exam: "Exam",
    question: "An organization's pen test report identifies an IDOR vulnerability in an API endpoint where an authenticated user can access other users' records by incrementing an ID parameter. Which of the following is the MOST effective remediation?",
    options: { A: "Rate limit the API endpoint to slow enumeration and detect high-frequency automated requests", B: "Implement server-side authorization checks verifying that the authenticated user owns the requested resource", C: "Replace sequential integer IDs with non-guessable UUIDs to prevent direct object enumeration", D: "Require step-up authentication for sensitive operations to verify user intent before access" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ112", exam: "Exam",
    question: "A threat analyst discovers that an attacker is using a RAT that communicates exclusively over port 443 using legitimate HTTPS traffic patterns. Which of the following BEST detects this C2 channel?",
    options: { A: "Block all outbound TLS traffic on port 443 except to explicitly whitelisted destination IP ranges", B: "Implement TLS inspection combined with behavioral analysis detecting anomalous certificate characteristics and traffic patterns", C: "Deploy DNS filtering to block resolution of known C2 domains using threat intelligence feeds", D: "Enable IPS signatures matched to known RAT beacon intervals and communication protocol fingerprints" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "EQ113", exam: "Exam",
    question: "A security team is conducting a tabletop exercise simulating a ransomware attack with encrypted production systems and exfiltrated data. The team must decide whether to pay the ransom. Which factor is MOST relevant to this decision?",
    options: { A: "The ransom amount relative to the organization's cyber insurance coverage", B: "Whether viable offline backups exist enabling recovery without paying the ransom", C: "The reputation of the ransomware group and their history of providing decryption keys", D: "Legal guidance on whether paying the ransom violates OFAC sanctions" },
    answer: "B", tier: "locked", domain: 2
  },,
{
    id: "EQ114", exam: "Exam",
    question: "A cloud architect is designing a multi-tenant SaaS application. The CISO requires that each tenant's data be cryptographically isolated. Which of the following BEST achieves this requirement?",
    options: { A: "Shared database schemas with row-level security policies restricting each tenant to their data", B: "Tenant-specific encryption keys managed in a KMS with separate key hierarchies per tenant", C: "VPC peering configured between each tenant environment for controlled cross-tenant communication", D: "Network segmentation using dedicated subnets per tenant enforced by security group policies" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ115", exam: "Exam",
    question: "An organization is migrating to a SASE architecture. Which of the following security functions are consolidated in a SASE solution?",
    options: { A: "NGFW, IDS/IPS, and DLP deployed on-premises at each branch", B: "SD-WAN, CASB, SWG, ZTNA, and FWaaS delivered as a cloud service", C: "VPN concentrators, NAC, and PAM deployed in a central data center", D: "EDR, SIEM, and SOAR integrated in a unified security operations platform" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ116", exam: "Exam",
    question: "A security architect is designing a DMZ for a financial institution with an external firewall, DMZ segment, and internal firewall. Which of the following BEST describes the role of the internal firewall?",
    options: { A: "Preventing external attackers from reaching DMZ resources", B: "Restricting DMZ systems from initiating connections to internal resources and vice versa", C: "Performing NAT to translate public IP addresses to DMZ server IPs", D: "Providing IPS functionality to detect attacks against DMZ servers" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ117", exam: "Exam",
    question: "An organization implements a shared responsibility model for its IaaS deployment. A data breach occurs due to a misconfigured S3 bucket allowing public access. Which party is responsible for this misconfiguration?",
    options: { A: "The cloud provider for failing to prevent public bucket access by default", B: "The customer for misconfiguring the bucket's access control settings", C: "Both parties share equal responsibility under the shared responsibility model", D: "The third-party security team responsible for cloud security posture management" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ118", exam: "Exam",
    question: "A security architect is evaluating network segmentation strategies to limit the blast radius of a compromised endpoint and prevent lateral movement. Which of the following BEST achieves this at scale?",
    options: { A: "VLAN segmentation at the access layer with ACLs on the distribution layer", B: "Microsegmentation using host-based firewalls enforced by a centralized SDN policy controller", C: "Physical network separation of all departments into isolated LAN segments", D: "NAC enforcing endpoint compliance before granting network access" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ119", exam: "Exam",
    question: "An organization deploys a WAF in front of its web applications. A security engineer observes that certain legitimate API requests are being blocked. Which of the following BEST describes the appropriate action?",
    options: { A: "Disable the specific WAF rule triggering false positives to fully restore service to all users", B: "Create a custom exception for the specific legitimate traffic pattern while maintaining protection", C: "Switch the entire WAF to passive detection mode allowing all traffic while alerts are investigated", D: "Whitelist the source IP addresses of all known legitimate API consumers bypassing WAF inspection" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ120", exam: "Exam",
    question: "A cloud security engineer discovers that EC2 instances are using instance metadata service v1 which does not require session authentication. Which of the following attacks does this enable?",
    options: { A: "Hypervisor-level access allowing direct reads of the instance's root EBS volume", B: "SSRF attacks allowing unauthorized retrieval of IAM role credentials from the metadata service", C: "Lateral movement to other instances in the same VPC via crafted internal SSRF requests", D: "Privilege escalation by exploiting the AWS Systems Manager agent's assumed IAM role" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ121", exam: "Exam",
    question: "An organization wants to implement infrastructure as code for all cloud deployments. Which of the following security benefits does IaC PRIMARILY provide?",
    options: { A: "Automated vulnerability scanning continuously detecting unpatched software across all deployed cloud resources", B: "Consistent version-controlled and auditable infrastructure configurations reducing configuration drift", C: "Real-time alerting on unauthorized infrastructure changes correlated through the SIEM", D: "Automated compliance reporting that maps deployed configurations against CIS benchmark requirements" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ122", exam: "Exam",
    question: "A security architect is designing a solution for a classified government network that must never connect to the internet. Which of the following architectures is MOST appropriate?",
    options: { A: "Private cloud deployment with strict firewall rules blocking internet access", B: "Air-gapped network with physical separation from all external networks", C: "Classified VLAN on a shared physical network with ACLs preventing internet routing", D: "SD-WAN with encrypted tunnels to a classified cloud region" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ123", exam: "Exam",
    question: "An organization's BCDR plan specifies an RTO of 4 hours and an RPO of 1 hour. Which of the following backup and recovery architectures BEST meets these requirements?",
    options: { A: "Daily full backups stored offsite with a cold site recovery facility", B: "Hourly incremental backups replicated to a warm site with pre-staged infrastructure", C: "Weekly differential backups with a hot site maintaining real-time replication", D: "Continuous replication to a hot site with automated failover capability" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ124", exam: "Exam",
    question: "A security engineer is implementing a solution to inspect encrypted east-west traffic between microservices in a Kubernetes cluster without requiring individual application changes. Which of the following BEST achieves this?",
    options: { A: "Deploy a WAF to inspect all inter-service traffic", B: "Implement a service mesh with mTLS and traffic inspection capabilities", C: "Configure network policies to route all traffic through an inspection proxy", D: "Deploy host-based IDS on each pod to monitor process behavior" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ125", exam: "Exam",
    question: "An organization implements a cloud access security broker to manage SaaS application usage. Which of the following capabilities does a CASB provide that a traditional proxy does not?",
    options: { A: "URL filtering to block access to uncategorized or prohibited web browsing destinations", B: "Visibility into shadow IT usage and enforcement of DLP policies across sanctioned SaaS applications", C: "SSL/TLS traffic inspection to decrypt and analyze encrypted web sessions for threats", D: "Real-time antivirus scanning of all files downloaded from the internet to endpoints" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ126", exam: "Exam",
    question: "A security architect is designing a network architecture for a manufacturing plant with OT systems. Which of the following BEST describes the Purdue model's purpose in this context?",
    options: { A: "Defining patch management procedures specific to ICS components and legacy SCADA systems", B: "Providing a hierarchical network segmentation model separating OT and IT systems by function and trust level", C: "Establishing role-based authentication and authorization requirements for all SCADA system access", D: "Specifying encryption and integrity standards for Modbus, DNP3, and other industrial protocol communications" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ127", exam: "Exam",
    question: "An organization deploys an NGFW in transparent mode between its core switch and distribution layer. Which of the following BEST describes the advantage of transparent mode?",
    options: { A: "The firewall can perform deep packet inspection without impacting throughput", B: "The firewall can inspect traffic without requiring IP address changes or routing modifications", C: "Transparent mode enables the firewall to decrypt TLS traffic without certificate deployment", D: "The firewall can perform active/passive failover without BGP route changes" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ128", exam: "Exam",
    question: "A cloud security engineer is designing a landing zone for a multi-account AWS environment. Which of the following BEST ensures consistent security controls across all accounts?",
    options: { A: "Manual security configuration reviews conducted by the security team for each newly provisioned account", B: "Centralized policy enforcement using AWS Organizations SCPs and a security account with delegated admin", C: "Duplicating IAM policies across each member account to replicate the organization's security standards", D: "VPC sharing topology enabling centrally managed security groups across member accounts" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ129", exam: "Exam",
    question: "A security architect is evaluating SD-WAN for branch office connectivity. Which of the following security considerations is MOST important when deploying SD-WAN?",
    options: { A: "Ensuring SD-WAN appliances support all required dynamic routing protocols including BGP and OSPF", B: "Integrating security functions such as NGFW, IPS, and secure web gateway into the SD-WAN solution", C: "Maximizing bandwidth utilization across all WAN links using application-aware load balancing", D: "Deploying SD-WAN controllers in an active-active highly available configuration to prevent outages" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ130", exam: "Exam",
    question: "An organization implements a serverless architecture for its data processing pipeline. Which of the following security considerations is unique to serverless environments?",
    options: { A: "Patching the underlying OS and hypervisor", B: "Managing excessive function permissions and securing event trigger sources", C: "Implementing network segmentation between serverless functions", D: "Deploying EDR on serverless execution environments" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ131", exam: "Exam",
    question: "A security engineer is implementing network detection and response. Which of the following deployment locations provides the MOST comprehensive visibility into east-west traffic?",
    options: { A: "At the internet edge upstream of the perimeter firewall", B: "On SPAN ports at the core switching layer capturing inter-VLAN traffic", C: "At the VPN concentrator monitoring remote access sessions", D: "On the DMZ segment monitoring traffic to internet-facing servers" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ132", exam: "Exam",
    question: "An organization is designing a disaster recovery architecture. The CISO requires that the DR site can assume full production load within 15 minutes of a primary site failure with zero data loss. Which DR strategy BEST meets these requirements?",
    options: { A: "Warm site with pre-staged servers and 4-hour data replication", B: "Hot site with synchronous data replication and automated failover", C: "Cloud-based DR with asynchronous replication and 1-hour RTO", D: "Cold site with daily backup restoration capabilities" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ133", exam: "Exam",
    question: "A cloud security architect is designing a solution to prevent data exfiltration from a cloud environment through authorized cloud service APIs. Which control MOST effectively prevents this?",
    options: { A: "Egress filtering blocking all non-whitelisted external IP addresses", B: "VPC service controls creating a security perimeter around cloud resources", C: "DLP policies scanning all outbound network traffic", D: "CASB monitoring API calls to cloud services" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ134", exam: "Exam",
    question: "An organization implements a jump server architecture for administrative access to production systems. Which of the following BEST enhances the security of this architecture?",
    options: { A: "Enabling RDP on all production systems accessible from the jump server", B: "Restricting jump server access to specific source IPs, requiring MFA, and logging all sessions", C: "Deploying the jump server in the production network segment for low latency", D: "Using shared administrative accounts on the jump server for operational efficiency" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ135", exam: "Exam",
    question: "A security architect is reviewing a proposed cloud architecture that routes all internet traffic through a centralized egress point in a security VPC. Which security benefit does this provide?",
    options: { A: "Reduced latency for internet-bound traffic from all workloads", B: "Centralized inspection, filtering, and logging of all outbound internet traffic", C: "Automatic failover for internet connectivity if the primary ISP fails", D: "Cost optimization by consolidating NAT gateway usage" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ136", exam: "Exam",
    question: "An organization deploys containers in production without restricting container capabilities. A security audit identifies that containers are running as root and have access to the host network namespace. Which of the following BEST mitigates these risks?",
    options: { A: "Implement Kubernetes network policies to explicitly restrict all inter-container and inter-namespace communication", B: "Enforce pod security standards requiring non-root execution and dropping unnecessary Linux capabilities", C: "Deploy a WAF in front of the container ingress to inspect and filter application layer API traffic", D: "Enable automated container image scanning in the CI/CD pipeline to detect known CVEs before deployment" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ137", exam: "Exam",
    question: "A security engineer is designing a solution to protect sensitive data processed by a cloud application from the cloud provider's own administrators. Which of the following technologies BEST addresses this requirement?",
    options: { A: "Customer-managed keys in the cloud provider's KMS", B: "Confidential computing using hardware-based trusted execution environments", C: "End-to-end encryption with client-side key management", D: "Data masking applied before data is stored in cloud systems" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ138", exam: "Exam",
    question: "A network architect is designing a wireless network for a healthcare organization. Patient monitoring devices must connect to a dedicated SSID that cannot communicate with the corporate network. Which of the following BEST achieves this requirement?",
    options: { A: "WPA3-Enterprise with per-device certificates for medical devices", B: "Client isolation on a dedicated SSID with VLAN assignment routing to a separate network segment", C: "MAC filtering to restrict access to registered medical device addresses", D: "802.1X with RADIUS-based VLAN assignment for medical devices" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ139", exam: "Exam",
    question: "An organization is evaluating IDS deployment options. The security team wants to detect attacks without disrupting legitimate traffic. Which deployment mode BEST meets this requirement?",
    options: { A: "Inline IPS deployment actively blocking detected attack traffic in real time within the flow path", B: "Passive monitoring via SPAN port analyzing traffic copies without impacting network flow", C: "Transparent bridge mode inserting the sensor inline while automatically dropping malicious sessions", D: "Host-based IDS deployed on each server monitoring local process execution and file system activity" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ140", exam: "Exam",
    question: "A security architect is designing a solution for a retail organization processing payment card data. Which network segmentation approach is MOST appropriate for PCI DSS compliance?",
    options: { A: "Placing all POS systems on a single dedicated VLAN with firewall rules restricting outbound access", B: "Isolating the cardholder data environment in a separate network segment with strict ingress and egress controls", C: "Using a flat network topology with only host-based firewalls on individual POS terminals", D: "Encrypting all traffic on network segments that transmit or process cardholder data in transit" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ141", exam: "Exam",
    question: "An organization implements a CDN for its public web application. A security engineer raises a concern that the CDN may cache sensitive API responses containing PII. Which of the following BEST mitigates this risk?",
    options: { A: "Disable CDN caching entirely for the application", B: "Configure Cache-Control headers to prevent caching of sensitive API responses", C: "Enable HTTPS for all CDN connections to protect cached data", D: "Implement WAF rules on the CDN to block PII in cached responses" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ142", exam: "Exam",
    question: "A security engineer is designing a solution to prevent unauthorized API access between microservices in a production environment. Which of the following BEST implements service-to-service authentication?",
    options: { A: "API gateway with static API keys shared between services", B: "Mutual TLS authentication with service-specific certificates managed by a service mesh", C: "Network policies restricting traffic to allowed service pairs", D: "OAuth 2.0 client credentials flow with shared client secrets" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ143", exam: "Exam",
    question: "A cloud architect is designing a solution to ensure that all API calls to cloud management APIs are logged and traceable to individual users. Which of the following BEST achieves this?",
    options: { A: "Enable VPC flow logs and CloudWatch to capture all inbound and outbound network traffic", B: "Enable cloud provider management plane logging and integrate with a centralized SIEM", C: "Deploy a CASB to monitor all API calls to sanctioned and unsanctioned cloud services", D: "Require phishing-resistant MFA for all cloud management console and API access" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ144", exam: "Exam",
    question: "An organization deploys a SOAR platform integrated with its SIEM. A phishing alert is triggered and the SOAR automatically blocks the sender domain, quarantines the email, and resets the user's password. Which of the following BEST describes this capability?",
    options: { A: "SIEM correlation detecting the phishing campaign", B: "Automated incident response playbook executing predefined remediation actions", C: "Threat intelligence enrichment identifying the malicious domain", D: "EDR response isolating the affected endpoint" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ145", exam: "Exam",
    question: "A security architect is designing a solution to protect against BGP route leaks. Which of the following controls provides the MOST comprehensive protection?",
    options: { A: "Implementing strict ingress and egress prefix filters on all external BGP peering sessions", B: "Deploying RPKI with route origin validation and BGP ASPA to validate AS path integrity", C: "Enabling MD5 TCP authentication on all BGP sessions to prevent session hijacking", D: "Using private AS numbers internally and filtering them at the internet boundary" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ146", exam: "Exam",
    question: "An organization is designing a backup strategy. The CISO requires that backups be protected against ransomware that could encrypt backup files. Which of the following BEST mitigates this risk?",
    options: { A: "Encrypt all backup files using AES-256 and store encryption keys in a separate secure vault", B: "Implement immutable backup storage with object lock preventing modification or deletion for a defined retention period", C: "Store backups on an air-gapped or separate network segment not accessible from the production environment", D: "Use incremental daily backups to reduce the volume of data exposed in any single backup repository" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ147", exam: "Exam",
    question: "A security architect is reviewing a proposed architecture for a new application that stores user session tokens in browser localStorage. Which of the following is the PRIMARY security concern?",
    options: { A: "localStorage tokens are transmitted in every HTTP request increasing exposure", B: "localStorage is accessible via JavaScript making tokens vulnerable to XSS attacks", C: "localStorage tokens persist indefinitely unless explicitly cleared", D: "localStorage does not support the Secure or HttpOnly flags" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ148", exam: "Exam",
    question: "An organization implements a cloud-native SIEM. The security team wants to ensure that logs from on-premises systems are included. Which of the following is the MOST secure method for forwarding logs?",
    options: { A: "Configure syslog forwarding over UDP port 514 to the SIEM ingestion endpoint", B: "Deploy log forwarders using encrypted TLS connections with certificate-based authentication", C: "Use a site-to-site VPN to connect the on-premises network to the cloud SIEM", D: "Upload log files periodically via SFTP to cloud storage integrated with the SIEM" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ149", exam: "Exam",
    question: "A security architect is designing a solution for a regulated industry requiring all encryption keys to be generated and stored on hardware meeting FIPS 140-2 Level 3 validation. Which of the following BEST meets this requirement?",
    options: { A: "Software-based key management using AES-256 encryption", B: "FIPS 140-2 Level 3 validated HSM for key generation and storage", C: "Cloud KMS with customer-managed keys and hardware-backed storage", D: "TPM-based key storage on server hardware" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ150", exam: "Exam",
    question: "An organization wants to implement network-based detection for threats using encrypted C2 channels without breaking encryption. Which of the following provides the MOST effective detection capability?",
    options: { A: "Deploy TLS inspection proxies to decrypt and inspect all HTTPS traffic", B: "Use JA3/JA3S fingerprinting and behavioral analysis to detect anomalous TLS patterns", C: "Block all TLS traffic to non-whitelisted destinations", D: "Deploy host-based monitoring to detect C2 beaconing from endpoints" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ151", exam: "Exam",
    question: "A cloud architect is designing a solution to ensure that data stored in a cloud database cannot be accessed by the cloud provider's staff. Which approach provides the STRONGEST protection?",
    options: { A: "Enable transparent data encryption using provider-managed keys for encryption at rest", B: "Implement client-side encryption before data is sent to the database with keys managed on-premises", C: "Use customer-managed keys stored in the cloud provider's KMS for envelope encryption at rest", D: "Enable comprehensive database audit logging to detect and alert on unauthorized data access" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ152", exam: "Exam",
    question: "An organization implements a network access control solution. A device connecting to the network fails the compliance check due to missing patches. Which of the following actions should the NAC take?",
    options: { A: "Deny all access until the device is manually remediated", B: "Place the device in a quarantine VLAN providing access only to remediation resources", C: "Grant limited read-only access to all network resources", D: "Notify the security team and allow access to continue monitoring" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ153", exam: "Exam",
    question: "A security architect is designing a solution for a financial institution requiring geographic redundancy with sub-second failover for its trading platform. Which of the following BEST meets these requirements?",
    options: { A: "Hot standby with synchronous replication and automated failover using anycast routing", B: "Active-active deployment across multiple regions with load balancing and health checks", C: "Warm standby with asynchronous replication and manual failover procedures", D: "Cold standby with daily backups and 4-hour RTO" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ154", exam: "Exam",
    question: "A security engineer is hardening a Linux server. Which of the following changes MOST effectively reduces the server's attack surface?",
    options: { A: "Enable firewalld with strict zone policies to block all non-essential inbound network traffic", B: "Remove all unnecessary packages, disable unused services, and implement mandatory access controls using SELinux or AppArmor", C: "Configure fail2ban with aggressive rate limiting to block IPs after repeated failed authentication", D: "Enable full disk encryption using LUKS with TPM-bound key protection for data at rest" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ155", exam: "Exam",
    question: "An organization deploys a honeypot network to detect lateral movement. An attacker triggers alerts by attempting to connect to honeypot systems. Which of the following actions should the security team take FIRST?",
    options: { A: "Block the source IP at the perimeter firewall to prevent additional inbound connections", B: "Investigate the source of the lateral movement to determine the scope of the compromise", C: "Immediately isolate the honeypot systems to prevent any further attacker interaction or data loss", D: "Force reset all user and service account passwords across the affected network segment" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ156", exam: "Exam",
    question: "A security architect is evaluating network segmentation for a new healthcare facility. IoT medical devices must communicate with a central management server but must not access any other network resources. Which of the following BEST achieves this?",
    options: { A: "Connect IoT devices to the main corporate VLAN relying solely on host-based firewall policies", B: "Deploy IoT devices on a dedicated VLAN with firewall rules permitting only traffic to the management server", C: "Implement MAC address filtering on the switch to restrict which IoT devices can communicate", D: "Provision a physically separate switch exclusively for IoT device connectivity and management" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "EQ157", exam: "Exam",
    question: "An organization is evaluating cloud deployment models for a new application processing sensitive government data. Data sovereignty requirements mandate that data cannot leave the country. Which cloud deployment model BEST meets this requirement?",
    options: { A: "Public cloud with data residency controls configured by the provider", B: "Private cloud or government cloud deployed in approved domestic data centers", C: "Hybrid cloud with sensitive data stored on-premises and processing in the public cloud", D: "Community cloud shared with other government agencies in the same country" },
    answer: "B", tier: "locked", domain: 3
  },,
{
    id: "EQ158", exam: "Exam",
    question: "A SOC analyst receives a SIEM alert indicating that a domain controller is exporting its Active Directory database. Which of the following incident response actions should be taken FIRST?",
    options: { A: "Reset all domain administrator passwords immediately", B: "Isolate the domain controller from the network and preserve volatile evidence", C: "Notify the CISO and initiate the crisis communication plan", D: "Force Kerberos ticket expiration by resetting the KRBTGT password" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ159", exam: "Exam",
    question: "A forensic investigator is analyzing a compromised Windows system and needs to capture the contents of RAM before powering down. Which of the following tools is MOST appropriate?",
    options: { A: "dd to image the physical drive for memory analysis", B: "WinPmem or Magnet RAM Capture to acquire a physical memory image", C: "Volatility to analyze the live system's memory", D: "ProcMon to capture process activity from the running system" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ160", exam: "Exam",
    question: "A security analyst is triaging an incident where multiple endpoints exhibit similar behavioral indicators including encoded PowerShell execution and beaconing to the same external IP. Which of the following BEST describes the next step?",
    options: { A: "Immediately eradicate the malware from all discovered endpoints simultaneously before scoping", B: "Determine the scope of the compromise by identifying all affected systems before containment", C: "Block the identified external C2 IP at the perimeter firewall to disrupt active communication", D: "Restore all affected systems from the most recent verified clean backup immediately" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ161", exam: "Exam",
    question: "A security team discovers malware that establishes persistence via a Windows service. The service binary is located in a user-writable directory. Which EDR capability would have MOST effectively detected this persistence mechanism?",
    options: { A: "Signature detection matching known malware hashes", B: "Behavioral detection monitoring for service creation with binaries in non-standard locations", C: "Network monitoring detecting C2 communication from the malicious service", D: "File integrity monitoring detecting changes to the system32 directory" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ162", exam: "Exam",
    question: "During a forensic investigation, an analyst discovers that an attacker deleted event logs using wevtutil.exe. Which of the following would have BEST prevented log tampering?",
    options: { A: "Increasing the maximum Windows Event Log size to retain more events on the local system", B: "Forwarding logs to a remote SIEM in real time before they could be deleted", C: "Enabling audit policies specifically to detect and alert on log deletion and clearing events", D: "Restricting Event Viewer access using ACLs to prevent unauthorized local log viewing" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ163", exam: "Exam",
    question: "A vulnerability management team discovers that a critical patch was applied to production systems without following the change management process. Which of the following is the MOST appropriate response?",
    options: { A: "Roll back the patch immediately to restore the approved state", B: "Conduct a post-implementation review and document the emergency change retroactively", C: "Terminate the administrator who applied the patch", D: "Accept the change since the vulnerability has been remediated" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ164", exam: "Exam",
    question: "A security operations team wants to reduce the MTTD for network-based threats. Which of the following improvements would MOST directly reduce MTTD?",
    options: { A: "Hiring additional SOC analysts to increase manual alert review capacity and reduce response time", B: "Implementing network traffic analysis with ML-based anomaly detection and automated alerting", C: "Expanding log retention from 90 days to 365 days to provide broader historical context for investigations", D: "Deploying additional inline IPS sensors at key network chokepoints and lateral movement paths" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ165", exam: "Exam",
    question: "A security team is developing playbooks for a SOAR platform. Which of the following incidents is MOST appropriate for full automation without human review?",
    options: { A: "Active ransomware infection requiring immediate endpoint isolation and clean backup recovery", B: "IP reputation alert automatically blocking a known malicious IP in the perimeter firewall", C: "Confirmed data breach of personal data triggering notification obligations under GDPR Article 33", D: "Insider threat behavioral alert requiring HR involvement and account suspension review" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ166", exam: "Exam",
    question: "A forensic analyst is examining a disk image and needs to verify that the image is an exact copy of the original drive. Which of the following BEST verifies image integrity?",
    options: { A: "Compare total file and directory counts between the original evidence and the forensic image", B: "Generate and compare cryptographic hashes of the original drive and the image using SHA-256", C: "Verify the raw byte count of the forensic image matches the reported capacity of the source drive", D: "Boot the forensic image in an isolated VM and compare observable application and OS behavior" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ167", exam: "Exam",
    question: "A SIEM correlation rule generates 500 alerts per day for the same event type, but analysts determine that 495 are false positives. Which of the following is the MOST appropriate action?",
    options: { A: "Permanently disable the SIEM rule to eliminate alert noise until a replacement can be developed", B: "Tune the rule by adding contextual filters to reduce false positives while maintaining true positive detection", C: "Accept the elevated false positive rate as an unavoidable characteristic of behavioral detection rules", D: "Increase SOC analyst headcount to absorb the additional alert triage workload" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ168", exam: "Exam",
    question: "A security team conducts a lessons learned review after a ransomware incident. The review identifies that the attacker had access for 45 days before detection. Which security control would MOST likely reduce dwell time?",
    options: { A: "Improved patch management reducing vulnerability exposure", B: "Threat hunting program proactively searching for attacker TTPs within the environment", C: "Enhanced backup strategy reducing the impact of ransomware encryption", D: "MFA enforcement preventing initial credential-based access" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ169", exam: "Exam",
    question: "A security analyst is performing threat hunting and hypothesizes that an attacker may be using WMI for persistence. Which of the following data sources would MOST effectively confirm or deny this hypothesis?",
    options: { A: "Windows Security event logs filtering on logon events", B: "WMI activity logs and PowerShell script block logging from the SIEM", C: "Network flow data showing connections from WMI service processes", D: "FIM alerts on changes to the Windows registry" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ170", exam: "Exam",
    question: "A security team is implementing a CSPM solution for its multi-cloud environment. Which of the following capabilities does CSPM PRIMARILY provide?",
    options: { A: "Real-time runtime threat detection for cloud workloads using behavioral analysis and threat intel", B: "Continuous assessment of cloud resource configurations against security benchmarks and compliance frameworks", C: "DLP enforcement scanning data stored in cloud storage services for sensitive content violations", D: "Federated identity and access management governance spanning multiple cloud provider environments" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ171", exam: "Exam",
    question: "A security engineer is configuring log aggregation for a new deployment. Which of the following log sources provides the MOST value for detecting credential-based attacks?",
    options: { A: "Web application server access logs showing HTTP request paths and response codes", B: "Authentication logs from domain controllers, VPN, and cloud IdP", C: "NetFlow or sFlow data from edge routers showing connection metadata and traffic volumes", D: "APM metrics tracking application response times and error rates across services" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ172", exam: "Exam",
    question: "A security operations team wants to improve analyst efficiency by reducing time spent on repetitive tasks. Which SOAR capability would MOST directly address this?",
    options: { A: "Centralized case management for tracking all open and historical incident investigations", B: "Automated enrichment of alerts with threat intelligence, asset data, and user context", C: "Bidirectional integration with ITSM ticketing systems to manage incident workflow and SLAs", D: "Executive and operational dashboards providing real-time KPIs and SOC performance metrics" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ173", exam: "Exam",
    question: "An organization is implementing a data classification program. Which of the following classification labels would MOST appropriately apply to employee salary information?",
    options: { A: "Public, as salary ranges are disclosed in job postings", B: "Confidential, restricted to HR and authorized management", C: "Internal, accessible to all employees on the intranet", D: "Restricted, classified at the same level as trade secrets" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ174", exam: "Exam",
    question: "A forensic investigator is analyzing network captures from an incident and identifies large outbound transfers to a cloud storage provider using HTTPS. Which tools would MOST effectively extract metadata about these transfers without decrypting the traffic?",
    options: { A: "Wireshark with SSL decryption keys applied", B: "Zeek or Suricata analyzing TLS metadata, certificate details, and flow statistics", C: "Nmap scanning the destination server for open ports", D: "Volatility analyzing network connections from the endpoint's memory image" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ175", exam: "Exam",
    question: "A security team implements a bug bounty program. A researcher submits a critical vulnerability report. Which of the following should the security team do FIRST?",
    options: { A: "Pay the bounty award immediately to incentivize the researcher", B: "Verify and reproduce the reported vulnerability in a test environment", C: "Patch the vulnerability in production within 24 hours", D: "Notify the affected users of the potential vulnerability" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ176", exam: "Exam",
    question: "An organization experiences a DDoS attack affecting its customer-facing web application generating 500 Gbps of traffic. Which of the following is the MOST effective mitigation?",
    options: { A: "Deploy a WAF to filter DDoS traffic at the application layer", B: "Activate DDoS scrubbing service upstream of the organization's infrastructure", C: "Implement rate limiting on the web server to reduce connection volume", D: "Null route the targeted IP addresses to drop all traffic" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ177", exam: "Exam",
    question: "A security engineer is configuring Windows Defender Credential Guard on all endpoints. Which of the following attack techniques does Credential Guard MOST effectively prevent?",
    options: { A: "Keylogging capturing credentials as they are typed", B: "Pass-the-hash and credential dumping from LSASS memory", C: "Phishing attacks harvesting credentials via fake login pages", D: "Kerberoasting extracting service ticket hashes" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ178", exam: "Exam",
    question: "A security team is responding to an incident where an attacker has compromised a cloud environment and created new IAM users and API keys. Which of the following should be done FIRST?",
    options: { A: "Delete all newly created IAM users and access keys and rotate the root account credentials", B: "Identify and revoke all compromised and attacker-created credentials and review CloudTrail logs for full scope", C: "Terminate all running cloud instances immediately to stop any ongoing attacker activity", D: "Notify the cloud provider's abuse team and request emergency account restriction support" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ179", exam: "Exam",
    question: "A security analyst is reviewing a UEBA alert indicating that a user accessed 500 files at 2 AM, significantly deviating from their baseline. Which of the following is the MOST appropriate initial action?",
    options: { A: "Immediately suspend the user's account pending a formal investigation by the security team", B: "Investigate the alert by reviewing access logs and contacting the user's manager before taking action", C: "Escalate directly to law enforcement given the geographic anomaly indicating potential insider threat", D: "Mark the alert as a false positive and update the UEBA model baseline to suppress recurrence" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ180", exam: "Exam",
    question: "A penetration test engagement is about to begin. The organization has provided documentation, network diagrams, and access credentials. Which type of test does this BEST describe?",
    options: { A: "Black box testing with no prior knowledge", B: "White box testing with full knowledge of the environment", C: "Gray box testing with partial knowledge", D: "Red team engagement simulating a real-world adversary" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ181", exam: "Exam",
    question: "A security engineer implements application control using software restriction policies. An attacker attempts to execute malicious code from the %APPDATA% directory. Which application control implementation would MOST effectively block this?",
    options: { A: "Hash-based blocklist control preventing execution of known malicious file signatures", B: "Whitelist-based control allowing execution only from approved paths and signed executables", C: "Publisher certificate rules permitting execution of any code signed by a trusted vendor certificate", D: "Zone-based execution policy blocking programs downloaded from the internet or email attachments" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ182", exam: "Exam",
    question: "A security team discovers that a compromised insider copied sensitive files to a personal USB drive over several months. Which control would have MOST effectively prevented this?",
    options: { A: "DLP agent monitoring for anomalous file access patterns and sensitive data staging behavior", B: "Endpoint controls blocking USB mass storage devices via MDM or GPO", C: "UEBA platform detecting unusual large-scale file access deviating from the user's normal baseline", D: "FIM solution alerting on bulk file read or copy operations across sensitive directories" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ183", exam: "Exam",
    question: "A security operations team is evaluating threat intelligence sources. Which of the following BEST describes the benefit of joining an ISAC?",
    options: { A: "Access to commercial threat intelligence feeds with real-time IOC updates", B: "Sharing and receiving sector-specific threat intelligence with trusted industry peers", C: "Government-mandated reporting of cyber incidents to federal agencies", D: "Automated threat hunting using shared detection rules" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ184", exam: "Exam",
    question: "A security team conducts a purple team exercise. After the red team successfully achieves their objective, the blue team reviews the attack chain. Which of the following is the PRIMARY goal of this exercise?",
    options: { A: "Demonstrate the organization's current security posture and resilience to executive stakeholders", B: "Identify detection gaps and improve defensive controls based on realistic attack scenarios", C: "Satisfy annual penetration testing requirements mandated by PCI DSS or other compliance frameworks", D: "Train red team operators on newly published adversary TTPs and exploitation techniques" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ185", exam: "Exam",
    question: "A security analyst discovers that a web server is running a vulnerable version of Apache with a known RCE vulnerability. The server cannot be patched immediately due to application dependencies. Which of the following is the BEST immediate compensating control?",
    options: { A: "Apply virtual patching via a WAF rule targeting the specific vulnerability", B: "Disable the web server until the patch can be applied", C: "Restrict network access to the web server using firewall ACLs", D: "Enable enhanced logging to detect exploitation attempts" },
    answer: "A", tier: "locked", domain: 4
  },
  {
    id: "EQ186", exam: "Exam",
    question: "An organization implements a data retention policy requiring that all email be retained for seven years. During an e-discovery request, the legal team needs to search 10 years of email archives. Which of the following represents a compliance issue?",
    options: { A: "The retention period is insufficient to meet legal hold requirements", B: "Email older than seven years should have been destroyed per the retention policy creating a legal hold conflict", C: "Seven-year retention violates privacy regulations requiring data minimization", D: "E-discovery of archived email requires court order regardless of retention policy" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ187", exam: "Exam",
    question: "A security analyst investigating suspicious PowerShell activity finds that PowerShell is downloading and executing code directly from memory without writing to disk. Which of the following BEST describes this technique?",
    options: { A: "PowerShell constrained language mode bypass to execute unrestricted commands on the endpoint", B: "Fileless malware execution using PowerShell's IEX and DownloadString methods", C: "PowerShell remoting over WinRM used for lateral movement to remote hosts", D: "AMSI bypass technique disabling the Antimalware Scan Interface for the current PowerShell session" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ188", exam: "Exam",
    question: "A security team is implementing a vulnerability disclosure policy. Which of the following elements is MOST important to include to encourage responsible reporting by external researchers?",
    options: { A: "A legal disclaimer protecting the organization from liability", B: "Clear scope, safe harbor provisions, and defined response timelines", C: "Contact information for the organization's legal department", D: "A reward structure for all reported vulnerabilities" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ189", exam: "Exam",
    question: "A SOC team implements a threat intelligence program and receives IOCs from multiple sources. Which of the following is the MOST important consideration when using these IOCs?",
    options: { A: "Prioritizing commercial feeds over open-source feeds for quality", B: "Validating IOC confidence levels and applying appropriate prioritization before blocking", C: "Blocking all received IOCs at the perimeter firewall immediately", D: "Sharing all received IOCs with partner organizations via TAXII" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ190", exam: "Exam",
    question: "A security engineer is implementing privileged access workstations for all administrative activities. Which of the following BEST describes the security benefit of PAWs?",
    options: { A: "PAWs provide dedicated hardware for administrative tasks isolated from user browsing and email", B: "PAWs enforce phishing-resistant MFA for all privileged administrative connections", C: "PAWs require all administrative sessions to be recorded and retained for security audit review", D: "PAWs prevent credential theft by mandating smart card or hardware token authentication" },
    answer: "A", tier: "locked", domain: 4
  },
  {
    id: "EQ191", exam: "Exam",
    question: "A security team discovers an employee is accessing competitor websites and job boards during work hours. Which of the following policies is MOST relevant to this behavior?",
    options: { A: "Data classification policy", B: "Acceptable use policy", C: "Incident response policy", D: "Remote work policy" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ192", exam: "Exam",
    question: "A security engineer discovers that the organization's asset inventory is incomplete, missing 30% of servers. Which of the following is the PRIMARY risk associated with an incomplete asset inventory?",
    options: { A: "Elevated software licensing costs due to untracked installations running without valid entitlements", B: "Unmanaged systems may have unknown vulnerabilities and misconfigurations creating blind spots in the security program", C: "Compliance audit failures resulting from incomplete asset inventory documentation and evidence gaps", D: "Inability to accurately allocate security budget across assets without a complete visibility baseline" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ193", exam: "Exam",
    question: "A security team implements microsegmentation in a data center. Which of the following is the PRIMARY operational challenge of this approach?",
    options: { A: "Microsegmentation increases network latency for east-west traffic", B: "Defining and maintaining granular policies for all application communication flows", C: "Microsegmentation is not compatible with legacy applications", D: "Performance overhead of encryption for all east-west traffic" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ194", exam: "Exam",
    question: "A security analyst is performing log analysis after an incident and needs to correlate events across multiple systems to reconstruct the attack timeline. Which of the following is MOST critical for accurate correlation?",
    options: { A: "Consistent log format across all systems", B: "Synchronized time across all log sources using NTP", C: "Centralized log storage in the SIEM", D: "Sufficient log retention to cover the incident period" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ195", exam: "Exam",
    question: "A security team is conducting a tabletop exercise simulating a data breach affecting customer PII. The legal counsel asks when the organization must notify affected customers. Which of the following BEST answers this question?",
    options: { A: "Notification must be sent to all affected individuals immediately upon the organization discovering the breach", B: "Notification timelines depend on applicable regulations such as GDPR's 72-hour notification to supervisory authorities and state breach notification laws", C: "Notification is only legally required when the breach involves more than 500 individuals' records", D: "Notification timing is entirely at the organization's discretion based on an internal breach severity assessment" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ196", exam: "Exam",
    question: "A security operations team wants to improve detection of insider threats. Which of the following data sources provides the MOST valuable signals for this use case?",
    options: { A: "Perimeter firewall logs showing inbound and outbound traffic", B: "DLP alerts, UEBA baselines, badge access logs, and email metadata correlation", C: "Vulnerability scan results showing unpatched insider systems", D: "SIEM alerts on known external threat actor IOCs" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ197", exam: "Exam",
    question: "A security analyst discovers that a threat actor used T1027 to encode a payload using multiple layers of base64 and XOR encoding. Which of the following tools would MOST effectively analyze and decode this payload?",
    options: { A: "Strings command to extract readable text from the binary", B: "CyberChef to iteratively apply deobfuscation operations", C: "VirusTotal to scan the file against known malware signatures", D: "Wireshark to capture the payload during network transmission" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ198", exam: "Exam",
    question: "A security team implements a CSIRT. During an incident, the CSIRT lead needs to communicate breach details to the executive team. Which of the following is the MOST appropriate communication channel?",
    options: { A: "Send notifications to all executives via the corporate email system and internal Slack channels", B: "Out-of-band communication channel such as encrypted messaging if corporate systems may be compromised", C: "Issue a public announcement immediately to maintain transparency with customers and stakeholders", D: "Restrict all communications to verbal exchanges only to prevent any written evidence of the incident" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ199", exam: "Exam",
    question: "A security team discovers that an attacker has maintained access via a web shell on an internet-facing server. After removing the web shell, the team confirms the server's OS and application are patched. Which of the following should be done NEXT in the eradication phase?",
    options: { A: "Immediately restore the web server from the most recent verified clean backup snapshot", B: "Conduct a comprehensive review of all server configurations, user accounts, and scheduled tasks to identify additional persistence mechanisms", C: "Reimage the server from a trusted golden image to guarantee complete removal of all attacker artifacts", D: "Continue monitoring the server for 24 hours using EDR telemetry to confirm the attacker has been evicted" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ200", exam: "Exam",
    question: "A security engineer is implementing an EDR solution across 10,000 endpoints. Which deployment consideration is MOST critical for maximizing the EDR's effectiveness?",
    options: { A: "Keeping the EDR agent updated with the latest threat intelligence and behavioral detection signatures", B: "Configuring the EDR to collect telemetry from all endpoints and integrate with the SIEM for centralized analysis", C: "Enabling automatic EDR remediation actions to isolate compromised endpoints without analyst intervention", D: "Deploying the EDR management console in a redundant highly available configuration for resilience" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ201", exam: "Exam",
    question: "A security analyst discovers anomalous DNS queries from an internal server to a high-entropy domain name. The server has no legitimate reason to perform external DNS lookups. Which of the following is the MOST likely explanation?",
    options: { A: "A misconfigured application performing unnecessary DNS lookups", B: "Malware using a DGA to contact C2 infrastructure", C: "A legitimate CDN resolver performing geolocation-based routing", D: "A vulnerability scanner performing DNS enumeration" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ202", exam: "Exam",
    question: "A security team is implementing a zero trust network access solution. All users must be verified and devices must meet compliance requirements before accessing any application. Which of the following BEST describes the verification process at each access request?",
    options: { A: "Users authenticate once at the perimeter and maintain session trust", B: "Continuous verification of identity, device health, and context with access decisions made per request", C: "Periodic re-authentication every 8 hours with device compliance checked at login", D: "Verification based on network location with trusted zones receiving reduced scrutiny" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ203", exam: "Exam",
    question: "A security engineer discovers that a critical server has been running without EDR coverage due to an agent installation failure. Which of the following compensating controls should be implemented IMMEDIATELY?",
    options: { A: "Schedule the EDR agent installation for the next available maintenance window without interim action", B: "Increase network monitoring on the server, restrict its communication, and implement enhanced logging until the agent is installed", C: "Formally accept the temporary coverage gap as a documented risk until the agent can be deployed", D: "Immediately isolate the unprotected server from the network until full EDR coverage is restored" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ204", exam: "Exam",
    question: "A security analyst examines a SIEM alert, determines it is a true positive requiring escalation, documents the findings, and escalates to the incident response team. Which phase of the NIST incident response lifecycle does this represent?",
    options: { A: "Preparation", B: "Detection and analysis", C: "Containment, eradication, and recovery", D: "Post-incident activity" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ205", exam: "Exam",
    question: "A security team discovers that a developer committed AWS access keys to a public GitHub repository. The keys were exposed for 2 hours before the repository was made private. Which of the following should be done FIRST?",
    options: { A: "Make the repository private and configure monitoring to alert on unauthorized API calls going forward", B: "Immediately rotate the exposed access keys and review CloudTrail logs for unauthorized activity during the exposure window", C: "Notify the developer and schedule mandatory secrets management training for the development team", D: "Assess the potential blast radius by enumerating all resources accessible with the exposed access keys" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ206", exam: "Exam",
    question: "A security operations manager wants to measure the effectiveness of the vulnerability management program. Which of the following metrics BEST indicates program effectiveness?",
    options: { A: "Total count of vulnerabilities discovered per scan cycle regardless of severity or remediation status", B: "Mean time to remediate critical vulnerabilities and percentage of vulnerabilities remediated within SLA", C: "Number of authenticated vulnerability scans completed against the asset inventory per quarter", D: "Aggregate vulnerability count tracked across all open items in the risk and remediation register" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ207", exam: "Exam",
    question: "A security team is implementing an MDM solution for corporate-owned devices. Which of the following capabilities would MOST directly address the risk of data loss from a lost device?",
    options: { A: "MDM enrollment requiring user authentication", B: "Remote wipe capability combined with mandatory full device encryption", C: "App management controlling which applications can be installed", D: "Geolocation tracking to identify the device's physical location" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ208", exam: "Exam",
    question: "A security analyst discovers that a service running on a Linux server is listening on port 4444 and cannot be identified in the approved application inventory. Which of the following should be done FIRST?",
    options: { A: "Immediately terminate the suspicious process and remove it from the running process list", B: "Identify the process using netstat and lsof, capture network traffic, and analyze before taking action", C: "Block port 4444 at the host-based firewall to disrupt the active outbound connection", D: "Reboot the server immediately to terminate all unidentified and suspicious processes" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ209", exam: "Exam",
    question: "A security team implements a threat intelligence program and wants to automatically update security controls based on new IOCs. Which of the following platforms enables this capability?",
    options: { A: "SIEM with manual IOC ingestion and search capabilities", B: "SOAR with TIP integration enabling automated IOC distribution to NGFW, DNS filter, and EDR", C: "Vulnerability scanner with threat intelligence feed integration", D: "CASB with real-time threat intelligence for cloud application control" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ210", exam: "Exam",
    question: "A security engineer reviewing audit logs discovers that a privileged user account was used to access financial records outside of normal business hours. The account belongs to a system administrator. Which of the following is the MOST appropriate action?",
    options: { A: "Immediately terminate the system administrator's employment", B: "Preserve the logs, suspend the account pending investigation, and escalate to the appropriate team", C: "Contact the system administrator for an explanation before taking action", D: "Accept the activity as administrators commonly work outside business hours" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ211", exam: "Exam",
    question: "A security analyst is investigating a potential compromise and needs to determine which processes have established network connections. Which of the following commands provides this information on a Windows system?",
    options: { A: "tasklist /v", B: "netstat -anob", C: "ipconfig /all", D: "net session" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ212", exam: "Exam",
    question: "A security team conducts a red team exercise where the red team successfully breaches the perimeter and achieves their objectives without triggering any SIEM alerts. Which of the following is the MOST significant finding?",
    options: { A: "The perimeter defenses are insufficient and need enhancement", B: "The detection and monitoring capabilities have significant gaps requiring remediation", C: "The red team's techniques were too advanced for current defenses", D: "The incident response team needs additional training" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ213", exam: "Exam",
    question: "A security analyst is reviewing a potential phishing incident and needs to determine if any users clicked the malicious link. Which of the following log sources provides the MOST direct evidence?",
    options: { A: "Email gateway delivery logs showing the phishing message was received by the victim's mailbox", B: "Web proxy logs showing outbound connections to the phishing domain from internal hosts", C: "DNS query logs confirming successful resolution of the phishing domain from the victim's system", D: "Endpoint antivirus logs showing detection of a malicious file downloaded from the phishing URL" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ214", exam: "Exam",
    question: "A CISO is evaluating the organization's security awareness training program. Which of the following metrics BEST indicates that the training is changing employee behavior?",
    options: { A: "Percentage of employees who completed the training", B: "Reduction in phishing simulation click rates over time", C: "Employee satisfaction scores for the training content", D: "Number of training modules completed per employee" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ215", exam: "Exam",
    question: "A security engineer is implementing a solution to detect when attackers attempt to enumerate Active Directory using LDAP queries. Which of the following BEST detects this activity?",
    options: { A: "Enable advanced audit policies for directory service access", B: "Configure SIEM rules correlating high-volume LDAP queries from non-administrative accounts", C: "Deploy a honeypot account with an attractive name to detect enumeration", D: "Enable LDAP channel binding to prevent unauthorized queries" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ216", exam: "Exam",
    question: "A security team is developing an incident response plan. Which of the following stakeholders should be included in the communication plan for a major data breach?",
    options: { A: "Only the CISO, security team members, and C-suite executives on a strict need-to-know basis", B: "Legal, PR, HR, executive leadership, affected customers, regulators, and potentially law enforcement", C: "All employees organization-wide via a company-wide email notification to maintain transparency", D: "The security team, IT operations, and the system owners directly impacted by the breach" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ217", exam: "Exam",
    question: "A security analyst is reviewing Windows event logs and identifies Event ID 4688 showing cmd.exe spawned by winword.exe. Which of the following BEST explains why this is suspicious?",
    options: { A: "cmd.exe execution should always be blocked on user workstations regardless of parent process", B: "Word processing applications do not typically spawn command shell processes indicating possible macro-based malware", C: "Windows Event ID 4688 indicates a failed process creation attempt requiring immediate investigation", D: "winword.exe requires local administrator privileges to successfully spawn any child processes" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ218", exam: "Exam",
    question: "A security operations team wants to implement continuous compliance monitoring for their AWS environment. Which of the following services provides automated assessment against security benchmarks?",
    options: { A: "AWS CloudTrail enabling API activity logging for all management plane operations", B: "AWS Security Hub aggregating findings and checking against CIS AWS Foundations Benchmark", C: "AWS GuardDuty providing behavioral threat detection for accounts, instances, and S3 activity", D: "AWS Config tracking resource configuration changes and evaluating against compliance rules" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ219", exam: "Exam",
    question: "A security team discovers that an attacker pivoted from a compromised workstation to a database server using a pass-the-ticket attack. Which of the following would have MOST effectively prevented this lateral movement?",
    options: { A: "Implementing microsegmentation between workstation and server VLANs to block lateral movement paths", B: "Enabling Protected Users security group membership for privileged accounts preventing Kerberos ticket caching", C: "Deploying EDR on all servers with lateral movement detection rules and automated isolation response", D: "Enforcing mandatory SMB signing across all hosts to prevent NTLM relay and credential theft attacks" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ220", exam: "Exam",
    question: "A security analyst discovers evidence of timestomping on files related to a malware infection. Which of the following BEST describes what the attacker was attempting to accomplish?",
    options: { A: "Encrypting file system metadata to prevent forensic tools from reading original timestamps", B: "Modifying file timestamps to make malicious files appear older and blend with legitimate files", C: "Deleting all file system timestamps to prevent investigators from building an event timeline", D: "Cloning timestamps from a legitimate system file onto the malware binary to evade detection" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ221", exam: "Exam",
    question: "A security team implements a deception technology platform deploying fake Active Directory accounts with enticing names such as BackupAdmin and ServiceAccountProd. Which of the following alerts would be MOST significant?",
    options: { A: "A failed login attempt against one of the deception accounts", B: "A successful authentication using a deception account's credentials", C: "An LDAP query enumerating the deception accounts", D: "A password reset request for a deception account" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ222", exam: "Exam",
    question: "A security team wants to improve their mean time to respond to incidents. Which of the following improvements would have the GREATEST impact?",
    options: { A: "Hiring additional SOC analysts to reduce queue times", B: "Implementing SOAR playbooks automating common response actions and enrichment", C: "Increasing SIEM storage capacity for longer log retention", D: "Deploying additional SIEM correlation rules to improve detection coverage" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ223", exam: "Exam",
    question: "A security engineer discovers that an application logs full credit card numbers in application error logs. Which of the following is the MOST appropriate immediate remediation?",
    options: { A: "Encrypt all application log files at rest using AES-256 to protect the stored card data", B: "Modify the application to log only truncated or tokenized card numbers and delete existing logs containing full card data", C: "Restrict read access to the application log files to a limited set of authorized personnel", D: "Deploy DLP to detect and generate alerts when application logs containing card data are accessed" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ224", exam: "Exam",
    question: "A CISO is presenting the security program's value to the board of directors. Which of the following metrics would MOST effectively communicate risk reduction?",
    options: { A: "Total number of security incidents handled by the SOC during the prior fiscal year", B: "Reduction in mean time to detect and respond combined with cost avoidance from prevented incidents", C: "Variance between total security budget allocated and actual spending for the reporting period", D: "Percentage of employees who completed mandatory annual security awareness training on time" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ225", exam: "Exam",
    question: "A security analyst discovers that an attacker used compromised third-party vendor VPN credentials to access the organization's network. Which control would MOST effectively prevent this in the future?",
    options: { A: "Require phishing-resistant MFA for all vendor VPN connections to prevent credential-based attacks", B: "Implement vendor risk management with strict access controls, MFA, and least-privilege access scoped to specific systems", C: "Deploy NAC to verify vendor device security posture and patch compliance before granting VPN access", D: "Restrict all VPN connections to pre-registered vendor static IP address ranges using firewall ACLs" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "EQ226", exam: "Exam",
    question: "A security team receives a notification that a zero-day vulnerability affecting a critical application has been publicly disclosed. No patch is available. Which of the following should be done FIRST?",
    options: { A: "Immediately take the production application offline and disable access until the vendor releases a patch", B: "Assess the vulnerability's exploitability and implement compensating controls while monitoring for exploitation attempts", C: "Accept the risk without any action until the software vendor releases an official security patch", D: "Commission an emergency penetration test to confirm whether the organization can be exploited" },
    answer: "B", tier: "locked", domain: 4
  },,
{
    id: "EQ227", exam: "Exam",
    question: "A CISO is calculating the ALE for a ransomware threat. The asset value is $5 million, the EF is 40%, and the ARO is 0.5. What is the ALE?",
    options: { A: "$500,000", B: "$1,000,000", C: "$2,000,000", D: "$2,500,000" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ228", exam: "Exam",
    question: "An organization is assessed against the NIST CSF. The assessment reveals that the organization has identified its critical assets but has not implemented protections or detection capabilities. Which CSF maturity tier BEST describes this organization?",
    options: { A: "Tier 1 - Partial", B: "Tier 2 - Risk Informed", C: "Tier 3 - Repeatable", D: "Tier 4 - Adaptive" },
    answer: "A", tier: "locked", domain: 5
  },
  {
    id: "EQ229", exam: "Exam",
    question: "A vendor provides cloud services that process the organization's customer PII. The organization's DPO needs to ensure appropriate data protection. Which of the following agreements is MOST critical?",
    options: { A: "NDA protecting confidential business information", B: "DPA establishing data processing obligations and privacy requirements", C: "SLA defining service availability and performance metrics", D: "MSA establishing commercial terms for the vendor relationship" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ230", exam: "Exam",
    question: "An organization subject to HIPAA discovers that a business associate experienced a data breach exposing PHI. Which of the following is the organization's FIRST obligation?",
    options: { A: "Notify HHS and affected patients within 72 hours of discovering the breach as required by HIPAA", B: "Verify the breach details with the business associate and ensure they notify affected individuals per the BAA", C: "Immediately terminate the business associate agreement and migrate all data to a new provider", D: "Commission an independent forensic investigation of the business associate's environment and controls" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ231", exam: "Exam",
    question: "A security manager is developing a risk treatment plan. For a specific risk, the cost of implementing controls exceeds the potential loss by a factor of three. Which risk treatment strategy is MOST appropriate?",
    options: { A: "Mitigate the risk by implementing the controls regardless of cost", B: "Accept the risk since the cost of controls exceeds the expected loss", C: "Transfer the risk by purchasing cyber insurance", D: "Avoid the risk by discontinuing the business process" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ232", exam: "Exam",
    question: "An organization is implementing a GRC program and must meet requirements from PCI DSS, HIPAA, and SOX simultaneously. Which of the following approaches MOST efficiently addresses all three frameworks?",
    options: { A: "Implement three fully independent compliance programs each with dedicated staff and documentation", B: "Map controls across frameworks to identify overlapping requirements and implement a unified control set", C: "Prioritize the most stringent single framework and apply only that framework's controls organization-wide", D: "Obtain sequential independent audits for each framework one at a time over multiple fiscal years" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ233", exam: "Exam",
    question: "A security manager is conducting a vendor risk assessment. The vendor will process sensitive financial data on behalf of the organization. Which assessment method provides the MOST comprehensive view of the vendor's security controls?",
    options: { A: "Review the vendor's self-completed security questionnaire without additional verification", B: "Obtain the vendor's SOC 2 Type II report and conduct a right-to-audit clause assessment", C: "Review the vendor's current ISO 27001 certification scope and Statement of Applicability", D: "Request the vendor's most recent authenticated vulnerability scan and remediation reports" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ234", exam: "Exam",
    question: "A CISO is presenting a security budget request to the board. Which of the following frameworks BEST supports the argument for increased security investment?",
    options: { A: "NIST CSF for identifying control gaps", B: "FAIR quantitative risk analysis translating security risks into financial terms", C: "ISO 27001 for demonstrating compliance with international standards", D: "CIS Controls for benchmarking against industry best practices" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ235", exam: "Exam",
    question: "An organization processes EU citizen data and experiences a personal data breach. Under GDPR Article 33, when must the organization notify the supervisory authority?",
    options: { A: "Immediately upon the first indication of a potential breach before completing an investigation", B: "Within 72 hours of becoming aware of the breach unless it is unlikely to result in risk", C: "Within 30 days of the breach being formally confirmed through a completed forensic investigation", D: "Only after all affected data subjects have been individually notified about the breach details" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ236", exam: "Exam",
    question: "A security manager identifies a risk that cannot be mitigated to an acceptable level through technical controls alone. The organization purchases cyber insurance to cover potential losses. Which of the following BEST describes a limitation of this risk treatment?",
    options: { A: "Cyber insurance premiums will consistently exceed the cost of deploying equivalent technical controls", B: "Insurance transfers financial risk but does not reduce the likelihood or operational impact of the risk materializing", C: "Cyber insurance policies require the insured to hold an ISO 27001 certification to be underwritten", D: "Insurance-based risk transfer is not a recognized risk treatment option under major compliance frameworks" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ237", exam: "Exam",
    question: "An organization is implementing a security awareness program. The CISO wants to measure behavioral change rather than knowledge acquisition. Which of the following metrics BEST measures behavioral change?",
    options: { A: "Average knowledge assessment score achieved by employees on post-training competency tests", B: "Reduction in security incidents caused by human error combined with phishing simulation click rates", C: "Percentage of employees who completed all mandatory training modules within the compliance deadline", D: "Employee satisfaction and engagement scores collected via training feedback surveys" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ238", exam: "Exam",
    question: "A security team is conducting a BIA for a critical payment processing system generating $100,000 in revenue per hour. The RTO is set at 4 hours. Which of the following BEST describes the business impact of a 6-hour outage?",
    options: { A: "$400,000 in direct revenue loss strictly equivalent to the 4-hour RTO period at full rate", B: "$600,000 in direct revenue loss plus potential regulatory fines, reputational damage, and SLA penalties", C: "$200,000 in direct revenue loss attributable only to the 2 hours exceeding the agreed RTO", D: "$600,000 in direct revenue loss with no additional indirect costs or cascading business impacts" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ239", exam: "Exam",
    question: "An organization is negotiating a contract with a cloud provider. The security team wants the right to verify the provider's security controls. Which of the following contract clauses is MOST important?",
    options: { A: "SLA clause guaranteeing 99.99% service availability with defined financial remedies for violations", B: "Right-to-audit clause permitting the organization or its designee to assess the provider's controls", C: "Data residency clause restricting all data storage and processing to contractually approved regions", D: "Incident notification clause requiring the provider to notify the customer within 24 hours of a breach" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ240", exam: "Exam",
    question: "A security manager is developing security policies for a new organization. Which of the following documents should be created FIRST to establish the foundation for all other security policies?",
    options: { A: "Acceptable use policy defining permitted and prohibited employee use of organizational resources", B: "Information security policy establishing management's commitment and overall security direction", C: "Incident response policy defining escalation procedures and roles during a declared security event", D: "Data classification policy establishing sensitivity tiers and mandatory handling requirements per tier" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ241", exam: "Exam",
    question: "An organization is assessing a proposed merger with a target company. The due diligence team discovers that the target has had three ransomware incidents in the past two years and has unpatchable legacy systems. Which of the following is the MOST appropriate response?",
    options: { A: "Proceed with the merger as scheduled and plan a post-acquisition cybersecurity remediation roadmap", B: "Factor the cybersecurity risk into the valuation and require remediation commitments or adjust the purchase price", C: "Immediately terminate merger discussions solely due to the target's unacceptable cybersecurity posture", D: "Purchase cyber insurance coverage to transfer the inherited financial risk from the acquisition" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ242", exam: "Exam",
    question: "A CISO is reviewing the organization's third-party risk management program which assesses vendors annually. A critical payment processor experiences a significant breach between assessment cycles. Which program improvement would MOST effectively address this gap?",
    options: { A: "Increase vendor security assessment frequency to quarterly for all third-party relationships", B: "Implement continuous monitoring of critical vendors using security ratings services and threat intelligence", C: "Require all critical vendors to provide monthly self-assessment questionnaire updates on their security posture", D: "Include contractual security breach liability and remediation commitment clauses in all vendor agreements" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ243", exam: "Exam",
    question: "An organization implements a security champions program embedding security-focused individuals in development teams. Which of the following BEST describes the PRIMARY goal of this program?",
    options: { A: "Reducing the security team's workload by delegating all security testing responsibilities to developers", B: "Shifting security left by integrating security practices into the development lifecycle through empowered developers", C: "Ensuring compliance with secure coding standards by mandating peer code review before every deployment", D: "Providing developers with a direct reporting path to the CISO to escalate security concerns" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ244", exam: "Exam",
    question: "A security manager is developing a risk register. A risk is identified with a likelihood of 3 and an impact of 5 on a 5-point scale. After implementing controls, the likelihood is reduced to 1 while impact remains unchanged. Which term describes the risk after control implementation?",
    options: { A: "Inherent risk before any controls are applied", B: "Residual risk remaining after controls are implemented", C: "Transferred risk shifted to a third party", D: "Accepted risk acknowledged by management" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "EQ245", exam: "Exam",
    question: "A multinational organization must comply with data privacy regulations in multiple jurisdictions including GDPR, CCPA, and PIPL. Which approach MOST effectively manages cross-jurisdictional compliance?",
    options: { A: "Apply the single most stringent regulation's requirements globally across all jurisdictions to achieve a unified baseline that exceeds every local requirement", B: "Develop a privacy program that maps requirements across all applicable regulations and implements controls satisfying each jurisdiction's requirements", C: "Maintain entirely separate and independent privacy compliance programs for every individual jurisdiction in which the organization operates", D: "Apply only the privacy regulations of the country where the organization's headquarters is located and use contractual clauses for other regions" },
    answer: "B", tier: "locked", domain: 5
  },] as ExamQuestion[]);

export default examQuestions;
