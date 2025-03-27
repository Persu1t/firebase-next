"use server"

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";
import { z } from "zod";

export const saveNewProperty = async (data: {
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: "for-sale" | "sold" | "draft" | "withdrawn"
    state : "Andhra Pradesh"|
    "Arunachal Pradesh"|
    "Assam" |
    "Bihar" |
    "Chhattisgarh" |
    "Goa" |
    "Gujarat" |
    "Haryana" |
    "Himachal Pradesh" |
    "Jammu and Kashmir" |
    "Jharkhand" |
    "Karnataka" |
    "Kerala" |
    "Madhya Pradesh" |
    "Maharashtra" |
    "Manipur" |
    "Meghalaya" |
    "Mizoram" |
    "Nagaland" |
    "Odisha" |
    "Punjab" |
    "Rajasthan" |
    "Sikkim" |
    "Tamil Nadu" |
    "Telangana" |
    "Tripura" |
    "Uttarakhand" |
    "Uttar Pradesh" |
    "West Bengal" |
    "Andaman and Nicobar Islands" |
    "Chandigarh" |
    "Dadra and Nagar Haveli" |
    "Daman and Diu" |
    "Delhi" |
    "Lakshadweep" |
    "Puducherry";
}, authToken: string)=>{
    const verifiedToken = await auth.verifyIdToken(authToken);
    if(!verifiedToken.admin){
        return{
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = propertyDataSchema.safeParse(data);
    if(!validation.success){
        return {
            error: true,
            message: validation.error.issues[0]?.message ?? "An error occurred" 
        }
    }

    const property = await firestore.collection("properties").add({
        ...data,
        created: new Date(),
        updated: new Date()
    })

    return {
        propertyId: property.id
    }
}

