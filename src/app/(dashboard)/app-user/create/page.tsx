'use client';

import { doCreateUser } from '@/app/actions/app-users';
import { Card } from '@/components/ui/card';
import { useFormState } from 'react-dom';

export default function CreateUser() {
  const [state, formAction, isPending] = useFormState(doCreateUser, { message: '' })
  return (
    <Card title="Create New User">
      <form action={formAction} method="POST" className="max-w-screen-sm">
        <p className='text-red-600'>{state?.message}</p>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="ACCOUNTANT">Accountant</option>
            <option value="SUPER_ADMIN">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          disabled={isPending}
        >
          Create User
        </button>
      </form>
    </Card>
  );
}
