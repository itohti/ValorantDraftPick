export default function PlayerFilter({ roleFilter, setRoleFilter }) {
  const roles = ["Duelist", "Controller", "Initiator", "Sentinel", "Fill"];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Role Filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="bg-gray-700 text-white px-3 py-1 rounded-md"
      >
        <option value="">All Roles</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}