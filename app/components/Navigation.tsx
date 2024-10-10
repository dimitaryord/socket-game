'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { getAuth } from '@/store/cookies'
import { AuthType } from '@/store/cookies'

function Navigation() {

    const path = usePathname()
    const [user, setUser] = useState<AuthType  | undefined>() 

    useEffect(() => {
      setUser(getAuth())
    }, [path])


    if(user){
      const {username} = user
      return (
        <nav className="flex space-x-5 my-auto">
            <p>{ username }</p>
            <Link href='/'>Home</Link>
            <Link href='/lobby'>Lobby</Link>
        </nav>
      )
    }
  return (
    <nav className="flex space-x-5 my-auto">
        <Link href='/'>Home</Link>
        <Link href='/login'>Login</Link>
        <Link href='/register'>Register</Link>
    </nav>
  )
}

export default Navigation