import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recipes-schema'

//Paso 2.23
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
//Vid 322
export type SearchFilter = z.infer<typeof SearchFilterSchema>
//Vid 324
export type Drinks = z.infer<typeof DrinksAPIResponse>
//Vid 325
export type Drink = z.infer<typeof DrinkAPIResponse>
//Vid 329
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>