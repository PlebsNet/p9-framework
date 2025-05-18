import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-gray-600 mt-auto p-8 w-full flex items-center justify-between gap-16 max-sm:flex-col-reverse max-sm:items-start max-sm:gap-4">
      <p>© {(new Date().getFullYear())} Plebs</p>
      <div className="flex gap-4 max-sm:flex-col max-sm:flex-col max-sm:gap-2">
        <Link href='#'>
          Privacy Policy
        </Link>
        <Link href='#'>
          Terms of Service
        </Link>
        <Link href='mailto:support@plebs.net'>
          Contact
        </Link>
      </div>
    </footer>
  );
}
