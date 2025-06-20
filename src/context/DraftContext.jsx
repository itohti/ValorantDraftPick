import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useWebSocket } from "./WebSocketContext";

export const DraftContext = createContext();

export function useDraft() {
  return useContext(DraftContext);
}

export function DraftProvider({ children }) {
  const [draftState, setDraftState] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("https://sunnycup.izdartohti.org/draft")
    .then((response) => setDraftState(response.data))
    .catch((error) => {
        console.error("Could not get draft state from the backend", error);
    })
  }, []);

  return (
    <DraftContext.Provider
      value={{ draftState, setDraftState, teams, setTeams, players, setPlayers }}
    >
        {children}
    </DraftContext.Provider>
  );
}