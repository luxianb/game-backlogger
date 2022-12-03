import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchSteamInfo = async () => {
    const res = await fetch("/auth/steam", { method: "GET" });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>login</button>
      </div>
      <div>
        <a href="http://localhost:3001/auth/steam">Fetch Steam Info</a>
        <button onClick={fetchSteamInfo}>Fetch Steam Info</button>
      </div>
    </div>
  );
}

export default App;
