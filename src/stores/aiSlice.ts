import { StateCreator } from 'zustand'
import AIService from '../services/AIService'

//Paso 8.2
export type AISlice = {
    recipe: string
    isGenerating: boolean
    //Paso 8.8, no retorna ,pero es asincronas
    generateRecipe: (prompt: string) => Promise<void>
}

//Paso 8.3, creamos el slice de AI
export const createAISlice: StateCreator<AISlice> = (set) => ({
    //Paso 8.9
    recipe: '',
    //Paso 8.23
    isGenerating: false,
    generateRecipe: async (prompt) => {
        //V-354,Paso 8.22 limpiando la consulta
        set({ recipe: '', isGenerating: true })
        //Paso 8.16
        const data = await AIService.generateRecipe(prompt)
        //V-353,paso 8.19
        for await (const textPart of data) {
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }
        //Paso 8.24
        set({ isGenerating: false })
    }
})