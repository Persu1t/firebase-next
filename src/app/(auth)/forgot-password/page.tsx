import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ForgotPasswordForm from './forgot-password-form'

const ForgotPassword = () => {
  return (
    <Card>
       <CardHeader>
            <CardTitle className='text-3xl font-bold'>
                Forgot Password
            </CardTitle>
            <CardDescription>
                Enter your email below and we will send you a link to reset your password
            </CardDescription>
        </CardHeader> 
        <CardContent>
            <ForgotPasswordForm/>
        </CardContent>
    </Card>
  )
}

export default ForgotPassword