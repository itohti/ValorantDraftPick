import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import DraftPool from "./pages/DraftPool";
import Tournament from "./pages/Tournament";
import UserMenu from "./components/UserMenu";
import AuthModal from "./components/AuthModal";
import axios from "axios";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const deleteAccount = () => {
    axios
      .delete("https://sunnycup.izdartohti.org/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      });
  };

  const openAuth = () => setAuthModalOpen(true);
  const closeAuth = () => setAuthModalOpen(false);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />

        <div className="absolute top-4 right-4 z-50">
          <UserMenu onOpenAuth={openAuth} onLogout={logout} onDelete={deleteAccount} isLoggedIn={!!user}/>
        </div>
        {authModalOpen && <AuthModal onClose={closeAuth} onLogin={setUser} />}

        <Routes>
          <Route path="/" element={<DraftPool />} />
          <Route path="/tournament" element={<Tournament />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
