/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogTitle, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { removeToken } from '@/context/action'
import { useAuth } from '@/context/auth'
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import React from 'react'
import { toast } from 'sonner'
import { deleteUserFavourites } from './action'

const DeleteAccountButton = () => {
    const auth = useAuth();
    const [isDeleting,  setIsDeleting] = React.useState(false)
    const [password, setPassword] = React.useState("");

    const handleDeleteClick = async()=>{
        if(auth?.currentUser?.email){
            setIsDeleting(true);
            try{
                await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, password));
                await deleteUserFavourites();
                await deleteUser(auth.currentUser);
                await removeToken();
                toast.success("Deleted the account successfully!");
            }catch(e: any){
                 toast.error(e.code === "auth/invalid-credential" ? "Your password is incorrect " : "An error occurred");
            }
            setIsDeleting(false);
        }
    }
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className='w-full'>
        Delete Account
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure you want to delete your account?
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    <div>
                        <Label>
                            Enter the current password to continue
                        </Label>
                        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteClick} disabled={isDeleting}>{isDeleting ? "Deleting...": "Delete Account"}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
 
}

export default DeleteAccountButton