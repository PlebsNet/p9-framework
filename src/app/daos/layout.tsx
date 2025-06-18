'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';

const DAO_QUERY = gql`
  query GetDaoById($id: numeric!) {
    atoms(where: { id: { _eq: $id } }) {
      id
      label
      image
    }
  }
`;

export default function DaosLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMainPage = pathname === '/daos';

  const match = pathname.match(/^\/daos\/(\d+)/);
  const daoId = match?.[1];
  const numericDaoId = daoId ? Number(daoId) : null;

  const { data } = useQuery(DAO_QUERY, {
    skip: isMainPage || !numericDaoId,
    variables: { id: numericDaoId },
  });

  const dao = data?.atoms?.[0];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <nav className="space-y-4">
          <Link href="/daos" className="block font-semibold hover:text-blue-600">
            DAOs
          </Link>

          {dao && !isMainPage && (
            <div className="mt-6 ml-2 border-l pl-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                {dao.image ? (
                  <Image
                    src={dao.image}
                    alt={dao.label}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                )}
                <span>{dao.label}</span>
              </div>
              <Link
                href={`/daos/${dao.id}/description`}
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Description
              </Link>
              <Link
                href={`/daos/${dao.id}/members`}
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Members
              </Link>
            </div>
          )}
        </nav>
      </aside>

      <main className={isMainPage ? 'w-full px-4 py-8 flex justify-center' : 'flex-1 p-6'}>
        <div className={isMainPage ? 'max-w-7xl w-full' : ''}>{children}</div>
      </main>
    </div>
  );
}
