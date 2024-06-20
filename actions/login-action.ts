'use server'

import { signIn } from "@/auth"
import { LoginSchemaType } from "@/lib/schema"
import { redirect } from "next/navigation"

export const login = async (credentials: LoginSchemaType) => {
    try {
        await signIn("credentials", {
            username: credentials.username,
            password: credentials.password,
            redirect: false,
        })
    } catch (error) {
        console.log(error)
        throw new Error("Invalid credentials")
    }
}