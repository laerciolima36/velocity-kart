import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import AlugueisProvider from './store/AlugueisProvider/AlugueisProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlugueisProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlugueisProvider>
  </StrictMode>,
)