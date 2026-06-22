import { headers } from "next/headers"
import { auth } from "../auth"

export const product_data = async () =>{
  const user = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    

return user?.user
}


