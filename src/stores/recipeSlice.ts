import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

//V-316,paso 2.9 
export type RecipesSliceType = {
    //Paso 2.1 y paso 2.24, solo cambia el nombre y ya
    categories: Categories
    //Paso 3.24
    drinks: Drinks
    //Paso 4.24
    selectedRecipe: Recipe
    //Paso 5.4
    modal: boolean
    //Paso 2.14
    fetchCategories: () => Promise<void>
    //Paso 3.11?,esta mal ordenado
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    //V-327,Paso 4.18, 
    // Paso 4.22, toma un id
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    //Paso 5.8
    closeModal: () => void
}

/*
   V-315,paso 2.6 creamos el createRecipesSlice  
   Paso 2.11,ponemos el  StateCreator nos permite crear el state y especificiar
   el type que tiene el slice
   Paso 2.21, le ponemos el set
   Paso 6.15,ponemos , FavoritesSliceType, [], [], RecipesSliceType,no se esperan parameteos adicionales
*/
export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    //Paso 2.25
    categories: {
        drinks: []
    },
    //Paso 4.0
    drinks: {
        drinks: []
    },
    //paso 5.0, confia en mi ,se lo mandare todo (as Recipe)
    selectedRecipe: {} as Recipe,
    //Paso 5.5
    modal: false,

    //Paso 2.15
    fetchCategories: async () => {
        //paso 2.20
        const categories = await getCategories()
        //paso 2.22
        set({
            categories
        })
    },
    //paso 3.10
    //Paso 3.16, le ponemos el filters
    searchRecipes: async (filters) => {
        //paso 3.18, le ponemos getRecipes y le ponemos los filtros 
        // paso 3.23
        const drinks = await getRecipes(filters)
        //Paso 3.1?
        set({
            drinks
        })
    },
    //paso 4.19
    //Paso 4.23, toma un id
    selectRecipe: async (id) => {
        //Paso 3.24
        const selectedRecipe = await getRecipeById(id)
        set({
            //Paso 5.1
            selectedRecipe,
            //Paso 5.7
            modal: true
        })
    },
    //Paso 5.9
    closeModal: () => {
        set({
            //Paso 5.10
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})