import { render } from '@testing-library/react'
import { Pagination } from './pagination'

describe('Pagination', () => {
  it('should display the right amount of pages and results', () => {
    const wrapper = render(<Pagination />)

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })
})
