/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import React from 'react';

export interface UserProfileProps {
  user: {
    id?: string;
    name: string;
    image?: string;
    instrument?: string;
    genres?: string; //
    description?: string;
    owner?: string;
    youtube?: string;
    soundcloud?: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => (
  // eslint-disable-next-line react/jsx-no-comment-textnodes
  <div className="max-w-3xl mx-auto px-4 py-4 border rounded shadow-sm bg-white space-y-4">
    <div className="flex items-center gap-6">

      <img
        src={user.image || '/test.png'}
        alt={`${user.name}'s profile`}
        className="rounded-circle border"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        {user.instrument && <p className="text-muted">{user.instrument}</p>}
        {user.description && <p className="mt-2">{user.description}</p>}
        <button
          type="button"
          // eslint-disable-next-line no-alert
          onClick={() => alert(`Invite sent to ${user.name} to join your jam session!`)}
          className="btn btn-outline-success btn-sm mt-2"
        >
          Invite to Jam
        </button>
      </div>
    </div>

    {typeof user.genres === 'string' && (
    <div>
      <h2 className="fw-semibold mb-2">Genres</h2>
      <div className="d-flex flex-wrap gap-2">
        {user.genres.split(',').map((genre) => (
          <span key={genre.trim()} className="badge bg-primary bg-opacity-25 text-primary">
            {genre.trim()}
          </span>
        ))}
      </div>
    </div>
    )}

    {user.owner && (
      <div>
        <h2 className="fw-semibold mb-2">Musical Goals</h2>
        <p>{user.owner}</p>
      </div>
    )}

    {(user.youtube || user.soundcloud) && (
      <div>
        <h2 className="fw-semibold mb-2">Media Links</h2>
        <ul className="list-unstyled">
          {user.youtube && (
            <li>
              <a href={user.youtube} target="_blank" rel="noopener noreferrer">
                🎥 YouTube
              </a>
            </li>
          )}
          {user.soundcloud && (
            <li>
              <a href={user.soundcloud} target="_blank" rel="noopener noreferrer">
                🎵 SoundCloud
              </a>
            </li>
          )}
        </ul>
      </div>
    )}
  </div>
);

export default UserProfile;
