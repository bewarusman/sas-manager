'use server';

import { PrismaClient } from "@prisma/client";
// import CryptoJS from 'crypto-js';
import { v4 as uuid } from "uuid";
import { getAppUrl, getPassword, getUsername } from "./app-url";
const prisma = new PrismaClient();

const TOKEN_ERR_MSG = 'TOKEN_ERROR: Failed to receive token from SAS API! ';
const API_ERROR_MSG = 'API_ERROR: Failed to read from API | ';

async function getBearerToken() {
  try {
    const BASE_URL = await getAppUrl() || 'https://demo4.sasradius.com/';
    const formdata = new FormData();
    formdata.append("username", await getUsername() || 'admin');
    formdata.append("password", await getPassword() || 'admin');

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
    if (error instanceof Error) {
      console.error(error);
      throw new Error(TOKEN_ERR_MSG + error?.message);
    } else {
      throw new Error(TOKEN_ERR_MSG + 'unknown erro occured!')
    }
  }
}

async function sasRequest(
  endpoint: string,
  params: Record<string, string>,
  method: string = 'POST'
) {
  const token = await getBearerToken();
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);

  const formdata = new FormData();
  formdata.append('payload', '');

  // Construct the URL with query parameters
  const queryParams = new URLSearchParams(params).toString();
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}?${queryParams}`;

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'GET' ? null : formdata,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(API_ERROR_MSG + response.statusText + ' | ' + response.status);
  }
  return response.json();
}


export async function fetchUsers(page: string, count: string, search: string) {
  const params = {
    page,
    count,
    search,
  };
  return sasRequest('admin/api/index.php/api/index/user', params);
}

export async function fetchSingleUser(userId: number) {
  return sasRequest('admin/api/index.php/api/user/${userId}', {}, 'GET');
}

export async function fetchProfiles() {
  return sasRequest('admin/api/index.php/api/list/profile/0', {}, 'GET');
}

export async function changeProfile(userId: number, profileId: number) {
  console.log('profile changed!');
  const params = {
    transaction_id: uuid(),
    user_id: `${userId}`,
    profile_id: `${profileId}`,
    method: "reward_points",
  };
  return sasRequest('admin/api/index.php/api/user/changeProfile', params);
}

export async function activate(
  userId: number,
  email: string,
  plan: string,
  user: string) {
  await prisma.activation.create({
    data: {
      email,
      user: user,
      plan: plan,
    }
  });
  const params = {
    transaction_id: uuid(),
    issue_invoice: "true",
    user_id: `${userId}`,
    money_collected: "true",
    pin: "",
    method: "credit",
    comments: `Activated by ${email}`,
  };

  return sasRequest('admin/api/index.php/api/index/user', params);
}

export async function extendService(userId: number, profileId: number) {
  const params = {
    transaction_id: uuid(),
    user_id: `${userId}`,
    profile_id: `${profileId}`,
    method: "reward_points",
    // expiration: '30'
  };
  return sasRequest('admin/api/index.php/api/user/expiration', params);
}