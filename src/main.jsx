import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/inter';


import { CssVarsProvider } from '@mui/joy';


createRoot(document.getElementById('root')).render(
    <CssVarsProvider>
        <App />
    </CssVarsProvider>
)
