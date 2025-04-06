import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

//Paso 1.9, creamos la pagina 
export default function FavoritesPage() {
  //V-339,paso 6.22
  const favorites = useAppStore((state) => state.favorites)
  //Paso 7.0,favorites.length, para comprobocar si tenemos favoritos o no 
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      {/**Paso 6.23 */}
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {/**Paso 7.1 */}
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {/**Paso 6.24 */}
          {favorites.map(drink => (
            <DrinkCard
              //Paso 6.25
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        //Paso 7.2
        <p className="my-10 text-center text-2xl">
          Los favoritos se mostrarán aquí
        </p>
      )}
    </>
  )
}
