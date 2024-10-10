export type LoginData = {
    email: string,
    password: string
}

export async function LoginUser(data: LoginData){
    try{
        const res = await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        return await res.json()
    }
    catch(err: any){
        console.log(err.message)
    }
}

export type RegisterData = {
    email: string,
    username: string,
    password: string
}

export async function RegisterUser(data: RegisterData){
    try{
        const res = await fetch('http://localhost:4000/user/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        return await res.json()
    }
    catch(err: any){
        console.log(err.message)
    }
}
