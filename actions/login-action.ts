'use server'
import { signIn } from "@/auth"
import { LoginSchemaType } from "@/lib/schema"
import { redirect } from 'next/navigation'


type LoginParameter = {
    credentials: LoginSchemaType
    redirectLocation: boolean | string
}

export const login = async ({credentials, redirectLocation}: LoginParameter) => {
    try {
        const response = await signIn("credentials", {
            username: credentials.username,
            password: credentials.password,
            redirect: false,
        })
        return response.data
    } catch (error) {
        console.log(`Error from action: ${error}`)
        throw new Error("Invalid credentials")
    } finally {
        if(!redirectLocation) {
            redirect("/dashboard")
        }else {
            redirect(redirectLocation as string)
        }
    }
}