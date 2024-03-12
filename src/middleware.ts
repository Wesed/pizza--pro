import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
  console.log('ponto')
  const token = request.cookies.get('auth')
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()

  // const interceptorId = api.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     if (isAxiosError(error)) {
  //       console.log('aq')
  //       const status = error.response?.status
  //       const code = error.response?.data.code

  //       if (status === 401 && code === 'Unauthorized') {
  //         console.log('aq', status, code)
  //         api.interceptors.response.eject(interceptorId)
  //         return NextResponse.redirect(new URL('/sign-in', request.url))
  //       }
  //     }

  //     // Se não for um erro de autenticação, continue com a solicitação
  //     api.interceptors.response.eject(interceptorId)
  //     return NextResponse.next()
  //   },
  // )

  // Se não houver erro, continue com a solicitação
}

export const config = {
  matcher: ['/dashboard', '/orders'],
}
