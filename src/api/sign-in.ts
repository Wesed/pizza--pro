import { api } from "@/utils/api"

export interface SignInBody {
  email: string
}
export async function signIn({email}: SignInBody) {
  console.log(email)
  await api('/authenticate', { 
    method: 'POST',
    body: JSON.stringify({
      email
    })
   })
}