import { PrismaClient } from "@prisma/client";
import { mode } from "crypto-js";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const count = Number(searchParams.get('count')) || 10;
    const search = searchParams.get('search') || '';

    const where = {
      OR: [
        {
          plan: {
            contains: search
          }
        },
        {
          email: {
            contains: search,
          },
        },
        {
          user: {
            contains: search,
          },
        }
      ]
    };

    const total = await prisma.activation.count({ where });
    const auditLogs = await prisma.activation.findMany({
      where,
      skip: (page - 1) * count,
      take: count,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Return the data to the frontend
    return Response.json({
      data: auditLogs,
      total,
      page,
      count,
      totalPages: Math.ceil(total / count),
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
