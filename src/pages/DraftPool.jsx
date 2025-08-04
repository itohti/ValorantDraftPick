import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import PlayerFilter from "../components/PlayerFilter";
import Teams from "../components/Teams";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import axios from "axios";
import { useDraft } from "../context/DraftContext";
import Loading from "../ui/Loading";

export default function DraftPool() {
  const [draftedSet, setDraftedSet] = useState(new Set());
  const { players, draftState, setPlayers } = useDraft();
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  let filteredPlayers = [...players];
  if (roleFilter) {
    filteredPlayers = filteredPlayers.filter((p) =>
      p.roles?.split(",").includes(roleFilter)
    );
  }

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
  };

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
    <div className="p-8">
      {loading && <Loading />}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-indigo-900 text-indigo-300 px-4 py-1 rounded-full text-xl font-bold shadow">
          Players Left: {numberLeft}
        </div>
        <Tooltip text="Refresh">
          <Button
            icon={
              <img src="/icons/refresh.png" className="w-4 h-4" alt="refresh" />
            }
            className="p-1"
            onClick={getPlayers}
          />
        </Tooltip>
      </div>
      <PlayerFilter
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <div className="flex gap-8">
        <div
          className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((p, i) => (
              <PlayerCard key={i} data={p} toggleDraft={() => toggleDraft(p)} />
            ))}
          </div>
        </div>
        <div className="w-80 shrink-0">
          <Teams />
        </div>
      </div>
    </div>
  );
}
