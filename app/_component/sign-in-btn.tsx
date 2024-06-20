'use client';
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

export const SignInBtn = () => {
    return (
        <Button onClick={() => signIn()}>
            Sign In
        </Button>
    )
}
