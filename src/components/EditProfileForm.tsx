'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Musician } from '@prisma/client';
// eslint-disable-next-line import/extensions
import { EditProfileSchema } from '@/lib/validationSchemas';
// eslint-disable-next-line import/extensions
import { editProfile } from '@/lib/dbActions';

const onSubmit = async (data: Musician) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProfile(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditProfileForm = ({ musician }: { musician: Musician }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Musician>({
    resolver: yupResolver(EditProfileSchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={musician.id} />
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={musician.name}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Instruments</Form.Label>
                  <input
                    type="text"
                    {...register('instrument')}
                    defaultValue={musician.instrument}
                    className={`form-control ${errors.instrument ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.instrument?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Genres</Form.Label>
                  <input
                    type="text"
                    {...register('genres')}
                    defaultValue={musician.genres}
                    className={`form-control ${errors.genres ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.genres?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    defaultValue={musician.description}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    defaultValue={musician.image}
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={musician.owner} />
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

export default EditProfileForm;
