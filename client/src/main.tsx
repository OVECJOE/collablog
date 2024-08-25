import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.tsx'
import '@mantine/core/styles.css';
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core';

const router = createBrowserRouter(routes)
const root = document.getElementById('root') as HTMLElement
const theme = createTheme({
  fontFamily: "'Kanit', sans-serif",
  fontSizes: {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '24px',
  },
  focusRing: 'always',
  cursorType: 'pointer',
})

createRoot(root).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
