import Image from 'next/image';

interface Dao {
  label: string;
  image: string;
  value?: {
    thing?: {
      description?: string;
    };
  };
  term?: {
    vaults?: {
      position_count?: number;
    };
  };
}

export default function DaoCard({ dao }: { dao: Dao }) {
  const { label, image, value, term } = dao;
  const description = value?.thing?.description || '';
  const votes = term?.vaults?.position_count || 0;

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {image && (
        <Image
          src={image}
          alt={label}
          width={400}
          height={200}
          className="object-cover w-full h-48 rounded"
        />
      )}
      <h2 className="text-lg font-semibold mt-2">{label}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm mt-2 font-medium">Votes: {votes}</p>
    </div>
  );
}
