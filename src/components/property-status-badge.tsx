import { propertyStatus } from '@/types/propertyStatus'
import React from 'react'
import { Badge } from './ui/badge'

const statusLabel = {
    "for-sale": "For Sale",
    withdrawn: "Withdrawn",
    draft: "Draft",
    sold: "Sold"
    
}

const variant: {[key: string]: "primary" | "destructive" | "secondary" | "success"} = {
    "for-sale": "primary",
    withdrawn: "destructive",
    draft: "secondary",
    sold: "success"
}

const PropertyStatusBadge = ({status, className}:{
    status: propertyStatus
    className?: string
}) => {
    const label = statusLabel[status];
  return (
    <div>
        <Badge variant={variant[status]} className={className}>{label}</Badge>
    </div>
  )
}


export default PropertyStatusBadge