import { roleIcons } from "./icon_mapper";
export default function RoleChip({ role }) {
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