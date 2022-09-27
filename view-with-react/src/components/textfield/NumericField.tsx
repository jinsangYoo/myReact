import React from 'react'
import { TextField } from '@mui/material'

interface State {
  label?: string
  fullWidth?: boolean
  id: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  name?: string
  defaultValue?: unknown
}

export default function NumericField(props: State) {
  const [state, setState] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regx = /^[0-9\b]+$/
    if (event.currentTarget.value === '' || regx.test(event.target.value)) {
      setState(event.target.value)
    }
  }
  return (
    <TextField
      type="text"
      value={state}
      label={props.label}
      fullWidth={props.fullWidth}
      onChange={handleChange}
      id={props.id}
      required={props.required}
      disabled={props.disabled}
      error={props.error}
      helperText={props.helperText}
      name={props.name}
      defaultValue={props.defaultValue}
    />
  )
}
