'use server'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const uploadFile = async (formData: FormData) => {
    console.log({ formData })
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login?redirect=/setup/upload/?businessId=" + formData.get("business_id"));
    }

    const respsonse = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/upload-data/", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
    });

    if(!respsonse.ok) {
        if (respsonse.status === 401) {
            redirect("/login?redirect=/setup/business");
        }else if (respsonse.status === 400) {
            console.log(await respsonse.json());
            throw new Error("Bad Request");
        } else if (respsonse.status === 500) {
            console.log(await respsonse.json());
            throw new Error("Internal Server Error");
        }else {
            console.log(await respsonse.json());
            throw new Error("Unknown Error");
        }
    }

    redirect("/dashboard");
}