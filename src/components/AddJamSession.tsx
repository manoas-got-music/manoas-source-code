'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Container } from 'react-bootstrap';

export default function AddJamSession() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    genre: '',
    host: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/add-jam', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/jam');
    } else {
      console.error('Failed to add jam session');
    }
  };

  return (
    <Container className="py-4">
      <h2>Add Jam Session</h2>
      <Form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <Form.Group key={key} className="mb-3">
            <Form.Label>{key[0].toUpperCase() + key.slice(1)}</Form.Label>
            <Form.Control
              name={key}
              value={form[key as keyof typeof form]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
