"use server";

import prisma from "@/db/prisma";

export async function onboardingUser(email: string, tags: string[]) {
  try {
    const result = await prisma.user.update({
      where: {
        email,
      },
      data: {
        tags: {
          set: tags,
        },
        onboarding: true,
      },
    });

    return {
      success: true,
      message: "User tags updated",
      data: result,
    };
  } catch (error) {
    console.error("Error updating user tags", error);
    return {
      success: false,
      message: "Error updating user tags",
    };
  }
}
