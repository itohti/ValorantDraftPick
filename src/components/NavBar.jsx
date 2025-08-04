import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-6">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? 'bg-indigo-600 text-white px-3 py-1 rounded-md font-semibold transition'
            : 'hover:underline px-3 py-1 transition'
        }
      >
        Draft Pool
      </NavLink>
      <NavLink
        to="/tournament"
        className={({ isActive }) =>
          isActive
            ? 'bg-indigo-600 text-white px-3 py-1 rounded-md font-semibold transition'
            : 'hover:underline px-3 py-1 transition'
        }
      >
        Tournament
      </NavLink>
    </nav>
  );
}