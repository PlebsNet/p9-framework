'use client';

import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const MEMBERS_QUERY = gql`
  query GetMembers($daoId: Int!) {
    triples(
      where: {
        predicate_id: { _eq: 1 }  # “is contributor of”
        object_id: { _eq: $daoId }
      }
    ) {
      subject {
        id
        label
        image
        wallet_id
      }
    }
  }
`;

export default function MembersPage() {
  const { daoId } = useParams();

  const { data, loading, error } = useQuery(MEMBERS_QUERY, {
    variables: { daoId: Number(daoId) },
  });

  if (loading) return <p className="p-6">Chargement des membres...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error.message}</p>;

  const members = data?.triples || [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Contributeurs du DAO</h1>
      <div className="grid grid-cols-1 divide-y border rounded-lg shadow">
        {members.map(({ subject }: any) => (
          <div key={subject.id} className="flex items-center gap-4 p-4">
            {subject.image ? (
              <Image
                src={subject.image}
                alt={subject.label}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300" />
            )}
            <div>
              <p className="font-semibold">{subject.label || 'Anonyme'}</p>
              <p className="text-sm text-gray-500">
                {subject.wallet_id?.slice(0, 6)}…{subject.wallet_id?.slice(-4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
