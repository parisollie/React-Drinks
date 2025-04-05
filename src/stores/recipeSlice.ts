import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

//V-316,paso 2.9 
export type RecipesSliceType = {
    //Paso 2.1 y paso 2.24, solo cambia el nombre y ya
    categories: Categories
    drinks: Drinks
    //Vid 329
    selectedRecipe: Recipe
    //Vid 330
    modal: boolean
    //Paso 2.14
    fetchCategories: () => Promise<void>
    //Vid 322
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    //Vid 327
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    //Vid 330
    closeModal: () => void
}

/*
   V-315,paso 2.6 creamos el createRecipesSlice  
   Paso 2.11,ponemos el  StateCreator nos permite crear el state y especificiar
   el type que tiene el slice
   Paso 2.21, le ponemos el set
*/
export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    //Paso 2.25
    categories: {
        drinks: []
    },
    //Vid 324
    drinks: {
        drinks: []
    },
    //Vid 329, confia en mi ,se lo mandare todo (as Recipe)
    selectedRecipe: {} as Recipe,
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
    //Vid 322
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        //Vid 324
        set({
            drinks
        })
    },
    //Vid 327
    selectRecipe: async (id) => {
        //Vid 328
        const selectedRecipe = await getRecipeById(id)
        set({
            //Vid 329
            selectedRecipe,
            //Vid 330
            modal: true
        })
    },
    //Vid 330
    closeModal: () => {
        set({
            //Vid 330
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})