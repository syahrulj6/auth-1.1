import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) redirect('/auth/signin');

  return (
    <div>
      <Image alt={user?.firstName ?? ''} height={300} width={300} src={user?.image ?? ''} className="rounded-full" />
      <div className="grid grid-cols-4 gap-y-4">
        <p>
          First Name:<p className="col-span-3">{user?.firstName}</p>
        </p>
        <p>
          Last Name:<p className="col-span-3">{user?.lastName}</p>
        </p>
        <p>
          Phone:<p className="col-span-3">{user?.lastName}</p>
        </p>
        <p>
          Email:<p className="col-span-3">{user?.email}</p>
        </p>
      </div>
    </div>
  );
};

export default Profile;
