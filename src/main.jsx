import { StrictMode } from 'react'
import {ChakraProvider, defaultSystem} from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import { UserProvider } from './utils/UserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <UserProvider>
          <App />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)
