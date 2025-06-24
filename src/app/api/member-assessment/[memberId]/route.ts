import { NextRequest } from "next/server";
// Importe ici ta logique pour récupérer les réponses depuis la base de données
// import { getMemberAnswers } from "@/lib/yourDataSource";

export async function GET(req: NextRequest, { params }: { params: { memberId: string } }) {
    const { memberId } = params;

    // Exemple fictif : récupère les réponses du membre
    // const answers = await getMemberAnswers(memberId);

    // Pour l'exemple, on renvoie des réponses mockées
    const answers = {
        "Q1": 1,
        "Q2": 0,
        "Q3": 2,
        // ...
    };

    return new Response(JSON.stringify(answers), {
        headers: { "Content-Type": "application/json" },
    });
}
