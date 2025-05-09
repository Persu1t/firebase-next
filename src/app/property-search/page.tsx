
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProperties } from '@/data/properties'
import React, { Suspense } from 'react'
import FiltersForm from './filters-form'
import Image from 'next/image'
import imageUrlFormatter from '@/lib/imageUrl'
import { BathIcon, BedIcon, HomeIcon } from 'lucide-react'
import numeral from 'numeral'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ToggleFavouriteButton from './toggle-favourite-button'
import { getUserFavourites } from '@/data/favourites'
import { auth } from '@/firebase/server'
import { cookies } from 'next/headers'
import { DecodedIdToken } from 'firebase-admin/auth'
import AskWithAI from './ask-with-ai'

const PropertySearch = async ({ searchParams }: { searchParams: any }) => {
    const searchParamsValues = await searchParams;
    const parsedPage = parseInt(searchParamsValues?.page);
    const parsedMinPrice = parseInt(searchParamsValues?.minPrice);
    const parsedMaxPrice = parseInt(searchParamsValues?.maxPrice);
    const parsedMinBedrooms = parseInt(searchParamsValues?.minBedrooms);

    const page = isNaN(parsedPage) ? 1 : parsedPage;
    const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
    const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
    const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

    const {data, totalPages} = await getProperties({
        pagination: {
            page,
            pageSize: 3
        },
        filters: {
            minPrice,
            maxPrice,
            minBedrooms,
            status: ["for-sale"]
        }
    });
    const userFavourites = await getUserFavourites();
    console.log({ userFavourites })

    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value
    let verifiedToken: DecodedIdToken | null;

    if(token){
        verifiedToken = await auth.verifyIdToken(token)
    }
    return (
        <div className='max-w-screen-lg mx-auto'>
            <h1 className='text-4xl font-bold p-5'>
                Property Search
            </h1>
            <Card>
                <CardHeader className='flex flex-row justify-between'>
                    <CardTitle>
                        Filters
                    </CardTitle>
                    <CardTitle>
                        <AskWithAI/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FiltersForm />
                    </Suspense>
                </CardContent>
            </Card>
            <div className='grid grid-cols-2 mt-5 gap-5 lg:grid-cols-3'>
                {data.map((property)=>{
                    const addressLines = [property.address1, property.address2, property.city, property.state, property.postcode].filter(addressLine => !!addressLine).join(", ")
                    return (
                        <Card key={property.id} className='overflow-hidden pt-0 pb-0'>
                        <CardContent className='px-0'>
                            <div className='h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center'>
                                {(!verifiedToken || !verifiedToken.admin) && <ToggleFavouriteButton isFavourite={userFavourites[property.id]} propertyId={property.id}/>}
                                
                                {!!property.images?.[0] && <Image fill className='object-cover' src={imageUrlFormatter(property.images[0])} alt='image'/>}
                                {!property.images?.[0] && (
                                    <>
                                        <HomeIcon/>
                                        <small>No Image</small>
                                    </>
                                )}
                            </div>
                            <div className='flex flex-col gap-5 p-5'>
                                <p>{addressLines}</p>
                                <div className='flex gap-5'>
                                    <div className='flex gap-2'>
                                        <BedIcon/> {property.bedrooms}
                                    </div>
                                    <div className='flex gap-2'>
                                        <BathIcon/> {property.bathrooms}
                                    </div>
                                </div>
                                <div>
                                    <p className='text-2xl'>₹{numeral(property.price).format("0,0")}</p>
                                </div>
                                <Button asChild>
                                    <Link href={`/property/${property.id}`}>
                                        View Property
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    )
                })}
            </div>
            <div className='flex gap-2 items-center justify-center py-10'>
            {Array.from({ length: totalPages }).map((_, i) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValues?.minPrice) {
            newSearchParams.set("minPrice", searchParamsValues.minPrice);
          }

          if (searchParamsValues?.maxPrice) {
            newSearchParams.set("maxPrice", searchParamsValues.maxPrice);
          }

          if (searchParamsValues?.minBedrooms) {
            newSearchParams.set("minBedrooms", searchParamsValues.minBedrooms);
          }

          newSearchParams.set("page", `${i + 1}`);

          return (
            <Button
              asChild={page !== i + 1}
              disabled={page === i + 1}
              variant="outline"
              key={i}
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>
                {i + 1}
              </Link>
            </Button>
          );
        })}
            </div>
        </div>
    );
}

export default PropertySearch;