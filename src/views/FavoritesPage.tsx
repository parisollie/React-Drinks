import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {
  //Vid 339 
  const favorites = useAppStore((state) => state.favorites)
  //favorites.length, para comprobocar si tenemos favoritos o no 
  const hasFavorites = useMemo(() => favorites.length , [favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map( drink => (
              <DrinkCard
              //Vid 339 
                key={drink.idDrink}
                drink={drink}
              />
          ) )}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Los favoritos se mostrarán aquí
        </p>
      )}
    </>
  )
}
