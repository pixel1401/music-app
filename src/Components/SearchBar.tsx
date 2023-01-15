import { FormEvent, useRef } from 'react';
import {FiSearch} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


export const SearchBar  = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();


    const handleSubmit = (e: FormEvent)=> {
        e.preventDefault();
        const value = inputRef.current?.value;
        if(!value) return;
        navigate(`/search/${value}`);
    }



    return (
        <form onSubmit={ handleSubmit} autoComplete='off' className=" p-2 text-gray-400">
            <label htmlFor="search-field" className=" sr-only">
                Search all songs
            </label>
            <div className=' flex flex-row justify-start items-center'>
                <FiSearch className=' w-5 h-5 ml-4'/>
                <input 
                    type="search"
                    name='search-field'
                    autoComplete='off'
                    id='search-field'
                    placeholder='Search'
                    ref={inputRef}
                    className=' flex-1 border-none bg-transparent outline-none text-base placeholder-gray-500 text-white p-4'
                />
            </div>
        </form>
    )
}