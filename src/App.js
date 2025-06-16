import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./components/PlayerCard";
import Teams from "./components/Teams";

function App() {
  const [draftedSet, setDraftedSet] = useState(new Set());

  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    axios.get("https://sunnycup.izdartohti.org/players")
      .then((response) => setPlayerData(response.data))
      .catch((error) => {
        console.error("Could not fetch playerData");
      });
  }, [])

  console.log(playerData);

  const toggleDraft = (idx) => {
    setDraftedSet(prev => {
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
      <Teams />
      <h1 className="text-3xl font-bold text-white mb-6">Draft Pool</h1>
      <p className="text-white text-lg font-semibold mb-4">
        Players Left: {numberLeft}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
}

export default App;