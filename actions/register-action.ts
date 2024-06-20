'use server';

import { signIn } from "@/auth";
import { SignUpSchemaType } from "@/lib/schema";

export const register = async (data: SignUpSchemaType) => {
    const res = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/auth/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data?.username,
            password1: data?.password,
            password2: data?.confirmPassword,
            email: data?.email,
          }),
    });
    const user = await res.json();

    await signIn("credentials", {
      username: data.username,
      password: data.password
    })
    if (!user) {
      throw new Error("User not found.")
    }
    return user
};