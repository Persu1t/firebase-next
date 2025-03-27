/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth';
import { passwordValidation } from '@/validation/registerUser'
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod'



const formSchema = z.object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    newPasswordConfirm: passwordValidation
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        message: "passwords do not match",
        path: ["newPasswordConfirm"],
        code: "custom",
      });
    }
  });

 

const UpdatePasswordForm = () => {
    const auth = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
        }
})

const handleSubmit = async(data: z.infer<typeof formSchema>)=>{
    const user = auth?.currentUser;
    if(!user?.email){
        return;
    }
    try {
        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, data.currentPassword));
        await updatePassword(user,data.newPassword);
        toast.success("Password updated successfully!");
        form.reset();
    } catch (error : any) {
        toast.error(error.code === "auth/invalid-credential" ? "Your password is incorrect " : "An error occurred");
        console.log({ error })
    }
}


  return (
    <div className='pt-5 mt-5 border-t'>
        <h2 className='text-2xl font-bold pb-2'>Update Password</h2>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset className='flex flex-col gap-4' disabled={form.formState.isSubmitting}>
            <FormField control={form.control} name='currentPassword' render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Current Password
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder = "Current password" type='password'/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

<FormField control={form.control} name='newPassword' render={({field})=>(
                <FormItem>
                    <FormLabel>
                        New Password
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder = "Current password Confirm" type="password"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                
            )}/>

<FormField control={form.control} name='newPasswordConfirm' render={({field})=>(
                <FormItem>
                    <FormLabel>
                        New Password Confirm
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder = "Current password" type="password"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <Button type='submit'>Update Pawword</Button>
            </fieldset>
        </form>
    </Form>
    </div>
  )
}

export default UpdatePasswordForm