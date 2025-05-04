'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { AddJamSession } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddJamSessionchema } from '@/lib/validationSchemas';

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

  <Container className="py-3">
  <Row className="justify-content-center">
    <Col xs={10}>
      <Col className="text-center">
        <h2>Add Contact</h2>
      </Col>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <input
                type="text"
                {...register('firstName')}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.firstName?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <input
                type="text"
                {...register('lastName')}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <input
                type="text"
                {...register('address')}
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.address?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <input
                type="text"
                {...register('image')}
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.image?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <input
                type="textfield"
                {...register('description')}
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.description?.message}</div>
            </Form.Group>
            <input type="hidden" {...register('owner')} value={currentUser} />
            <Form.Group className="form-group">
              <Row className="pt-3">
                <Col>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
);
};