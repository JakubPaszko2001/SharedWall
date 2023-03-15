import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Photos from "./components/Photos";
import { auth } from "./config/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      {currentUser && <Photos currentUser={currentUser} />}
    </div>
  );
}

export default App;
