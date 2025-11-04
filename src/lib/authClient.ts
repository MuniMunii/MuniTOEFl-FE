import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient=createAuthClient({
    plugins:[inferAdditionalFields({user:{noTelp:{type:"string"}}})],
    baseURL:"http://localhost:3000",
})
/**
 * @Usage for getting user session
 *  const { 
         data: session, 
         isPending, //loading state
         error, //error object
         refetch //refetch the session
     } = authClient.useSession()
 */