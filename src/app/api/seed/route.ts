import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET() {
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

  return Response.json({ message: 'Seed successful', user })
}
