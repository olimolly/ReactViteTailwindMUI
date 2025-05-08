// src/theme.ts
import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: { main: '#3f51b5' },
                    secondary: { main: '#f50057' },
                    background: {
                        default: '#f4f6f8',
                        paper: '#fff',
                    },
                }
                : {
                    primary: { main: '#90caf9' },
                    secondary: { main: '#f48fb1' },
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                }),
        },
        typography: {
            fontFamily: 'Raleway, sans-serif',
        },
    })
