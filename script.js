const form = document.getElementById("teamForm");

let latestTeamData = null;

// FORM SUBMIT
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  try {
    // Collect players
    const playerInputs = document.querySelectorAll(".player");
    const players = [];
    
    playerInputs.forEach(input => {
      players.push(input.value);
    });
    
    // Auto team ID
    const teamId = "T" + Date.now().toString().slice(-6);
    
    // Team data
    const teamData = {
      teamId: teamId,
      teamName: document.getElementById("teamName").value,
      captain: document.getElementById("captain").value,
      viceCaptain: document.getElementById("viceCaptain").value,
      mobile: document.getElementById("mobile").value,
      players: players,
      entryFee: 0,
      payment: "unpaid",
      status: "pending",
      createdAt: new Date()
    };
    
    // Save to Firestore
    await db.collection("teams").add(teamData);
    
    // Save for PDF
    latestTeamData = teamData;
    
    // Show success modal
    document.getElementById("successModal").style.display = "flex";
    
    // Reset form
    form.reset();
    
  } catch (error) {
    alert("Error: " + error.message);
  }
});


// CLOSE MODAL
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}


// DOWNLOAD PDF
function downloadPDF() {
  if (latestTeamData) {
    generatePDF(latestTeamData);
  }
}