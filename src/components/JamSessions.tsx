'use client';

import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const mockJamSessions = [
  {
    id: 'jam-1',
    title: 'Funk Fusion Friday',
    date: 'April 19, 2025',
    time: '6:00 PM',
    location: 'Campus Music Room A1',
    host: 'Li Hua',
    genre: 'Jazz / Funk',
  },
  {
    id: 'jam-2',
    title: 'Indie Rock Jam',
    date: 'April 21, 2025',
    time: '8:00 PM',
    location: 'Dorm Lounge B2',
    host: 'Jacob Miller',
    genre: 'Indie Rock',
  },
  {
    id: 'jam-3',
    title: 'Campus Acoustic Circle',
    date: 'April 22, 2025',
    time: '3:00 PM',
    location: 'UH Manoa Lawn',
    genre: 'Acoustic',
    host: 'Li Hua',
  },
];

export default function JamSessions() {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🎶 Upcoming Jam Sessions</h2>
      <Row>
        {mockJamSessions.map((jam) => (
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
                <Button variant="primary">Join Session</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
