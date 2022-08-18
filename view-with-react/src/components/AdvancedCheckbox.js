import React, { useReducer } from 'react'

function AdvancedCheckbox() {
  const [checked, setChecked] = useReducer((checked) => !checked, false)

  return (
    <>
      <label>
        {checked ? 'checked' : 'not checked'}
        <input
          type="checkbox"
          data-testid="checkbox"
          value={checked}
          onChange={() => setChecked((checked) => !checked)}
        />
      </label>
    </>
  )
}

export { AdvancedCheckbox as Checkbox }
