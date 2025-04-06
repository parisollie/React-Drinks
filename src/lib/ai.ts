import { createOpenRouter } from '@openrouter/ai-sdk-provider'

//V-350,Paso 8.12
export const openrouter = createOpenRouter({
    //Paso 8.14
    apiKey: import.meta.env.VITE_OPENROUTER_KEY
})