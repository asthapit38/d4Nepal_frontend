import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

export const SignOutBtn = () => {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({
                    redirectTo: "/",
                })
            }}
        >
            <Button type="submit" variant={"ghost"} className='w-full'>Sign Out</Button>
        </form>
    )
}
