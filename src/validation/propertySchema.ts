import {z} from "zod"


export const propertyDataSchema = z.object({
    address1: z.string().min(1,"Address line 1 must contain a value"),
    address2: z.string().optional(),
    city: z.string().min(3, "City must contain 3 value"),
    postcode: z.string().refine((postcode)=>{
        const regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
        return regex.test(postcode);
    }, "Invalid postcode"),
    price: z.coerce.number().positive("Price must be greater than zero"),
    description: z.string().min(40, "Description must contain at least 40 characters"),
    bedrooms: z.coerce.number().min(0, "Bedrooms must be 0"),
    bathrooms: z.coerce.number().min(0, "bathrooms must be 0"),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
    state: z.enum(["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"])
});

export const propertyImagesSchema = z.object({
    images: z.array(z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File).optional(),
    }))
})

export const propertySchema = propertyDataSchema.and(propertyImagesSchema)