'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';

interface JamSession {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  genre: string;
  host: string;
}

export default function ListJamSessions() {
  const [sessions, setSessions] = useState<JamSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      const res = await fetch('/api/list-jams');
      const data = await res.json();
      setSessions(data);
      setLoading(false);
    }

    fetchSessions();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🎶 All Jam Sessions</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          Loading...
        </div>
      ) : (
        <Row>
          {sessions.map((jam) => (
            <Col md={6} key={jam.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{jam.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {jam.date}
                    @
                    {jam.time}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong>
                    {jam.location}
                    <br />
                    <strong>Genre:</strong>
                    {jam.genre}
                    <br />
                    <strong>Host:</strong>
                    {jam.host}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
