import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice} from './notificationSlice'

//Vid 315 
//Vid 316 ,RecipesSliceType
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    //Vid 334
    ...createFavoritesSlice (...a),
    //Vid 340 
    ...createNotificationSlice(...a),
})))