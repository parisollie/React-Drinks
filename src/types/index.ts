import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recipes-schema'

//Paso 2.24
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
//Paso 3.14
export type SearchFilter = z.infer<typeof SearchFilterSchema>
//Paso 3.25
export type Drinks = z.infer<typeof DrinksAPIResponse>
//Vid 325
export type Drink = z.infer<typeof DrinkAPIResponse>
//Vid 329
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>