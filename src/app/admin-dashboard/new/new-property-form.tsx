"use client";
import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { saveNewProperty } from "./action";
import { savePropertyImages } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";

export default function NewPropertyForm(){
    const auth = useAuth();
    const router = useRouter()
    const handleSubmit= async (data: z.infer<typeof propertySchema>)=>{
        const token = await auth?.currentUser?.getIdToken();
        if(!token){
            return
        }
        const {images, ...rest} = data
        const response = await saveNewProperty(rest, token)
        if(!!response.error || !response.propertyId){
            toast.error(response.message)
            return;
        }

        const uploadTasks: UploadTask[] = [];
        const paths: string[] = [];
        images.forEach((image, index)=>{
            if(image.file){
                const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}` 
                paths.push(path)
                const storageRef = ref(storage, path);
                uploadTasks.push(uploadBytesResumable(storageRef, image.file))
            }
        })

        await Promise.all(uploadTasks);
        await savePropertyImages({propertyId: response.propertyId, images: paths}, token)

        toast.success("Property created successfully!")
        router.push('/admin-dashboard')
        return;
    }
    return ( 
        <div>
            <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={<><PlusCircleIcon/> Create Property</>}/>
        </div>
    )
}