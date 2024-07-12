"use server";

import { CreateDestination } from "../schema";

export async function createDestination(data: CreateDestination) {
  try {
    const existingDestination = await prisma.destination.findUnique({
      where: {
        name: data.name,
      },
    });

    console.log(existingDestination);

    if (existingDestination) {
      return {
        success: false,
        message: "Destination already exists",
      };
    }

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
