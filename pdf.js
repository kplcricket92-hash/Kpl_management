// Reserved for future advanced PDF features

function generatePDF(team) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // League Details (EDIT THESE)
  const leagueName = "KPL Cricket League 2026";
  const leagueAddress = "Bhitauli Bazar, Maharajganj 273302";
  const leagueMobile = "+91 9876543210";
  
  // Header
  doc.setFontSize(18);
  doc.text(leagueName, 105, 15, null, null, "center");
  
  doc.setFontSize(11);
  doc.text(leagueAddress, 105, 22, null, null, "center");
  doc.text("Contact: " + leagueMobile, 105, 28, null, null, "center");
  
  // Title
  doc.setFontSize(16);
  doc.text("Team Registration Form", 105, 40, null, null, "center");
  
  // Line
  doc.line(15, 45, 195, 45);
  
  // Team Info
  doc.setFontSize(12);
  
  let y = 55;
  
  doc.text("Team ID: " + team.teamId, 20, y);
  y += 8;
  doc.text("Team Name: " + team.teamName, 20, y);
  y += 8;
  doc.text("Captain: " + team.captain, 20, y);
  y += 8;
  doc.text("Vice Captain: " + team.viceCaptain, 20, y);
  y += 8;
  doc.text("Mobile: " + team.mobile, 20, y);
  
  // Players Section
  y += 12;
  doc.setFontSize(14);
  doc.text("Player List", 20, y);
  
  y += 8;
  doc.setFontSize(12);
  
  team.players.forEach((player, index) => {
    doc.text(`${index + 1}. ${player}`, 25, y);
    y += 7;
  });
  
  // Terms & Conditions
  y += 10;
  doc.setFontSize(14);
  doc.text("Terms & Conditions", 20, y);
  
  y += 8;
  doc.setFontSize(10);
  
  const terms = [
    "1. All players must follow the rules of the league.",
    "2. Entry fee once paid is non-refundable.",
    "3. Match schedule will be decided by the organizers.",
    "4. Any misconduct may lead to team disqualification.",
    "5. The organizer's decision will be final in disputes."
  ];
  
  terms.forEach(term => {
    doc.text(term, 20, y);
    y += 6;
  });
  
  // Signature Section
  y += 15;
  doc.line(20, y, 80, y);
  doc.text("Captain Signature", 20, y + 5);
  
  doc.line(130, y, 190, y);
  doc.text("Organizer Signature", 130, y + 5);
  
  // Save PDF
  doc.save(team.teamName + "_Registration.pdf");
}