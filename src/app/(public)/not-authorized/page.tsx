import Link from 'next/link';

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Not Authorized</h1>
        <p className="text-gray-600 mb-6">You do not have permission to access this page.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
