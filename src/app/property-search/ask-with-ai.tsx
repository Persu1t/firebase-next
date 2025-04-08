"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { askWithAI } from './action'
import { useAuth } from '@/context/auth'
import { useRouter } from 'next/navigation'
import { StarIcon } from 'lucide-react'

const AskWithAI = () => {
    const [chat, setChat] = React.useState<string>("")
    const [screenArray, setScreenArray] = React.useState<string[]>([])
    const auth = useAuth()
    const router = useRouter()

    const handleClick = async () => {
      const tokenResult = await auth?.currentUser?.getIdTokenResult()
        if(!tokenResult){
          router.push("/login")
          return;
        }
        const tempChatArray = [...screenArray, chat]
        setChat("")
        console.log(chat)
        const response = await askWithAI(chat, tokenResult?.token)
        if(typeof response === "string"){
          const temproryArray = [...tempChatArray, response]
          setScreenArray(temproryArray)
        }else{
          console.log("Error response from server", response)
        }
       
    }

  return (
    <AlertDialog>
    <AlertDialogTrigger><StarIcon/></AlertDialogTrigger>
    <AlertDialogContent >
      <AlertDialogHeader className='h-[60vh] overflow-y-scroll'>
        <AlertDialogTitle>Chat with our AI</AlertDialogTitle>
        <AlertDialogDescription className="">
            {screenArray.map((item, index) => (
              <>
              <span className={`block ${index % 2 !== 0 ? "text-right": "text-left"}`} key={index}>{item}</span>
              <br/>
              </>
                
            ))}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='md:flex md:flex-row-reverse'>
        <Button onClick={handleClick}>Send</Button>
        <Input value={chat} onChange={e => setChat(e.target.value)}/>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default AskWithAI