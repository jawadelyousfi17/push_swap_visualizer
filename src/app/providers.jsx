'use client'
import { CssVarsProvider } from '@mui/joy'
import '@fontsource/inter'
import EmotionRegistry from './registry'

export default function Providers({ children }) {
  return (
    <EmotionRegistry>
      <CssVarsProvider>{children}</CssVarsProvider>
    </EmotionRegistry>
  )
}
