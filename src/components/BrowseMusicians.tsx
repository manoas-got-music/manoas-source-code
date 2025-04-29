'use client';

import { Container, Row, Col } from 'react-bootstrap';

import UserProfile from './UserProfile';

const mockUsers = [
  {
    name: 'Li Hua',
    image: '/china-musician.png',
    instrument: 'Erhu, Piano',
    genres: 'Classical, Chinese Folk',
    // eslint-disable-next-line max-len
    description: 'An exchange student at the Central Conservatory of Music, she loves the erhu and Chinese folk music, and also plays the piano.',
    owner: 'lihua@music.edu',
  },
  {
    name: 'Jacob Miller',
    image: '/us-musician.png',
    instrument: 'Guitar, Vocals',
    genres: 'Indie Rock, Jazz',
    description: 'Second-year student majoring in music production. I write original songs.',
    owner: 'jacob@music.edu',
  },
  {
    name: 'Travis Thompson',
    image: '/test.png',
    instrument: 'Guitar, Vocals',
    genres: 'Jazz, Funk, Neo-Soul',
    description: 'Third-year music major. Into improv, grooves, and late-night sessions.',
    owner: 'travis@music.edu',
  },
  {
    name: 'Emily Park',
    image: '/Emily-Park.png',
    instrument: 'Violin, Keyboard',
    genres: 'Pop, Lo-fi, K-Classical',
    description: 'UH sophomore. Likes lo-fi vibes and playing string covers of K-pop.',
    owner: 'emily@music.edu',
  },
];

export default function BrowseMusicians() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">🎼 Browse Musicians</h1>
      <Row className="g-4">
        {mockUsers.map((user, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col md={6} key={index}>
            <UserProfile user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
