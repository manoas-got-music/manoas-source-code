import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

// Type definition for the config object
interface Config {
  defaultAccounts: {
    email: string;
    password: string;
    role?: string; // role can be undefined
  }[];
  defaultData: {
    name: string;
    quantity: number;
    owner: string;
    condition: string;
  }[];
  defaultMusicians: {
    name: string;
    instrument: string;
    genres: string; // Expecting a single string
    image: string;
    description: string;
    owner: string;
  }[];
}

const configTyped: Config = config as Config;

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seeding default accounts
  configTyped.defaultAccounts.forEach(async (account) => {
    const role = (account.role as Role) || Role.USER; // default to USER if no role is provided
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  // Seeding default data (e.g., items)
  for (const data of configTyped.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: configTyped.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  // Seeding default musicians
  configTyped.defaultMusicians.forEach(async (musician, index) => {
    console.log(`  Adding musician: ${musician.name}`);
    await prisma.musician.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: musician.name,
        instrument: musician.instrument,
        genres: musician.genres.split(','), // Split the genres string into an array
        image: musician.image,
        description: musician.description,
        owner: musician.owner,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
