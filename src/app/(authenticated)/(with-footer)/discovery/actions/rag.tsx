"use server";
import { tags } from "@/constant/tags";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

export default async function executeRAGrequest(
    message: string
){
    const allDestinations = await prisma.destination.findMany({});
    const response = await cohere.chat({
        model: "command-r-plus",
        message: message,
        documents: allDestinations.map((destination) => ({
            id: destination.id,
            title: destination.name,
            text: destination.description,
            tags: destination.tags.join(", "),
            address: destination.address,
            headline: destination.headline,
        })),
        preamble: "You are nosh AI discovery chatbot. Your task is to recommend most suitable restaurants to the user based on their dietary needs and limitation. If you don't find the suitable restaurant, please just say so.",
    });

    const destinationCited = response.citations?.map((citation) => citation.documentIds).flat();
    const destinationCitedDetails = allDestinations.filter((destination) => destinationCited?.includes(destination.id));

    return {
        text: response.text,
        destinationCited: destinationCitedDetails
    }
}

