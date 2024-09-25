'use client';

import { doUpdateSettings } from '@/app/actions/update-settings';
import { Card } from '@/components/ui/card'
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

const prisma = new PrismaClient();

export default function Page() {
  const [state, formAction, loading] = useFormState(doUpdateSettings, { message: '' });
  const [formData, setFormData] = useState({ base_url: '', username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    // setApiLoading(true);
    const response = await fetch('/api/settings')
    const result = await response.json();
    const base_url = result?.find(s => s.key === "NEXT_PUBLIC_API_BASE_URL")?.value;
    const username = result?.find(s => s.key === "NEXT_PUBLIC_API_USERNAME")?.value;
    const password = result?.find(s => s.key === "NEXT_PUBLIC_API_PASSWORD")?.value;
    setFormData({
      username: username ? username : '',
      password: password ? password : '',
      base_url: base_url ? base_url : '',
    })
    // setApiLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <Card title="Settings">
      <div className="max-w-md w-full p-6">
        {state.message && (
          <div className="mb-4 text-center text-red-500">{state.message}</div>
        )}
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="base_url"
              className="block text-gray-700 font-medium mb-2"
            >
              BASE URL
            </label>
            <input
              type="text"
              id="base_url"
              name="base_url"
              value={formData.base_url}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <button
              type="submit"

              className={`w-full px-4 py-2 text-white rounded-md ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </Card>
  )
}
