import os
import json
import re
from datetime import datetime

# Path Configuration
LIBRARY_ROOT = "/Users/pw/.gemini/antigravity/Skills Master/.agents/skills"
OUTPUT_PATH = "/Users/pw/Skills Nexus/navigation/Handshake.json"
SCHEMA_PATH = "/Users/pw/Skills Nexus/architecture/GEMINI.md"

def scrape_library():
    """Recursively scan the 1 domain suites and extract metadata."""
    handshake = {
        "timestamp": datetime.now().isoformat(),
        "domains": [],
        "skills": []
    }

    if not os.path.exists(LIBRARY_ROOT):
        print(f"Error: Library root not found at {LIBRARY_ROOT}")
        return

    # Scan Domains
    domains = [d for d in os.listdir(LIBRARY_ROOT) if os.path.isdir(os.path.join(LIBRARY_ROOT, d))]
    
    for domain in domains:
        domain_path = os.path.join(LIBRARY_ROOT, domain)
        domain_info = {
            "name": domain,
            "path": domain_path,
            "skills_count": 0,
            "description": f"The official {domain} domain suite."
        }

        # Look for DOMAIN.md
        domain_md_path = os.path.join(domain_path, "DOMAIN.md")
        if os.path.exists(domain_md_path):
            with open(domain_md_path, 'r') as f:
                content = f.read()
                # Simple extraction for description
                desc_match = re.search(r'# (.*)\n+(.*)', content)
                if desc_match:
                    domain_info["description"] = desc_match.group(2).strip()

        # Scan Skills in this Domain
        skills = [s for s in os.listdir(domain_path) if os.path.isdir(os.path.join(domain_path, s))]
        domain_info["skills_count"] = len(skills)
        
        for skill in skills:
            skill_path = os.path.join(domain_path, skill)
            skill_info = {
                "name": skill,
                "domain": domain,
                "path": skill_path,
                "last_audit": datetime.now().isoformat()
            }
            handshake["skills"].append(skill_info)

        handshake["domains"].append(domain_info)

    # Write output
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(handshake, f, indent=2)
    
    print(f"Handshake.json generated successfully at {OUTPUT_PATH}")
    print(f"Discovered {len(handshake['domains'])} domains and {len(handshake['skills'])} skills.")

if __name__ == "__main__":
    scrape_library()
