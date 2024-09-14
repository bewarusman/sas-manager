'use state';

import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('Password reset successfully');
      router.push('/login');
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Reset Password</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleResetPassword} className="mt-6">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
