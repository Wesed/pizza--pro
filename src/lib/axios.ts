// export function api(path: string,  init?: RequestInit) {
//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
//   const url = new URL(path, baseUrl)

//   console.log('aq', url)

//   return fetch(url, init)
// }

import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})