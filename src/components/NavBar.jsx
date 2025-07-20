import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-6">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? 'underline font-semibold'
            : 'hover:underline'
        }
      >
        Draft Pool
      </NavLink>
      <NavLink
        to="/tournament"
        className={({ isActive }) =>
          isActive
            ? 'underline font-semibold'
            : 'hover:underline'
        }
      >
        Tournament
      </NavLink>
    </nav>
  );
}