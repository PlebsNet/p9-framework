'use client';

import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const MEMBERS_QUERY = gql`
  query GetMembersByLabel($label: String!) {
    atoms(where: { label: { _eq: $label } }) {
      id
      as_object_triples(where: { predicate_id: { _eq: 1 } }) {
        subject {
          id
          label
          image
          wallet_id
        }
      }
    }
  }
`;

interface MemberSubject {
  id: string;
  label: string;
  image?: string;
  wallet_id?: string;
}

interface MemberTriple {
  subject: MemberSubject;
}

export default function MembersPage() {
  const { daoId } = useParams();
  const label = decodeURIComponent(daoId as string);

  const { data, loading, error } = useQuery(MEMBERS_QUERY, {
    variables: { label },
  });

  const members: MemberTriple[] = data?.atoms?.[0]?.as_object_triples || [];

  if (loading) return <p className="p-6">Loading members...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  if (members.length === 0) {
    return <p className="p-6 text-gray-600">No members found for this DAO.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">DAO Contributors</h1>
      <div className="grid grid-cols-1 divide-y border rounded-lg shadow">
        {members.map(({ subject }) => (
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
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                ?
              </div>
            )}
            <div>
              <p className="font-semibold">{subject.label || 'Anonymous'}</p>
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
