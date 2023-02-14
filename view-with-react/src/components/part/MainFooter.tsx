import * as React from 'react'
import { Typography } from '@mui/material'

export default function MainFooter() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright @ '}
      jinsang, {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
