import { roleIcons } from "./icon_mapper";

const roleColors = {
  Duelist: "bg-red-600",
  Controller: "bg-blue-600",
  Initiator: "bg-green-600",
  Sentinel: "bg-purple-600",
  Fill: "bg-gray-500",
};

export default function RoleChip({ role }) {
  role = role.trim();
  const icon = roleIcons[role];
  const colorClass = roleColors[role] || "bg-gray-700";

  return (
    <div className={`flex items-center ${colorClass} text-white rounded-full px-3 py-1`}>
      {icon && (
        <img
          src={icon}
          alt={role}
          className="h-5 w-5 object-contain mr-2 drop-shadow"
        />
      )}
      <span className="text-sm font-medium">{role}</span>
    </div>
  );
}
