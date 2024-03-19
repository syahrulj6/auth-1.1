import { cn } from 'clsx-tailwind-merge';

interface PasswordStrengthProps {
  passStrength: number;
}

export const PasswordStrength = ({ passStrength }: PasswordStrengthProps) => {
  return (
    <div className="flex flex-col gap-2 col-span-2">
      <div className="flex ml-3 col-span-2">
        {Array.from({ length: passStrength + 1 }).map((i, index) => (
          <div
            key={index}
            className={cn('h-2 -ml-2 w-16 rounded-md', {
              'bg-red-500': passStrength === 0,
              'bg-orange-500': passStrength === 1,
              'bg-yellow-500': passStrength === 2,
              'bg-green-500': passStrength === 3,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};
