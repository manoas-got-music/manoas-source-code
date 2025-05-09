/* eslint-disable import/extensions */

'use client';

import { useSession } from 'next-auth/react';
import { JamSession } from '@prisma/client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { joinSession } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { JoinSessionSchema } from '@/lib/validationSchemas';
// import { supabase } from '../lib/supabaseClient';

const onSubmit = async (data: { jamSessionId: number; musicianEmail: string; }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await joinSession(data);
  swal('Success', 'You have joined the session', 'success', {
    timer: 2000,
  });
};

const JoinJamSession = ({ jamSession }: { jamSession: JamSession }) => {
  // const { status } = useSession();
  // console.log('AddContactForm', status, session);
  // const {
  //  data: { user },
  // } = await supabase.auth.getUser();

  // const userId = user.id;
  const { data: session, status } = useSession();
  console.log('AddContactForm', status, session);
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(JoinSessionSchema),
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
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('jamSessionId')} value={jamSession.id} />
            <input type="hidden" {...register('musicianEmail')} value={currentUser} />
            <Form.Group className="form-group">
              <Row className="pt-3">
                <Col>
                  <Button type="submit" variant="primary">
                    Join Session
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JoinJamSession;
