const firebaseConfig = {
  apiKey: "AIzaSyCaPQVzTFmm6BHEdSSYMx4b38M7M72v_qE",
  authDomain: "kpl-cricket-league.firebaseapp.com",
  projectId: "kpl-cricket-league",
  storageBucket: "kpl-cricket-league.firebasestorage.app",
  messagingSenderId: "953037130822",
  appId: "1:953037130822:web:96dc8914d34dbabd2bce47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const db = firebase.firestore();
const auth = firebase.auth();