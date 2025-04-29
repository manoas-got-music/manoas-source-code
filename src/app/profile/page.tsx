'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UserProfile from '../../components/UserProfile';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(`/api/profile?email=${session.user.email}`);
      const data = await res.json();
      setProfile(data);
    };

    getProfile();
  }, [session]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Profile</h2>
      {profile ? (
        <UserProfile user={profile} />
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
}
