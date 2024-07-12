const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const _prisma = new PrismaClient();

async function main() {
  const destination = await _prisma.destination.create({
    data: {
      name: "Nancy",
      headline: "A verified halal restaurant in Jakarta",
      description:
        "Halal Restaurant in Jakarta Halal Restaurant in Jakarta. Halal Restaurant in Jakarta.",
      latitude: -6.1876407,
      longitude: 106.7596409,
      address: "Jl. Setiabudi No. 20, Jakarta Selatan",
      tags: ["Diabetes", "Gluten Free"],
      isVerified: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg",
    },
  });

  const destination2 = await _prisma.destination.create({
    data: {
      name: "Nancy",
      headline: "A verified halal restaurant in Jakarta",
      description:
        "Halal Restaurant in Jakarta Halal Restaurant in Jakarta. Halal Restaurant in Jakarta.",
      latitude: -6.248261439722531,
      longitude: 106.61081185982164,
      address: "Jl. Setiabudi No. 20, Jakarta Selatan",
      tags: ["Diabetes", "Gluten Free"],
      isVerified: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg",
    },
  });

  const reviews = [];
  for (let i = 0; i < 20; i++) {
    const user = await _prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      },
    });

    const review = await _prisma.review.create({
      data: {
        userId: user.id,
        destinationId: destination.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        tags: ["Diabetes"],
      },
    });
    reviews.push(review);
  }

  console.log({ destination, reviews });
}

main()
  .then(async () => {
    await _prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await _prisma.$disconnect();
    process.exit(1);
  });
