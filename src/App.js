import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./components/PlayerCard";
import Teams from "./components/Teams";
import UserMenu from "./components/UserMenu";
import AuthModal from "./components/AuthModal";

function App() {
  const [draftedSet, setDraftedSet] = useState(new Set());

  const [playerData, setPlayerData] = useState([]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const openAuth = () => setAuthModalOpen(true);
  const closeAuth = () => setAuthModalOpen(false);
  const logout = () => setUser(null);
  const deleteAccount = () => {
    axios
      .delete("https://sunnycup.izdartohti.org/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => setUser(null));
  };

  useEffect(() => {
    axios
      .get("https://sunnycup.izdartohti.org/players")
      .then((response) => setPlayerData(response.data))
      .catch((error) => {
        console.error("Could not fetch playerData");
      });
  }, []);

  console.log(playerData);

  const toggleDraft = (idx) => {
    setDraftedSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const numberLeft = playerData.length - draftedSet.size;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* User Menu */}
      <div className="absolute top-4 right-4 z-50">
        <UserMenu
          onOpenAuth={openAuth}
          onLogout={logout}
          onDelete={deleteAccount}
          isLoggedIn={!!user}
        />
      </div>

      {authModalOpen && <AuthModal onClose={closeAuth} onLogin={setUser} />}

      {/* Main Content Layout */}
      <div className="flex gap-8">
        {/* Main Draft Pool */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-6">Draft Pool</h1>
          <p className="text-white text-lg font-semibold mb-4">
            Players Left: {numberLeft}
          </p>

          <div
            className="overflow-y-auto pr-2 custom-scrollbar"
            style={{
              maxHeight: "calc(100vh - 168px)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {playerData.map((player, idx) => (
                <PlayerCard
                  key={idx}
                  data={player}
                  drafted={draftedSet.has(idx)}
                  toggleDraft={() => toggleDraft(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Teams */}
        <div className="w-80 shrink-0">
          <Teams />
        </div>
      </div>
    </div>
  );
}

export default App;
