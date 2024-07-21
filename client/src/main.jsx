import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '@/Context/AuthProvider.jsx';
import { ToggleProvider } from '@/Context/ToggleProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToggleProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ToggleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
