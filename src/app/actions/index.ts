
'use server'

import { signIn, signOut } from "@/auth";

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialLogin(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return {
      message: 'Login Success',
      success: true,
    };
  } catch (err: any) {
    return {
      message: err.message,
      success: false,
    }
  }
}
