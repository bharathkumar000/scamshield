# ScamShield API Integration Guide

To make the detection engine fully functional with real data, you can integrate several free or freemium cybersecurity APIs. Below is a guide on where to get your API keys.

## 1. URL Scanning (DETECTION_ENGINE_API_KEY)

### **urlscan.io (Recommended)**
Provides deep analysis of URLs, including screenshots and DOM analysis.
1.  Visit [urlscan.io](https://urlscan.io/user/signup/).
2.  Create a free account.
3.  Go to your **Settings > API Keys** to generate a key.
4.  Add it to `.env` as `DETECTION_ENGINE_API_KEY`.

### **VirusTotal**
The industry standard for multi-engine URL and file analysis.
1.  Sign up at [VirusTotal](https://www.virustotal.com/gui/join-us).
2.  Once logged in, click on your profile icon and select **API Key**.
3.  Note: The public API has a limit of 4 requests per minute.

---

## 2. Threat Intelligence (THREAT_INTELLIGENCE_API_KEY)

### **AbuseIPDB**
Great for checking IP reputations and reported malicious activity.
1.  Register at [AbuseIPDB](https://www.abuseipdb.com/register).
2.  Verify your email.
3.  Go to **API** in the dashboard to generate your key.
4.  Add it to `.env` as `THREAT_INTELLIGENCE_API_KEY`.

### **AlienVault OTX**
One of the largest open-source threat intelligence communities.
1.  Sign up at [AlienVault OTX](https://otx.alienvault.com/).
2.  Go to your **Settings** or **API** page to find your OTX Key.

---

## 3. Free APIs (No Key Required)

These are great for testing and can be integrated without any configuration:
- **URLhaus**: Track malicious URLs ([API Docs](https://urlhaus.abuse.ch/api/)).
- **ThreatFox**: Indicators of Compromise ([API Docs](https://threatfox.abuse.ch/api/)).
- **InternetDB (Shodan)**: Fast IP port/vuln data ([API Docs](https://internetdb.shodan.io/)).

## Implementation Hint
Once you have the keys, you can use the `fetch` API in a Next.js **Server Action** or an **API Route** to keep your keys secure (not exposed to the browser).
