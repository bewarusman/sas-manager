'use client';

import { Traffic } from "@/components/traffic";
import { Card } from "@/components/ui/card";
import { UserType } from "@/types/UserTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivateData } from "./activate-data";

export default function UserDetail() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userParam = searchParams.get('user');

    if (userParam) {
      // Parse the serialized user object
      const parsedUser = JSON.parse(userParam);
      setUser(parsedUser);
    }
  }, [searchParams]);


  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
      <div className="flex-1">
        <Card title={"User Details: " + user.username}>


          {/* Basic Info */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Basic Information</h2>
            <ul className="space-y-2">
              <li><strong>Username:</strong> {user.username}</li>
              <li><strong>Expiration Date:</strong> {new Date(user.expiration)?.toLocaleString()}</li>
              <li><strong>Last Online:</strong> {new Date(user.last_online)?.toLocaleString()}</li>
              <li><strong>Enabled:</strong> {user.enabled ? 'Yes' : 'No'}</li>
              <li><strong>Created At:</strong> {new Date(user.created_at)?.toLocaleString()}</li>
            </ul>
          </section>

          {/* Profile Details */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Profile Details</h2>
            <ul className="space-y-2">
              <li><strong>Profile Name:</strong> {user.profile_details?.name || 'N/A'}</li>
              <li><strong>Profile Type:</strong> {user.profile_details?.type === 0 ? 'Type 0' : 'Other'}</li>
            </ul>
          </section>

          {/* Status Info */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Status Information</h2>
            <ul className="space-y-2">
              <li><strong>Status:</strong> {user.status?.status ? 'Active' : 'Inactive'}</li>
              <li><strong>Traffic:</strong> {user.status?.traffic ? 'Yes' : 'No'}</li>
              <li><strong>Expiration:</strong> {user.status?.expiration ? 'Expired' : 'Valid'}</li>
              <li><strong>Uptime:</strong> {user.status?.uptime ? 'Yes' : 'No'}</li>
            </ul>
          </section>

          {/* Daily Traffic */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Daily Traffic</h2>
            <ul>
              <li><strong>User ID:</strong> {user.daily_traffic_details?.user_id}</li>
              <li><strong>Traffic: </strong>
                <Traffic daily_traffic_details={user.daily_traffic_details} />
              </li>
            </ul>
          </section>
        </Card>
      </div>

      <div className="flex-1">
        <Card title="Activate Internet">
          <ActivateData
            userId={user.id}
            user={user.username}
            profileName={user.profile_details?.name}
          />
        </Card>
      </div>
    </div>

  );
}
