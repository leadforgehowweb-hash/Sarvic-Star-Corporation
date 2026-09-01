import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { BrandProvider } from './context/BrandContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrandProvider>
        <App />
      </BrandProvider>
    </ThemeProvider>
  </StrictMode>,
);
