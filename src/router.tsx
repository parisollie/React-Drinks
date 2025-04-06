import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import GenerateAI from './views/GenerateAI'

//Vid paso 7.29
const IndexPage = lazy(() => import('./views/IndexPage'))
//V-345,paso 7.27
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

//V-307,paso 1.3,configuramos el react router
export default function AppRouter() {
  return (
    //Paso 1.4
    <BrowserRouter>
      <Routes>
        {/**Paso 1.13, mandamos a llamar a nuesto latout */}
        <Route element={<Layout />}>

          {/**Paso 1.5,definimos la pagina principal y element la página que se va a cargar */}
          <Route path='/' element={
            //Paso 7.28,ponemos el suspense
            <Suspense fallback="Cargando...">
              {/**Paso 1.7, renderizamos la pagina principal */}
              <IndexPage />
            </Suspense>
            //Paso 1.16, le ponemos un index
          } index />

          <Route path='/favoritos' element={
            <Suspense fallback="Cargando...">
              <FavoritesPage />
            </Suspense>
          } />

          {/**V-346,paso 8.0 */}
          <Route path="/generate" element={<GenerateAI />} />





        </Route>
      </Routes>
    </BrowserRouter>
  )
}
