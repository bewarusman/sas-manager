'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/settings
export async function GET() {
  try {
    const data = await prisma.setting.findMany();

    // Return the data to the frontend
    return Response.json(data, {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    // throw error;
    return Response.json({
      message: error?.message,
    }, {
      status: 500,
    });
  }
}
