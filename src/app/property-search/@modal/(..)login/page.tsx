"use client"
import CommonLoginForm from '@/components/login-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { loginSuccess } from './action';

const LoginModal = () => {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={()=>{
      router.back();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Login
          </DialogTitle>
          <DialogDescription>
            You must be logged in to favourite a property
          </DialogDescription>
        </DialogHeader>
        <div>
          <CommonLoginForm onSuccess={async ()=>{
            await loginSuccess()
            router.back()
          }}/>
        </div>
        <DialogFooter className='block'>
          Don&apos;t have an account? <Link className='underline pl-2' href={"/register"}>Register here</Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal