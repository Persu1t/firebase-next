"use client"

import CommonLoginForm from '@/components/login-form'

import { useRouter } from 'next/navigation'
import React from 'react'





const LoginForm = () => {

    const router = useRouter();
    return (
        <CommonLoginForm onSuccess={()=>{router.refresh()}}/>
    )
}

export default LoginForm