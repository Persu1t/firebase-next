"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/firebase/client'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const ForgotPasswordForm = () => {
    const [email, setEmail] = React.useState("")
    const router = useRouter();
  return (
    <form onSubmit={async (e)=>{
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        toast.success("We have sent an mail for password reset to you please check it...")
        router.back();
    }} className='flex flex-col gap-4'>
        <Input type='email' value={email} onChange={e=>setEmail(e.target.value)}/>
        <Button className='w-full' type="submit">Reset Password</Button>
    </form>
  )
}

export default ForgotPasswordForm