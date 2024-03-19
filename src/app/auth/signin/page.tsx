import { SignForm } from '@/components/auth/sign-in-forms';
import Link from 'next/link';

interface SignInProps {
  searchParams: {
    callbackUrl?: string;
  };
}

const SignInPage = ({ searchParams }: SignInProps) => {
  return (
    <div className="flex flex-col h-screen my-auto justify-center items-center gap-4 -mt-16">
      <div className="mx-auto w-2/6">
        <SignForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SignInPage;
