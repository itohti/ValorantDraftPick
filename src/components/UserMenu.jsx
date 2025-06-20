import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserMenu({ onOpenAuth, onLogout, onDelete, isLoggedIn }) {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="relative text-white">
      <button onClick={() => setOpen(!open)}>
        <FaUserCircle size={28} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                onOpenAuth();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Sign In / Sign Up
            </button>
          ) : (
            <>
            <p className="px-4 py-2 font-semibold text-white border-b border-gray-700">
                Hello, {user.name}
            </p>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Sign Out
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}