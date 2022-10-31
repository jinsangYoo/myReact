import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface CustomizedHookProps {
  labelName: string
  defaultValueIndex: number
  onSelectedOptions: (value: string) => void
  minWidth?: number
  samples: string[]
}

export default function CustomizedHook({
  labelName,
  onSelectedOptions,
  samples,
  minWidth = 100,
  defaultValueIndex = 0
}: CustomizedHookProps) {
  const [value, setValue] = React.useState<string | null>(samples[defaultValueIndex])
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
          onSelectedOptions(newValue ?? '')
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="controllable-states-demo"
        options={samples}
        sx={{ width: minWidth }}
        renderInput={(params) => <TextField {...params} label={labelName} />}
      />
    </div>
  )
}
