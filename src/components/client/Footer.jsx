import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import fimo from "../../assets/fimo.png";

function Footer() {
    return (
        <footer className=" mt-5 bg-gray-900 text-gray-300 pt-6 pb-4 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Logo  */}
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <img src={fimo} alt="logo" className="h-28" />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-transparent bg-clip-text">
                            FIMO Cinema
                        </h2>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Trải nghiệm điện ảnh đỉnh cao với công nghệ hàng đầu và dịch vụ hoàn hảo.
                    </p>

                    {/* Social */}
                    <div className="flex gap-4 mt-4">
                        <FiFacebook className="text-2xl hover:text-pink-400 cursor-pointer transition" />
                        <FiInstagram className="text-2xl hover:text-pink-400 cursor-pointer transition" />
                        <FiYoutube className="text-2xl hover:text-pink-400 cursor-pointer transition" />
                    </div>
                </div>

                {/* Column 1 */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Phim</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="" className="hover:text-pink-400 transition">Phim đang chiếu</Link></li>
                        <li><Link to="" className="hover:text-pink-400 transition">Phim sắp chiếu</Link></li>
                        <li><Link to="" className="hover:text-pink-400 transition">Phim nổi bật</Link></li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Rạp & Dịch vụ</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/cine" className="hover:text-pink-400 transition">Hệ thống rạp</Link></li>
                        <li><Link to="/schedule" className="hover:text-pink-400 transition">Lịch chiếu</Link></li>
                        <li><Link to="/booking" className="hover:text-pink-400 transition">Đặt vé online</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/faq" className="hover:text-pink-400 transition">Câu hỏi thường gặp</Link></li>
                        <li><Link to="/contact" className="hover:text-pink-400 transition">Liên hệ</Link></li>
                        <li><Link to="/terms" className="hover:text-pink-400 transition">Điều khoản</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm mt-10 pt-5 border-t border-white/10">
                © {new Date().getFullYear()} FIMO Cinema – All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
