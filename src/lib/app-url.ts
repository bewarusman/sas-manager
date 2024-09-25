import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const APP_URL = 'NEXT_PUBLIC_API_BASE_URL';
export const APP_USERNAME = 'NEXT_PUBLIC_API_USERNAME';
export const APP_PASSWORD = 'NEXT_PUBLIC_API_PASSWORD';

const cache: { key: string, value: string }[] = [];

const setCache = (key: string, value: string) => {
  const existingItem = cache.find(item => item.key === key);
  if (existingItem) {
    existingItem.value = value;
  } else {
    cache.push({ key, value });
  }
}

const getCache = (key: string) => {
  return cache.find(c => c.key === key)?.value;
}

export const resetCache = async (key: string) => {
  const settings = await prisma.setting.findMany();
  console.log(settings);

  const app_url = settings.find(s => s.key === APP_URL)?.value;
  setCache(APP_URL, app_url!);

  const username = settings.find(s => s.key === APP_USERNAME)?.value;
  setCache(APP_USERNAME, username!);

  const password = settings.find(s => s.key === APP_PASSWORD)?.value;
  setCache(APP_PASSWORD, password!);

  return settings.find(s => s.key === key)?.value
}

export const getAppUrl = async () => {
  const value = getCache(APP_URL);
  if (!value) {
    return await resetCache(APP_URL);
  }

  return value!;
}

export const getUsername = async () => {
  const value = getCache(APP_USERNAME);
  if (!value) {
    return await resetCache(APP_USERNAME);
  }

  return value!;
}

export const getPassword = async () => {
  const value = getCache(APP_PASSWORD);
  if (!value) {
    return await resetCache(APP_PASSWORD);
  }

  return value!;
}
