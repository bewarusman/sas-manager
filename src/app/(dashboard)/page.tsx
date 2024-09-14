import UserList from "@/components/user-list";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold">Total Users</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold">1,200</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold">Active Sessions</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold">340</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold">Revenue</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold">$12,000</p>
        </div>
      </div>

      <UserList />
    </>
  );
}