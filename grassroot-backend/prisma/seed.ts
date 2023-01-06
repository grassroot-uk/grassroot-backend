import { PrismaClient } from '@prisma/client';
import createCategories from './seeds/categories';
import { createContracts } from './seeds/contracts';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.pendingNonce.create({
    data: {
      nonce: "610b033f-0123-4573-8f8b-9ea0a0146bee",
      address: "0xf2700a4f973998496F09051c2E1075de40D69F8B"
    }
  })

  await prisma.user.createMany({
    data: [
      {
        address: '0xf2700a4f973998496F09051c2E1075de40D69F8B',
        nonce: '610b033f-0123-4573-8f8b-9ea0a0146bee',
        role: 'ADMIN',
        about: 'Admin for the Grassroot Application Stack',
        email: 'prix0007@gmail.com',
        firstname: 'Prince',
        lastname: 'Anuragi',
      },
    ],
  });

  const user = await prisma.user.findFirst({
    where: {
      address: '0xf2700a4f973998496F09051c2E1075de40D69F8B',
    },
  });

  await createCategories(prisma, user.id);
  await createContracts(prisma);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
