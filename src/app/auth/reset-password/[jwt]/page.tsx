import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { verifiedJwt } from '@/lib/jwt';
import verifyJwt from 'jsonwebtoken';

interface ResetPasswordProps {
  params: {
    jwt: string;
  };
}

const ResetPassword = ({ params }: ResetPasswordProps) => {
  const payload = verifiedJwt(params.jwt);

  if (!payload) return <div className="flex items-center justify-center h-screen text-red-500 text-2xl md:-mt-16">The url is not valid!</div>;

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center h-screen md:-mt-16">
      <h2 className="text-2xl font-bold">Reset password</h2>
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  );
};

export default ResetPassword;
