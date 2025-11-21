import { useState } from "react";
import { registerService } from "../services/authService";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerService(form.name, form.email, form.password, form.role);
    alert("Registered Successfully");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="w-80 bg-white p-6 rounded-xl shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
