'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container, Row, Col } from 'react-bootstrap';

const About = () => (
  <Container className="my-5">
    <Row>
      <Col>
        <h1 className="text-center">About Manoas Got Music!</h1>
        <p className="mt-4">
        Manoas Got Music is a platform designed to connect University of Hawaiʻi students who share musical interests, 
          abilities, and goals. Whether you're looking for casual jam sessions or forming a performing band, Campus Jam 
          helps you find compatible musicians on campus to collaborate with and create something special.
        </p>
        <h2>Problem</h2>
        <p>
          Many UH students have musical talents but lack an easy way to connect with others who have similar tastes and 
          compatible musical abilities. As a result, students miss out on opportunities to engage in informal jam sessions, 
          or even form performing musical groups.
        </p>
        <h2>Solution</h2>
        <p>
          Campus Jam allows students to create profiles showcasing their musical tastes, capabilities, and goals. 
          These profiles also allow students to include links to YouTube videos or SoundCloud tracks to highlight their 
          musicianship. Once profiles are created, students can browse others' profiles and find compatible musicians to 
          contact, based on specific criteria like taste, ability, and musical goals.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Students can create detailed profiles that highlight their musical preferences, abilities, and goals.</li>
          <li>Users can filter and browse other profiles based on musical tastes, capabilities, instruments, and goals.</li>
          <li>Custom notifications alert users when a new profile matches their preferences.</li>
          <li>Admins can monitor and manage the platform, ensuring a safe and appropriate environment for users.</li>
          <li>Admins can create and manage categories for musical tastes, capabilities, and goals.</li>
        </ul>
        <h2>Beyond the Basics</h2>
        <p>Once the basic functionality is implemented, we aim to enhance the platform with advanced features, such as:</p>
        <ul>
          <li>Organizing jam sessions, providing event details like location, time, musical type, and desired capabilities.</li>
          <li>Creating a network of "who's played with who" to showcase musical collaborations.</li>
          <li>Adding reviews for musicians, allowing others to give feedback on their playing style and collaboration skills.</li>
        </ul>
        <h2>Join Us!</h2>
        <p>
          Whether you're a beginner or an experienced musician, Campus Jam helps you connect with like-minded people who share 
          your passion for music. Sign up now to find your next jam partner or group!
        </p>
      </Col>
    </Row>
  </Container>
);

export default About;
