import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'
import { AISlice, createAISlice } from './aiSlice'

/*
  Paso 2.7, creamos el useAppStore
  Paso 2.12,creame este state con un generic <RecipesSliceType>, y le pasa las acciones
  Paso 3.1, ponemos el devtools
*/
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
  //paso 2.8,tomamos una copia de los argumentos
  ...createRecipesSlice(...a),
  //Paso 6.2
  ...createFavoritesSlice(...a),
  //Paso 7.5
  ...createNotificationSlice(...a),
  //Paso 8.4
  ...createAISlice(...a),
})))