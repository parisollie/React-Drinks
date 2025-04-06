import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useAppStore } from '../stores/useAppStore'
import Notification from '../components/Notification'

export default function Layout() {

  //Paso 6.20 
  const loadFromStorage = useAppStore((state) => state.loadFromStorage)

  useEffect(() => {
    loadFromStorage()
  }, [])

  /*
     V-309,paso 1.12 , creamos el layout prncipal del header , 
     para todas las páginas ,Outlet
  */
  return (
    <>
      {/**Paso 1.15, ponemos el Header */}
      <Header />
      {/**Paso 1.17, ponemos el main, centramos el contenido  */}
      <main className='container mx-auto py-16'>
        {/**Paso 1.14, ponemos el outlet,inyecta el contenido de index o favoritos
         *pero nos permiten elementos que son comunes  
         */}
        <Outlet />
      </main>
      {/**Paso 5.3, ponemos el modal */}
      <Modal />
      {/**Paso 7.10 */}
      <Notification />
    </>
  )
}
