'use client';
import * as z from 'zod';

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid';
import { Button, Checkbox, Input, Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordStrength } from 'check-password-strength';
import { PasswordStrength } from './password-strength';
import { registerUser } from '@/lib/actions/auth-actions';
import { toast } from 'react-toastify';

type InputType = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(SignUpSchema),
  });
  const [passStrength, setPassStrength] = useState(0);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const togglePassVisible = () => setIsPassVisible((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, accepted, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success('The User Registered successfully!');
      return result;
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3">
      <Input isInvalid={!!errors.firstName} errorMessage={errors.firstName?.message} {...register('firstName')} label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input isInvalid={!!errors.lastName} errorMessage={errors.lastName?.message} {...register('lastName')} label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register('email')} className="col-span-2" label="Email" startContent={<EnvelopeIcon className="w-4 col" />} />
      <Input isInvalid={!!errors.phone} errorMessage={errors.phone?.message} {...register('phone')} className="col-span-2" label="Phone" startContent={<PhoneIcon className="w-4 col" />} />
      <Input
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password')}
        className="col-span-2"
        label="Password"
        type={isPassVisible ? 'text' : 'password'}
        startContent={<KeyIcon className="w-4 col" />}
        endContent={isPassVisible ? <EyeIcon className="w-4 cursor-pointer" onClick={togglePassVisible} /> : <EyeSlashIcon className="w-4 cursor-pointer" onClick={togglePassVisible} />}
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
        className="col-span-2"
        label="Confirm Password"
        type={isPassVisible ? 'text' : 'password'}
        startContent={<KeyIcon className="w-4 col" />}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox onChange={field.onChange} onBlur={field.onBlur} className="col-span-2 mx-auto">
            I accept the <Link href="/terms">terms</Link>
          </Checkbox>
        )}
      />
      {!!errors.accepted && <p className="text-red-500">{errors.accepted.message}</p>}
      <Button color="primary" type="submit" className="col-span-2">
        Submit
      </Button>
    </form>
  );
};
