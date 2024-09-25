'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/card';
import Link from 'next/link';
import { FcViewDetails } from "react-icons/fc";

export default function Page() {
  const [auditLogs, setAuditLogs] = useState([]); // Store fetched users
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [search, setSearch] = useState(''); // Search input state
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(10); // Number of users per page (default is 10)
  const [totalPages, setTotalPages] = useState(1); // Total pages from API

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `/api/audit-logs?page=${page}&limit=${limit}&search=${search}`
      );
      const result = await response.json();

      if (response.status === 500) {
        setError(result.message);
      }

      // Handle the response data
      const { data, totalPages } = result;
      setAuditLogs(data);
      setTotalPages(totalPages);
    } catch (error) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  const handlePreviousPage = () => {
    // if (page > 1) setPage(page - 1);
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    // if (page < totalPages) setPage(page + 1);
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
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
            value={limit}
            onChange={handleLimitChange}
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
        {!loading && !error && auditLogs?.length > 0 && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Activated At</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs?.map((log: any) => (
                <tr key={log.id}>
                  <td className="border px-4 py-2">{log.user}</td>
                  <td className="border px-4 py-2">{log.plan}</td>
                  <td className="border px-4 py-2">{log.email}</td>
                  <td className="border px-4 py-2">{log.createdAt}</td>
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
  )
}
