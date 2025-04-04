"use server"

import { auth, firestore } from "@/firebase/server"
import { FieldValue } from "firebase-admin/firestore"
import OpenAI from "openai";



export const removeFavourite = async (propertyId: string, authToken: string) => {
    const verifiedToken  = await auth.verifyIdToken(authToken)

    if(!verifiedToken){
        return{
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("favourites").doc(verifiedToken.uid).update({
        [propertyId]: FieldValue.delete()
    })
}

export const addFavourite = async(propertyId: string, authToken: string)=>{
    const verifiedToken  = await auth.verifyIdToken(authToken)

    if(!verifiedToken){
        return{
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("favourites").doc(verifiedToken.uid).set({
        [propertyId]:true
    },{merge:true})
}

export const askWithAI = async (question: string, authToken: string) =>{
    const verifiedToken  = await auth.verifyIdToken(authToken)

    if(!verifiedToken){
        return{
            error: true,
            message: "Unauthorized"
        }
    }

    const client = new OpenAI();
    const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: question,
            },
        ],
    });
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content
}