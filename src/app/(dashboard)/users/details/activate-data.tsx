'use client';

import { doActivateData } from "@/app/actions/activate-bundle";
import { ProfileDetails } from "@/types/UserTypes";
import { useEffect, useState } from "react";

export function ActivateData({ userId, profileName, user }:
  { userId: number, profileName: string, user: string }) {

  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(profileName);

  const changeProfile = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pr: ProfileDetails | any = profiles.find((p: ProfileDetails) => p.id === Number(event.target.value));
    setProfile(pr?.name);
  };

  const fetchData = async () => {
    setIsLoading(true);

    const profileResponse = await fetch(`/api/profiles`);
    const profileData = await profileResponse.json();
    setProfiles(profileData.data);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    console.log(e.currentTarget);

    try {
      const response = await doActivateData(formData);
      // console.log(response);
      alert(response.message);

    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 dark:bg-gray-800 w-full max-w-md">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="profile" value={profile} />
      <input type="hidden" name="user" value={user} />

      <div className="mb-4">
        <label htmlFor="options" className="block text-gray-700 dark:text-gray-300 mb-2">Choose an option:</label>
        <select
          id="profileId"
          name="profileId"
          className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          onChange={changeProfile}
        >
          <option value="" disabled>Select an option</option>
          {profiles.map((profile: ProfileDetails) => (
            <option key={profile.id} value={profile.id}>{profile.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Activate'}
      </button>
    </form>
  );
}
