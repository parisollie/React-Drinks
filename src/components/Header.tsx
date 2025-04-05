import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'


//Vid 308
export default function Header() {
    //Vid 321 
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    //Vid 312 
    const { pathname } = useLocation()
    //Vid 313,queremos que se ejecute cada vez que la pagina cambie ,la / es la pagina de inicio
    const isHome = useMemo(() => pathname === '/' , [pathname])
    //Vid 317
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    //Vid 318
    const categories = useAppStore((state) => state.categories)
    //Vid 322
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    //Vid 344
    const showNotification = useAppStore((state) => state.showNotification)
 
    //Vid 317
    useEffect(() => {
        fetchCategories()
    }, [])

    //Vid 321 
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    //Vid 322
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar
        if(Object.values(searchFilters).includes('')) {
            //Vid 344
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        // Vid 322 Consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        //Vid 314,para saber en que pagina estamos el damos el back ground
        <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className='flex gap-4'>
                        <NavLink
                            //Vid 310,usamos Navlink componente especial ,tiene acceso a un call back 
                            //prop especial isActive
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Inicio</NavLink>
                        <NavLink
                            //Vid 311
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Favoritos</NavLink>
                    </nav>
                </div>
                
                { isHome && (
                    <form
                        className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
                        //Vid 322
                        onSubmit={handleSubmit}
                    >
                        <div className='space-y-4'>
                            <label 
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>

                            <input
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                                //Vid 321
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div className='space-y-4'>
                            <label 
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoría</label>

                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                
                                {categories.drinks.map( category => (
                                    <option 
                                    //Vid 320
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
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
