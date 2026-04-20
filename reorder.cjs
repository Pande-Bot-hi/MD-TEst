const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
const text = fs.readFileSync(filePath, 'utf8');

function getPart(startComment, nextComment) {
    const s = text.indexOf(startComment);
    const e = nextComment ? text.indexOf(nextComment) : text.length;
    if (s === -1 || e === -1) {
        console.error(`Error finding ${startComment} or ${nextComment}`);
        process.exit(1);
    }
    return text.substring(s, e);
}

const servicesEnd = text.indexOf("      {/* Procedure Section */}");
const servicesPart = text.substring(0, servicesEnd);

const procedurePart = getPart("      {/* Procedure Section */}", "      {/* Agents Section */}");
const agentsPart = getPart("      {/* Agents Section */}", "      {/* Certifications Section */}");
const certificationsPart = getPart("      {/* Certifications Section */}", "      {/* Clobet On-Site Dominance Section */}");
const clobetPart = getPart("      {/* Clobet On-Site Dominance Section */}", "      {/* Philosophy Section */}");
const philosophyPart = getPart("      {/* Philosophy Section */}", "      {/* Inquiry Form Section */}");
const inquiryPart = text.substring(text.indexOf("      {/* Inquiry Form Section */}"));

const newText = servicesPart + certificationsPart + agentsPart + clobetPart + philosophyPart + procedurePart + inquiryPart;

fs.writeFileSync(filePath, newText, 'utf8');
console.log("Replacement done");
