import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Container, Typography, Button, Box, Stack } from '@mui/material'
import { useColorMode } from './ThemeContext'
import SurveyStepper from './components/SurveyStepper/SurveyStepper'

function App() {
  const [count, setCount] = useState(0)
  const { toggleColorMode } = useColorMode()

  return (
    <>
      <SurveyStepper />

      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Box>

        <Typography variant="h3" gutterBottom>
          Vite + React + MUI
        </Typography>

        <Stack spacing={2} alignItems="center">
          <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>

          <Typography>
            Edit <code>src/App.tsx</code> and save to test HMR
          </Typography>

          <Button variant="outlined" onClick={toggleColorMode}>
            🌗 Basculer clair/sombre
          </Button>
        </Stack>

        <Typography sx={{ mt: 4 }} className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
      </Container>
      
    </>

  )
}

export default App
