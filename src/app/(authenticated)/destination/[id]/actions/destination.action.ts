"use server";

export async function getDestination(id: string) {
  try {
    const [result, reviewCount] = await Promise.all([
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
            take: 10,
            skip: 0,
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
    ]);

    console.log(reviewCount);

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
            take: 10,
            nextPage: (result?.Review?.length ?? 0) >= 10 ? 2 : null,
            count: reviewCount,
          },
        },
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
    const [result, reviewCount] = await Promise.all([
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
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.review.count({
        where: { destinationId },
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
