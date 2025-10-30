import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";

function SearchAdmin({ title, handleClickOpen, placeholder, onSearch }) {

    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className='flex justify-between items-center gap-4 w-full '>
            <h2 className='font-extrabold text-2xl bg-gradient-to-r from-pink-400 via-cyan-300 to-blue-400 bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradientMove_4s_linear_infinite] '>{title}</h2>
            <div className='relative'>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-700 text-white bg-gray-800"
                />
                <FaSearch onClick={handleSearchClick} className='absolute right-0 top-1/2 -translate-1/2 cursor-pointer  text-gray-400 hover:text-cyan-400  placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 hover:border-cyan-400' />
            </div>
            <button onClick={handleClickOpen} className='px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-400 hover:from-blue-500 hover:to-cyan-400 shadow-lg
                   hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105 cursor-pointer'><IoIosAddCircle /></button>
            <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}

export default SearchAdmin;