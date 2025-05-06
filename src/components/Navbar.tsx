/* eslint-disable react/jsx-indent, @typescript-eslint/indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useSession } from 'next-auth/react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import Image from 'next/image';

interface NavBarProps {
  onSelect: (key: string) => void;
  currentView: 'home' | 'browse' | 'about' | 'jam' | 'logout' | string;
}

const AppNavbar: React.FC<NavBarProps> = ({ onSelect, currentView }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  return (
    <Navbar className="green-background" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => onSelect('home')} style={{ cursor: 'pointer' }}>
        <Image
          src="/Manoa-Logo.png"
          width={200}
          height={80} // 你可以根据实际图片高度调整
          alt="Manoa Logo"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link onClick={() => onSelect('jam')} active={currentView === 'jam'}>
              Find Jam Sessions
            </Nav.Link>
            <Nav.Link onClick={() => onSelect('browse')} active={currentView === 'browse'}>
              Browse Musicians
            </Nav.Link>
            <Nav.Link onClick={() => onSelect('about')} active={currentView === 'about'}>
              About
            </Nav.Link>
            <Nav.Link onClick={() => onSelect('edit')} active={currentView === 'edit'}>
              Profile
            </Nav.Link>
            {currentUser && role === 'ADMIN' && (
              <Nav.Link onClick={() => onSelect('admin')} active={currentView === 'admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight /> Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock /> Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill /> Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
