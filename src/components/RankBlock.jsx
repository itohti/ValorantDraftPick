import { rankIcons } from "./icon_mapper";
export default function RankBlock({ label, rank }) {
  const icon = rankIcons[rank];

  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-full">
      <span className="text-xs text-gray-400 mb-1">{label}</span>
      {icon ? (
        <img
          src={icon}
          alt={rank}
          className="w-full h-full max-h-12 object-contain drop-shadow-md"
        />
      ) : (
        <span className="text-sm">{rank}</span>
      )}
    </div>
  );
}