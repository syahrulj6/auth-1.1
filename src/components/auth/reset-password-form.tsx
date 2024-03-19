'use client';
import { ResetPasswordSchema } from '@/schemas';
import { EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { PasswordStrength } from './password-strength';
import { passwordStrength } from 'check-password-strength';
import { resetPasswordActions } from '@/lib/actions/auth-actions';
import { toast } from 'react-toastify';

interface ResetPasswordForm {
  jwtUserId: string;
}

type InputType = z.infer<typeof ResetPasswordSchema>;
export const ResetPasswordForm = ({ jwtUserId }: ResetPasswordForm) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [passStrength, setPassStrength] = useState(0);
  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const togglePassVisible = () => setIsPassVisible((prev) => !prev);

  const resetPassword: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPasswordActions(jwtUserId, data.password);
      if (result === 'success') toast.success('Your password has been reset successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="w-96">
      <form onSubmit={handleSubmit(resetPassword)} className="flex flex-col gap-2">
        <Input
          label="Password"
          isInvalid={!!errors.password}
          {...register('password')}
          errorMessage={errors.password?.message}
          type={isPassVisible ? 'text' : 'password'}
          startContent={<KeyIcon className="w-4 col" />}
          endContent={isPassVisible ? <EyeIcon className="w-4 cursor-pointer" onClick={togglePassVisible} /> : <EyeSlashIcon className="w-4 cursor-pointer" onClick={togglePassVisible} />}
        />
        <PasswordStrength passStrength={passStrength} />
        <Input
          label="Confirm Password"
          isInvalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          type={isPassVisible ? 'text' : 'password'}
          startContent={<KeyIcon className="w-4 col" />}
        />
        <div className="flex justify-center">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} color="primary" className="w-full">
            {isSubmitting ? 'Please wait!' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};
