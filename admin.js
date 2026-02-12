let allTeams = [];

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "admin-dashboard.html";
    })
    .catch(err => alert(err.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => {
    window.location.href = "admin-login.html";
  });
}

// LOAD TEAMS
async function loadTeams() {
  const snapshot = await db.collection("teams").get();
  allTeams = [];
  
  snapshot.forEach(doc => {
    const team = doc.data();
    team.docId = doc.id;
    allTeams.push(team);
  });
  
  updateStats();
  displayTeams(allTeams);
}

// UPDATE DASHBOARD STATS
function updateStats() {
  document.getElementById("totalTeams").innerText = allTeams.length;
  
  const paidTeams = allTeams.filter(t => t.payment === "paid");
  document.getElementById("paidTeams").innerText = paidTeams.length;
  
  document.getElementById("pendingTeams").innerText =
    allTeams.filter(t => t.status === "pending").length;
  
  // Calculate total collected amount
  let totalAmount = 0;
  paidTeams.forEach(team => {
    totalAmount += Number(team.entryFee || 0);
  });
  
  document.getElementById("totalAmount").innerText = "₹" + totalAmount;
}
// DISPLAY TEAM CARDS
function displayTeams(teams) {
  const teamList = document.getElementById("teamList");
  teamList.innerHTML = "";
  
  teams.forEach(team => {
    const div = document.createElement("div");
    div.className = "team-card";
    
    div.innerHTML = `
      <b>${team.teamName}</b> (${team.teamId})<br>
      Captain: ${team.captain}<br>
      Entry Fee: ₹${team.entryFee || 0}<br>
      Payment: ${team.payment}<br>
      Status: ${team.status}<br><br>

      <button onclick="viewProfile('${team.docId}')">Profile</button>
      <button onclick="editTeam('${team.docId}', '${team.entryFee || 0}')">Edit Fee</button>
      <button onclick="approveTeam('${team.docId}')">Approve</button>
      <button onclick="rejectTeam('${team.docId}')">Reject</button>
      <button onclick="deleteTeam('${team.docId}')">Delete</button>
    `;
    
    teamList.appendChild(div);
  });
}

// APPROVE TEAM
function approveTeam(id) {
  db.collection("teams").doc(id).update({
    status: "approved"
  }).then(loadTeams);
}

// REJECT TEAM
function rejectTeam(id) {
  db.collection("teams").doc(id).update({
    status: "rejected"
  }).then(loadTeams);
}

// DELETE TEAM
function deleteTeam(id) {
  if (confirm("Delete this team?")) {
    db.collection("teams").doc(id).delete().then(loadTeams);
  }
}

// EDIT ENTRY FEE (AUTO PAYMENT STATUS)
function editTeam(id, currentFee) {
  const newFee = prompt("Enter entry fee:", currentFee);
  
  if (newFee !== null) {
    const feeValue = Number(newFee);
    
    db.collection("teams").doc(id).update({
      entryFee: feeValue,
      payment: feeValue > 0 ? "paid" : "unpaid"
    }).then(loadTeams);
  }
}

// SEARCH FUNCTION
function searchTeam() {
  const text = document.getElementById("search").value.toLowerCase();
  
  const filtered = allTeams.filter(team =>
    team.teamName.toLowerCase().includes(text) ||
    team.teamId.toLowerCase().includes(text)
  );
  
  displayTeams(filtered);
}

// VIEW PROFILE PAGE
function viewProfile(id) {
  window.location.href = "team-profile.html?id=" + id;
}

// EXPORT CSV
function exportCSV() {
  let csv = "Team ID,Team Name,Captain,Mobile,Entry Fee,Payment,Status\n";
  
  allTeams.forEach(t => {
    csv += `${t.teamId},${t.teamName},${t.captain},${t.mobile},${t.entryFee || 0},${t.payment},${t.status}\n`;
  });
  
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "teams.csv";
  a.click();
}

// AUTH CHECK
if (document.getElementById("teamList")) {
  auth.onAuthStateChanged(user => {
    if (user) {
      loadTeams();
    } else {
      window.location.href = "admin-login.html";
    }
  });
}