import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import CreateTeam from "./CreateTeam";
import Team from "./Team";
import { useDraft } from "../context/DraftContext";

export default function Teams() {
  const [popup, setPopup] = useState(false);
  const { draftState, teams, setTeams } = useDraft();

  useEffect(() => {
    if (!draftState) return;

    if (draftState.phase === "Drafting") {
      setTeams(draftState.teams);
    } else if (draftState.phase === "Waiting") {
      axios
        .get("https://sunnycup.izdartohti.org/teams")
        .then((response) => {
          setTeams(response.data);
        })
        .catch((error) => {
          console.error("Could not fetch teams with error: ", error);
        });
    }
  }, [draftState]);

  const createPopout = () => {
    setPopup(true);
  };

  const startTournament = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        "https://sunnycup.izdartohti.org/start_draft",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("OH no!", error);
      });
  };

  const stopTournament = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.post("https://sunnycup.izdartohti.org/stop_draft", {}, {headers: {
      Authorization: `Bearer ${user.token}`
    }})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  return (
    <>
      {popup && <CreateTeam setPopup={setPopup} />}
      <div className="text-white">
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        {teams.length !== 0 &&
          teams.map((team) => <Team key={team.id} team={team} />)}

        <div className="p-2">
          {draftState?.phase !== "Drafting" ? (
            <>
              <div className="grid grid-cols-6 gap-4 p-2">
                <Button
                  label="+"
                  onClick={createPopout}
                  className="text-white text-xl col-span-6"
                />
              </div>
              <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
              <Button
                label={"Start Tournament"}
                disabled={teams.length === 0}
                onClick={startTournament}
                className="mt-4 w-full"
              />
            </>
          ) : (
            <Button
              label={"Stop Tournament"}
              onClick={stopTournament}
              className="mt-4 w-full bg-red-600 hover:bg-red-700"
            />
          )}
        </div>
      </div>
    </>
  );
}
