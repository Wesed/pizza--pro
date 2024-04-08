import { render } from '@testing-library/react'
import SignIn from './page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')
  return {
    ...actual,
    useSearchParams: vi.fn(
      () => new URLSearchParams({ email: 'johndoe@example.com' }),
    ),
  }
})

describe('SignIn', () => {
  it('should set default email input values if email is present on search params', () => {
    const queryClient = new QueryClient()
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <SignIn />
      </QueryClientProvider>,
    )

    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('johndoe@example.com')

    wrapper.debug()
  })
})
