import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {

    //Paso 8.8
    const showNotification = useAppStore(state => state.showNotification)
    //Paso 8.10
    const generateRecipe = useAppStore(state => state.generateRecipe)
    //Paso 8.20
    const recipe = useAppStore(state => state.recipe)
    //Paso 8.25
    const isGenerating = useAppStore(state => state.isGenerating)

    //V-348, paso 8.5
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        //Paso 8.7
        e.preventDefault();

        //Genera el objeto de form data en base al submit que yo ejecuto
        const form = new FormData(e.currentTarget)
        const prompt = form.get('prompt') as string

        //Validamos que no vaya vacío
        if (prompt.trim() === '') {
            showNotification({
                text: 'La búsqueda no puede ir vacía',
                error: true
            })
            return
        }
        //Paso 8.11
        await generateRecipe(prompt)
    }

    return (
        <>
            <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

            <div className="max-w-4xl mx-auto">
                <form
                    //Paso 8.6
                    onSubmit={handleSubmit}
                    className='flex flex-col space-y-3 py-10'
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
                        />
                        <button
                            type="submit"
                            aria-label="Enviar"
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isGenerating ? " cursor-not-allowed opacity-50" : ""} `}
                            //Paso 8.27
                            disabled={isGenerating}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {/**Paso 8.26 */}
                {isGenerating && <p className="text-center animate-blink">Generando...</p>}
                <div className="py-10 whitespace-pre-wrap">
                    {/**Paso 8.21 */}
                    {recipe}
                </div>
            </div>

        </>
    )
}