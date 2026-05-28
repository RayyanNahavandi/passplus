// PassPlus - Network+ N10-009 Practice Mode Questions
// 245 original questions based on CompTIA N10-009 publicly available exam objectives
// No content derived from any copyrighted source

export interface NetworkQuestion {
  id: string;
  exam: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
  tier: "free" | "locked";
  domain: number;
}

export const networkPracticeQuestions: NetworkQuestion[] = ([] as NetworkQuestion[]).concat([
{
    id: "NQ001", exam: "Original",
    question: "Which of the following OSI model layers is responsible for logical addressing and routing packets between networks?",
    options: { A: "Data Link", B: "Transport", C: "Network", D: "Session" },
    answer: "C", tier: "free", domain: 1
  },
  {
    id: "NQ002", exam: "Original",
    question: "A network technician needs to identify the MAC address of a device on the local network. Which protocol would be used to resolve an IP address to a MAC address?",
    options: { A: "DNS", B: "ARP", C: "DHCP", D: "ICMP" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "NQ003", exam: "Original",
    question: "Which of the following IP address ranges is reserved for private use according to RFC 1918?",
    options: { A: "172.16.0.0 - 172.31.255.255", B: "169.254.0.0 - 169.254.255.255", C: "127.0.0.0 - 127.255.255.255", D: "224.0.0.0 - 239.255.255.255" },
    answer: "A", tier: "free", domain: 1
  },
  {
    id: "NQ004", exam: "Original",
    question: "What is the purpose of a subnet mask in networking?",
    options: { A: "To encrypt network traffic", B: "To identify which portion of an IP address refers to the network and which refers to the host", C: "To assign IP addresses automatically to devices", D: "To translate domain names to IP addresses" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "NQ005", exam: "Original",
    question: "Which protocol operates at the Transport layer and provides connection-oriented, reliable data delivery?",
    options: { A: "UDP", B: "ICMP", C: "TCP", D: "IP" },
    answer: "C", tier: "free", domain: 1
  },
  {
    id: "NQ006", exam: "Original",
    question: "A company needs to provide internet access to multiple devices using a single public IP address. Which technology allows this?",
    options: { A: "DNS", B: "VLAN", C: "NAT", D: "QoS" },
    answer: "C", tier: "free", domain: 1
  },
  {
    id: "NQ007", exam: "Original",
    question: "Which of the following best describes a default gateway?",
    options: { A: "A server that assigns IP addresses to network devices", B: "A device that connects a local network to external networks", C: "A protocol that resolves hostnames to IP addresses", D: "A firewall that filters inbound network traffic" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "NQ008", exam: "Original",
    question: "What is the valid host range for the subnet 192.168.1.64/26?",
    options: { A: "192.168.1.65 - 192.168.1.126", B: "192.168.1.64 - 192.168.1.127", C: "192.168.1.65 - 192.168.1.128", D: "192.168.1.64 - 192.168.1.126" },
    answer: "A", tier: "free", domain: 1
  },
  {
    id: "NQ009", exam: "Original",
    question: "Which of the following protocols uses port 53?",
    options: { A: "DHCP", B: "DNS", C: "HTTP", D: "SNMP" },
    answer: "B", tier: "free", domain: 1
  },
  {
    id: "NQ010", exam: "Original",
    question: "What type of DNS record maps a hostname to an IPv4 address?",
    options: { A: "MX", B: "CNAME", C: "PTR", D: "A" },
    answer: "D", tier: "free", domain: 1
  },
  {
    id: "NQ011", exam: "Original",
    question: "Which IPv6 address type is equivalent to the IPv4 private address space and is used for local network communication only?",
    options: { A: "Global unicast", B: "Link-local", C: "Unique local", D: "Multicast" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ012", exam: "Original",
    question: "A technician needs to verify network connectivity to a remote host and measure round-trip time. Which command line tool should be used?",
    options: { A: "tracert", B: "netstat", C: "nslookup", D: "ping" },
    answer: "D", tier: "locked", domain: 1
  },
  {
    id: "NQ013", exam: "Original",
    question: "Which of the following describes the function of DHCP?",
    options: { A: "Translates domain names to IP addresses", B: "Automatically assigns IP addresses and network configuration to devices", C: "Routes packets between different networks", D: "Encrypts data transmitted over the network" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ014", exam: "Original",
    question: "What is the broadcast address for the network 10.0.0.0/24?",
    options: { A: "10.0.0.0", B: "10.0.0.1", C: "10.0.0.255", D: "10.0.0.254" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ015", exam: "Original",
    question: "Which protocol is used to send email from a client to a mail server?",
    options: { A: "IMAP", B: "POP3", C: "SMTP", D: "SNMP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ016", exam: "Original",
    question: "A user can ping a server by IP address but not by hostname. Which service is most likely misconfigured?",
    options: { A: "DHCP", B: "DNS", C: "NAT", D: "WINS" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ017", exam: "Original",
    question: "Which of the following is a connectionless protocol that provides fast but unreliable data transmission?",
    options: { A: "TCP", B: "FTP", C: "UDP", D: "SSH" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ018", exam: "Original",
    question: "What is the loopback address used to test the TCP/IP stack on a local device?",
    options: { A: "192.168.0.1", B: "0.0.0.0", C: "127.0.0.1", D: "255.255.255.255" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ019", exam: "Original",
    question: "Which routing protocol uses bandwidth and delay as its composite metric to determine the best path?",
    options: { A: "RIP", B: "OSPF", C: "EIGRP", D: "BGP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ020", exam: "Original",
    question: "A network administrator needs to implement a protocol that allows multiple routers to share a virtual IP address for gateway redundancy. Which protocol should be used?",
    options: { A: "OSPF", B: "HSRP", C: "VRRP", D: "Both B and C are correct" },
    answer: "D", tier: "locked", domain: 1
  },
  {
    id: "NQ021", exam: "Original",
    question: "Which of the following DNS record types is used for mail server identification?",
    options: { A: "A", B: "PTR", C: "MX", D: "TXT" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ022", exam: "Original",
    question: "What is the maximum transmission unit (MTU) for standard Ethernet frames?",
    options: { A: "512 bytes", B: "1024 bytes", C: "1500 bytes", D: "9000 bytes" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ023", exam: "Original",
    question: "Which protocol provides time synchronization across network devices?",
    options: { A: "SNMP", B: "NTP", C: "Syslog", D: "TFTP" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ024", exam: "Original",
    question: "A network uses the address 172.16.0.0/12. What is the subnet mask in dotted decimal notation?",
    options: { A: "255.0.0.0", B: "255.240.0.0", C: "255.255.0.0", D: "255.255.240.0" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ025", exam: "Original",
    question: "Which of the following describes the function of a proxy server?",
    options: { A: "Assigns IP addresses to network clients", B: "Acts as an intermediary between clients and servers to filter and cache requests", C: "Routes packets between different network segments", D: "Provides wireless connectivity to network devices" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ026", exam: "Original",
    question: "What port does HTTPS use by default?",
    options: { A: "80", B: "8080", C: "443", D: "8443" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ027", exam: "Original",
    question: "Which of the following is a link-state routing protocol that uses Dijkstra's algorithm to calculate the shortest path?",
    options: { A: "RIP", B: "EIGRP", C: "BGP", D: "OSPF" },
    answer: "D", tier: "locked", domain: 1
  },
  {
    id: "NQ028", exam: "Original",
    question: "How many usable host addresses are available in a /28 subnet?",
    options: { A: "14", B: "16", C: "30", D: "32" },
    answer: "A", tier: "locked", domain: 1
  },
  {
    id: "NQ029", exam: "Original",
    question: "Which protocol is used to securely transfer files between a client and server using encryption?",
    options: { A: "FTP", B: "TFTP", C: "SFTP", D: "SMB" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ030", exam: "Original",
    question: "A network administrator wants to prevent IP address conflicts. Which DHCP feature reserves a specific IP address for a device based on its MAC address?",
    options: { A: "DHCP relay", B: "DHCP scope", C: "DHCP reservation", D: "DHCP lease" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ031", exam: "Original",
    question: "Which of the following IPv6 features eliminates the need for NAT?",
    options: { A: "Larger address space providing unique public addresses to every device", B: "Built-in IPsec support", C: "Stateless address autoconfiguration", D: "Simplified header format" },
    answer: "A", tier: "locked", domain: 1
  },
  {
    id: "NQ032", exam: "Original",
    question: "What is the purpose of a CNAME DNS record?",
    options: { A: "Maps an IP address to a hostname", B: "Creates an alias that points to another hostname", C: "Identifies the mail server for a domain", D: "Stores arbitrary text information for a domain" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ033", exam: "Original",
    question: "Which of the following best describes a Class B IP address?",
    options: { A: "First octet range 1-126", B: "First octet range 128-191", C: "First octet range 192-223", D: "First octet range 224-239" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ034", exam: "Original",
    question: "A user receives an IP address of 169.254.x.x. What does this indicate?",
    options: { A: "The device has been assigned a public IP address", B: "The device failed to obtain an IP address from a DHCP server", C: "The device is using IPv6 link-local addressing", D: "The device is on a private network" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ035", exam: "Original",
    question: "Which protocol is used by routers to exchange routing information across the internet between autonomous systems?",
    options: { A: "OSPF", B: "EIGRP", C: "RIP", D: "BGP" },
    answer: "D", tier: "locked", domain: 1
  },
  {
    id: "NQ036", exam: "Original",
    question: "What is the function of a TTL value in DNS records?",
    options: { A: "Specifies the maximum number of hops a packet can traverse", B: "Defines how long a DNS record can be cached before being refreshed", C: "Sets the time limit for a DHCP lease", D: "Determines the priority of a mail server" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ037", exam: "Original",
    question: "Which of the following describes the difference between TCP and UDP?",
    options: { A: "TCP is connectionless while UDP is connection-oriented", B: "UDP provides error checking while TCP does not", C: "TCP provides reliable ordered delivery while UDP does not guarantee delivery", D: "UDP operates at the Network layer while TCP operates at the Transport layer" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ038", exam: "Original",
    question: "A network has the IP address 192.168.10.0/25. How many hosts can this subnet support?",
    options: { A: "62", B: "126", C: "128", D: "254" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ039", exam: "Original",
    question: "Which protocol allows a network device to send alerts and performance data to a central monitoring server?",
    options: { A: "SSH", B: "SNMP", C: "Syslog", D: "NTP" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ040", exam: "Original",
    question: "What type of address is FF02::1 in IPv6?",
    options: { A: "Unicast", B: "Anycast", C: "Multicast", D: "Broadcast" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ041", exam: "Original",
    question: "Which of the following port numbers is associated with SSH?",
    options: { A: "21", B: "22", C: "23", D: "25" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ042", exam: "Original",
    question: "What is the purpose of the traceroute/tracert command?",
    options: { A: "Tests connectivity to a remote host", B: "Displays the path packets take to reach a destination and identifies delays at each hop", C: "Resolves hostnames to IP addresses", D: "Displays current network connections and listening ports" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ043", exam: "Original",
    question: "Which of the following is NOT a valid private IP address range?",
    options: { A: "10.0.0.0/8", B: "172.16.0.0/12", C: "192.168.0.0/16", D: "192.0.2.0/24" },
    answer: "D", tier: "locked", domain: 1
  },
  {
    id: "NQ044", exam: "Original",
    question: "A DHCP server is on a different network segment than the clients. Which device or feature is needed to forward DHCP requests to the server?",
    options: { A: "DHCP reservation", B: "DHCP relay agent", C: "DHCP scope", D: "DHCP exclusion" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ045", exam: "Original",
    question: "Which of the following protocols operates at the Application layer and is used to retrieve email from a server while leaving messages on the server?",
    options: { A: "SMTP", B: "POP3", C: "IMAP", D: "SNMP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ046", exam: "Original",
    question: "What is the function of a PTR record in DNS?",
    options: { A: "Maps a hostname to an IPv4 address", B: "Maps an IP address to a hostname for reverse DNS lookups", C: "Identifies the mail exchanger for a domain", D: "Creates an alias for another hostname" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ047", exam: "Original",
    question: "How many bits are in an IPv6 address?",
    options: { A: "32", B: "64", C: "128", D: "256" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ048", exam: "Original",
    question: "Which of the following describes SLAAC in IPv6?",
    options: { A: "A method for manually assigning IPv6 addresses", B: "A process where devices automatically configure their own IPv6 addresses without a DHCP server", C: "A protocol for routing IPv6 packets between networks", D: "A method for tunneling IPv6 traffic over IPv4 networks" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ049", exam: "Original",
    question: "Which of the following routing protocols has an administrative distance of 110?",
    options: { A: "RIP", B: "EIGRP", C: "OSPF", D: "BGP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ050", exam: "Original",
    question: "A network administrator needs to allow only specific hosts to communicate with a server. Which of the following should be implemented?",
    options: { A: "QoS policy", B: "ACL", C: "VLAN", D: "NAT" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ051", exam: "Original",
    question: "Which of the following describes the three-way handshake process in TCP?",
    options: { A: "SYN, ACK, FIN", B: "SYN, SYN-ACK, ACK", C: "ACK, SYN, FIN", D: "SYN, RST, ACK" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ052", exam: "Original",
    question: "What is the purpose of the netstat command?",
    options: { A: "Tests connectivity to a remote host", B: "Displays active network connections, routing tables, and interface statistics", C: "Resolves hostnames to IP addresses", D: "Releases and renews DHCP leases" },
    answer: "B", tier: "locked", domain: 1
  },
  {
    id: "NQ053", exam: "Original",
    question: "Which of the following is a distance-vector routing protocol?",
    options: { A: "OSPF", B: "IS-IS", C: "RIP", D: "BGP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ054", exam: "Original",
    question: "A company needs to implement a protocol that allows different network devices to automatically negotiate speed and duplex settings. Which feature accomplishes this?",
    options: { A: "QoS", B: "STP", C: "Auto-negotiation", D: "LACP" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ055", exam: "Original",
    question: "Which of the following best describes anycast addressing in IPv6?",
    options: { A: "One-to-all communication on a network segment", B: "One-to-one communication between two hosts", C: "One-to-nearest communication where packets are sent to the nearest node in a group", D: "One-to-many communication to a group of hosts" },
    answer: "C", tier: "locked", domain: 1
  },
  {
    id: "NQ056", exam: "Original",
    question: "Which of the following protocols is used to monitor and manage network devices and can send unsolicited notifications to a management station?",
    options: { A: "SNMP traps", B: "Syslog", C: "NTP", D: "NetFlow" },
    answer: "A", tier: "locked", domain: 1
  },,
{
    id: "NQ057", exam: "Original",
    question: "Which of the following devices operates at Layer 2 of the OSI model and forwards frames based on MAC addresses?",
    options: { A: "Router", B: "Hub", C: "Switch", D: "Repeater" },
    answer: "C", tier: "free", domain: 2
  },
  {
    id: "NQ058", exam: "Original",
    question: "What is the purpose of VLANs in a switched network?",
    options: { A: "To increase the physical speed of network connections", B: "To logically segment a network into separate broadcast domains", C: "To provide redundant paths between switches", D: "To encrypt traffic between network segments" },
    answer: "B", tier: "free", domain: 2
  },
  {
    id: "NQ059", exam: "Original",
    question: "Which wireless standard operates in both 2.4 GHz and 5 GHz frequency bands and provides maximum speeds up to 600 Mbps?",
    options: { A: "802.11a", B: "802.11g", C: "802.11n", D: "802.11ac" },
    answer: "C", tier: "free", domain: 2
  },
  {
    id: "NQ060", exam: "Original",
    question: "A network technician needs to connect two switches and allow multiple VLANs to pass between them. Which type of port should be configured?",
    options: { A: "Access port", B: "Trunk port", C: "Mirror port", D: "Uplink port" },
    answer: "B", tier: "free", domain: 2
  },
  {
    id: "NQ061", exam: "Original",
    question: "Which of the following cable types uses light to transmit data and is immune to electromagnetic interference?",
    options: { A: "Cat6a", B: "Coaxial", C: "Fiber optic", D: "Cat5e" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ062", exam: "Original",
    question: "What is the maximum cable length for Cat5e and Cat6 UTP cabling in a standard Ethernet deployment?",
    options: { A: "50 meters", B: "100 meters", C: "150 meters", D: "200 meters" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ063", exam: "Original",
    question: "Which STP port state forwards frames and populates the MAC address table?",
    options: { A: "Blocking", B: "Listening", C: "Learning", D: "Forwarding" },
    answer: "D", tier: "locked", domain: 2
  },
  {
    id: "NQ064", exam: "Original",
    question: "A technician needs to connect two devices using the same type of cable where one device expects a crossover connection. Which modern feature eliminates the need for a crossover cable?",
    options: { A: "Auto-negotiation", B: "MDIX", C: "PoE", D: "STP" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ065", exam: "Original",
    question: "Which wireless encryption protocol is currently considered the most secure for enterprise wireless networks?",
    options: { A: "WEP", B: "WPA", C: "WPA2", D: "WPA3" },
    answer: "D", tier: "locked", domain: 2
  },
  {
    id: "NQ066", exam: "Original",
    question: "What is the purpose of PoE (Power over Ethernet)?",
    options: { A: "Increases network transmission speed", B: "Delivers electrical power to devices over Ethernet cable", C: "Encrypts data transmitted over Ethernet", D: "Provides redundant network connections" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ067", exam: "Original",
    question: "Which of the following connector types is used with single-mode and multimode fiber optic cables and features a push-pull mechanism?",
    options: { A: "RJ-45", B: "BNC", C: "LC", D: "SC" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ068", exam: "Original",
    question: "A network administrator wants to combine multiple physical links between two switches into a single logical link for increased bandwidth and redundancy. Which technology should be used?",
    options: { A: "STP", B: "LACP", C: "VLAN", D: "RSTP" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ069", exam: "Original",
    question: "Which 802.11 standard operates exclusively in the 5 GHz band and provides maximum theoretical speeds up to 3.5 Gbps?",
    options: { A: "802.11n", B: "802.11ac", C: "802.11ax", D: "802.11g" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ070", exam: "Original",
    question: "What is the native VLAN on a trunk port used for?",
    options: { A: "Carries encrypted management traffic", B: "Carries untagged frames across a trunk link", C: "Provides higher priority to voice traffic", D: "Prevents unauthorized VLAN access" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ071", exam: "Original",
    question: "Which of the following cable standards supports 10 Gbps speeds at distances up to 100 meters?",
    options: { A: "Cat5e", B: "Cat6", C: "Cat6a", D: "Cat3" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ072", exam: "Original",
    question: "A wireless network is experiencing interference. A technician notices the neighboring network is using channel 6. Which channel should be selected to minimize interference on a 2.4 GHz network?",
    options: { A: "4", B: "6", C: "11", D: "8" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ073", exam: "Original",
    question: "Which of the following describes the purpose of Rapid Spanning Tree Protocol (RSTP)?",
    options: { A: "Provides faster convergence than STP when topology changes occur", B: "Encrypts spanning tree messages between switches", C: "Aggregates multiple links between switches", D: "Provides VLAN-based spanning tree instances" },
    answer: "A", tier: "locked", domain: 2
  },
  {
    id: "NQ074", exam: "Original",
    question: "What type of fiber optic cable uses a single light path and is designed for long-distance transmission?",
    options: { A: "Multimode", B: "Single-mode", C: "Plenum", D: "Direct attach" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ075", exam: "Original",
    question: "Which of the following wireless authentication methods uses a RADIUS server and individual user credentials?",
    options: { A: "WPA2-Personal", B: "WEP", C: "WPA2-Enterprise", D: "MAC filtering" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ076", exam: "Original",
    question: "A network technician is installing cable in an air handling space above the ceiling. Which type of cable is required by building codes?",
    options: { A: "PVC jacket", B: "Plenum-rated", C: "Direct burial", D: "Armored" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ077", exam: "Original",
    question: "Which of the following best describes the function of a wireless controller in an enterprise network?",
    options: { A: "Provides internet connectivity for wireless clients", B: "Centrally manages multiple access points and enforces wireless policies", C: "Filters wireless traffic for security threats", D: "Assigns IP addresses to wireless devices" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ078", exam: "Original",
    question: "What is the purpose of a patch panel in a structured cabling system?",
    options: { A: "Amplifies signals to extend cable distance", B: "Provides a central termination point for network cables allowing easy management", C: "Converts fiber optic signals to electrical signals", D: "Filters network traffic between segments" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ079", exam: "Original",
    question: "Which of the following is a characteristic of 802.11ax (Wi-Fi 6)?",
    options: { A: "Operates only in the 5 GHz band", B: "Uses OFDMA to improve efficiency in high-density environments", C: "Maximum speed of 1.3 Gbps", D: "Compatible only with WPA2 security" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ080", exam: "Original",
    question: "A switch port is configured to accept traffic only from a specific VLAN without tagging. What type of port is this?",
    options: { A: "Trunk port", B: "Access port", C: "Mirror port", D: "Hybrid port" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ081", exam: "Original",
    question: "Which of the following describes the purpose of SSID broadcasting?",
    options: { A: "Encrypts wireless network traffic", B: "Announces the wireless network name so clients can discover and connect to it", C: "Authenticates wireless clients using certificates", D: "Controls the transmission power of the access point" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ082", exam: "Original",
    question: "A network uses a 10GBASE-SR transceiver. What type of fiber and approximate maximum distance does this support?",
    options: { A: "Single-mode fiber, up to 10 km", B: "Multimode fiber, up to 300 meters", C: "Single-mode fiber, up to 40 km", D: "Multimode fiber, up to 2 km" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ083", exam: "Original",
    question: "Which protocol is used to dynamically negotiate and establish VPN tunnels?",
    options: { A: "GRE", B: "IKE", C: "L2TP", D: "PPTP" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ084", exam: "Original",
    question: "What is the main advantage of using a managed switch over an unmanaged switch?",
    options: { A: "Managed switches are less expensive", B: "Managed switches provide configuration options including VLANs, port mirroring, and QoS", C: "Managed switches operate faster than unmanaged switches", D: "Managed switches do not require power to operate" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ085", exam: "Original",
    question: "Which of the following cable types is used for DSL internet connections?",
    options: { A: "Coaxial", B: "Fiber optic", C: "Cat6a UTP", D: "RJ-11 telephone cable" },
    answer: "D", tier: "locked", domain: 2
  },
  {
    id: "NQ086", exam: "Original",
    question: "A company wants to provide guest wireless access without allowing guests to access the internal corporate network. Which of the following BEST accomplishes this?",
    options: { A: "Disabling SSID broadcast on the main network", B: "Creating a separate guest SSID mapped to an isolated VLAN", C: "Implementing MAC address filtering on all access points", D: "Using WPA3 encryption for the guest network" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ087", exam: "Original",
    question: "Which of the following describes the purpose of a media converter in networking?",
    options: { A: "Converts analog signals to digital signals", B: "Converts between different network media types such as fiber to copper", C: "Amplifies signals over long cable runs", D: "Filters network traffic between media types" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ088", exam: "Original",
    question: "A network administrator notices that a switch port is in an error-disabled state. What is the most likely cause?",
    options: { A: "The connected device has the wrong IP address", B: "A security violation such as port security MAC limit exceeded", C: "The VLAN configured on the port does not exist", D: "The cable connected to the port is faulty" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ089", exam: "Original",
    question: "Which of the following wireless network topologies allows wireless clients to communicate directly with each other without an access point?",
    options: { A: "Infrastructure mode", B: "Ad hoc mode", C: "Mesh mode", D: "Bridge mode" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ090", exam: "Original",
    question: "What is the purpose of VLAN pruning on a trunk link?",
    options: { A: "Removes unused VLANs from the switch configuration", B: "Prevents unnecessary VLAN traffic from being sent across trunk links to switches that don't have ports in those VLANs", C: "Assigns VLAN membership to trunk ports", D: "Encrypts VLAN traffic across trunk links" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ091", exam: "Original",
    question: "Which of the following connector types is commonly used with coaxial cable in cable TV and broadband internet installations?",
    options: { A: "RJ-45", B: "F-type", C: "BNC", D: "LC" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ092", exam: "Original",
    question: "A network administrator needs to configure a router to send traffic for an unknown destination out a specific interface. Which type of route should be configured?",
    options: { A: "Host route", B: "Default route", C: "Static route", D: "Dynamic route" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ093", exam: "Original",
    question: "Which of the following describes inter-VLAN routing?",
    options: { A: "Routing between different switches using trunk ports", B: "Routing traffic between different VLANs using a Layer 3 device", C: "Configuring multiple VLANs on a single switch port", D: "Spanning tree elections between different VLANs" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ094", exam: "Original",
    question: "A technician needs to terminate Cat6 cable to a keystone jack. Which wiring standard is most commonly used in the United States?",
    options: { A: "T568A", B: "T568B", C: "T568C", D: "Both A and B are equally common" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ095", exam: "Original",
    question: "Which of the following is a feature of 802.3at (PoE+) compared to 802.3af (PoE)?",
    options: { A: "802.3at provides less power but supports more devices", B: "802.3at delivers up to 30 watts per port compared to 15.4 watts for 802.3af", C: "802.3at requires fiber optic cabling", D: "802.3at only works with managed switches" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ096", exam: "Original",
    question: "Which type of antenna is most appropriate for providing wireless coverage in a specific direction such as a point-to-point link between buildings?",
    options: { A: "Omnidirectional", B: "Yagi", C: "Dipole", D: "Patch" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ097", exam: "Original",
    question: "What is the purpose of port mirroring on a switch?",
    options: { A: "Duplicates traffic from one or more ports to a monitoring port for analysis", B: "Provides redundant connections to prevent switch failure", C: "Limits bandwidth usage on specific switch ports", D: "Encrypts traffic passing through switch ports" },
    answer: "A", tier: "locked", domain: 2
  },
  {
    id: "NQ098", exam: "Original",
    question: "Which of the following describes the difference between single-mode and multimode fiber?",
    options: { A: "Single-mode uses LED light sources while multimode uses laser light sources", B: "Single-mode supports longer distances with a smaller core while multimode supports shorter distances with a larger core", C: "Multimode is more expensive than single-mode", D: "Single-mode is used only for indoor installations" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ099", exam: "Original",
    question: "A company is deploying access points throughout a large office building. Which of the following deployment models allows for centralized management and roaming between access points?",
    options: { A: "Autonomous access points", B: "Controller-based access points", C: "Ad hoc wireless network", D: "Mesh wireless network" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ100", exam: "Original",
    question: "Which of the following Ethernet standards supports speeds of 40 Gbps?",
    options: { A: "10GBASE-T", B: "25GBASE-T", C: "40GBASE-T", D: "100GBASE-T" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ101", exam: "Original",
    question: "What is the purpose of a loopback interface on a router?",
    options: { A: "Tests the physical network interface", B: "Provides a stable logical interface that remains up as long as the router is operating", C: "Connects the router to a management network", D: "Provides a backup interface when primary links fail" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ102", exam: "Original",
    question: "Which of the following wireless features allows multiple antennas to transmit and receive simultaneously to improve throughput?",
    options: { A: "OFDM", B: "DSSS", C: "MIMO", D: "FHSS" },
    answer: "C", tier: "locked", domain: 2
  },
  {
    id: "NQ103", exam: "Original",
    question: "A network technician needs to verify that a cable is properly terminated and test for continuity. Which tool should be used?",
    options: { A: "Toner probe", B: "Cable tester", C: "Multimeter", D: "Optical power meter" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ104", exam: "Original",
    question: "Which of the following describes a Layer 3 switch?",
    options: { A: "A switch that operates only at the Data Link layer", B: "A switch that can perform both switching and routing functions", C: "A switch designed exclusively for fiber optic connections", D: "A switch that provides wireless connectivity" },
    answer: "B", tier: "locked", domain: 2
  },
  {
    id: "NQ105", exam: "Original",
    question: "What is the purpose of the spanning tree root bridge election?",
    options: { A: "Determines which switch has the highest bandwidth", B: "Selects the central reference point from which all spanning tree path calculations are made", C: "Elects the switch that will forward all inter-VLAN traffic", D: "Determines which switch will assign IP addresses to VLANs" },
    answer: "B", tier: "locked", domain: 2
  },,
{
    id: "NQ106", exam: "Original",
    question: "Which of the following documents describes the expected uptime and performance guarantees for a network service?",
    options: { A: "MOU", B: "SLA", C: "NDA", D: "SOW" },
    answer: "B", tier: "free", domain: 3
  },
  {
    id: "NQ107", exam: "Original",
    question: "A network administrator needs to monitor bandwidth utilization on all interfaces across multiple routers. Which protocol should be used to collect this data?",
    options: { A: "Syslog", B: "SNMP", C: "NetFlow", D: "NTP" },
    answer: "C", tier: "free", domain: 3
  },
  {
    id: "NQ108", exam: "Original",
    question: "Which of the following describes the purpose of a network baseline?",
    options: { A: "A security policy defining acceptable network use", B: "A documented record of normal network performance used to identify deviations", C: "A backup configuration for network devices", D: "A list of approved network applications" },
    answer: "B", tier: "free", domain: 3
  },
  {
    id: "NQ109", exam: "Original",
    question: "A network administrator receives alerts that a core switch is running low on available memory. Which type of monitoring system generated this alert?",
    options: { A: "NetFlow collector", B: "SNMP-based network monitoring system", C: "Syslog server", D: "Packet analyzer" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ110", exam: "Original",
    question: "Which of the following backup types copies only the data that has changed since the last full backup, regardless of whether previous incremental backups were performed?",
    options: { A: "Incremental backup", B: "Differential backup", C: "Full backup", D: "Snapshot backup" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ111", exam: "Original",
    question: "What is the purpose of a change management process in network operations?",
    options: { A: "Automatically applies patches to network devices", B: "Provides a controlled process for implementing modifications to reduce risk and document changes", C: "Monitors network performance and alerts on changes", D: "Backs up network configurations before changes are made" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ112", exam: "Original",
    question: "Which of the following tools would a network technician use to identify which wall jack a cable is connected to at a patch panel?",
    options: { A: "Cable tester", B: "Toner and probe kit", C: "Spectrum analyzer", D: "OTDR" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ113", exam: "Original",
    question: "A company needs to ensure that critical network services remain available if the primary data center experiences an outage. Which of the following best describes this strategy?",
    options: { A: "Redundancy and high availability", B: "Load balancing", C: "QoS configuration", D: "Network segmentation" },
    answer: "A", tier: "locked", domain: 3
  },
  {
    id: "NQ114", exam: "Original",
    question: "Which of the following describes the purpose of a logical network diagram?",
    options: { A: "Shows the physical location of all network devices", B: "Illustrates IP addressing, VLANs, and routing relationships between network components", C: "Documents the cable runs and physical connections", D: "Provides a floor plan of the network infrastructure" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ115", exam: "Original",
    question: "A network administrator needs to capture and analyze packets on a specific network segment to troubleshoot a connectivity issue. Which tool should be used?",
    options: { A: "SNMP manager", B: "Packet analyzer such as Wireshark", C: "Network mapper", D: "Vulnerability scanner" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ116", exam: "Original",
    question: "Which of the following describes the difference between RTO and RPO in disaster recovery planning?",
    options: { A: "RTO is the maximum data loss acceptable and RPO is the time to restore services", B: "RTO is the time to restore services and RPO is the maximum acceptable data loss", C: "RTO and RPO are different terms for the same concept", D: "RTO applies to hardware and RPO applies to software" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ117", exam: "Original",
    question: "A company's network documentation shows that all configuration changes must be tested in a lab environment before deployment. Which best practice does this represent?",
    options: { A: "Change management", B: "Configuration management", C: "Patch management", D: "Risk management" },
    answer: "A", tier: "locked", domain: 3
  },
  {
    id: "NQ118", exam: "Original",
    question: "Which of the following tools is used to measure the power loss in a fiber optic cable?",
    options: { A: "TDR", B: "Cable tester", C: "OTDR", D: "Multimeter" },
    answer: "C", tier: "locked", domain: 3
  },
  {
    id: "NQ119", exam: "Original",
    question: "A network administrator wants to prioritize VoIP traffic over regular data traffic on the network. Which technology should be implemented?",
    options: { A: "VLAN", B: "QoS", C: "STP", D: "NAT" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ120", exam: "Original",
    question: "Which of the following syslog severity levels indicates a condition that requires immediate action?",
    options: { A: "Warning (4)", B: "Error (3)", C: "Critical (2)", D: "Alert (1)" },
    answer: "D", tier: "locked", domain: 3
  },
  {
    id: "NQ121", exam: "Original",
    question: "A network administrator needs to access a router's command line interface remotely using an encrypted connection. Which protocol should be used?",
    options: { A: "Telnet", B: "SSH", C: "HTTP", D: "SNMP" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ122", exam: "Original",
    question: "Which of the following describes an out-of-band management network?",
    options: { A: "A network that provides higher bandwidth for management traffic", B: "A separate network path for managing devices that is independent of the production network", C: "A virtual network used exclusively for management purposes", D: "A wireless network for managing network infrastructure" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ123", exam: "Original",
    question: "A company wants to ensure that network device configurations are automatically saved to a central repository after any change is made. Which approach best accomplishes this?",
    options: { A: "Manual configuration backup procedures", B: "Automated configuration management using RANCID or similar tools", C: "SNMP polling of device configurations", D: "Syslog monitoring of configuration changes" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ124", exam: "Original",
    question: "Which of the following describes the purpose of a hot spare in network infrastructure?",
    options: { A: "A device that is powered off but can be quickly activated if needed", B: "A device that is fully operational and can immediately take over if the primary device fails", C: "A backup device stored in a warehouse", D: "A device that requires manual configuration before use" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ125", exam: "Original",
    question: "A network administrator is reviewing logs and notices that a router's CPU utilization spiked to 95% during business hours. Which of the following is the most appropriate first step?",
    options: { A: "Immediately replace the router", B: "Investigate what processes or traffic caused the CPU spike to determine the root cause", C: "Reboot the router during off-hours", D: "Increase the router's memory" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ126", exam: "Original",
    question: "Which of the following best describes the purpose of network documentation?",
    options: { A: "Provides security policies for network users", B: "Maintains accurate records of network configurations, topology, and assets to support troubleshooting and planning", C: "Monitors network performance in real time", D: "Automates network configuration changes" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ127", exam: "Original",
    question: "A network technician needs to verify the signal strength of a wireless network throughout a building. Which tool should be used?",
    options: { A: "Cable tester", B: "Spectrum analyzer or Wi-Fi analyzer", C: "TDR", D: "OTDR" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ128", exam: "Original",
    question: "Which of the following describes the purpose of DSCP in QoS implementations?",
    options: { A: "Encrypts traffic to ensure priority packets are not intercepted", B: "Marks packets with a priority value so network devices can provide appropriate treatment", C: "Limits bandwidth for lower priority traffic", D: "Assigns VLANs to traffic flows for prioritization" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ129", exam: "Original",
    question: "A company's disaster recovery plan specifies that after a major outage, the network must be restored within 4 hours. This requirement is the organization's:",
    options: { A: "RPO", B: "MTTR", C: "RTO", D: "MTBF" },
    answer: "C", tier: "locked", domain: 3
  },
  {
    id: "NQ130", exam: "Original",
    question: "Which of the following is an advantage of using SNMPv3 over SNMPv1 or SNMPv2c?",
    options: { A: "SNMPv3 supports more MIB variables", B: "SNMPv3 provides authentication and encryption for secure management traffic", C: "SNMPv3 requires less bandwidth for polling", D: "SNMPv3 is compatible with more network devices" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ131", exam: "Original",
    question: "A network administrator needs to test whether a network cable has any breaks or shorts. Which tool is most appropriate?",
    options: { A: "Spectrum analyzer", B: "TDR (Time Domain Reflectometer)", C: "Optical power meter", D: "Protocol analyzer" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ132", exam: "Original",
    question: "Which of the following describes the purpose of an IP SLA in network operations?",
    options: { A: "Defines the service level agreement between the organization and ISP", B: "Measures network performance metrics such as latency, jitter, and packet loss", C: "Monitors security events on network devices", D: "Tracks configuration changes across network infrastructure" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ133", exam: "Original",
    question: "A company's network team receives notification that a critical security patch is available for their firewall. Which process should be followed before applying the patch in production?",
    options: { A: "Apply immediately to minimize vulnerability exposure", B: "Test in a lab environment, schedule a maintenance window, and follow change management procedures", C: "Wait for the next quarterly maintenance cycle", D: "Apply only if the vulnerability has been actively exploited" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ134", exam: "Original",
    question: "Which of the following metrics indicates the average time a network device operates before experiencing a failure?",
    options: { A: "RTO", B: "RPO", C: "MTBF", D: "MTTR" },
    answer: "C", tier: "locked", domain: 3
  },
  {
    id: "NQ135", exam: "Original",
    question: "A network administrator wants to ensure that all network devices are synchronized to the same time source. Which protocol should be configured?",
    options: { A: "SNMP", B: "NTP", C: "Syslog", D: "NetFlow" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ136", exam: "Original",
    question: "Which of the following describes a network rack unit (U)?",
    options: { A: "A measurement of network bandwidth in rack-mounted equipment", B: "A standard unit of measurement equal to 1.75 inches used to describe the height of rack-mounted equipment", C: "A power distribution unit for rack-mounted devices", D: "A cable management system for network racks" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ137", exam: "Original",
    question: "A company is planning network upgrades and needs to identify all network devices, their locations, and interconnections. Which document should be consulted or created?",
    options: { A: "Security policy", B: "Network topology diagram and asset inventory", C: "Acceptable use policy", D: "Disaster recovery plan" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ138", exam: "Original",
    question: "Which of the following is the primary purpose of a UPS in a network infrastructure environment?",
    options: { A: "Increases power efficiency for network equipment", B: "Provides temporary power to allow graceful shutdown during power outages", C: "Filters electrical interference from power sources", D: "Distributes power to multiple network devices" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ139", exam: "Original",
    question: "A network administrator reviews a physical network diagram showing all cable runs, patch panel ports, and device locations. Which type of diagram is this?",
    options: { A: "Logical network diagram", B: "Physical network diagram", C: "Network topology map", D: "Layer 3 diagram" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ140", exam: "Original",
    question: "Which of the following describes the 3-2-1 backup rule?",
    options: { A: "3 backups on 2 different media types with 1 stored offsite", B: "Backup every 3 hours with 2 redundant copies on 1 server", C: "3 full backups, 2 differential, and 1 incremental per week", D: "Back up 3 critical systems, 2 secondary systems, and 1 archive" },
    answer: "A", tier: "locked", domain: 3
  },
  {
    id: "NQ141", exam: "Original",
    question: "A network engineer is asked to implement load balancing for a web application. Which device provides this functionality?",
    options: { A: "Core switch", B: "Load balancer", C: "Edge router", D: "Proxy server" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ142", exam: "Original",
    question: "Which of the following is an advantage of using a network management system (NMS)?",
    options: { A: "Eliminates the need for network documentation", B: "Provides centralized visibility and management of network devices from a single console", C: "Automatically resolves network performance issues", D: "Replaces the need for network technicians" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ143", exam: "Original",
    question: "A company wants to virtualize its network infrastructure to improve flexibility and reduce costs. Which technology enables this?",
    options: { A: "Traditional hardware-based networking", B: "SDN (Software-Defined Networking)", C: "Physical network segmentation", D: "Manual configuration management" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ144", exam: "Original",
    question: "Which of the following describes the purpose of cable labeling in a network environment?",
    options: { A: "Provides electrical insulation for cables", B: "Enables quick identification of cable connections for troubleshooting and documentation", C: "Improves signal quality in cable runs", D: "Complies with building fire codes" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ145", exam: "Original",
    question: "A network administrator wants to collect detailed flow information from routers to analyze traffic patterns. Which protocol exports this information?",
    options: { A: "SNMP", B: "Syslog", C: "NetFlow", D: "NTP" },
    answer: "C", tier: "locked", domain: 3
  },
  {
    id: "NQ146", exam: "Original",
    question: "Which of the following describes the purpose of an MDF in a building's network infrastructure?",
    options: { A: "A rack for housing access layer switches on each floor", B: "The main distribution point where building cabling converges and connects to external networks", C: "A wireless distribution system for connecting access points", D: "A modular device for connecting different cable types" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ147", exam: "Original",
    question: "A company needs to ensure that critical servers remain accessible even if one network interface fails. Which technology provides this capability?",
    options: { A: "VLAN segmentation", B: "NIC teaming or bonding", C: "QoS prioritization", D: "STP root guard" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ148", exam: "Original",
    question: "Which of the following best describes the difference between active and passive network monitoring?",
    options: { A: "Active monitoring generates test traffic while passive monitoring analyzes existing traffic", B: "Active monitoring uses SNMP while passive monitoring uses NetFlow", C: "Active monitoring is more accurate than passive monitoring", D: "Passive monitoring impacts network performance while active monitoring does not" },
    answer: "A", tier: "locked", domain: 3
  },
  {
    id: "NQ149", exam: "Original",
    question: "A network administrator needs to update the firmware on 50 network switches. Which approach minimizes risk?",
    options: { A: "Update all switches simultaneously during off-hours", B: "Update switches in phases starting with non-critical devices, testing thoroughly before proceeding", C: "Update only switches that have reported errors", D: "Skip the update since current firmware is functional" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ150", exam: "Original",
    question: "Which type of DNS server is authoritative for a specific domain and returns definitive answers for that domain?",
    options: { A: "Recursive resolver", B: "Caching server", C: "Authoritative DNS server", D: "Forwarding server" },
    answer: "C", tier: "locked", domain: 3
  },
  {
    id: "NQ151", exam: "Original",
    question: "A network team is implementing a hot site for disaster recovery. Which of the following BEST describes a hot site?",
    options: { A: "An empty facility with power and cooling that requires equipment installation", B: "A fully equipped and operational facility that can take over immediately after a disaster", C: "A partially equipped facility that requires some setup time after a disaster", D: "A cloud-based backup of critical data and configurations" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ152", exam: "Original",
    question: "Which of the following describes the purpose of a MIB in SNMP?",
    options: { A: "Stores log data from network devices", B: "Defines the structure and available data objects that can be monitored on a network device", C: "Encrypts SNMP community strings", D: "Provides a graphical interface for network monitoring" },
    answer: "B", tier: "locked", domain: 3
  },
  {
    id: "NQ153", exam: "Original",
    question: "A company's network documentation includes IP address assignments, VLAN configurations, and routing information. What type of document is this?",
    options: { A: "Physical network diagram", B: "Network addressing and services document", C: "Acceptable use policy", D: "Incident response plan" },
    answer: "B", tier: "locked", domain: 3
  },,
{
    id: "NQ154", exam: "Original",
    question: "Which of the following firewall types inspects traffic at the application layer and can filter based on the content of packets?",
    options: { A: "Packet filtering firewall", B: "Stateful inspection firewall", C: "Next-generation firewall", D: "Circuit-level gateway" },
    answer: "C", tier: "free", domain: 4
  },
  {
    id: "NQ155", exam: "Original",
    question: "What is the purpose of a DMZ in network security?",
    options: { A: "Encrypts all traffic between internal and external networks", B: "Provides a buffer zone between the internet and internal network for hosting public-facing services", C: "Monitors network traffic for security threats", D: "Filters malware from email attachments" },
    answer: "B", tier: "free", domain: 4
  },
  {
    id: "NQ156", exam: "Original",
    question: "Which type of attack floods a network with traffic to make services unavailable to legitimate users?",
    options: { A: "Man-in-the-middle attack", B: "SQL injection", C: "Denial of service attack", D: "Phishing attack" },
    answer: "C", tier: "free", domain: 4
  },
  {
    id: "NQ157", exam: "Original",
    question: "Which of the following describes port security on a network switch?",
    options: { A: "Encrypts traffic on specific switch ports", B: "Limits the number of MAC addresses that can be learned on a switch port", C: "Filters traffic based on IP addresses", D: "Provides VLAN segmentation for security" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ158", exam: "Original",
    question: "Which VPN protocol is considered the most secure and modern, using SSL/TLS for encryption?",
    options: { A: "PPTP", B: "L2TP", C: "IPsec", D: "SSL VPN" },
    answer: "D", tier: "locked", domain: 4
  },
  {
    id: "NQ159", exam: "Original",
    question: "A network security team discovers a device on the network that appears to be scanning all other hosts. Which type of attack does this most likely represent?",
    options: { A: "DoS attack", B: "Reconnaissance scanning", C: "ARP poisoning", D: "DNS spoofing" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ160", exam: "Original",
    question: "Which of the following access control methods grants permissions based on the sensitivity of the data and the user's security clearance?",
    options: { A: "DAC", B: "RBAC", C: "MAC", D: "ABAC" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ161", exam: "Original",
    question: "A company wants to ensure that only devices with valid certificates can connect to the network. Which 802.1X authentication method provides this?",
    options: { A: "EAP-MD5", B: "EAP-TLS", C: "PEAP", D: "EAP-TTLS" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ162", exam: "Original",
    question: "Which of the following describes a man-in-the-middle attack?",
    options: { A: "An attacker floods a server with connection requests", B: "An attacker intercepts and potentially alters communications between two parties", C: "An attacker gains access by guessing user passwords", D: "An attacker sends malicious email attachments" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ163", exam: "Original",
    question: "A network administrator wants to prevent rogue DHCP servers from assigning IP addresses on the network. Which switch security feature should be enabled?",
    options: { A: "Port security", B: "DHCP snooping", C: "Dynamic ARP inspection", D: "IP source guard" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ164", exam: "Original",
    question: "Which of the following describes the difference between an IDS and an IPS?",
    options: { A: "IDS blocks malicious traffic while IPS only detects and alerts", B: "IDS detects and alerts on threats while IPS detects and actively blocks threats", C: "IDS is hardware-based while IPS is software-based", D: "IDS monitors internal traffic while IPS monitors external traffic" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ165", exam: "Original",
    question: "What is the purpose of NAC (Network Access Control)?",
    options: { A: "Translates network addresses between internal and external networks", B: "Enforces security policies on devices before allowing them to connect to the network", C: "Controls bandwidth allocation for network devices", D: "Manages user authentication for network applications" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ166", exam: "Original",
    question: "Which of the following encryption protocols is used by IPsec to encrypt and authenticate IP packets?",
    options: { A: "AH only", B: "ESP only", C: "Both AH and ESP are used depending on requirements", D: "DES" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ167", exam: "Original",
    question: "A security analyst discovers that an attacker is sending ARP replies associating their MAC address with the default gateway IP. Which attack is this?",
    options: { A: "DHCP starvation", B: "ARP poisoning", C: "MAC flooding", D: "IP spoofing" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ168", exam: "Original",
    question: "Which of the following describes the principle of least privilege in network security?",
    options: { A: "Users should have access to all network resources to maximize productivity", B: "Users should be granted only the minimum access rights needed to perform their job functions", C: "Network devices should be configured with default settings for simplicity", D: "Security policies should be as simple as possible to avoid user confusion" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ169", exam: "Original",
    question: "A company wants to allow employees to access internal resources from home using an encrypted tunnel. Which technology provides this?",
    options: { A: "VLAN", B: "VPN", C: "NAT", D: "Proxy server" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ170", exam: "Original",
    question: "Which of the following is a characteristic of a zero trust security model?",
    options: { A: "Trust all users inside the network perimeter", B: "Verify every user and device before granting access regardless of network location", C: "Use firewalls to create trusted and untrusted network zones", D: "Allow unrestricted access for authenticated users" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ171", exam: "Original",
    question: "A network administrator needs to prevent MAC address table overflow attacks on a switch. Which feature should be enabled?",
    options: { A: "DHCP snooping", B: "Dynamic ARP inspection", C: "Port security with a maximum MAC address limit", D: "BPDU guard" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ172", exam: "Original",
    question: "Which of the following describes social engineering in the context of network security?",
    options: { A: "Using software tools to crack network passwords", B: "Manipulating people into revealing confidential information or performing actions that compromise security", C: "Scanning networks to identify vulnerabilities", D: "Intercepting network traffic to capture sensitive data" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ173", exam: "Original",
    question: "A company's security policy requires all wireless traffic to be encrypted. Which of the following provides the strongest encryption for wireless networks?",
    options: { A: "WEP", B: "WPA-TKIP", C: "WPA2-AES", D: "WPA3-SAE" },
    answer: "D", tier: "locked", domain: 4
  },
  {
    id: "NQ174", exam: "Original",
    question: "Which of the following is the primary purpose of network segmentation from a security perspective?",
    options: { A: "Increases network performance", B: "Contains security breaches and limits the spread of attacks to other network segments", C: "Simplifies network management", D: "Reduces hardware costs" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ175", exam: "Original",
    question: "A network administrator discovers that a remote user's VPN traffic is split - some traffic goes through the VPN tunnel and some goes directly to the internet. Which VPN configuration is this?",
    options: { A: "Full tunnel VPN", B: "Split tunnel VPN", C: "Site-to-site VPN", D: "SSL VPN" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ176", exam: "Original",
    question: "Which of the following is a common indicator of a DNS poisoning attack?",
    options: { A: "Slow network performance on all devices", B: "Users being redirected to incorrect websites despite entering correct URLs", C: "Loss of connectivity to the default gateway", D: "Inability to obtain IP addresses from DHCP" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ177", exam: "Original",
    question: "A company implements role-based access control for its network resources. Which of the following best describes RBAC?",
    options: { A: "Access is granted based on the sensitivity of the resource and user's clearance", B: "Access permissions are assigned to roles and users are assigned to roles", C: "Access is determined by the user who owns the resource", D: "Access is granted based on user attributes and environmental conditions" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ178", exam: "Original",
    question: "Which of the following describes the purpose of DNSSEC?",
    options: { A: "Encrypts DNS queries to prevent eavesdropping", B: "Adds digital signatures to DNS records to verify authenticity and prevent tampering", C: "Filters malicious domains at the DNS level", D: "Provides redundancy for DNS servers" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ179", exam: "Original",
    question: "A security administrator wants to log all denied traffic from the internet. Where should firewall logs be reviewed?",
    options: { A: "The DHCP server logs", B: "The firewall's security log or syslog server", C: "The web server access logs", D: "The switch's MAC address table" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ180", exam: "Original",
    question: "Which of the following wireless security features hides the network name from being broadcast publicly?",
    options: { A: "MAC filtering", B: "WPA3 encryption", C: "SSID suppression", D: "EAP authentication" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ181", exam: "Original",
    question: "A company's security policy requires that all network management traffic be encrypted. Which protocol should replace SNMP v1 and v2 for device management?",
    options: { A: "Telnet", B: "SNMP v3", C: "HTTP", D: "FTP" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ182", exam: "Original",
    question: "Which of the following best describes a honeypot in network security?",
    options: { A: "A firewall that attracts and blocks attack traffic", B: "A decoy system designed to attract attackers and gather intelligence about attack methods", C: "An encryption system for protecting sensitive data", D: "A proxy server that filters malicious web content" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ183", exam: "Original",
    question: "A network administrator is hardening a switch. Which of the following should be done to prevent VLAN hopping attacks?",
    options: { A: "Encrypt all VLAN traffic using WPA3", B: "Disable auto-trunking on access ports and change the native VLAN to an unused VLAN", C: "Enable spanning tree on all VLANs", D: "Implement port security on trunk ports" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ184", exam: "Original",
    question: "Which of the following protocols is used to provide centralized authentication for remote access users?",
    options: { A: "SNMP", B: "RADIUS", C: "NTP", D: "DHCP" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ185", exam: "Original",
    question: "A user reports receiving an email claiming to be from the IT department asking for their login credentials. Which type of attack is this?",
    options: { A: "Brute force attack", B: "Phishing attack", C: "Man-in-the-middle attack", D: "Replay attack" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ186", exam: "Original",
    question: "Which of the following firewall rule principles states that all traffic should be denied unless explicitly permitted?",
    options: { A: "Implicit allow", B: "Explicit deny", C: "Implicit deny", D: "Default permit" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ187", exam: "Original",
    question: "A company wants to monitor for known attack patterns in network traffic. Which security device provides signature-based detection?",
    options: { A: "Firewall", B: "IDS/IPS", C: "Load balancer", D: "Proxy server" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ188", exam: "Original",
    question: "Which of the following describes the purpose of 802.1X in network security?",
    options: { A: "Provides encryption for wireless networks", B: "Provides port-based network access control requiring authentication before network access is granted", C: "Prevents MAC address spoofing on switch ports", D: "Encrypts management traffic between network devices" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ189", exam: "Original",
    question: "An attacker sends a large number of SYN packets to a server without completing the TCP handshake. Which type of attack is this?",
    options: { A: "UDP flood", B: "ICMP flood", C: "SYN flood", D: "Smurf attack" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ190", exam: "Original",
    question: "A network administrator wants to prevent unauthorized switches from being connected to the network. Which STP feature should be enabled?",
    options: { A: "BPDU guard", B: "Root guard", C: "Loop guard", D: "UDLD" },
    answer: "A", tier: "locked", domain: 4
  },
  {
    id: "NQ191", exam: "Original",
    question: "Which of the following is the most effective way to protect against wireless eavesdropping?",
    options: { A: "Hiding the SSID", B: "Implementing MAC filtering", C: "Using WPA3 encryption", D: "Reducing transmit power" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ192", exam: "Original",
    question: "Which of the following describes IP spoofing?",
    options: { A: "Forging the source IP address in packets to impersonate another host", B: "Mapping an IP address to a false MAC address", C: "Modifying DNS responses to redirect traffic", D: "Overloading a server with traffic from multiple sources" },
    answer: "A", tier: "locked", domain: 4
  },
  {
    id: "NQ193", exam: "Original",
    question: "A company implements network access control that checks devices for antivirus software, OS patches, and firewall status before granting access. This is an example of:",
    options: { A: "Network segmentation", B: "Endpoint posture assessment", C: "Port security", D: "MAC filtering" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ194", exam: "Original",
    question: "Which of the following best describes the purpose of a content filter in network security?",
    options: { A: "Encrypts web traffic between clients and servers", B: "Inspects and restricts web content based on categories or policies", C: "Provides authentication for web applications", D: "Caches frequently accessed web content" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ195", exam: "Original",
    question: "A security team discovers that an attacker is impersonating a legitimate DHCP server and assigning malicious gateway addresses to clients. Which attack is this?",
    options: { A: "ARP poisoning", B: "DHCP starvation", C: "Rogue DHCP server attack", D: "DNS spoofing" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ196", exam: "Original",
    question: "Which of the following protocols encrypts the authentication process and provides mutual authentication between client and server?",
    options: { A: "PAP", B: "CHAP", C: "EAP-TLS", D: "MS-CHAP" },
    answer: "C", tier: "locked", domain: 4
  },
  {
    id: "NQ197", exam: "Original",
    question: "A network administrator wants to create a network perimeter specifically for servers that need internet access. Which of the following should be implemented?",
    options: { A: "VLAN for server segmentation", B: "DMZ with firewall rules controlling traffic flow", C: "VPN tunnel for server communications", D: "NAT to hide server IP addresses" },
    answer: "B", tier: "locked", domain: 4
  },
  {
    id: "NQ198", exam: "Original",
    question: "Which of the following describes the purpose of a SIEM in network security?",
    options: { A: "Blocks malicious traffic at the network perimeter", B: "Collects and correlates security event data from multiple sources to detect and respond to threats", C: "Encrypts sensitive data stored on network servers", D: "Manages user authentication across the network" },
    answer: "B", tier: "locked", domain: 4
  },

  // Domain 5: Network Troubleshooting (NQ199-NQ245)
  {
    id: "NQ199", exam: "Original",
    question: "A user reports they cannot access the internet but can access local network resources. Which of the following is the most likely cause?",
    options: { A: "Incorrect subnet mask", B: "Incorrect or missing default gateway", C: "IP address conflict", D: "Faulty network cable" },
    answer: "B", tier: "free", domain: 5
  },
  {
    id: "NQ200", exam: "Original",
    question: "A network technician is troubleshooting a connectivity issue. They can ping the local gateway but not external IP addresses. Which of the following should be checked FIRST?",
    options: { A: "DNS server configuration", B: "Physical cable connection", C: "Routing configuration on the gateway or ISP connectivity", D: "Firewall rules on the client device" },
    answer: "C", tier: "free", domain: 5
  },
  {
    id: "NQ201", exam: "Original",
    question: "Which troubleshooting methodology involves starting at the Physical layer and working up through the OSI model?",
    options: { A: "Top-down approach", B: "Divide and conquer", C: "Bottom-up approach", D: "Follow the path" },
    answer: "C", tier: "free", domain: 5
  },
  {
    id: "NQ202", exam: "Original",
    question: "A user can access websites by IP address but not by domain name. Which service is most likely failing?",
    options: { A: "DHCP", B: "Default gateway", C: "DNS", D: "Proxy server" },
    answer: "C", tier: "locked", domain: 5
  },
  {
    id: "NQ203", exam: "Original",
    question: "A technician is troubleshooting intermittent network connectivity issues on a wired workstation. Which of the following tools would identify cable faults?",
    options: { A: "Protocol analyzer", B: "Cable tester or TDR", C: "Network scanner", D: "Spectrum analyzer" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ204", exam: "Original",
    question: "Users on one VLAN report they cannot communicate with users on another VLAN. Which of the following is the most likely cause?",
    options: { A: "Incorrect subnet mask on client devices", B: "Inter-VLAN routing is not configured or is misconfigured", C: "STP is blocking the connection", D: "DHCP is not assigning addresses correctly" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ205", exam: "Original",
    question: "A network administrator observes high latency and packet loss on a WAN link. Which of the following tools would best identify the location of the problem?",
    options: { A: "Ping", B: "Traceroute", C: "Nmap", D: "Netstat" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ206", exam: "Original",
    question: "A switch port is showing as administratively down. Which of the following commands would resolve this on a Cisco switch?",
    options: { A: "spanning-tree portfast", B: "no shutdown", C: "switchport mode access", D: "ip address dhcp" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ207", exam: "Original",
    question: "Users report slow network performance. A network administrator notices the network utilization is consistently above 90%. Which of the following would most likely resolve this issue?",
    options: { A: "Reboot all network switches", B: "Upgrade network bandwidth or implement QoS to prioritize critical traffic", C: "Replace all Cat5e cables with fiber optic", D: "Disable half-duplex on all interfaces" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ208", exam: "Original",
    question: "A wireless user reports intermittent connectivity. A technician notices the signal strength is low and the noise floor is high. Which of the following is the most likely cause?",
    options: { A: "Incorrect wireless password", B: "RF interference or being too far from the access point", C: "Incorrect IP address configuration", D: "DHCP server failure" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ209", exam: "Original",
    question: "A network technician discovers two devices on the network with the same IP address. What is the most immediate effect of this condition?",
    options: { A: "Both devices lose network connectivity entirely", B: "One or both devices experience intermittent connectivity issues", C: "The network switches become overloaded", D: "The DHCP server crashes" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ210", exam: "Original",
    question: "A technician receives a report that a newly installed server cannot be reached from any other device on the network. The server has a valid IP address. Which of the following should be checked FIRST?",
    options: { A: "DNS configuration", B: "Physical connection and switch port status", C: "Server firewall rules", D: "Default gateway configuration" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ211", exam: "Original",
    question: "Users on the second floor of a building cannot connect to the network after a construction project. What is the most likely cause?",
    options: { A: "DHCP server has run out of addresses", B: "A network cable was damaged or disconnected during construction", C: "The firewall is blocking second floor devices", D: "VLAN configuration was changed" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ212", exam: "Original",
    question: "A network administrator runs a ping test and receives the error message 'Destination host unreachable.' What does this indicate?",
    options: { A: "The destination host is powered off", B: "No route exists to reach the destination network", C: "The firewall is blocking ICMP traffic", D: "The DNS server cannot resolve the hostname" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ213", exam: "Original",
    question: "After replacing a switch, users on a specific VLAN cannot communicate with users on other VLANs. What is the most likely cause?",
    options: { A: "The new switch has a different MAC address", B: "The VLAN configuration was not transferred to the new switch", C: "STP is preventing communication between VLANs", D: "The uplink cable is connected to the wrong port" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ214", exam: "Original",
    question: "A user reports they keep getting disconnected from the wireless network. The user's device shows good signal strength. Which of the following is the most likely cause?",
    options: { A: "The wireless password has changed", B: "IP address lease is expiring or there is a DHCP conflict", C: "The access point is physically damaged", D: "The wireless channel is congested with interference" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ215", exam: "Original",
    question: "Which of the following commands on a Windows computer displays the current IP address, subnet mask, and default gateway?",
    options: { A: "ping", B: "tracert", C: "ipconfig", D: "netstat" },
    answer: "C", tier: "locked", domain: 5
  },
  {
    id: "NQ216", exam: "Original",
    question: "A network administrator notices that a router interface is showing as up/up but traffic is not passing. Which of the following could be the cause?",
    options: { A: "The interface is physically disconnected", B: "A misconfigured ACL is blocking traffic on the interface", C: "The interface has a duplex mismatch", D: "The cable is damaged" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ217", exam: "Original",
    question: "Users report slow file transfers to a network server. A technician captures traffic and observes many TCP retransmissions. What does this indicate?",
    options: { A: "The server's hard drive is failing", B: "Packet loss is occurring on the network path", C: "The server's CPU is overloaded", D: "The firewall is inspecting the traffic" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ218", exam: "Original",
    question: "A network technician receives a report that two switches are in a switching loop causing a broadcast storm. Which protocol should prevent this?",
    options: { A: "VLAN", B: "STP", C: "LACP", D: "HSRP" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ219", exam: "Original",
    question: "After a router upgrade, some network segments can no longer communicate. Which troubleshooting step should be performed FIRST?",
    options: { A: "Replace the router with the old hardware", B: "Verify the routing table to ensure all expected routes are present", C: "Reboot all switches on the network", D: "Check all physical cable connections" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ220", exam: "Original",
    question: "A technician suspects that a network cable has excessive crosstalk. Which tool is best suited to measure crosstalk levels?",
    options: { A: "TDR", B: "Multimeter", C: "Cable certifier", D: "Toner probe" },
    answer: "C", tier: "locked", domain: 5
  },
  {
    id: "NQ221", exam: "Original",
    question: "A wireless client can connect to the access point but cannot access network resources. Which of the following should be checked FIRST?",
    options: { A: "Wireless signal strength", B: "VLAN assignment for the wireless SSID and IP address configuration", C: "Access point firmware version", D: "Wireless channel selection" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ222", exam: "Original",
    question: "A technician is troubleshooting a network issue and uses the divide and conquer approach. They start by testing connectivity at Layer 3. If the test succeeds, which layer would they test next?",
    options: { A: "Layer 1 (Physical)", B: "Layer 2 (Data Link)", C: "Layer 4 (Transport)", D: "Layer 7 (Application)" },
    answer: "C", tier: "locked", domain: 5
  },
  {
    id: "NQ223", exam: "Original",
    question: "A network administrator discovers that a router is missing a route to a remote network. Which of the following would add a static route on a Cisco router?",
    options: { A: "ip route 192.168.2.0 255.255.255.0 10.0.0.1", B: "route add 192.168.2.0 mask 255.255.255.0 10.0.0.1", C: "add route 192.168.2.0/24 via 10.0.0.1", D: "network 192.168.2.0 255.255.255.0" },
    answer: "A", tier: "locked", domain: 5
  },
  {
    id: "NQ224", exam: "Original",
    question: "Users report that email is not being delivered. A network administrator checks and finds that the email server's MX record points to an incorrect IP address. What type of issue is this?",
    options: { A: "SMTP server configuration error", B: "DNS misconfiguration", C: "Firewall blocking email traffic", D: "Email server hardware failure" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ225", exam: "Original",
    question: "A network technician is troubleshooting a fiber optic connection and suspects a dirty connector is causing signal loss. Which tool should be used to inspect the connector?",
    options: { A: "OTDR", B: "Fiber optic inspection microscope", C: "Optical power meter", D: "Cable tester" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ226", exam: "Original",
    question: "After a firewall rule change, users cannot access a web server. A technician checks the server and confirms it is running. Which troubleshooting step should be performed FIRST?",
    options: { A: "Reboot the web server", B: "Review the firewall rule changes to verify the intended traffic is permitted", C: "Check the web server's NIC for errors", D: "Verify DNS resolution for the server" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ227", exam: "Original",
    question: "A network switch shows an interface in half-duplex mode while the connected device expects full-duplex. Which problem is most likely to occur?",
    options: { A: "Complete loss of network connectivity", B: "Excessive collisions and decreased network performance", C: "Security vulnerability on the port", D: "VLAN configuration mismatch" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ228", exam: "Original",
    question: "A technician is troubleshooting a VoIP quality issue. Users report choppy audio and calls dropping. Which network characteristic is most likely causing this?",
    options: { A: "High bandwidth utilization", B: "Jitter and packet loss affecting real-time audio", C: "Incorrect VLAN configuration", D: "DNS resolution failures" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ229", exam: "Original",
    question: "A user can access the internet but cannot reach any internal network resources after connecting via VPN. Which of the following is the most likely cause?",
    options: { A: "The VPN client is using split tunneling", B: "The user's DNS is not configured to use the internal DNS server", C: "The VPN tunnel is not fully established", D: "The user's firewall is blocking VPN traffic" },
    answer: "A", tier: "locked", domain: 5
  },
  {
    id: "NQ230", exam: "Original",
    question: "A network administrator receives reports that users cannot connect to a newly deployed wireless network. The access point shows as operational. Which of the following should be checked FIRST?",
    options: { A: "Physical cable connections to the access point", B: "The SSID and authentication settings on both the AP and client devices", C: "The firmware version of the access point", D: "Channel interference from neighboring networks" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ231", exam: "Original",
    question: "Which of the following tools would a technician use to identify all active hosts on a network subnet?",
    options: { A: "Ping single host", B: "Network scanner such as Nmap", C: "Traceroute", D: "Protocol analyzer" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ232", exam: "Original",
    question: "A technician notices that a switch interface is showing input errors and CRC errors. Which of the following is the most likely cause?",
    options: { A: "VLAN misconfiguration", B: "Faulty cable or duplex mismatch causing frame errors", C: "ACL blocking traffic on the interface", D: "STP topology change" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ233", exam: "Original",
    question: "After replacing a failed network card in a server, the server cannot connect to the network. The new card has a different MAC address. Which service likely needs to be updated?",
    options: { A: "DNS server", B: "DHCP reservation for the server", C: "Default gateway configuration", D: "Spanning tree configuration" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ234", exam: "Original",
    question: "A technician is troubleshooting slow internet access. Users can ping external hosts with normal latency but web pages load slowly. Which of the following is the most likely cause?",
    options: { A: "DNS resolution is slow", B: "The default gateway is misconfigured", C: "HTTP port 80 is being filtered", D: "MTU mismatch causing fragmentation" },
    answer: "A", tier: "locked", domain: 5
  },
  {
    id: "NQ235", exam: "Original",
    question: "Which of the following commands would a network administrator use on a Linux system to display the routing table?",
    options: { A: "ipconfig /all", B: "netstat -r or ip route", C: "traceroute", D: "nslookup" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ236", exam: "Original",
    question: "A technician is troubleshooting intermittent connectivity on a switch port. The link light flickers. Which of the following is the most likely cause?",
    options: { A: "ACL configuration error", B: "Faulty cable or loose cable connection", C: "VLAN mismatch", D: "STP topology change" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ237", exam: "Original",
    question: "A user reports they receive an IP address of 169.254.1.100. Which of the following troubleshooting steps should be performed FIRST?",
    options: { A: "Check the DNS server configuration", B: "Verify DHCP server availability and check physical network connectivity", C: "Release and renew the IP address", D: "Check the default gateway setting" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ238", exam: "Original",
    question: "A network administrator is asked to find the source of excessive broadcast traffic affecting network performance. Which tool would help identify the source?",
    options: { A: "TDR", B: "Protocol analyzer capturing broadcast frames", C: "Cable tester", D: "OTDR" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ239", exam: "Original",
    question: "After implementing a new ACL on a router, some critical applications stop working. Which of the following should be done FIRST to restore service?",
    options: { A: "Reboot the router", B: "Remove the ACL and analyze which traffic it is blocking before re-implementing", C: "Replace the router", D: "Contact the application vendor" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ240", exam: "Original",
    question: "A technician is testing fiber optic cable and measures higher than expected attenuation. Which of the following could cause this?",
    options: { A: "Incorrect IP address on the connected device", B: "Dirty connectors, excessive bends, or damaged fiber", C: "Duplex mismatch on the connected switch port", D: "VLAN misconfiguration" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ241", exam: "Original",
    question: "A network administrator needs to verify that a BGP neighbor relationship is established. Which command would show BGP neighbor status?",
    options: { A: "show ip route bgp", B: "show bgp neighbors or show ip bgp summary", C: "debug ip bgp", D: "show ip protocols" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ242", exam: "Original",
    question: "Users on a remote office can no longer access resources at headquarters after a router was replaced. The new router has the same IP address. Which of the following should be verified?",
    options: { A: "DNS resolution at the remote office", B: "Routing protocols are correctly configured and routes to headquarters are present", C: "Physical cable connections at the remote office", D: "DHCP server configuration" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ243", exam: "Original",
    question: "A network technician is asked to troubleshoot a wireless network where clients are connecting successfully but experiencing very slow speeds. Which of the following is the most likely cause?",
    options: { A: "Incorrect security settings on the access point", B: "Channel congestion or interference from overlapping networks", C: "Incorrect SSID broadcast settings", D: "DHCP lease time is too short" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ244", exam: "Original",
    question: "After adding a new VLAN to a switch, devices in the new VLAN cannot reach the internet. Inter-VLAN routing is working correctly. Which of the following should be verified?",
    options: { A: "STP configuration for the new VLAN", B: "A route to the internet exists and the router has a default route or routes for the new VLAN", C: "Physical connections for devices in the new VLAN", D: "DNS server assignment for the new VLAN" },
    answer: "B", tier: "locked", domain: 5
  },
  {
    id: "NQ245", exam: "Original",
    question: "A network technician is troubleshooting a site-to-site VPN that has stopped passing traffic. The VPN tunnel shows as established. Which of the following should be checked?",
    options: { A: "Physical connectivity between sites", B: "Routing and interesting traffic ACLs defining which traffic should be encrypted", C: "DNS resolution at both sites", D: "DHCP server configuration at both sites" },
    answer: "B", tier: "locked", domain: 5
  },] as NetworkQuestion[])
