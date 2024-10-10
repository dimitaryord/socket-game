'use client'
import { useRouter } from 'next/navigation'

import { RegisterData } from "@/actions/auth"
import { RegisterUser } from "@/actions/auth"
import { setAuth } from '@/store/cookies'

export default function Register() {

  const router = useRouter()

  const onSubmit = async (event:any) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const sendData: RegisterData = {
      email: data.get('email') as string,
      username: data.get('username') as string,
      password: data.get('password') as string
    }

    try{
      const res = await RegisterUser(sendData)
      if(!res.error){
        const {username, token} = res
        setAuth({username, token})
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
        <h1>Register</h1>
        <form onSubmit={onSubmit} className='flex flex-col space-y-2 mt-5'>
            <label>Email</label>
            <input name='email' className='shadow border-2' type="email" />

            <label>Username</label>
            <input name='username' className='shadow border-2' type="username" />

            <label>Password</label>
            <input name='password' className='shadow border-2' type="password" />

            <input className='shadow border-2 w-1/2' type="submit" />
        </form>
    </div>
  )
}