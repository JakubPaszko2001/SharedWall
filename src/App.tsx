import React, { useEffect, useState } from "react";
import "./App.css";
import AddPhoto from "./components/AddPhoto";
import Navbar from "./components/Navbar";
import { auth } from "./config/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      {currentUser && <AddPhoto currentUser={currentUser} />}
    </div>
  );
}

export default App;
