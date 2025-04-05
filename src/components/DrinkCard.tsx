import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

//Vid 325
type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({drink} : DrinkCardProps) {

    //Vid 327
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img 
                //Vid 326
                    src={drink.strDrinkThumb} 
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>

            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                    //Vid 327
                    onClick={() => selectRecipe(drink.idDrink)}
                >Ver Receta</button>
            </div>
        </div>
    )
}
