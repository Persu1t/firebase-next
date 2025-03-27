import { Skeleton } from '@/components/ui/skeleton'
import { HomeIcon } from 'lucide-react'
import React from 'react'

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Renders a loading skeleton with a centered home icon.
 * The skeleton is styled as a circular element with fixed positioning,
 * centered both vertically and horizontally on the screen.
 */

/******  987c2c71-c12c-4ec9-8371-553ab059a7a0  *******/
const Loading = () => {
  return (
    <>
    <Skeleton className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-sky-950 text-white flex justify-center items-center'>
     <HomeIcon/>
 </Skeleton>
</>
  )
}

export default Loading