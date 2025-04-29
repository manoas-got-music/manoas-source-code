'use client';

import { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import UserProfile from '../components/UserProfile';
import BrowseMusicians from '../components/BrowseMusicians';
import JamSessions from '../components/JamSessions';
import AppNavbar from '../components/Navbar';
import About from '../components/About';

const mockUser = {
  name: 'Travis Thompson',
  profilePic: '/test.png',
  instrument: 'Guitar, Vocals',
  genres: ['Jazz', 'Funk', 'Neo-Soul'],
  goals: 'Looking to casually jam and maybe join a student band',
  bio: 'Third-year music major. Into improv, grooves, and late-night sessions.',
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  soundcloud: 'https://soundcloud.com/fakeuser123',
};

const Home = () => {
  const [view, setView] = useState<'home' | 'browse' | 'about' | 'logout' | 'jam' | 'edit'>('home');
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main>
      <AppNavbar onSelect={(key: any) => setView(key as any)} currentView={view} />
      <Container id="landing-page" fluid className="py-3">
        {view === 'home' && (
          <>
            <Row className="align-middle text-center">
              <Col xs={4}>
                <Image src="/next.svg" width="150px" alt="Next.js Logo" />
              </Col>
              <Col xs={8} className="d-flex flex-column justify-content-center">
                <h2>Welcome to Manoa’s Got Music 🎶</h2>
                <p>Click below to preview a featured musician profile.</p>
                <Button variant="primary" onClick={() => setShowProfile(!showProfile)}>
                  {showProfile ? 'Hide' : 'Show'}
                  Profile
                </Button>
              </Col>
            </Row>

            {showProfile && (
              <Row className="mt-5">
                <Col>
                  <UserProfile user={mockUser} />
                </Col>
              </Row>
            )}
          </>
        )}

        {view === 'browse' && (
          <Row>
            <Col>
              <BrowseMusicians />
            </Col>
          </Row>
        )}

        {view === 'about' && (
          <Row>
            <Col>
              <About />
            </Col>
          </Row>
        )}

        {view === 'jam' && (
          <Row>
            <Col>
              <JamSessions />
            </Col>
          </Row>
        )}

        {view === 'edit' && (
          <Row>
            <Col>
              <h2>Your Profile</h2>
              <UserProfile user={mockUser} />
            </Col>
          </Row>
        )}

        {view === 'logout' && (
          <Row>
            <Col>
              <h2>You&apos;ve been logged out.</h2>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default Home;
