"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MembersPage() {
  const { daoId } = useParams();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all users (members) for the DAO. Adapt the endpoint as needed.
        const res = await fetch(`/api/members?daoId=${daoId}`);
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();
        setMembers(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [daoId]);

  if (loading) return <p className="p-6">Loading members...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">DAO Members</h1>
      <div className="grid grid-cols-1 divide-y border rounded-lg shadow">
        {members.map((member) => (
          <Link
            key={member.ethAddress}
            href={`/daos/${daoId}/members/${member.ethAddress}`}
            className="flex items-center gap-4 p-4 hover:bg-gray-100 transition"
          >
            {member.image && member.image.trim() !== '' ? (
              <Image
                src={member.image}
                alt={member.name || member.ethAddress}
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
              <p className="font-semibold">{member.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">
                {member.ethAddress?.slice(0, 6)}…{member.ethAddress?.slice(-4)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}