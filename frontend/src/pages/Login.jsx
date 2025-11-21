import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../redux/authSlice";
import { loginService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const user = await loginService(email, password);
      dispatch(loginSuccess(user));
      nav("/dashboard");
    } catch (err) {
      dispatch(loginFail("Invalid credentials"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="w-80 bg-white p-6 rounded-xl shadow"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Not registered?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
