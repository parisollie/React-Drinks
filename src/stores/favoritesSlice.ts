import {  StateCreator } from 'zustand'
import { Recipe } from '../types'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

//Vid 334
export type FavoritesSliceType = {
    favorites: Recipe[]
    //Vid 335
    handleClickFavorite: (recipe: Recipe) => void
    //Vid 336
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

//Vid 334
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    //Vid 334 
    favorites: [],
    //Vid 335
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            //Vid 335, en caso de que exista 
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))
            //Vid 342
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se eliminó de favoritos', 
                error: false
            })
        } else {
            set((state) => ({
                //Vid 335, le agregamos la receta actual recipe
                favorites: [ ...state.favorites, recipe]
            }))
            //Vid 342
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se agregó a favoritos', 
                error: false
            })
        }
        //Vid 337 
        createRecipesSlice(set, get, api).closeModal()
        //Vid 338 ,con get obtenemos los favoritos
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    //Vid 336 
    favoriteExists: (id) => {
        //Vid 336 
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    //Vid 338
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})