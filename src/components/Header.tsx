import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'


//V-308,paso 1.10, creamos el header
export default function Header() {
    //V-321,paso 3.3 
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    //V-312,paso 1.21,ponemos useLoction para detectar la pagina actual
    const { pathname } = useLocation()
    //console.log(pathname)

    //V-313,paso 1.22 queremos que se ejecute cada vez que la página cambie,la / es la página de inicio
    const isHome = useMemo(() => pathname === '/', [pathname])
    //Paso 2.16
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    //Paso 3.0
    const categories = useAppStore((state) => state.categories)
    //Paso 3.12
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    //Vid 344
    const showNotification = useAppStore((state) => state.showNotification)

    //paso 2.17,cuando este listo queremos esa funcion
    useEffect(() => {
        fetchCategories()
    }, [])

    //paso 3.4 
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    //Paso 3.8
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar
        if (Object.values(searchFilters).includes('')) {
            //Vid 344
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        //Paso 3.9, Consultar las recetas
        //paso 3.15, le ponemos el (searchFilters)
        searchRecipes(searchFilters)
    }

    return (

        //Paso 2.5,le ponemos el bg-header y si esta en clase de inicio pone esto sino agrega sto
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            {/** Paso 1.11,ponemos la estructura del header */}
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    {/**Paso 1.19,separamos con 'flex gap-4', lase apracion de INICIO-FAVORITOS */}
                    <nav className='flex gap-4'>
                        <NavLink
                            /*
                              V-310,paso 1.18,usamos Navlink componente especial , to hacia donde irá*/
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Inicio
                        </NavLink>

                        <NavLink
                            //V-311,paso 1.20,haremos un callback para poder hacer un resaltado especial
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Favoritos
                        </NavLink>
                    </nav>
                </div>
                {/**Paso 1.23, ponemos si la página isHome */}
                {isHome && (
                    <form
                        //Paso 2.0, toma un width de 1 de dos columnas,tamañp para telefono y tablet
                        className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
                        //V-322,paso 3.7
                        onSubmit={handleSubmit}
                    >
                        {/**Paso 1.24 */}
                        <div className='space-y-4'>
                            <label
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes
                            </label>

                            <input
                                //Paso 1.25
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                //No resalta nada con esto
                                className='p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                                //Paso 3.5
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        {/**Paso 2.1 */}
                        <div className='space-y-4'>
                            <label
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoría
                            </label>
                            {/**paso 2.2 */}
                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                //Paso 3.6
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>

                                {categories.drinks.map(category => (
                                    <option
                                        //paso 3.2
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/**Paso 2.3 */}
                        <input
                            type='submit'
                            value='Buscar Recetas'
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
