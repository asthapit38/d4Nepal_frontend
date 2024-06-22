'use server';
import { auth } from '@/auth';
import { User } from '@/lib/types';
import { redirect } from 'next/navigation';

export const getPlans = async () => {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) {
        redirect('/login?redirect=/subscription');
    }

    const response = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}/api/plans`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token!}`,
        },
    });
    if (!response.ok) {
         if (response.status === 500) {
            throw new Error('Internal Server Error');
         } else if (response.status === 404) {
           return [];
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }
    const data = await response.json();
    return data;
}