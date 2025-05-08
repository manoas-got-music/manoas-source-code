'use client';

import { Container, Button, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PublicLandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // If the user is signed in, redirect to dashboard
  if (session?.user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">🎸 Welcome to Manoa’s Got Music</h1>
      <p className="lead mb-5">
        Connect with fellow UH musicians, share your sound, and join jam sessions around campus.
        Whether you&apos;re a solo artist or looking to form a band — this platform is for you.
      </p>
      <Row className="justify-content-center gap-3">
        <Col xs="auto">
          <Button variant="primary" size="lg" href="/auth/signup">
            Create Account
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-secondary" size="lg" href="/auth/signin">
            Sign In
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p>
            🔍 Browse musicians by genre, instrument, or goals
            {' '}
            <br />
            📬 Send messages to organize jam sessions
            {' '}
            <br />
            📢 Share your music with the UH community
          </p>
        </Col>
      </Row>
    </Container>
  );
}
