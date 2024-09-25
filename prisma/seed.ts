// prisma/seed.js

const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst(
    {
      where:
      {
        role: Role.SUPER_ADMIN
      }
    });

  if (!user) {
    await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: 'T@lam132',
        role: Role.SUPER_ADMIN,
      }
    });
    console.log('User is created.');
  }

  const settings = [
    {
      key: 'NEXT_PUBLIC_API_BASE_URL',
      value: 'http://demo4.sasradius.com',
    },
    {
      key: 'NEXT_PUBLIC_API_USERNAME',
      value: 'admin',
    },
    {
      key: 'NEXT_PUBLIC_API_PASSWORD',
      value: 'admin',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Settings have been seeded.');
}

main()
  .then(() => console.log('All data is seeded!'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
