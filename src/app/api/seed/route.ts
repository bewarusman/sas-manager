import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET() {
  await seedUser();
  await seedSettings();
  return Response.json({ message: 'Seed successful' });
}

const seedUser = async () => {
  const email: string = 'admin@admin.com';
  const adminUser = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (adminUser) {
    return Response.json({ message: "Super admin user is already created!" });
  }

  const hashedPassword = await bcrypt.hash('D@vad132', 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
}

const seedSettings = async () => {
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