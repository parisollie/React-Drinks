import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

//Vid 316 
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    //Vid 329
    selectedRecipe: Recipe
    //Vid 330
    modal: boolean
    //Vid 317
    fetchCategories: () => Promise<void>
    //Vid 322
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    //Vid 327
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    //Vid 330
    closeModal: () => void
}

//Vid 315 
//Vid 316 StateCreator
export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    //Vid 318 
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

    //Vid 317
    fetchCategories: async () => {
        const categories = await getCategories()
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