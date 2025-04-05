import axios from 'axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipes-schema'
import { Drink, SearchFilter } from '../types'

//V-317,paso 2.13,para consultar la api
export async function getCategories() {
    //Paso 2.19, la api a la que nos conectamos
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}
//V-323,paso 3.17 y toma los filtros
export async function getRecipes(filters: SearchFilter) {
    //Paso 3.19,url dinamica para categoria e ingrediente
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    //Paso 3.22
    const result = DrinksAPIResponse.safeParse(data)
    if (result.success) {
        return result.data
    }
}
//Vid 328
export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
}