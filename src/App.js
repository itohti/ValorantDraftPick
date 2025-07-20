import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./components/PlayerCard";
import Teams from "./components/Teams";
import UserMenu from "./components/UserMenu";
import AuthModal from "./components/AuthModal";
import { useDraft } from "./context/DraftContext";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";
import Loading from "./ui/Loading";

function App() {
  const [draftedSet, setDraftedSet] = useState(new Set());
  const { players, draftState, setPlayers } = useDraft();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const openAuth = () => setAuthModalOpen(true);
  const closeAuth = () => setAuthModalOpen(false);

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

  const getPlayers = () => {
    setLoading(true);
    axios
      .get("https://sunnycup.izdartohti.org/players")
      .then((response) => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Could not fetch playerData", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getPlayers();
  }, []);

  const toggleDraft = (player) => {
    if (draftState?.phase !== "Drafting") return;

    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .post("https://sunnycup.izdartohti.org/draft/pick", player, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Drafted player:", player.name);
      })
      .catch((error) => {
        console.error("Failed to draft player:", error);
      });
  };

  const numberLeft = players.length - draftedSet.size;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {loading && <Loading />}
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
          <div className="flex items-center justify-between text-white mb-4">
            <p className="text-lg font-semibold">
              Players Left: {numberLeft}
            </p>
            <Tooltip text="Refresh">
              <Button
                icon={<img src="/icons/refresh.png" className="w-4 h-4" alt="refresh" />}
                className="p-1"
                onClick={getPlayers}
              />
            </Tooltip>
          </div>
          <div
            className="overflow-y-auto pr-2 custom-scrollbar"
            style={{
              maxHeight: "calc(100vh - 168px)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player, idx) => (
                <PlayerCard
                  key={idx}
                  data={player}
                  toggleDraft={() => toggleDraft(player)}
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
