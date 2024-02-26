import { api } from "@/lib/axios"

export interface SignInBody {
  email: string
}
// export async function signIn({email}: SignInBody) {
//   console.log(email)
//   await fetch('http://localhost:3333/authenticate', { 
//     method: 'POST',
//     body: JSON.stringify({
//       email
//     })
//    })
// }

export async function signIn({email}: SignInBody) {
  await api.post('/authenticate', { email })
}