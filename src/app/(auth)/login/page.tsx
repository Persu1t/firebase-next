
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './login-form'
import Link from 'next/link'

const Login: React.FC = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
        <CardFooter>
          Don&apos;t have an account? <Link href="/register" className='underline pl-2'>Register here</Link>
        </CardFooter>
      </Card>
      
    </div>
  )
}

export default Login
