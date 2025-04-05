import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

/*
  Paso 2.7, creamos el useAppStore
  Paso 2.12,creame este state con un generic <RecipesSliceType>, y le pasa las acciones
  Paso 3.1, ponemos el devtools
*/
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
  //paso 2.8,tomamos una copia de los argumentos
  ...createRecipesSlice(...a),
  //Vid 334
  ...createFavoritesSlice(...a),
  //Vid 340 
  ...createNotificationSlice(...a),
})))