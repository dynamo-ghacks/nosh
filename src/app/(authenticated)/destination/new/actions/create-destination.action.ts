"use server";

import { CreateDestination } from "../schema";

export async function createDestination(data: CreateDestination) {
  try {
    const result = await prisma.destination.create({
      data: {
        ...data,
      },
    });

    return {
      success: true,
      message: "Destination created successfully",
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
