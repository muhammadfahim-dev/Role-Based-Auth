import { useSelector } from "react-redux";

export default function UserDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Welcome {user?.name} (Role: {user?.role})
      </h1>

      <p className="mt-4 text-gray-700">
        This is USER Dashboard. Accessible by USER & ADMIN.
      </p>
    </div>
  );
}
