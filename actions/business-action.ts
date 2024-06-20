'use server';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BusinessSchemaType } from "@/lib/schema";
import { Kpi } from "@/lib/types";

export const createBusiness = async ({data, kpi} : {data: BusinessSchemaType, kpi: Kpi[]}) => {
    // refractor kpi array to only contain the id
    const selectedKpiIds = kpi.map((kpi) => kpi.id);
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login?redirect=/setup/business");
    }
    const respsonse = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/business/profile/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
            name: data.name,
            business_type_id: data.businessType,
            kpi: selectedKpiIds,
        }),
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

    const business = await respsonse.json();
    redirect("/setup/upload?businessId=" + business.id);
}


export const getBusiness = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/login?redirect=/setup/business");
    }
    const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/business/profile/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if(!response.ok) {
        if (response.status === 401) {
            redirect("/login?redirect=/setup/business");
        }else if (response.status === 404) {
            throw new Error("Business not found");
        } else if (response.status === 500) {
            throw new Error("Internal Server Error");
        }else {
            console.log(await response.json());
            throw new Error("Unknown Error");
        }
    }

    return await response.json();
}   


export const getBusinessStats = async (businessId: string) => {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login?redirect=/dashboard");
    }
    const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/business-stats/" + businessId + "/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if(!response.ok) {
        if (response.status === 401) {
            redirect("/login?redirect=/dashboard");
        }else if (response.status === 404) {
            throw new Error("Business not found");
        } else if (response.status === 500) {
            console.log(await response.json());
            throw new Error("Internal Server Error");
        }else {
            console.log(await response.json());
            throw new Error("Unknown Error");
        }
    }

    return await response.json();
}