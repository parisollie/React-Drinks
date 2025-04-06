import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

//V-330,Paso 5.2, pegamos el modal que nos da
export default function Modal() {
    //Paso 5.6
    const modal = useAppStore((state) => state.modal)
    //Paso 5.11
    const closeModal = useAppStore((state) => state.closeModal)
    //V-331,paso 5.13
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)
    //Paso 6.5
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    //Paso 6.11
    const favoriteExists = useAppStore((state) => state.favoriteExists)

    //V-332,paso 5.17
    const renderIngredients = () => {
        const ingredients: JSX.Element[] = []
        for (let i = 1; i <= 6; i++) {
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]
            //paso 5.19, si tenemos un ingrediente y una cantidad ejecutamos
            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
            }
        }
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                {/**Paso 5.12, le ponemos closemodal */}
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {/**Paso 5.14 */}
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>

                                    <img
                                        //Paso 5.15
                                        src={selectedRecipe.strDrinkThumb}
                                        alt={`Imagen de ${selectedRecipe.strDrink}`}
                                        className='mx-auto w-96'
                                    />
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                    </Dialog.Title>
                                    {/**Paso 5.18 */}
                                    {renderIngredients()}
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </Dialog.Title>
                                    {/**Paso 5.16 */}
                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                                    <div className='mt-5 flex justify-between gap-4'>
                                        <button
                                            //V-333,paso 5.20
                                            type='button'
                                            className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                                            //Paso 5.22
                                            onClick={closeModal}
                                        >Cerrar</button>

                                        <button
                                            //Paso 5.21
                                            type='button'
                                            className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500'
                                            //Paso 5.23 
                                            //Paso 6.6 ponemos hanldeClickFavorites
                                            onClick={() => handleClickFavorite(selectedRecipe)}
                                        //Paso 6.12,ponemos favoriteExists
                                        >{favoriteExists(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}