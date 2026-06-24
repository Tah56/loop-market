import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"



export const getUser = async(role) =>{
    const user = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const data=user?.user
    if(!data){
        redirect("/auth/singIn")
    }
    if(data.role !== role){
        redirect('/unauthorized')
    }
}

export const getUsers = async() =>{
    const user = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
   return user.user
}

export const buyerInfo = async(email)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${email}`)
    const data = await res.json()
    return data
}

export const paymentInfo = async (data,method="POST")=>{
     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/payments`,{
        method,
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
     })
     const datas = await res.json()
   
   console.log(datas);
   return datas
}

export const ss = async()=>{
    const headersList  = await headers();
    
const origin = headersList.get("origin");
return origin
}