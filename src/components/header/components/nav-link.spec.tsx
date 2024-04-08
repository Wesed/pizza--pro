import { render } from '@testing-library/react'
import { NavLink } from './nav-link'

vi.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => [new URLSearchParams({ revalidate: '1' })],
  usePathname: () => '/dashboard',
}))

describe('NavLink', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/orders">Orders</NavLink>
      </>,
    )

    expect(wrapper.getByText('Dashboard').dataset.current).toEqual('true')
    expect(wrapper.getByText('Orders').dataset.current).toEqual('false')

    wrapper.debug()
  })
})
