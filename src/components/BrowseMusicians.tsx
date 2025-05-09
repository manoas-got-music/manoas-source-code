'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';

import UserProfile from './UserProfile';

export default function BrowseMusicians() {
  const [musicians, setMusicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicians = async () => {
      const { data, error } = await supabase.from('musicians').select('*');
      if (error) {
        console.error('Failed to fetch musicians:', error);
      } else {
        // 如果 genres 是数组，就转换为 string
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

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">🎼 Browse Musicians</h1>
      {loading ? (
        <p className="text-center">Loading musicians...</p>
      ) : (
        <Row className="g-4">
          {musicians.map((user) => (
            <Col md={6} key={user.id}>
              <UserProfile user={user} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
