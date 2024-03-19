'use client';

import { forgotPassword } from '@/lib/actions/auth-actions';
import { ForgotPasswordSchema } from '@/schemas';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

type InputType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result !== null) toast.success('Reset password link was sent to your email.');
      reset();
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 justify-center items-center w-full md:px-36 px-10 h-screen md:-mt-16">
      <form onSubmit={handleSubmit(submitRequest)} className="flex flex-col gap-2">
        <p className="text-2xl mb-2 font-bold">Enter your email</p>
        <Input label="Email" {...register('email')} startContent={<EnvelopeIcon className="w-4" />} errorMessage={errors.email?.message} />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} color="primary" className="w-full">
          {isSubmitting ? 'Please wait!' : 'Submit'}
        </Button>
      </form>
      <div className="relative  md:justify-self-center justify-self-center w-64 h-64 md:w-96 md:h-96 self-start md:self-center">
        <Image src={'/reset-password.png'} alt="forgot pass image" fill />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
