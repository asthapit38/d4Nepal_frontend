'use server';
import { auth } from '@/auth';
import { SubscriptionSchemaType } from '@/lib/schema';
import { redirect } from 'next/navigation';

export const subscribe = async (subscription: SubscriptionSchemaType) => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect('/login?redirect=/subscription');
    }

    const response = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}api/subscriptions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
            plan_id: subscription.plan_id,
            start_date: subscription.start_date,
            end_date: subscription.end_date,
            status: subscription.status,
        }),
    });
    if (!response.ok) {
        if (response.status === 500) {
            console.log(response)
            throw new Error('Internal Server Error');
        } else {
            console.log(response)
            throw new Error(`Error: ${response.status}`);
        }
    }
    return response.json();
}

export const getUserSubcription = async () => {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) {
        redirect('/login?redirect=/subscription');
    }
    
    const response = await fetch(`
        ${process.env.NEXTAUTH_BACKEND_URL}/api/subscriptions/`, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
        },
    });
    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('Internal Server Error');
        } else if (response.status === 404) {
            return null;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }
    return response.json();
}