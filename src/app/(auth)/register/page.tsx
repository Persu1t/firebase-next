import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import RegisterForm from './register-form'
import Link from 'next/link'

const Register: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Register
        </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm/>
        </CardContent>
        <CardFooter>
          Already have an account? <Link href="/login" className='underline pl-2'>Login here</Link>
        </CardFooter>
    </Card>
  )
}

export default Register