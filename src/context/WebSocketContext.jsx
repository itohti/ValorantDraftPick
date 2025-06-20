import { createContext, useContext, useEffect, useRef } from "react";
import { useDraft } from "./DraftContext";

const WebSocketContext = createContext();

export function useWebSocket() {
  return useContext(WebSocketContext);
}

export function WebSocketProvider({ children }) {
  const socketRef = useRef(null);

  const { setDraftState, setTeams, setPlayers } = useDraft();

  useEffect(() => {
    socketRef.current = new WebSocket("wss://sunnycup.izdartohti.org/ws");

    socketRef.current.onopen = () => {
      console.log("[WebSocket] Connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "draft_update":
            setDraftState(data.draft_state);
            break;
          case "teams_update":
            setTeams(data.teams);
            break;
          case "player_update":
            setPlayers(data.players);
            break;
          default:
            console.warn("Unknown message type", data);
        }
      } catch (e) {
        console.warn("Non-JSON WebSocket message:", event.data);
      }
    };

    socketRef.current.onclose = () => {
      console.log("[WebSocket] Disconnected");
    };

    socketRef.current.onerror = (e) => {
      console.error("[WebSocket] Error", e);
    };

    return () => socketRef.current?.close();
  }, [setDraftState, setTeams, setPlayers]);

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  );
}
