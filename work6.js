const RB = ReactBootstrap;
const { Alert, Card, Button } = ReactBootstrap;

// ใช้ config จาก Firebase: Project Setting
const firebaseConfig = {
  apiKey: "AIzaSyDG2fjGg1WaM902PwKh45-BfnkxUD6dOHI",
  authDomain: "web2567-6533802038.firebaseapp.com",
  projectId: "web2567-6533802038",
  storageBucket: "web2567-6533802038.firebasestorage.app",
  messagingSenderId: "34126215939",
  appId: "1:34126215939:web:fa6b67747d81dcd4e60736",
  measurementId: "G-4SVR88MNG5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Component LoginBox (ปุ่ม Login / Logout)
function LoginBox(props) {
  const u = props.user;
  const app = props.app;

  if (!u) {
    return (
      <div className="text-center mt-3">
        <Button variant="primary" onClick={() => app.google_login()}>
          Login with Google
        </Button>
      </div>
    );
  } else {
    return (
      <div className="text-center mt-3">
        <img
          src={u.photoURL}
          alt="User Avatar"
          className="rounded-circle border mb-2"
          width="100"
          height="100"
        />
        <h5>{u.displayName}</h5>
        <p>{u.email}</p>
        <Button variant="danger" onClick={() => app.google_logout()}>
          Logout
        </Button>
      </div>
    );
  }
}

// Main App Component
class App extends React.Component {
  state = {
    scene: 0,
    user: null, // เก็บข้อมูลผู้ใช้ที่ล็อกอิน
  };

  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({ user: null });
      }
    });
  }

  google_login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  }

  google_logout() {
    if (confirm("Are you sure you want to logout?")) {
      firebase.auth().signOut();
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <Card>
          <Card.Header>
            <Alert variant="info">
              <b>Work6 :</b> Firebase Authentication with Google Login
            </Alert>
          </Card.Header>

          {/* เชื่อมต่อ LoginBox */}
          <LoginBox user={this.state.user} app={this} />

          <Card.Body></Card.Body>
          <Card.Footer>
            <div className="text-center">
              <small>By xxxxxxxxxx-x xxxxxxxxxxxxx xxxxxxxxxxxxxx</small><br />
              <small>College of Computing, Khon Kaen University</small>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

// React 18+ requires `ReactDOM.createRoot()`
const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
