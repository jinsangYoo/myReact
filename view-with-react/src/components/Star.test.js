import { render, screen } from '@testing-library/react'
import Star from './Star'

describe('Component tests', () => {
  test('render a star', () => {
    const { container } = render(<Star />)
    expect(container.querySelector('svg')).toHaveAttribute('color', 'grey')
  })

  test('render an h1', () => {
    const { getByText } = render(<Star />)
    const h1 = getByText(/Great Star/)
    expect(h1).toHaveTextContent('Great Star')
  })
})
