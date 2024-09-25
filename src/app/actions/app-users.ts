'use server';

import { PrismaClient, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as bcrypt from "bcrypt";
import { PrismaClientRustPanicError, PrismaClientValidationError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export async function doCreateUser(prevState: any, formData: FormData) {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!email || !password || !role) {
    return { message: 'All fields are required.' };
  }

  try {
    // Create a new user in the database using Prisma
    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10), // Use hashedPassword if you're hashing it
        role: role as Role,
      },
    });

    // Optionally revalidate the page where user data is listed
    revalidatePath('/app-user');

    // Redirect to the users list page after successful creation
    redirect('/app-user');
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
