'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@/styles/landing.css';
import { MusicNoteBeamed, People, CalendarCheck } from 'react-bootstrap-icons';

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="landing-hero">
      <Container className="text-center">
        <h1 className="hero-title">🎵 Manoa’s Got Music</h1>
        <p className="hero-subtitle">
          Connect with fellow UH musicians,
          share your sound, and join jam sessions around campus.
          Whether you&apos;re a solo artist or looking to form a band — this platform is for you.
          {' '}
        </p>

        <Row className="justify-content-center mb-4">
          <Col md={4} className="feature">
            <MusicNoteBeamed className="feature-icon" />
            <h5 className="mt-3">Discover Musicians</h5>
            <p>Find students who play your favorite instruments or explore new genres.</p>
          </Col>
          <Col md={4} className="feature">
            <CalendarCheck className="feature-icon" />
            <h5 className="mt-3">Join Jam Sessions</h5>
            <p>Attend or organize casual sessions — on campus or online.</p>
          </Col>
          <Col md={4} className="feature">
            <People className="feature-icon" />
            <h5 className="mt-3">Collaborate Easily</h5>
            <p>Message students, link your music, and grow your network.</p>
          </Col>
        </Row>

        <div className="cta-buttons d-flex justify-content-center gap-3">
          <Button variant="light" size="lg" href="/auth/signup">
            Sign Up
          </Button>
          <Button variant="outline-light" size="lg" href="/auth/signin">
            Sign In
          </Button>
        </div>
      </Container>
    </div>
  );
}
