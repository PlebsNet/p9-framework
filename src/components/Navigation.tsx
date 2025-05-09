"use client"; 

import Link from 'next/link';
import AuthButton from '@/components/SignIn';
import { Button } from '@/components/ui/Button';
import {
  Logomark,
  User,
  More,
} from '@/components/Icons';

export default function Navigation() {
  return (
    <>
      <header className='flex items-center justify-space-between p-4 mb-12 w-fullitems-center backdrop-blur-lg bg-zinc-900/50 flex flex-col text-base h-full left-0 leading-relaxed min-h-screen fixed top-0 w-[76px]'>
        <Link href='/' className="flex justify-center h-8 w-8 leading-relaxed">
          <Logomark />
        </Link>

        <nav>
          <Link href='/profile' className="flex justify-center h-8 w-8 leading-relaxed">
            <User />
          </Link>

          <Button variant="ghost" size="icon">
            <More />
          </Button>
        </nav>
      </header>
      <AuthButton />
    </>
  );
};
