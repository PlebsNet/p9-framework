'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { useGetAtomQuery } from '@0xintuition/graphql';
import Image from 'next/image';

export default function DaoMembersPage() {
  const params = useParams();
  const daoId = Array.isArray(params.daoId) ? params.daoId[0] : params.daoId;

  const { data, isLoading, error } = useGetAtomQuery({
    id: daoId,
  });

  if (isLoading) return <p>Chargement des membres...</p>;
  if (error || !data?.atom) return <p>Erreur ou DAO non trouvé</p>;

  const dao = data.atom;
  const contributors = dao?.relations_from?.filter(
    (r) => r.predicate.label === 'is contributor of'
  ) ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Membres de {dao.label}</h1>

      {contributors.length === 0 ? (
        <p className="text-gray-500">Aucun contributeur trouvé.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contributors.map((rel) => {
            const member = rel.subject;
            return (
              <li key={rel.id} className="p-4 border rounded shadow-sm bg-white">
                <div className="flex items-center space-x-4">
                  <Image
                    src={member.image ?? '/placeholder.png'}
                    alt={member.label}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{member.label}</p>
                    <p className="text-sm text-gray-500">{member.id}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
