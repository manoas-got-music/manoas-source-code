/* eslint-disable import/extensions */
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import CreateJamSession from '@/components/CreateJamSession';

const AddStuff = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <CreateJamSession />
    </main>
  );
};

export default AddStuff;
