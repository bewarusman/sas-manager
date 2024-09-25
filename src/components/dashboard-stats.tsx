'use client';

import { useEffect, useState } from "react"

export default function DashboardStats() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/dashboard')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold">Total Users</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold">
          {isLoading ? 'loading...' : '1,200'}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold">Active Sessions</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold">
          {isLoading ? 'loading...' : '340'}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold">Revenue</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold">
          {isLoading ? 'loading...' : '$12,000'}
        </p>
      </div>
    </div>
  )
}
