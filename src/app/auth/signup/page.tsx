import { SignUpForm } from '@/components/auth/sign-up-form';
import { Link } from '@nextui-org/react';
import React from 'react';

const SignUpPage = () => {
  return (
    <div className="flex flex-col h-full mt-16 justify-center items-center gap-4">
      <div className=" flex justify-center items-center">
        <p className="text-center p-2">Already have an Account?</p>
        <Link href={'/auth/signin'}>Sign In</Link>
      </div>
      <div className="mx-auto">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
