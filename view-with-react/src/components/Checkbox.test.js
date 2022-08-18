import { render, fireEvent } from '@testing-library/react'
import { Checkbox } from './AdvancedCheckbox'

describe('Component tests', () => {
  test('Selecting the checkbox should toggle its value', () => {
    const { getByLabelText } = render(<Checkbox />)
    const checkbox = getByLabelText(/not checked/i)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(false)
  })

  test('Selecting the checkbox should change the value of checked to true', () => {
    const { getByTestId } = render(<Checkbox />)
    const checkbox = getByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
  })
})
