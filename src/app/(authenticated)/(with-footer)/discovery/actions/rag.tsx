"use server";
import { tags } from "@/constant/tags";
import prisma from "@/db/prisma";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export default async function executeRAGrequest(message: string) {
  try {
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
      preamble:
        "You are nosh AI discovery chatbot. Your task is to recommend most suitable restaurants to the user based on their dietary needs and limitation.",
    });

    const destinationCited = response.citations
      ?.map((citation) => citation.documentIds)
      .flat();
    const destinationCitedDetails = allDestinations.filter((destination) =>
      destinationCited?.includes(destination.id)
    );

    return {
      text: response.text,
      destinationCited: destinationCitedDetails,
    };
  } catch (err) {
    console.error(err);
    return {
      text: "Sorry, I am having trouble understanding you right now. Can you please rephrase your question?",
      destinationCited: [],
    };
  }
}
