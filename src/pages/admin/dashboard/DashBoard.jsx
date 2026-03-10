import React, { useContext, useMemo, useState } from 'react';
import { FaChair, FaCoins, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { OrdersContenxt } from '../../../contexts/OrdersProvider';
import { IoFastFoodSharp } from 'react-icons/io5';

import { GiTwoCoins } from 'react-icons/gi';
import { RiArmchairFill, RiBillLine } from 'react-icons/ri';
import { MdPeopleAlt } from 'react-icons/md';
import { AccountContext } from '../../../contexts/AccountProvider';
import BarChartAD from './BarChartAD';
import LineChartAD from './LineChartAD';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { getOjectById } from '../../../utils/functionContants';
import PieChartAD from './PieChartAD';

function DashBoard(props) {
    // lay all orders
    // useMeno => tinh tong ghe 
    const orders = useContext(OrdersContenxt);
    const accounts = useContext(AccountContext);
    const movies = useContext(MoviesContext);
    const movieScreens = useContext(MovieScreeningContext);
    const sumChairs = useMemo(() => {
        return orders?.reduce((sum, chair) => sum += chair.listchair.length, 0)
    }, [orders])

    const sumFoods = useMemo(() => {
        return orders?.reduce((sum, food) => sum += food.totalFood, 0)
    }, [orders]);

    const totalChair = useMemo(() => {
        return orders?.reduce((sum, chair) => sum += chair.totalChair, 0)
    }, [orders])

    const sumChairsToday = useMemo(() => {
        if (!orders) return 0;
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        return orders.reduce((total, order) => {
            if (!order?.timePayment) return false;
            const orderTime = order?.timePayment.toDate();
            if (orderTime >= startOfDay && orderTime < endOfDay) {
                return total + (order.listchair?.length || 0)
            }
            return total;
        }, 0)
    }, [orders]);
    const revenue = useMemo(() => {
        return orders?.reduce((total, order) => total += order.total, 0)
    }, [orders]);

    const revenueToday = useMemo(() => {
        if (!orders) return 0;
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1

        );
        return orders.filter(order => {
            if (!order.timePayment) return false;
            const orderTime = order?.timePayment.toDate();
            return orderTime >= startOfDay && orderTime < endOfDay
        }
        ).reduce((total, order) => total += order.total, 0)
    }, [orders]);

    const totalUsers = useMemo(() => {
        return accounts?.length || 0;
    }, [accounts])

    const totalOrders = useMemo(() => {
        return orders.length;
    }, [orders]);

    const checkTopFilm = useMemo(() => {
        const bill = [];
        orders.map(p => {
            const movieId = getOjectById(movieScreens, p.idMovieScreening).idMovie;
            const checkIndex = bill.findIndex(a => a?.idMovie == movieId);
            if (checkIndex !== -1) {
                bill[checkIndex].total += p.totalChair;
            } else {
                bill.push({ idMovie: movieId, total: p.totalChair })
            }
        });
        return bill;
    }, [orders, movieScreens])

    return (

        <div className='w-full mt-10'>
            <h2 className="text-center text-4xl font-extrabold
bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
bg-clip-text text-transparent mb-12">
                FIMO Analytics Dashboard
            </h2>
            <div className='mt-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                <div className="bg-white/80 backdrop-blur-md border border-gray-200
    rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-semibold">
                                Tổng doanh thu
                            </p>

                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {revenue.toLocaleString()} VND
                            </h3>
                        </div>

                        <div className="w-14 h-14 flex items-center justify-center
            rounded-xl bg-gradient-to-r from-red-400 to-pink-500
            text-white text-2xl shadow-md">
                            <FaCoins />
                        </div>
                    </div>
                </div>


                <div className="bg-white/80 backdrop-blur-md border border-gray-200
    rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-semibold">
                                Tổng số ghế bán
                            </p>

                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {sumChairs}
                            </h3>
                        </div>

                        <div className="w-14 h-14 flex items-center justify-center
            rounded-xl bg-gradient-to-r from-green-400 to-emerald-500
            text-white text-2xl shadow-md">
                            <FaChair />
                        </div>
                    </div>
                </div>


                <div className="bg-white/80 backdrop-blur-md border border-gray-200
    rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-semibold">
                                Doanh thu đồ ăn
                            </p>

                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {sumFoods.toLocaleString()} VND
                            </h3>
                        </div>

                        <div className="w-14 h-14 flex items-center justify-center
            rounded-xl bg-gradient-to-r from-orange-400 to-yellow-500
            text-white text-2xl shadow-md">
                            <IoFastFoodSharp />
                        </div>
                    </div>
                </div>


                <div className="bg-white/80 backdrop-blur-md border border-gray-200
    rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-semibold">
                                Doanh thu ghế
                            </p>

                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {totalChair.toLocaleString()} VND
                            </h3>
                        </div>

                        <div className="w-14 h-14 flex items-center justify-center
            rounded-xl bg-gradient-to-r from-blue-400 to-cyan-500
            text-white text-2xl shadow-md">
                            <FaMoneyBillTrendUp />
                        </div>
                    </div>
                </div>

                <div className='bg-white shadow-md p-4 rounded-2xl hover:shadow-xl flex flex-col items-center justify-center transition  text-center'>
                    <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-purple-100 text-purple-600 
                text-2xl mb-4'>
                        <GiTwoCoins />
                    </div>
                    <p className='text-sm font-bold text-gray-500'>
                        Doanh thu hôm nay
                    </p>

                    <h3 className='text-2xl font-bold mt-2'>
                        {revenueToday.toLocaleString()} VND
                    </h3>
                </div>

                <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                    <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-gray-100 text-gray-800 
                text-2xl mb-4'>
                        <MdPeopleAlt />
                    </div>
                    <p className='text-sm font-bold text-gray-500'>
                        Tổng người dùng
                    </p>

                    <h3 className='text-2xl font-bold mt-2'>
                        {totalUsers}
                    </h3>
                </div>

                <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                    <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-pink-100 text-pink-600 
                text-2xl mb-4'>
                        <RiArmchairFill />
                    </div>
                    <p className='text-sm font-bold text-gray-500'>
                        Tổng số ghế bán ra hôm nay
                    </p>

                    <h3 className='text-2xl font-bold mt-2'>
                        {sumChairsToday}
                    </h3>
                </div>

                <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                    <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-cyan-100 text-cyan-600 
                text-2xl mb-4'>
                        <RiBillLine />
                    </div>
                    <p className='text-sm font-bold text-gray-500'>
                        Tổng số đơn hàng
                    </p>

                    <h3 className='text-2xl font-bold mt-2'>
                        {totalOrders}
                    </h3>
                </div>
            </div>

            <div className='mt-10 px-8'>
                <div className=' max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8'>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 
                        border border-slate-700 
                        rounded-2xl p-6 shadow-2xl
                        hover:border-cyan-400/40 transition-all duration-300">

                        <h3 className='text-xl font-semibold text-white mb-6'>Doanh thu theo tháng</h3>
                        <div className="h-[350px] flex items-center justify-center 
                          text-slate-400 border border-dashed border-slate-600 
                          rounded-xl">
                            <LineChartAD />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 
                        border border-slate-700 
                        rounded-2xl p-6 shadow-2xl
                        hover:border-cyan-400/40 transition-all duration-300">
                        <h3 className='text-xl font-semibold text-white mb-6'>Tỷ lệ doanh thu ghế với đồ ăn</h3>

                        <div className="h-[350px] flex items-center justify-center 
                          text-slate-400 border border-dashed border-slate-600 
                          rounded-xl">
                            <BarChartAD />
                        </div>
                    </div>
                    <div className=" bg-gradient-to-br from-slate-900 to-slate-800 
                        border border-slate-700 
                        rounded-2xl p-6 shadow-2xl
                        hover:border-cyan-400/40 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-6">
                            Tỷ lệ thể loại phim
                        </h3>
                        <PieChartAD />
                    </div>
                    <div className=" bg-gradient-to-br from-slate-900 to-slate-800 
                        border border-slate-700 
                        rounded-2xl p-6 shadow-2xl
                        hover:border-cyan-400/40 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-6">
                            Top phim bán chạy nhất

                        </h3>
                        {
                            checkTopFilm.sort((a, b) => b.total - a.total).map((check, index) => (
                                <div className='flex items-center gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition'>
                                    <span className=' text-white text-5xl font-bold'>
                                        {index + 1}
                                    </span>
                                    <img
                                        src={getOjectById(movies, check.idMovie).imgUrl}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                    <div className='self-start text-white'>
                                        <h3>{getOjectById(movies, check.idMovie).name}</h3>
                                        <p>{check.total}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>



        </div>

    );
}

export default DashBoard;