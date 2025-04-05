import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

//paso 1.6 creamos la pagina de Index
export default function IndexPage() {

  //V-325,paso 4.1 , le pasamos el state de drinks que es lo que queremos extraer
  const drinks = useAppStore((state) => state.drinks)

  //Paso 4.2,drinks.drinks.length comprueba si hay alguna bebida 
  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Recetas</h1>
      {/**Paso 4.3 ,comprobamos si hay bebidas*/}
      {hasDrinks ? (
        //Paso 4.14 le ponemos div
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {/**Paso 4.5 */}
          {drinks.drinks.map((drink) => (
            <DrinkCard
              //Paso 4.6 
              key={drink.idDrink}
              //Le pasamos el objeti
              drink={drink}
            />
          ))}
        </div>
      ) : (
        //Paso 4.4
        <p className="my-10 text-center text-2xl">
          No  hay resultados aún, utiliza el formulario para buscar recetas
        </p>
      )}
    </>
  )
}
