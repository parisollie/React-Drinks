import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

//Paso 4.6
type DrinkCardProps = {
    //Paso 4.8
    drink: Drink
}

//Paso 4.9, le pasamos ": DrinkCardProps"
export default function DrinkCard({ drink }: DrinkCardProps) {
    //Paso 4.20
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        //V-326,Paso 4.11
        <div className="border shadow-lg">
            {/**Paso 4.16,con eso hacemos que el efecto de la imagen no salga de la card */}
            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    //Paso 4.15,efecto de la imagen
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>

            {/**Paso 4.12 */}
            <div className="p-5">
                {/**Paso 4.10,imprimimos la bebida */}
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                {/**Paso 4.13 */}
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                    //Paso 4.21
                    onClick={() => selectRecipe(drink.idDrink)}
                >Ver Receta</button>
            </div>
        </div>
    )
}
