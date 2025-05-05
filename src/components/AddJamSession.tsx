'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addJamSession } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createJamSessionSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { name: string; startTime: string; endTime: string; date: string; genre:string;
  description: string; organizer: string; isPublic: boolean; }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addJamSession(data);
  swal('Success', 'Your Jam Session has been added', 'success', {
    timer: 2000,
  });
};

const AddStuffForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createJamSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Session</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>startTime</Form.Label>
                  <input
                    type="string"
                    {...register('startTime')}
                    className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.startTime?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>endTime</Form.Label>
                  <input
                    type="string"
                    {...register('endTime')}
                    className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.endTime?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>date</Form.Label>
                  <input
                    type="string"
                    {...register('date')}
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.date?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>genre</Form.Label>
                  <input
                    type="string"
                    {...register('genre')}
                    className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.genre?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>description</Form.Label>
                  <input
                    type="string"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>organizer</Form.Label>
                  <input
                    type="string"
                    {...register('organizer')}
                    className={`form-control ${errors.organizer ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.endTime?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>isPublic</Form.Label>
                  <input
                    type="boolean"
                    {...register('isPublic')}
                    className={`form-control ${errors.isPublic ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.isPublic?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('organizer')} value={currentUser} />
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

export default AddStuffForm;
