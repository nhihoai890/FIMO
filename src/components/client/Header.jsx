import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { FiUser, FiSearch } from "react-icons/fi";
import fimo from "../../assets/fimo.png";
import { MENUCINEMA } from "../../utils/MenuCinema";

function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  const toggleMenu = (name) => {
    setOpenDropDown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={fimo} alt="logo" className="h-20 object-contain" />
          <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            FIMO Cinema
          </span>
        </Link>

        {/* Search (Desktop) */}
        <div className="relative hidden md:block flex-1 max-w-xs mx-6">
          <input
            type="text"
            placeholder="Tìm phim..."
            className="w-full pl-11 pr-3 py-2 bg-white/30 border border-amber-600 rounded-xl focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-500"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Desktop Menu + User */}
        <div className="hidden md:flex items-center gap-10">
          {/* Menu */}
          <nav className="flex items-center gap-6 text-gray-800 font-medium">
            {MENUCINEMA.map((menu, i) => (
              <div key={i} className="relative">
                {menu.items?.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMenu(menu.name)}
                      className="flex items-center gap-1 hover:text-pink-500 transition"
                    >
                      {menu.name}
                      <FaChevronDown
                        className={`text-sm transition-transform ${openDropDown === menu.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 mt-3 w-48 bg-white/90 backdrop-blur-xl rounded-xl border border-white/40 shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                        openDropDown === menu.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      {menu.items.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.path}
                          className="block px-4 py-3 hover:bg-pink-100 hover:text-pink-600 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={menu.path} className="hover:text-pink-500 transition">
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="text-gray-800 text-2xl hover:text-pink-500 transition"
            >
              <FiUser />
            </button>
            <div
              className={`absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-xl overflow-hidden transition-all duration-300 origin-top-right ${
                userOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Link to="/login" className="block px-4 py-3 hover:bg-pink-100 hover:text-pink-600">Đăng nhập</Link>
              <Link to="/register" className="block px-4 py-3 hover:bg-pink-100 hover:text-pink-600">Đăng ký</Link>
            </div>
          </div>
        </div>

        {/* Mobile Icons (User + Menu Toggle) */}
        <div className="flex items-center gap-4 md:hidden">
          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="text-gray-800 text-2xl hover:text-pink-500 transition"
            >
              <FiUser />
            </button>
            <div
              className={`absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-xl overflow-hidden transition-all duration-300 origin-top-right ${
                userOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Link to="/login" className="block px-4 py-3 hover:bg-pink-100 hover:text-pink-600">Đăng nhập</Link>
              <Link to="/register" className="block px-4 py-3 hover:bg-pink-100 hover:text-pink-600">Đăng ký</Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-3xl text-gray-900"
            onClick={() => setOpenMobile(!openMobile)}
          >
            {openMobile ? <MdClose /> : <IoMdMenu />}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE MENU ITEMS ---------------- */}
      <nav className={`md:hidden bg-white/90 backdrop-blur-xl overflow-hidden border-t border-white/40 transition-all duration-300 ${openMobile ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        {/* Search Mobile */}
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm phim..."
              className="w-full pl-10 pr-3 py-2 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 text-gray-700"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        {/* Menu Items */}
        {MENUCINEMA.map((menu, i) => (
          <div key={i} className="border-b border-gray-300">
            {menu.items?.length > 0 ? (
              <>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="flex justify-between w-full px-6 py-4 text-gray-800 font-medium"
                >
                  {menu.name}
                  <FaChevronDown className={`transition-transform ${openDropDown === menu.name ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openDropDown === menu.name ? "max-h-60" : "max-h-0"}`}>
                  {menu.items.map((sub, j) => (
                    <Link
                      key={j}
                      to={sub.path}
                      className="block px-10 py-3 text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link to={menu.path} className="block px-6 py-4 text-gray-800 font-medium">{menu.name}</Link>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;
