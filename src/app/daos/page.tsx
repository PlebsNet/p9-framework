'use client';

import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';

const ATOMS_WITH_TAGS = gql`
  query AtomsWithTags(
    $where: atoms_bool_exp
    $orderBy: [atoms_order_by!]
    $limit: Int
    $offset: Int
    $tagPredicateIds: [numeric!]
    $userPositionAddress: String
    $verificationObjectId: numeric
  ) {
    atoms(
      where: $where
      order_by: $orderBy
      limit: $limit
      offset: $offset
    ) {
      id
      label
      image
      value {
        thing {
          description
        }
      }
      vault {
        position_count
      }
    }
  }
`;

export default function DaosPage() {
  const { data, loading, error } = useQuery(ATOMS_WITH_TAGS, {
    variables: {
      where: {
        as_subject_triples: {
          predicate_id: { _eq: "4" },
          object: { label: { _ilike: "%DAOs%" } },
        },
      },
      orderBy: [{ vault: { position_count: 'desc' } }],
      limit: 10,
      offset: 0,
      tagPredicateIds: ["4"],
      userPositionAddress: "",
      verificationObjectId: 126451,
    },
  });

  if (loading) return <p className="p-6">Chargement des DAOs...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data?.atoms.map((dao: any) => (
        <div key={dao.id} className="border p-4 rounded shadow bg-white">
          {dao.image && (
            <Image
              src={dao.image}
              alt={dao.label}
              width={400}
              height={200}
              className="rounded object-cover w-full h-48"
            />
          )}
          <h2 className="text-lg font-semibold mt-2">{dao.label}</h2>
          <p className="text-sm text-gray-600">
            {dao.value?.thing?.description ?? 'Aucune description'}
          </p>
          <p className="mt-1 text-sm text-indigo-600 font-medium">
            Votes: {dao.vault?.position_count ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
