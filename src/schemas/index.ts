import validator from 'validator';
import * as z from 'zod';

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be atleast 2 characters').max(45, 'First name must be less than 45 characters').regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    lastName: z.string().min(2, 'Last name must be atleast 2 characters').max(45, 'Last name must be less than 45 characters').regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().refine(validator.isMobilePhone, 'Please enter a valid phone number!'),
    password: z.string().min(6, 'Password must be at least 6 characters ').max(50, 'Password must be less than 50 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters ').max(50, 'Password must be less than 50 characters'),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: 'Please accept all terms',
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string({ required_error: 'Please enter your password' }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters!').max(52, 'Password must be less than 52 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match!',
    path: ['confirmPassword'],
  });
