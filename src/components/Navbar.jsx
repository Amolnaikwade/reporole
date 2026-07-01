import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    window.location.href =
      "https://reposense.onrender.com/auth/github?frontendUrl=" +
      window.location.origin;
  };

  useEffect(() => {
    fetch("https://reposense.onrender.com/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-md">
      <h1 className="text-xl font-bold text-purple-400">RepoRole</h1>

      {user ? (
        <div className="flex items-center gap-3">
          <img
            src={user.avatarUrl}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
        </div>
      ) : (
        <button
          onClick={login}
          className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Code2 size={18} />
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;