'use server';

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const fetchBusinessType = async () => { 
    const session = await auth()
    if(!session || !session.user)  {
        redirect("/login?redirect=/setup/business");
    }

    const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/business-type/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
        }
    })

    console.log(response)

    if(!response.ok) {
        throw new Error('Something went wrong')
    }
    return response.json()

}