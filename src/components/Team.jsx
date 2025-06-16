import RankBlock from "./RankBlock";
export default function Team({ team }) {
    const selections = JSON.parse(team.selections);
    
    const shortenName = (name) => {
        if (name.length > 6) {
            return name.substring(0,6) + "...";
        }

        return name;
    }

    const shortName = shortenName(team.name);

    return (
        <div className="p-2">
            <div className="grid grid-cols-6 gap-4 p-2">
                {/* Container for team name and players */}
                <p className="text-white text-xl p-2">{shortName}</p>
                {selections.length !== 0 && selections.map((teammate) => <RankBlock rank={teammate.peak_rank} />)}
            </div>
            <div className="h-1 h-px bg-gradient-to-r from-white/50 to-white/0" />
        </div>
    )
}