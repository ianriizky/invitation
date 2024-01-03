import { model, prisma } from "../../app/models/index.js";
import { UserRepository } from "../../app/repositories/UserRepository.js";
import { Hash } from "../../app/supports/Hash.js";
import { faker } from "@faker-js/faker";

try {
  await new UserRepository().model.deleteMany({});

  const hashedPasswords = await Promise.all(
    [...Array(50)].map(() => Hash.make("12345")),
  );

  await model.$transaction(async model => {
    await Promise.all(
      hashedPasswords.map(password => {
        const gender = faker.helpers.arrayElement(["male", "female"]);
        const person = {
          firstName: faker.person.firstName(gender),
          lastName: faker.person.lastName(gender),
        };
        const username = faker.internet.userName(person);

        return new UserRepository(model.user).model.create({
          data: {
            username,
            email: faker.internet.email(person),
            name: faker.person.fullName({ ...person, gender }),
            auths: {
              create: {
                provider: faker.helpers.arrayElement(
                  Object.keys(prisma.AuthProvider),
                ),
                password,
              },
            },
          },
        });
      }),
    );
  });
} catch (error) {
  console.error(error);

  process.exit(1);
} finally {
  await model.$disconnect();
}
