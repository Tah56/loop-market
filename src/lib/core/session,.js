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