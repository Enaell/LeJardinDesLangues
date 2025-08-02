import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import './core/i18n/config';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
