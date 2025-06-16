import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import CreateTeam from "./CreateTeam";
import Team from "./Team";
export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [popup, setPopup] = useState(false);
    
    useEffect(() => {
        const fetchTeams = () => {
            axios.get("https://sunnycup.izdartohti.org/teams")
            .then((response) => setTeams(response.data))
            .catch((error) => {
                console.error("Could not fetch teams", error);
            })
        }

        fetchTeams();
        const interval = setInterval(fetchTeams, 5000);

        return () => clearInterval(interval);
    }, [])

    const createPopout = () => {
        setPopup(true);
    }

    const startTournament = () => {
        console.log("start the tournament");
    }

    return (
        <>
            {popup && <CreateTeam setPopup={setPopup} />}
            <div className="absolute right-10">
                {teams.length !== 0 && teams.map((team) => <Team key={team.id} team={team} />)}
                {/* Create a team place holder */}
                <div className="p-2">
                    <div className="grid grid-cols-6 gap-4 p-2">
                        <Button label="+" onClick={createPopout} className="text-white text-xl p-2" />
                    </div>
                    <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
                </div>
                <Button label={"Start Tournament"} onClick={startTournament} className="absolute right-0"/>
            </div>
        </>
    )
}