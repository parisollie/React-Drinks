import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router'
import './index.css'

//V-307,paso 1.8 , renderizamos el AppRouter
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
