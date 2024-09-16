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
    console.error(error);
    throw new Error(TOKEN_ERR_MSG + error?.message);
  }
}

async function sasRequest(
  endpoint: string,
  params: Record<string, string>,
  method: string = 'POST'
) {
  const token = await getBearerToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);

  const formdata = new FormData();
  formdata.append('payload', '');

  // Construct the URL with query parameters
  const queryParams = new URLSearchParams(params).toString();
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/api/index.php/${endpoint}?${queryParams}`;

  const response = await fetch(url, {
    method,
    headers: myHeaders,
    body: method === 'GET' ? null : formdata,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}


export async function fetchUsers(page: string, count: string, search: string) {
  const params = {
    page,
    count,
    search,
  };
  return sasRequest('api/index/user', params);
}

export async function fetchSingleUser(userId: number) {
  return sasRequest('api/user/${userId}', {}, 'GET');
}

export async function fetchProfiles() {
  return sasRequest('api/list/profile/0', {}, 'GET');
}

export async function Activate(profileId: number, userId: number) {
  const params = {
    user_id: `${userId}`,
    profile_id: `${profileId}`,
  };
  return sasRequest('api/index/user', params);
}