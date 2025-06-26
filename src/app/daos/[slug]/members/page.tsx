"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import AssessmentResults from "@/components/AssessmentResults";
import { useAssessmentScores } from "@/hooks/useAssessmentScores";

const MEMBER_PROFILE_QUERY = gql`
  query GetMemberProfile($memberId: String!) {
    users(where: { id: { _eq: $memberId } }) {
      id
      name
      image
      ethAddress
      answers
    }
  }
`;

export default function MemberProfilePage() {
  const { memberId } = useParams();

  const { data, loading, error } = useQuery(MEMBER_PROFILE_QUERY, {
    variables: { memberId },
  });

  const member = data?.users?.[0];

  // Use the hook to calculate the profil
  const { profile } = useAssessmentScores(member?.answers);
  const primaryArchetype = profile?.[0];

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;
  if (!member) return <div>No member found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* Member info */}
      <div className="flex items-center gap-4 border-b pb-4">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name || member.ethAddress}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl text-white">
            ?
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{member.name || "Anonymous"}</h2>
          <p className="text-gray-500">{member.ethAddress}</p>
          {/* Show the main archetype */}
          {primaryArchetype && (
            <div className="mt-2">
              <span className="font-semibold">Main archetype: </span>
              <span>{primaryArchetype.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Assessment results */}
      {member.answers ? (
        <AssessmentResults answers={member.answers} />
      ) : (
        <div className="text-gray-500">No assessment results available.</div>
      )}
    </div>
  );
}