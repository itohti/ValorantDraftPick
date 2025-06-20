import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import TextBox from "../ui/TextBox";

export default function CreateTeam({ setPopup }) {
    const [teamName, setTeamName] = useState("");
    const [error, setError] = useState(null);

    const handleCreate = () => {
        let user = JSON.parse(localStorage.getItem("user"));

        if (user !== null) {
            axios.post("https://sunnycup.izdartohti.org/teams", {name: teamName, selections: []}, {headers: {
                Authorization: `Bearer ${user.token}`
            }})
            .then((response) => {
                console.log(response); // create some sort of user feedback that the request went through.
            })
            .catch((error) => {
                setError(error.response.data);
            })
            setPopup(false);
        }
        else {
            setError("You must be signed in to create a team.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg w-80 grid">
                <h2 className="text-xl font-bold mb-4 text-white">Create Team</h2>
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}
