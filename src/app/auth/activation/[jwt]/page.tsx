import { activateUser } from '@/lib/actions/auth-actions';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

interface ActivationProps {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: ActivationProps) => {
  const result = await activateUser(params.jwt);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 -mt-16">
      {result === 'userNotExist' ? (
        <p className="text-red-500 text-2xl">The User does not exist</p>
      ) : result === 'alreadyActivated' ? (
        <p className="text-red-500 text-2xl">The User is already activated</p>
      ) : result === 'success' ? (
        <p className="text-green-500 2xl">Success! the User is now activated</p>
      ) : (
        <p className="text-2xl text-red-500">Oops! Something went wrong</p>
      )}

      <Button as={Link} href="/">
        Back to home
      </Button>
    </div>
  );
};

export default ActivationPage;
