import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { FiUser, FiSearch, FiLogOut, FiClock, FiUserCheck } from "react-icons/fi";
import fimo from "../../assets/fimo.png";
import { MENUCINEMA } from "../../utils/MenuCinema";
import Login from "../../pages/client/auth/Login";
import Register from "../../pages/client/auth/Register";
import { AuthContext } from "../../contexts/AuthsProvider";

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(null);
  const [userOpen, setUserOpen] = useState(false);
  const { isLogin, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const toggleMenu = (name) => setOpenDropDown((prev) => (prev === name ? null : name));

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
    setOpen(false);
    setUserOpen(false);
  };

  const handCloseRegister = () => setOpenRegister(false);

  const handleClickOpen = () => {
    setOpen(true);
    handCloseRegister();
    setUserOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#9b1fff] via-[#ff2d95] to-[#ff8c00] shadow-xl border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={fimo}
              alt="logo"
              className="h-24 object-cover drop-shadow-2xl transition-transform group-hover:scale-110"
            />
            <span className="text-3xl font-extrabold text-white drop-shadow-md">
              FIMO Cinema
            </span>
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="relative hidden md:block flex-1 max-w-sm mx-8">
            <input
              type="text"
              placeholder="Tìm phim..."
              className="w-full pl-12 pr-4 py-2 rounded-2xl bg-white/20 text-white placeholder-white/80 border border-white/40 shadow-inner focus:ring-2 focus:ring-yellow-300 outline-none transition"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-lg" />
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-white font-medium">
            {MENUCINEMA.map((menu, i) => (
              <div key={i} className="relative">
                {menu.items?.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMenu(menu.name)}
                      className="flex items-center gap-1 hover:text-yellow-300 transition"
                    >
                      {menu.name}
                      <FaChevronDown
                        className={`transition-transform text-sm ${
                          openDropDown === menu.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute left-0 mt-3 w-48 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                        openDropDown === menu.name
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-3 pointer-events-none"
                      }`}
                    >
                      {menu.items.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.path}
                          className="block px-5 py-3 hover:bg-pink-100 hover:text-pink-600 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={menu.path}
                    className="hover:text-yellow-300 transition"
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}

            {/* USER AREA */}
            <div className="relative">
              {isLogin ? (
                <img
                  onClick={() => setUserOpen(!userOpen)}
                  src= {isLogin?.imgUrl ? isLogin?.imgUrl : "https://tranjstudio.com/storage/2024/08/capybara-vui-tuoi.webp" }
                  className="w-11 h-11 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition"
                />
              ) : (
                <FiUser
                  onClick={() => setUserOpen(!userOpen)}
                  className="text-2xl cursor-pointer hover:text-yellow-300 transition"
                />
              )}

              <div
                className={`absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                  userOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
              >
                {isLogin ? (
                  <>
                    <Link className="flex items-center gap-3 px-5 py-3 hover:bg-pink-100 transition">
                      <FiUserCheck /> Profile
                    </Link>
                    <Link to="/history" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-100 transition">
                      <FiClock /> Lịch sử đặt vé
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 px-5 py-3 hover:bg-pink-100 transition text-left"
                    >
                      <FiLogOut /> Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleClickOpen}
                      className="w-full text-left px-5 py-3 hover:bg-pink-100 transition"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={handleClickOpenRegister}
                      className="w-full text-left px-5 py-3 hover:bg-pink-100 transition"
                    >
                      Đăng ký
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* MOBILE ICONS */}
          <div className="md:hidden flex items-center gap-4 text-white">
            {/* MOBILE USER ICON */}
            <div className="relative">
              <FiUser
                className="text-2xl cursor-pointer"
                onClick={() => setUserOpen(!userOpen)}
              />
              <div
                className={`absolute right-0 mt-3 w-40 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
                  userOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
              >
                <button
                  onClick={handleClickOpen}
                  className="w-full text-left px-4 py-2 hover:bg-pink-100 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={handleClickOpenRegister}
                  className="w-full text-left px-4 py-2 hover:bg-pink-100 transition"
                >
                  Đăng ký
                </button>
              </div>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="text-3xl"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? <MdClose /> : <IoMdMenu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <nav
          className={`md:hidden bg-white text-gray-900 shadow-xl border-t border-gray-200 overflow-hidden transition-all duration-500 ${
            openMobile ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* MOBILE SEARCH */}
          <div className="px-6 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm phim..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl border border-gray-300"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
          </div>

          {/* MOBILE MENU ITEMS */}
          {MENUCINEMA.map((menu, i) => (
            <div key={i} className="border-b border-gray-200">
              {menu.items?.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleMenu(menu.name)}
                    className="w-full px-6 py-4 flex justify-between items-center font-semibold"
                  >
                    {menu.name}
                    <FaChevronDown
                      className={`transition-transform ${
                        openDropDown === menu.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropDown === menu.name ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    {menu.items.map((sub, j) => (
                      <Link
                        key={j}
                        to={sub.path}
                        className="block px-10 py-3 hover:bg-pink-100 hover:text-pink-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={menu.path}
                  className="block px-6 py-4 font-semibold"
                >
                  {menu.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </header>

      {/* AUTH MODALS */}
      <Login
        open={open}
        handleClickOpenRegister={handleClickOpenRegister}
        handleClose={handleClose}
      />
      <Register
        openRegister={openRegister}
        handCloseRegister={handCloseRegister}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}
