'use client'
import { useRouter } from 'next/navigation'

import { LoginUser } from "@/actions/auth"
import { LoginData } from "@/actions/auth"
import { setAuth } from '@/store/cookies'

function Login() {

 const router = useRouter()

 const onSubmit = async (event: any) => {

    event.preventDefault()
    const data = new FormData(event.target)

    const sendData: LoginData = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }

    try{
      const res = await LoginUser(sendData)
      if(!res.error){
        const {token, username} = res
        setAuth({token, username})
        router.push('/lobby')
      }
      else alert('error')

    }
    catch(error){
      console.log(error)
    }
 }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={onSubmit} className='flex flex-col space-y-2 mt-5'>
            <label>Email</label>
            <input name='email' className='shadow border-2' type="email" />
            <label>Password</label>
            <input name='password' className='shadow border-2' type="password" />
            <input className='shadow border-2 w-1/2' type="submit" />
        </form>
    </div>
  )
}

export default Login