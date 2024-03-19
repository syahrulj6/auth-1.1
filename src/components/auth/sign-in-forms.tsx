'use client';

import { LoginSchema } from '@/schemas';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

interface SignUpFormProps {
  callbackUrl?: string;
}

type InputType = z.infer<typeof LoginSchema>;

export const SignForm = ({ callbackUrl }: SignUpFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(LoginSchema),
  });

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const togglePassVisible = () => setIsPassVisible((prev) => !prev);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success('Successfully Sign in!');
    router.push(callbackUrl ? callbackUrl : '/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register('email')} label="Email" startContent={<EnvelopeIcon className="w-4 col" />} />
      <Input
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password')}
        label="Password"
        type={isPassVisible ? 'text' : 'password'}
        startContent={<KeyIcon className="w-4 col" />}
        endContent={isPassVisible ? <EyeIcon className="w-4 cursor-pointer" onClick={togglePassVisible} /> : <EyeSlashIcon className="w-4 cursor-pointer" onClick={togglePassVisible} />}
      />

      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <p className="text-white text-sm">Doesn't have an account?</p>
          <Link className="text-primary-500 text-sm hover:text-primary-400 transition-colors" href={'/auth/signup'}>
            Sign Up
          </Link>
        </div>
        <Link href={'/auth/forgot-password'} className="text-sm text-red-600 hover:text-red-700 transition-colors">
          Forgot password?
        </Link>
      </div>

      <Button color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
};
