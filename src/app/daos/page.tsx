'use client';

import React from 'react';
import { useGetAtomsQuery } from '@0xintuition/graphql';
import Link from 'next/link';

export default function DaosPage() {
  const { data, isLoading, error } = useGetAtomsQuery({
    where: { tags: { _contains: ['DAOs'] } },
    limit: 50,
    offset: 0
  });

  if (isLoading) return <p>Chargement des DAOs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const daos = data?.atoms || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {daos.map((dao) => (
        <Link key={dao.id} href={`/daos/${dao.id}/members`} className="border rounded-lg p-4 shadow hover:shadow-lg bg-white">
          <img
            src={dao.image ?? '/placeholder.png'}
            alt={dao.label}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{dao.label}</h2>
          <p className="text-sm text-gray-600">{dao?.value?.thing?.description}</p>
        </Link>
      ))}
    </div>
  );
}
