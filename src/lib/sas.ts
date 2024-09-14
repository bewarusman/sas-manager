import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TOKEN_ERR_MSG = 'TOKEN_ERROR: Failed to receive token from SAS API! ';

async function getBearerToken() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const formdata = new FormData();
    formdata.append("username", process.env.NEXT_PUBLIC_API_USERNAME || 'admin');
    formdata.append("password", process.env.NEXT_PUBLIC_API_PASSWORD || 'admin');

    const result = await fetch(BASE_URL + "/admin/api/index.php/api/login", {
      method: "POST",
      body: formdata,
      redirect: "follow"
    });

    const response = await result.json();

    if (result.status !== 200) {
      throw new Error(TOKEN_ERR_MSG + response.message);
    }

    const storedKey = await prisma.keyStore.upsert({
      where: { key: response.token },
      update: {
        updatedAt: new Date(),
      },
      create: {
        key: response.token,
      },
    });

    return response.token;
  } catch (error) {
    throw new Error(TOKEN_ERR_MSG + error?.message);
  }
}

export async function fetchUsers(page: string, count: string, search: string) {
  const token = await getBearerToken();
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer ' + token
  );

  const formdata = new FormData();
  formdata.append('payload', '');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/api/index.php/api/index/user?page=${page}&count=${count}&search=${search}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
