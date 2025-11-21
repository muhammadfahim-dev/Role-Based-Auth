import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authSlice";
import { logoutService } from "../services/authService";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutService();
    dispatch(logoutSuccess());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        {user && (
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin" className="hover:text-blue-400">
            Admin Panel
          </Link>
        )}
      </div>

      <div>
        {!user ? (
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
