'use server'

import { auth } from "@/auth";
import { activate, changeProfile, extendService } from "@/lib/sas";

export async function doActivateData(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email!;

  const userId = formData.get('userId')?.toString();
  const profileId = formData.get('profileId')?.toString();
  const profile = formData.get('profile')?.toString();
  const user = formData.get('user')?.toString();

  await changeProfile(parseInt(userId!), parseInt(profileId!));
  await activate(parseInt(userId!), email, profile!, user!);
  // await extendService(parseInt(userId!), parseInt(profileId!));

  return {
    success: true,
    message: 'Data is activated for the user successfully!'
  };
}
