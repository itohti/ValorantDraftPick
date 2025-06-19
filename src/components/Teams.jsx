import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "../ui/Button";
import CreateTeam from "./CreateTeam";
import Team from "./Team";
export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [popup, setPopup] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("wss://sunnycup.izdartohti.org/ws");
    // first fetch for intitial load
    axios
      .get("https://sunnycup.izdartohti.org/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Could not fetch teams with error: ", error);
      });

    socketRef.current.onopen = () => {
      console.log("websocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const message = event.data;
      try {
        const data = JSON.parse(message);

        if (data.type === "teams_update") {
          setTeams(data.teams);
        }
      } catch {
        console.warn("Received non-JSON message", message);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const createPopout = () => {
    setPopup(true);
  };

  const startTournament = () => {
    console.log("start the tournament");
  };

  return (
    <>
      {popup && <CreateTeam setPopup={setPopup} />}
      <div className="text-white">
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        {teams.length !== 0 &&
          teams.map((team) => <Team key={team.id} team={team} />)}

        {/* Create a team placeholder */}
        <div className="p-2">
          <div className="grid grid-cols-6 gap-4 p-2">
            <Button
              label="+"
              onClick={createPopout}
              className="text-white text-xl col-span-6"
            />
          </div>
          <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
        </div>

        <Button
          label={"Start Tournament"}
          onClick={startTournament}
          className="mt-4 w-full"
        />
      </div>
    </>
  );
}
