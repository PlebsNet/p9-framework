'use client';

import { gql, useQuery } from '@apollo/client';
import DaoCard from '@/components/DaoCard';

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
          name
          description
          url
        }
      }
      vault {
        current_share_price
        total_shares
        position_count
      }
      tags: as_subject_triples_aggregate(
        where: { predicate_id: { _in: $tagPredicateIds } }
      ) {
        nodes {
          object {
            label
            vault_id
          }
          predicate_id
        }
        aggregate {
          count
        }
      }
      verificationTriple: as_subject_triples_aggregate(
        where: {
          predicate_id: { _eq: "4" }
          object_id: { _eq: $verificationObjectId }
        }
      ) {
        nodes {
          id
          predicate_id
          object_id
          vault {
            id
            positions(
              where: {
                account_id: {
                  _in: [
                    "0xd99811847e634d33f0dace483c52949bec76300f"
                    "0xbb285b543c96c927fc320fb28524899c2c90806c"
                    "0x0b162525c5dc8c18f771e60fd296913030bfe42c"
                    "0xbd2de08af9470c87c4475117fb912b8f1d588d9c"
                    "0xb95ca3d3144e9d1daff0ee3d35a4488a4a5c9fc5"
                  ]
                }
              }
            ) {
              id
              shares
              account_id
              account {
                id
              }
            }
          }
        }
      }
    }
  }
`;

interface Dao {
  id: string;
  label: string;
  image?: string;
  value?: {
    thing?: {
      description?: string;
    };
  };
  vault?: {
    position_count?: number;
  };
}

export default function DaosPage() {
  const { data, loading, error } = useQuery(ATOMS_WITH_TAGS, {
    variables: {
      where: {
        _and: [
          {
            as_subject_triples: {
              predicate_id: { _eq: '4' },
              object_id: { _eq: '126451' },
            },
          },
        ],
      },
      orderBy: [{ vault: { total_shares: 'desc' } }],
      limit: 20,
      offset: 0,
      tagPredicateIds: ['4'],
      userPositionAddress: '',
      verificationObjectId: 126451,
    },
  });

  if (loading) return <p className="p-6">Chargement des DAOs...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error.message}</p>;

  if (!data?.atoms || data.atoms.length === 0) {
    return <p>Aucun DAO trouvé.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.atoms.map((dao: Dao) => (
        <DaoCard key={dao.id} dao={dao} />
      ))}
    </div>
  );
}
