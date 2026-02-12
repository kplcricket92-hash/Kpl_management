const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function loadProfile() {
  if (!id) {
    document.getElementById("profile").innerHTML = "Invalid team ID";
    return;
  }
  
  try {
    const docRef = db.collection("teams").doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      document.getElementById("profile").innerHTML = "Team not found";
      return;
    }
    
    const team = docSnap.data();
    const div = document.getElementById("profile");
    
    let playersHTML = "<ul>";
    team.players.forEach((p, i) => {
      playersHTML += `<li>Player ${i + 1}: ${p}</li>`;
    });
    playersHTML += "</ul>";
    
    div.innerHTML = `
      <p><b>Team ID:</b> ${team.teamId}</p>
      <p><b>Team Name:</b> ${team.teamName}</p>
      <p><b>Captain:</b> ${team.captain}</p>
      <p><b>Vice Captain:</b> ${team.viceCaptain}</p>
      <p><b>Mobile:</b> ${team.mobile}</p>
      <p><b>Entry Fee:</b> ₹${team.entryFee || 0}</p>
      <p><b>Payment Status:</b> ${team.payment}</p>
      <p><b>Approval Status:</b> ${team.status}</p>

      <h3>Players</h3>
      ${playersHTML}
    `;
  } catch (err) {
    document.getElementById("profile").innerHTML =
      "Error loading profile: " + err.message;
  }
}

function goBack() {
  window.location.href = "admin-dashboard.html";
}

loadProfile();