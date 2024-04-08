import { render } from '@testing-library/react'
import { Pagination } from './pagination'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

/* explicacao
   esses mocks sao necessarios pq o vitest nao consegue receber os dados vindos
   do react query  */
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      useQuery: () => ({
        data: {
          meta: {
            totalCount: 200,
            perPage: 10,
          },
        },
      }),
    }
  }
})

let replaceArgs: string[] = []
// simulei como se estivesse na pagina 5 (return 5)
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn((...args) => {
        replaceArgs = args
      }),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn((param) => {
        if (param === 'page') {
          return '5'
        }
      }),
    })),
    usePathname: vi.fn(),
  }
})

describe('Pagination', () => {
  it('should display the right amount of pages and results', () => {
    const queryClient = new QueryClient()
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Pagination />
      </QueryClientProvider>,
    )

    expect(wrapper.getByText('Página 5 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const queryClient = new QueryClient()
    const user = userEvent.setup()

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Pagination />
      </QueryClientProvider>,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(replaceArgs[0]).toContain('page=6')
  })

  it('should be able to navigate to the previous page', async () => {
    const queryClient = new QueryClient()
    const user = userEvent.setup()

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Pagination />
      </QueryClientProvider>,
    )

    const beforePageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(beforePageButton)

    expect(replaceArgs[0]).toContain('page=4')
  })

  it('should be able to navigate to the first page', async () => {
    const queryClient = new QueryClient()
    const user = userEvent.setup()

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Pagination />
      </QueryClientProvider>,
    )

    const beforePageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(beforePageButton)

    expect(replaceArgs[0]).toContain('page=1')
  })

  it('should be able to navigate to the last page', async () => {
    const queryClient = new QueryClient()
    const user = userEvent.setup()

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Pagination />
      </QueryClientProvider>,
    )

    const beforePageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(beforePageButton)

    expect(replaceArgs[0]).toContain('page=20')
  })
})
