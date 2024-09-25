import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
import { Card } from '@/components/ui/card';
import { FaEdit } from 'react-icons/fa';

const prisma = new PrismaClient();

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <Card title='Users'>
      <div className="flex justify-between items-center mb-4">
        <Link href="/app-user/create" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
          Create User
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href={`/app-user/edit/${user.id}`}>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <FaEdit className="text-xl" />
                      <span>Edit</span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
