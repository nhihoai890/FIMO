import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail, FiSearch } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AuthContext } from '../../contexts/AuthsProvider';
import { useNavigate } from 'react-router-dom';


function HeaderAdmin(props) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdown = useRef(null);
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, []);
  return (
    <header className="bg-[#0d0d0d] border-b border-cyan-900/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <div className="flex items-center justify-between px-8 py-4 text-white">
        {/* Bên trái */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-glow">
            Welcome
          </h1>
        </div>

        {/* Bên phải */}
        <div className="flex items-center gap-6 text-xl">
          {/* Icon Search */}
          <div className="relative group cursor-pointer">
            <FiSearch className="transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-400" />
          </div>

          {/* Icon Notification */}
          <div className="relative group cursor-pointer">
            <IoNotificationsOutline className="transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-ping"></span>
          </div>

          {/* Icon Mail */}
          <div className="relative group cursor-pointer">
            <FiMail className="transition-transform duration-300 group-hover:scale-110 group-hover:text-pink-400" />
          </div>

          {/* User Icon + Dropdown */}
          <div ref={dropdown} className="relative">
            <FaUserCircle
              className="cursor-pointer text-cyan-300 hover:text-white transition-transform duration-300 hover:scale-110"
              onClick={() => setOpenDropDown(!openDropDown)}
            />

            {openDropDown && (
              <div
                className="absolute right-0 mt-3 w-44 bg-[#1a1a1a] border border-cyan-700/30 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.15)] overflow-hidden animate-slideDown"
              >
                <ul className="flex flex-col text-gray-300 text-sm">
                  <li className="px-4 py-2 hover:bg-cyan-900/30 hover:text-white cursor-pointer transition">
                    Profile
                  </li>

                  <li onClick={() => {
                    logout();
                    navigate("/main")
                  }} className="px-4 py-2 hover:bg-cyan-900/30 hover:text-white cursor-pointer transition">
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.25s ease-out;
          }
        `}

        {`
@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #a0f;
    opacity: 1;
  }
  50% {
    text-shadow: 0 0 20px #a0f, 0 0 40px #0ff, 0 0 60px #0ff;
    opacity: 0.8;
  }
}
.animate-glow {
  animation: glow 2s infinite ease-in-out;
}
`}
      </style>
    </header>
  );
}

export default HeaderAdmin;