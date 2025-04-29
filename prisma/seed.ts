import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role || prisma.Role.USER;
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

  for (const data of config.defaultData) {
    const condition = data.condition || prisma.Condition.good; // Use Prisma.Condition instead
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  config.defaultMusicians.forEach(async (musician, index) => {
    console.log(`  Adding musician: ${musician.name}`);
    
    // Ensure genres is an array of strings
    const genres = Array.isArray(musician.genres) ? musician.genres : [musician.genres];

    await prisma.musician.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: musician.name,
        instrument: musician.instrument,
        genres,  // Ensure genres is an array
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
