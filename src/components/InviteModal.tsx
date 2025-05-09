'use client';

import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';

export default function InviteModal({
  show,
  onHide,
  musicianId,
}: {
  show: boolean;
  onHide: () => void;
  musicianId: number;
}) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedJamId, setSelectedJamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchJamSessions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('JamSession')
        .select('*')
        .or(`isPublic.eq.true,organizer.eq.${user.id}`);

      if (error) {
        console.error('Failed to load jam sessions:', error);
      } else {
        setSessions(data);
      }
    };

    if (show) fetchJamSessions();
  }, [show]);

  const handleInvite = async () => {
    if (!selectedJamId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('JamSession')
      .select('musicians')
      .eq('id', selectedJamId)
      .single();

    if (error) {
      console.error('Failed to fetch session:', error);
      setLoading(false);
      return;
    }

    const updated = Array.from(new Set([...(data?.musicians || []), musicianId]));

    const { error: updateError } = await supabase
      .from('JamSession')
      .update({ musicians: updated })
      .eq('id', selectedJamId);

    if (updateError) {
      console.error('Failed to send invite:', updateError);
    } else {
      setMessage('✅ Invite sent!');
      setTimeout(() => {
        setMessage(null);
        onHide();
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Invite to Jam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <div className="text-success text-center py-2">{message}</div>
        )}

        <Form.Select
          value={selectedJamId || ''}
          onChange={(e) => setSelectedJamId(Number(e.target.value))}
          disabled={loading}
        >
          <option value="">Select a jam session...</option>
          {sessions.map((jam) => (
            <option key={jam.id} value={jam.id}>
              {jam.name}
              —
              {jam.date}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleInvite}
          disabled={loading || !selectedJamId}
        >
          {loading ? 'Inviting...' : 'Send Invite'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
