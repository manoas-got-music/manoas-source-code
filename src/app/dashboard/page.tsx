'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BrowseMusicians from '@/components/BrowseMusicians';
import JamSessions from '@/components/JamSessions';
import AppNavbar from '@/components/Navbar';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [view, setView] = useState<'dashboard' | 'browse' | 'about' | 'jam' | 'edit'>('dashboard');

  return (
    <>
      <AppNavbar onSelect={(key: any) => setView(key)} currentView={view} />
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1>
              Welcome back,
              {' '}
              {session?.user?.email?.split('@')[0]}
              !
            </h1>
            <p>Here&apos;s what&apos;s happening in your musical community:</p>
          </Col>
        </Row>

        {view === 'browse' && <BrowseMusicians />}
        {view === 'jam' && <JamSessions />}
        {view === 'dashboard' && (
          <>
            <BrowseMusicians />
            <JamSessions />
          </>
        )}
      </Container>
    </>
  );
}
