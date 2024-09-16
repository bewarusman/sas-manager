'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { UserStatus } from './user-status';
import { Traffic } from './traffic';
import Link from 'next/link';
import { FcViewDetails } from "react-icons/fc";

export default function UserList() {
  const [users, setUsers] = useState([]); // Store fetched users
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [search, setSearch] = useState(''); // Search input state
  const [page, setPage] = useState(1); // Current page
  const [count, setCount] = useState(10); // Number of users per page (default is 10)
  const [totalPages, setTotalPages] = useState(1); // Total pages from API

  // Function to fetch users from the new API route
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `/api/users?page=${page}&count=${count}&search=${search}`
      );
      const data = await response.json();

      if (response.status === 500) {
        setError(data.message);
      }

      // Handle the response data
      const { data: usersData, current_page, last_page } = data;

      console.log('users-data', usersData);

      setUsers(usersData); // Set the users data
      setPage(current_page); // Update the current page
      setTotalPages(last_page); // Update total pages based on API response
    } catch (error) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users whenever the page, count, or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, count, search]);

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 when searching
    fetchUsers();
  };

  // Handle count change (items per page)
  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(parseInt(e.target.value));
    setPage(1); // Reset to page 1 when count changes
  };

  return (
    <Card title="Users">
      <div className="overflow-x-auto max-w-full">
        <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 mb-4 sm:mb-0 sm:mr-4 flex-grow"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4 sm:mb-0"
          >
            Search
          </button>

          {/* Drop-down for changing count */}
          <select
            value={count}
            onChange={handleCountChange}
            className="px-4 py-2 border rounded bg-white flex-grow sm:flex-none"
          >
            <option value={10}>10 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </form>


        {/* User List */}
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && users?.length > 0 && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className='px-4 py-2'>Status</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Expiration</th>
                <th className="px-4 py-2">Traffic</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">
                    <UserStatus status={user.status} />
                  </td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.profile_details?.name}</td>
                  <td className="border px-4 py-2">{user.expiration}</td>
                  <td className="border px-4 py-2">
                    <Traffic daily_traffic_details={user.daily_traffic_details} />
                  </td>
                  <td className="border px-4 py-2">
                    <Link href={{
                      pathname: "/users/details",
                      query: { user: JSON.stringify(user) }
                    }}>
                      <div className="flex items-center space-x-2">
                        <FcViewDetails className="text-2xl" />
                        <span>Show</span>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </Card>
    // <div className="mt-6 bg-white shadow-md rounded-lg p-6">
    //   <h1 className="text-3xl font-bold mb-6">Users</h1>

    //   {/* Search Form */}

    // </div>
  )
}

