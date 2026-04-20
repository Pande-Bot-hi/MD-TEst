import sys

with open(r"c:\Users\ilove\OneDrive\바탕 화면\md-investigation\src\App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

def get_part(start_comment, next_comment):
    s = text.find(start_comment)
    e = text.find(next_comment) if next_comment else len(text)
    if s == -1 or e == -1:
        print(f"Error finding {start_comment} or {next_comment}")
        sys.exit(1)
    return text[s:e]

services_end = text.find("      {/* Procedure Section */}")
services_part = text[:services_end]

procedure_part = get_part("      {/* Procedure Section */}", "      {/* Agents Section */}")
agents_part = get_part("      {/* Agents Section */}", "      {/* Certifications Section */}")
certifications_part = get_part("      {/* Certifications Section */}", "      {/* Clobet On-Site Dominance Section */}")
clobet_part = get_part("      {/* Clobet On-Site Dominance Section */}", "      {/* Philosophy Section */}")
philosophy_part = get_part("      {/* Philosophy Section */}", "      {/* Inquiry Form Section */}")
inquiry_part = text[text.find("      {/* Inquiry Form Section */}"):]

new_text = services_part + certifications_part + agents_part + clobet_part + philosophy_part + procedure_part + inquiry_part

with open(r"c:\Users\ilove\OneDrive\바탕 화면\md-investigation\src\App.tsx", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Replacement done")
