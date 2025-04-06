import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

//V-334,paso 5.24, creamos el componente
export type FavoritesSliceType = {
    //Paso 5.25
    favorites: Recipe[]
    //Vid 335
    handleClickFavorite: (recipe: Recipe) => void
    //V-335,paso 6.3
    //Paso 6.10,le ponemos Recipe['idDrink']
    favoriteExists: (id: Recipe['idDrink']) => boolean
    //Paso 6.21
    loadFromStorage: () => void
}

//Paso 6.0
//Paso 6.16,FavoritesSliceType & RecipesSliceType & NotificationSliceType
//Paso 7.18,add NotificationSliceType
export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    //Paso 6.1
    favorites: [],
    //Paso 6.4,toma una receta
    handleClickFavorite: (recipe) => {
        //paso 6.7
        //Paso 6.13, ponemos .favoriteExists(recipe.idDrink)
        if (get().favoriteExists(recipe.idDrink)) {
            //En caso de que exista 
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            //Paso 7.15
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else {
            set((state) => ({
                //paso 6.8, le agregamos la receta actual recipe
                favorites: [...state.favorites, recipe]
            }))
            //Paso 7.16
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }
        //Paso 6.14
        createRecipesSlice(set, get, api).closeModal()
        //V-338,paso 6.18 ,con get obtenemos los favoritos
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    //V-336,paso 6.9 
    favoriteExists: (id) => {
        //Paso 6.10
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    //Paso 6.19
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})