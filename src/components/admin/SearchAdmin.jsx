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
    if(onSearch) onSearch(query);
  };

  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-4 w-full'>
      
      {/* Title */}
      <h2 className='text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[gradientMove_5s_linear_infinite] drop-shadow-lg'>
        {title}
      </h2>

      {/* Search Input + Icon */}
      <div className='relative w-full md:w-1/2'>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-xl border border-gray-700 text-white bg-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300
                     hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
        />
        <FaSearch
          onClick={handleSearchClick}
          className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-400
                     hover:scale-110 transition-all duration-300'
        />
      </div>

      {/* Add Button */}
      <button
        onClick={handleClickOpen}
        className='flex items-center cursor-pointer justify-center gap-2 px-5 py-2 text-white font-semibold rounded-xl
                   bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-400
                   hover:from-blue-500 hover:via-pink-400 hover:to-cyan-400
                   shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300
                   hover:scale-105'
      >
        <IoIosAddCircle className='text-xl' />
        
      </button>

      {/* Gradient Animation Style */}
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
