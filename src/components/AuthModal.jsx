import { useState } from "react";
import axios from "axios";

export default function AuthModal({ onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    ign: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleAuth = () => {
    if (isRegistering) {
        axios.post("https://sunnycup.izdartohti.org/users", form)
            .then((response) => {
                /* Chain it with a login request now. */
                axios.post("https://sunnycup.izdartohti.org/login", {username: form.username, password: form.password})
                    .then((response) => {
                        onLogin(response.data);
                        localStorage.setItem("user", JSON.stringify(response.data));
                        onClose();
                    })
                    .catch((error) => {
                        console.error("Could not sign you in");
                    })
            })
            .catch((error) => {
                setError(error);
            })
    }
    else {
        axios.post("https://sunnycup.izdartohti.org/login", {username: form.username, password: form.password})
            .then((response) => {
                onLogin(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                onClose();
            })
            .catch((error) => {
                console.error("Could not sign you in");
            })
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isRegistering ? "Create Account" : "Sign In"}
        </h2>

        {/* Additional fields for sign-up */}
        {isRegistering && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-gray-700 border border-gray-600 px-3 py-2 rounded w-full mb-3 text-white placeholder-gray-400"
            />
            <input
              name="ign"
              placeholder="In-Game Name with #"
              value={form.ign}
              onChange={(e) => setForm({ ...form, ign: e.target.value })}
              className="bg-gray-700 border border-gray-600 px-3 py-2 rounded w-full mb-3 text-white placeholder-gray-400"
            />
          </>
        )}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="bg-gray-700 border border-gray-600 px-3 py-2 rounded w-full mb-3 text-white placeholder-gray-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="bg-gray-700 border border-gray-600 px-3 py-2 rounded w-full mb-4 text-white placeholder-gray-400"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleAuth}
          className="bg-blue-600 hover:bg-blue-700 w-full px-4 py-2 rounded mb-2"
        >
          {isRegistering ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-sm text-center">
          {isRegistering ? "Already have an account?" : "Need an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-400 underline"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
