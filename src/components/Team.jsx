import RankBlock from "./RankBlock";
import axios from "axios";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import { useDraft } from "../context/DraftContext";
export default function Team({ team }) {
    const selections = JSON.parse(team.selections);
    const { draftState } = useDraft();

    const isCurrentTurn = draftState?.teams[draftState.current_turn]?.name === team?.name;
    
    const shortenName = (name) => {
        if (name.length > 6) {
            return name.substring(0,6) + "...";
        }

        return name;
    }

    const removeTeam = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        axios.delete(`https://sunnycup.izdartohti.org/teams/${team.id}`, {headers: {
            Authorization: `Bearer ${user.token}`
        }})
        .then((response) => {
            console.log("sucessfully removed team");
        })
        .catch((error) => {
            console.warn("Could not remove team", error); // TODO: Look to give user feedback if they cannot remove the team.
        })
    }

    const shortName = shortenName(team.name);

    return (
        <div className="relative group flex">
            {/* Gold vertical bar if it's this team's turn */}
            {isCurrentTurn && (
                <div className="w-2 bg-yellow-400" />
            )}

            {/* Main card content */}
            <div>
                <div className="grid grid-cols-6 gap-4 p-2">
                    <Tooltip text={team.name}>
                        <p className="text-white text-xl p-2">{shortName}</p>
                    </Tooltip>
                    {selections.length !== 0 && selections.map((teammate, i) => (
                        <Tooltip key={i} text={teammate.name}>
                            <RankBlock rank={teammate.peak_rank} />
                        </Tooltip>
                    ))}
                </div>

                {/* Remove Button */}
                <Button
                    label="✕"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1"
                    onClick={removeTeam}
                />

                <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
            </div>
        </div>
    );
}