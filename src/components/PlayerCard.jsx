import Tooltip from "../ui/Tooltip";
import RankBlock from "./RankBlock";
import RoleChip from "./RoleChip";

export default function PlayerCard({ data, toggleDraft }) {
  const roles = data.roles ? data.roles.split(",") : [];
  const drafted = data?.drafted;

  return (
    <div
      className={`relative bg-gray-800 text-white rounded-2xl p-6 shadow-lg cursor-pointer transition transform hover:scale-[1.02] ${
        drafted ? "opacity-40 grayscale" : ""
      }`}
      onClick={toggleDraft}
    >
      {drafted && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl">
          <span className="text-white text-xl font-bold">Drafted</span>
        </div>
      )}
      {/* header */}
      <h2 className="text-3xl font-bold tracking-tight mb-2">{data.name}</h2>
      <p className="text-xs text-gray-400 mb-5">IGN: {data.ign}</p>

      {/* ranks */}
      <div className="flex justify-between items-center mb-5">
        <Tooltip text={data.peak_rank}>
          <RankBlock label="Peak Rank" rank={data.peak_rank} />
        </Tooltip>
        <Tooltip text={data.current_rank}>
          <RankBlock label="Current Rank" rank={data.current_rank} />
        </Tooltip>
      </div>

      {/* roles */}
      {roles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-1">
            Role&nbsp;Preferences
          </h3>
          <div className="flex flex-wrap gap-3">
            {roles.map((role) => (
              <RoleChip key={role} role={role} />
            ))}
          </div>
        </div>
      )}

      {/* teammate prefs */}
      <div className="mt-auto">
        <h3 className="text-xs font-semibold text-gray-400 mb-1">
          Teammate Preferences
        </h3>
        <p className="text-sm text-gray-300 mb-1">{data.teammate_preferences}</p>
      </div>
    </div>
  );
}