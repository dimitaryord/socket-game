import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


const notLoggedPrefixes = ['/login', '/register']
const loggedPrefixes = ['/lobby', '/game']


export function middleware(request: NextRequest){
    const { pathname } = request.nextUrl
    const isAuth = request.cookies.has('isAuth')

    if(notLoggedPrefixes.some(prefix => pathname.startsWith(prefix))){
        if(isAuth)
            return NextResponse.redirect(new URL('/lobby', request.url))
        return NextResponse.next()
    }

    if(loggedPrefixes.some(prefix => pathname.startsWith(prefix)) && !isAuth){ 
        return NextResponse.redirect(new URL('/login', request.url))
    }

   return NextResponse.next()
}

