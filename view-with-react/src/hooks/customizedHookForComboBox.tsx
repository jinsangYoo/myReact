import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface CustomizedHookProps {
  labelName: string
  defaultValueIndex: number
  onSelectedOptions: (value: string) => void
}

export default function CustomizedHook({
  labelName,
  onSelectedOptions,
  defaultValueIndex = 0
}: CustomizedHookProps) {
  const samples = React.useMemo(
    () => [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30'
    ],
    []
  )

  const [value, setValue] = React.useState<string | null>(samples[defaultValueIndex])
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    onSelectedOptions(samples[defaultValueIndex])
  }, [])

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
        sx={{ width: 100 }}
        renderInput={(params) => <TextField {...params} label={labelName} />}
      />
    </div>
  )
}
