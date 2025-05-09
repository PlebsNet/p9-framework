"use client"; 

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from './ui/Button';

export default function AuthButton() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === "/auth/signin") {
    return null;
  };

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  };

  return (
    <Button asChild>
      <Link href="/auth/signin" className='fixed right-6 top-6 z-[1]'>
        Sign in
      </Link>
    </Button>
  );
};
