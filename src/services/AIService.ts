import { streamText } from 'ai'
import { openrouter } from '../lib/ai'


//V-351,Paso 8.15
export default {
    async generateRecipe(prompt: string) {
        //Paso 8.17
        const result = streamText({
            //V-352,Paso 8.18,Le pasmos el modelo
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            //model: openrouter('google/gemini-2.5-pro-exp-03-25:free'),
            // model: openrouter('deepseek/deepseek-chat-v3-0324:free'),
            // model: openrouter('google/gemma-3-4b-it:free'),
            //prompt
            //V-355, paso 8.29, es como responderia un niño de 5 años
            prompt,
            system: 'Eres un bartender y una vez atendiste a Superman',
            temperature: 1
        })

        return result.textStream
    }
}