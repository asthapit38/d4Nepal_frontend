import React from 'react'

import Image from "next/image"
import Link from "next/link"

import { RegisterForm } from '../_components/register-form'

const RegisterPage = () => {
    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-screen max-h-screen">
            <div className="flex items-center justify-center py-12 h-full">
                <div className="mx-auto grid w-[400px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold uppercase tracking-wider">Register</h1>
                        <p className="text-muted-foreground text-sm ">
                            Enter your username and email below to create your account
                        </p>
                    </div>
                    <RegisterForm />
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative">
                <Image
                    fill={true}
                    src="/login.jpeg"
                    alt="Image"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default RegisterPage

