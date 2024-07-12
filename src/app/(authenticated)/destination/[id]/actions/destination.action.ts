"use server";

import { getServerSession } from "next-auth";
import prisma from "@/db/prisma";

export async function getDestination(id: string) {
  try {
    const session = await getServerSession();
    if (!session?.user.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const [result, reviewCount, userReview] = await Promise.all([
      prisma.destination.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          address: true,
          latitude: true,
          longitude: true,
          headline: true,
          isVerified: true,
          tags: true,
          image: true,
          Review: {
            orderBy: {
              updatedAt: "desc",
            },
            select: {
              body: true,
              id: true,
              tags: true,
              title: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  email: true,
                },
              },
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }),
      prisma.review.count({
        where: { destinationId: id },
      }),
      prisma.review.findFirst({
        where: {
          destinationId: id,
          user: {
            email: session?.user.email,
          },
        },
        select: {
          body: true,
          id: true,
          tags: true,
          title: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      success: true,
      message: "Success",
      data: {
        destination: {
          data: result,
        },
        reviews: {
          data: result?.Review ?? [],
          meta: {
            page: 1,
            take: reviewCount,
            nextPage: (result?.Review?.length ?? 0) >= 10 ? 2 : null,
            count: reviewCount,
          },
        },
        userReview: userReview ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}

export async function getReviewByDestination(
  destinationId: string,
  page: number,
  take: number
) {
  try {
    const session = await getServerSession();
    if (!session?.user.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const [result, reviewCount, userReview] = await Promise.all([
      prisma.review.findMany({
        where: { destinationId },
        take,
        skip: (page - 1) * take,
        select: {
          body: true,
          id: true,
          tags: true,
          title: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.review.count({
        where: { destinationId },
      }),
      prisma.review.findFirst({
        where: {
          destinationId: destinationId,
          user: {
            email: session?.user.email,
          },
        },
        select: {
          body: true,
          id: true,
          tags: true,
          title: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      success: true,
      message: "Success",
      data: {
        data: result,
        meta: {
          page,
          take,
          nextPage: result.length >= take ? page + 1 : null,
          count: reviewCount ?? 0,
        },
        userReview: userReview ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}

export async function addReview(
  email: string,
  destinationId: string,
  data: {
    body: string;
    tags: string[];
    title: string;
  }
) {
  try {
    const [check, destination] = await Promise.all([
      prisma.review.findFirst({
        where: {
          destinationId,
          user: {
            email,
          },
        },
        select: {
          id: true,
        },
      }),
      prisma.destination.findUnique({
        where: {
          id: destinationId,
        },
      }),
    ]);

    let result;
    if (check) {
      result = await prisma.review.update({
        where: {
          id: check.id,
        },
        data: {
          ...data,
          destination: {
            connect: {
              id: destinationId,
            },
          },
          user: {
            connect: {
              email,
            },
          },
        },
      });
    } else {
      result = await prisma.review.create({
        data: {
          ...data,
          destination: {
            connect: {
              id: destinationId,
            },
          },
          user: {
            connect: {
              email,
            },
          },
        },
      });
    }

    if (destination) {
      await prisma.destination.update({
        where: {
          id: destinationId,
        },
        data: {
          tags: {
            set: Array.from(new Set([...destination.tags, ...data.tags])),
          },
        },
      });
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
