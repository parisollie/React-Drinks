import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useAppStore } from '../stores/useAppStore'
import Notification from '../components/Notification'

export default function Layout() {

  //Vid 338 
  const loadFromStorage = useAppStore((state) => state.loadFromStorage)

  useEffect(() => {
    loadFromStorage()
  }, [])

  //Vid 309 Outlet
  return (
    <>
        <Header />

        <main className='container mx-auto py-16'>
            <Outlet />
        </main>
        
        <Modal />
        
        <Notification />
    </>
  )
}
