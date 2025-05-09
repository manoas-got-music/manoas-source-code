'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import JoinJamSession from '@/components/JoinJamSession';
import { supabase } from '../lib/supabaseClient';

export default function JamSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      // 获取当前用户
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not logged in');
        setSessions([]);
        setLoading(false);
        return;
      }

      const userId = user.id;

      // 查询公开或用户被邀请的 jam session
      const { data, error } = await supabase
        .from('JamSession')
        .select('*')
        .or(`isPublic.eq.true,musicians.cs.{${userId}}`)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error loading sessions:', error.message);
      } else {
        setSessions(data);
      }

      setLoading(false);
    };

    fetchSessions();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🎶 Upcoming Jam Sessions</h2>
      <Row>
        {loading && (
          <p className="text-center">Loading...</p>
        )}

        {!loading && sessions.length === 0 && (
          <p className="text-center">No sessions found.</p>
        )}

        {!loading && sessions.length > 0 && (
          sessions.map((jam) => (
            <Col md={6} key={jam.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{jam.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {jam.date}
                    @
                    {jam.startTime}
                    -
                    {jam.endTime}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong>
                    {jam.location}
                    <br />
                    <strong>Genre:</strong>
                    {jam.genre}
                    <br />
                    <strong>Host:</strong>
                    {jam.organizer}
                    <br />
                    <strong>Description:</strong>
                    {jam.description}
                  </Card.Text>
                  <JoinJamSession jamSession={jam} />
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
