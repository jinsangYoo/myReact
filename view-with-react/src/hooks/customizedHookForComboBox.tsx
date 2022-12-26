import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface CustomizedHookProps {
  labelName: string
  defaultValueIndex: number
  onSelectedOptions: (value: string) => void
  id?: string
  minWidth?: number
  fullWidth?: boolean
  samples: string[]
}

export default function CustomizedHook({
  labelName,
  onSelectedOptions,
  samples,
  id = 'controllable-states-demo',
  fullWidth = false,
  minWidth = 100,
  defaultValueIndex = 0
}: CustomizedHookProps) {
  const [value, setValue] = React.useState<string | null>(samples[defaultValueIndex])
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div>
      <Autocomplete
        value={value}
        fullWidth={fullWidth}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
          onSelectedOptions(newValue ?? '')
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id={id}
        options={samples}
        sx={{ width: minWidth }}
        renderInput={(params) => <TextField {...params} label={labelName} />}
      />
    </div>
  )
}
