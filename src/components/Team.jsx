import RankBlock from "./RankBlock";
import axios from "axios";
import Button from "../ui/Button";
export default function Team({ team }) {
    const selections = JSON.parse(team.selections);
    
    const shortenName = (name) => {
        if (name.length > 6) {
            return name.substring(0,6) + "...";
        }

        return name;
    }

    const removeTeam = () => {
        axios.delete(`https://sunnycup.izdartohti.org/teams/${team.id}`)
        .then((response) => {
            console.log("sucessfully removed team");
        })
        .catch((error) => {
            console.warn("Could not remove team");
        })
    }

    const shortName = shortenName(team.name);

    return (
        <div className="p-2 group relative">
            <div className="grid grid-cols-6 gap-4 p-2">
                <p className="text-white text-xl p-2">{shortName}</p>
                {selections.length !== 0 && selections.map((teammate, i) => (
                    <RankBlock key={i} rank={teammate.peak_rank} />
                ))}
            </div>

            {/* X button shown only on hover */}
            <Button
                label="✕"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1"
                onClick={removeTeam}
            />

            <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
        </div>
    );
}