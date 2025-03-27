"use client"
import { useAuth } from '@/context/auth'
import Link from 'next/link'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar } from './ui/avatar'
import Image from 'next/image'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useRouter } from 'next/navigation'

const AuthButtons = () => {
    const auth = useAuth()
    const router = useRouter()
  return (
    <div>
        {
            !!auth?.currentUser && 
          <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {!!auth.currentUser.photoURL && (<Image src={auth.currentUser.photoURL} alt={`${auth.currentUser.displayName} avatar`} width={80} height={80}/>)}

                    <AvatarFallback className='text-sky-950 bg-slate-50 flex justify-center items-center w-full'>
                        {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                    </AvatarFallback>
                   
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div>{auth.currentUser.displayName}</div>
                    <div className='font-normal text-xs'>{auth.currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator>
                </DropdownMenuSeparator>
                <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                {!!auth.customClaims?.admin && (
                    <DropdownMenuItem asChild>
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
                )}
                {!auth.customClaims?.admin && (
                          <DropdownMenuItem asChild>
                          <Link href="/account/my-favourites">My Favorites</Link>
                      </DropdownMenuItem>
                )}
                
          
                <DropdownMenuItem onClick={async()=>{
                    await auth.logout()
                    router.refresh()
                }}>
                   Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            
        }
        {
            !auth?.currentUser && 
            <div className='flex gap-2 items-center'>
                <Link href="/login" className='uppercase tracking-widest hover:underline'>Login</Link>
                <div className='h-8 w-[1px] bg-white/50'/>
                <Link href="/register" className='uppercase tracking-widest hover:underline'>Register</Link>
            </div>
        }
    </div>
  )
}

export default AuthButtons