const rankIcons = {
    Iron: '/ranks/iron.webp',
    Bronze: '/ranks/bronze.webp',
    Silver: '/ranks/silver.webp',
    Gold: '/ranks/gold.webp',
    Plat: '/ranks/plat.webp',
    Diamond: '/ranks/diamond.webp',
    Ascendant: '/ranks/ascendent.webp',
    Immortal: '/ranks/immortal.webp',
    Radiant: '/ranks/radiant.webp'
}

const roleIcons = {
    Controller: '/roles/controller.webp',
    Duelist: '/roles/duelist.webp',
    Initiator: '/roles/initiator.webp',
    Sentinel: '/roles/sentinel.webp'
}


export default function PlayerCard({ data, drafted, toggleDraft }) {
  const roles = data.roles ? data.roles.split(",") : [];

  return (
    <div
      className={`relative bg-gray-800 text-white rounded-2xl p-4 shadow-lg cursor-pointer transition transform hover:scale-[1.02] ${
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
      <h2 className="text-2xl font-semibold mb-1">{data.name}</h2>
      <p className="text-sm text-gray-400 mb-4">IGN: {data.ign}</p>

      {/* ranks */}
      <div className="flex justify-between mb-4">
        <RankBlock label="Peak Rank" rank={data.peak_rank} />
        <RankBlock label="Current Rank" rank={data.current_rank} />
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
        <h3 className="text-sm font-medium text-gray-300 mb-1">
          Teammate&nbsp;Preferences
        </h3>
        <p>{data.teammate_preferences}</p>
      </div>
    </div>
  );
}

function RankBlock({ label, rank }) {
  const icon = rankIcons[rank];
  return (
    <div className="flex flex-col items-center text-center w-1/2">
      <span className="text-xs text-gray-400 mb-1">{label}</span>
      {icon ? (
        <img
          src={icon}
          alt={rank}
          className="h-12 w-auto object-contain drop-shadow-md"
        />
      ) : (
        <span className="text-sm">{rank}</span>
      )}
    </div>
  );
}

function RoleChip({ role }) {
  role = role.trim();
  const icon = roleIcons[role];
  return (
    <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
      {icon && (
        <img
          src={icon}
          alt={role}
          className="h-5 w-5 object-contain mr-2 drop-shadow"
        />
      )}
      <span className="text-sm">{role}</span>
    </div>
  );
}