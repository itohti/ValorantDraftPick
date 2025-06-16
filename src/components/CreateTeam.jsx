import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import TextBox from "../ui/TextBox";

export default function CreateTeam({ setPopup }) {
    const [teamName, setTeamName] = useState("");

    const handleCreate = () => {
        axios.post("https://sunnycup.izdartohti.org/teams", {name: teamName, selections: []})
        .then((response) => {
            console.log(response); // create some sort of user feedback that the request went through.
        })
        .catch((error) => {
            console.error(error);
        })
        setPopup(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg w-80 grid">
                <button
                    onClick={() => setPopup(false)}
                    className="absolute right-2 text-gray-400 hover:text-white text-xl font-bold w-8 flex items-center justify-center rounded"
                >
                    ×
                </button>

                <TextBox
                    name="team"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                />
                <Button label="Create" onClick={handleCreate} />
            </div>
        </div>
    );
}
