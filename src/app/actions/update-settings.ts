'use server';

import { PrismaClient, Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import { PrismaClientRustPanicError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { APP_PASSWORD, APP_URL, APP_USERNAME, resetCache } from '@/lib/app-url';

const prisma = new PrismaClient();

export async function doUpdateSettings(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const base_url = formData.get('base_url') as string;

  if (!username || !password || !base_url) {
    return { message: 'All fields are required.' };
  }

  try {
    await prisma.setting.upsert({
      where: { key: APP_URL },
      update: { value: base_url },
      create: {
        key: APP_URL,
        value: base_url,
      },
    });

    await prisma.setting.upsert({
      where: { key: APP_USERNAME },
      update: { value: username },
      create: {
        key: APP_USERNAME,
        value: username,
      },
    });

    await prisma.setting.upsert({
      where: { key: APP_PASSWORD },
      update: { value: password },
      create: {
        key: APP_PASSWORD,
        value: password,
      },
    });

    await resetCache(APP_URL);

    redirect('/settings');
  } catch (error: any) {
    if (error instanceof PrismaClientValidationError
      || error instanceof PrismaClientRustPanicError
    ) {
      return { message: 'Validation Error:' + error.message };
    } else {
      return { message: 'An unexpected error occurred:' + error.message };
    }
  }
}
