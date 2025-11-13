import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowRight, MdArrowDropDown, MdClose, MdMenu } from "react-icons/md";
import { RiFolderUserFill } from "react-icons/ri";
import { LISTMENU } from "../../utils/Contants";

function MenuAdmin() {
  const [show, setShow] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div
      className={`min-md:h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black 
  text-gray-200 p-4 shadow-xl border-r border-gray-700 
  transition-all duration-500 ease-in-out ${show ? "min-md:w-64 max-md:h-auto" : "min-md:w-20 max-md:h-[80px]"} 
  relative overflow-visible`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {show && (
          <button
            onClick={() => setShow(!show)}
            className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 
               bg-[length:200%_auto] bg-clip-text text-transparent 
               animate-[gradientMove_5s_linear_infinite] focus:outline-none"
          >
            FIMO <span className="text-pink-400">Admin</span>
          </button>
        )}
        <button
          onClick={() => setShow(!show)}
          className="p-2 rounded-lg hover:bg-gray-700/60 text-cyan-300 transition-all"
        >
          {show ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
      </div>
      <div className={show ? "" : "max-md:hidden"}>
        {/* Menu List */}
        {LISTMENU.map((menu, idx) => (
          <div key={idx} className="mb-4 relative">
            {menu.items && menu.items.length > 0 ? (
              <>
                {/* Menu cha */}
                <div
                  onClick={() => toggleMenu(menu.title)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer neon-glow 
                            transition-all duration-500 ease-in-out 
                            ${openMenu === menu.title
                      ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/20 border border-cyan-400/40 shadow-md"
                      : "bg-gray-800/60 hover:bg-gray-700/60"
                    }`}
                >
                  <span className="text-xl text-cyan-300">{menu.icon}</span>
                  {show && <span className="font-medium tracking-wide text-gray-100">{menu.title}</span>}
                  {openMenu === menu.title ? (
                    <MdArrowDropDown className="ml-auto text-cyan-300 transition-transform duration-300 rotate-180" />
                  ) : (
                    <MdArrowRight className="ml-auto text-gray-400 transition-transform duration-300" />
                  )}
                </div>

                {/* Submenu */}
                {openMenu === menu.title && (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden
                    ${show ? "max-h-40 opacity-100 translate-y-0" : "absolute left-full top-0 ml-2 z-50"} `}
                  >
                    <div
                      className={`mt-2 flex flex-col gap-2 transition-all duration-300
                      ${!show
                          ? "bg-gray-900/90 p-2 rounded-xl shadow-lg border border-cyan-400/20 animate-slideIn backdrop-blur-sm w-44"
                          : "ml-10"
                        }`}
                    >
                      {menu.items.map((sub, subIdx) => (
                        <Link
                          key={subIdx}
                          to={sub.path}
                          className="px-3 py-2 rounded-md bg-gray-800/80 text-gray-300 hover:text-white  
                                   hover:bg-cyan-600/30 border border-transparent hover:border-cyan-400/40  
                                   transition-all duration-300 text-sm neon-glow"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Menu đơn
              <Link
                to={menu.path}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/60 
                         hover:bg-gray-700/60 transition-all duration-300 text-gray-200 
                         hover:text-cyan-300 border border-transparent hover:border-cyan-400/30 
                         shadow-sm neon-glow"
              >
                <span className="text-xl text-cyan-300">{menu.icon}</span>
                {show && <span className="font-medium">{menu.name}</span>}
              </Link>
            )}
          </div>
        ))}

        {show && <p className="mt-5 font-medium text-sm">Pages</p>}

        {/* Footer item */}
        <div
          className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/60 
                   hover:bg-gray-700/60 cursor-pointer transition-all duration-300 
                   text-gray-200 hover:text-cyan-300 border border-transparent 
                   hover:border-cyan-400/30 shadow-sm neon-glow"
        >
          <RiFolderUserFill className="text-lg text-cyan-300" />
          {show && <a href="#" className="font-medium">User Pages</a>}
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
