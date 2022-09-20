import * as React from 'react'
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/AutocompleteUnstyled'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;
`
)

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
)

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  )
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
)

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
)

interface CustomizedHookParams {
  labelName: string
  defaultValueIndex?: number
  onSelectedOptions?: (codes: string) => void
}

interface SampleType {
  title: string
  year: number
}

export default function CustomizedHook({
  labelName,
  defaultValueIndex = 1,
  onSelectedOptions
}: CustomizedHookParams) {
  const samples = React.useMemo(
    () => [
      { title: '1', year: 1 },
      { title: '2', year: 2 },
      { title: '3', year: 3 },
      { title: '4', year: 4 },
      { title: '5', year: 5 },
      { title: '6', year: 6 },
      { title: '7', year: 7 },
      { title: '8', year: 8 },
      { title: '9', year: 9 },
      { title: '10', year: 10 },
      { title: '11', year: 11 },
      { title: '12', year: 12 },
      { title: '13', year: 13 },
      { title: '14', year: 14 },
      { title: '15', year: 15 },
      { title: '16', year: 16 },
      { title: '17', year: 17 },
      { title: '18', year: 18 },
      { title: '19', year: 19 },
      { title: '20', year: 20 },
      { title: '21', year: 21 },
      { title: '22', year: 22 },
      { title: '23', year: 23 },
      { title: '24', year: 24 },
      { title: '25', year: 25 },
      { title: '26', year: 26 },
      { title: '27', year: 27 },
      { title: '28', year: 28 },
      { title: '29', year: 29 },
      { title: '30', year: 30 }
    ],
    []
  )

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [samples[defaultValueIndex]],
    multiple: true,
    options: samples,
    getOptionLabel: (option) => option.title,
    onChange: (event, value) => {
      if (onSelectedOptions) {
        onSelectedOptions(value.map(({ title }) => title).join('_'))
      }
    }
  })

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{labelName}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: SampleType, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} key={index} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof samples).map((option, index) => (
            <li {...getOptionProps({ option, index })} key={index}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  )
}
