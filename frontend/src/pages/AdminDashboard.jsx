import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      <p className="mt-4 text-gray-700">Only ADMIN can access this page.</p>

      <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Delete User (ADMIN Only)
      </button>
    </div>
  );
}
