import { rankIcons } from "./icon_mapper";
export default function RankBlock({ label, rank }) {
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