'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';
import UserProfile from './UserProfile';
import InviteModal from './InviteModal';

export default function BrowseMusicians() {
  const [musicians, setMusicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMusicianId, setSelectedMusicianId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMusicians = async () => {
      console.log('🎯 fetchMusicians triggered');

      const { data, error } = await supabase.from('Musicians').select('*');

      console.log('📦 Response from Supabase:', { data, error });

      if (error) {
        console.error('❌ Failed to fetch musicians:', error);
      } else {
        const formatted = data.map((m) => ({
          ...m,
          genres: Array.isArray(m.genres) ? m.genres.join(', ') : m.genres,
        }));
        setMusicians(formatted);
      }

      setLoading(false);
    };

    fetchMusicians();
  }, []);

  const handleInvite = (musicianId: number) => {
    setSelectedMusicianId(musicianId);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">🎼 Browse Musicians</h1>

      {loading ? (
        <p className="text-center">Loading musicians...</p>
      ) : (
        <Row className="g-4">
          {musicians.map((user) => (
            <Col md={6} key={user.id}>
              <UserProfile user={user} onInvite={() => handleInvite(user.id)} />
            </Col>
          ))}
        </Row>
      )}

      {selectedMusicianId !== null && (
        <InviteModal
          show={showModal}
          onHide={() => setShowModal(false)}
          musicianId={selectedMusicianId}
        />
      )}
    </Container>
  );
}
