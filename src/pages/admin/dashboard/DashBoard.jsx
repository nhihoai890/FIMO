import React, { useContext, useMemo } from 'react';
import { FaChair, FaCoins } from 'react-icons/fa6';
import { OrdersContenxt } from '../../../contexts/OrdersProvider';
import { IoFastFoodSharp } from 'react-icons/io5';
import { BiChair } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';

function DashBoard(props) {
    // lay all orders
    // useMeno => tinh tong ghe 
    const orders = useContext(OrdersContenxt);

    const sumChairs = useMemo(() => {
        return orders?.reduce((sum, chair) => sum += chair.listchair.length, 0)
    }, [orders])

    const sumFoods = useMemo(() => {
        return orders?.reduce((sum, food) => sum += food.totalFood, 0)
    }, [orders]);

    const totalChair = useMemo(() => {
        return orders?.reduce((sum, chair) => sum += chair.totalChair, 0)
    }, [orders])

    const revenue = useMemo(() => {
        return orders?.reduce((total, order) => total += order.total, 0)
    }, [orders]);

    const revenueToday = useMemo(() => {
        return orders?.reduce((total, order) => total += order.total, 0)
    }, [orders]);
    return (
        <>
            <div className='w-full'>
                <h2 className='text-center text-3xl font-extrabold bg-gradient-to-r  from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[gradientMove_5s_linear_infinite] drop-shadow-lg'>
                    FIMO Analytics DashBoard
                </h2>

                <div className='mt-10 grid grid-cols-4 gap-6'>
                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-red-100 text-red-600 
                text-2xl mb-4'>
                            <FaCoins />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Tổng doanh thu
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            {revenue.toLocaleString()} VND
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-green-100 text-green-600 
                text-2xl mb-4'>
                            <FaChair />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Tổng số ghế bán ra
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            {sumChairs}
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-orange-100 text-orange-600 
                text-2xl mb-4'>
                            <IoFastFoodSharp />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Doanh thu theo món ăn
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            {sumFoods.toLocaleString()} VND
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-blue-100 text-blue-600 
                text-2xl mb-4'>
                            <BiChair />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Doanh thu theo ghế
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            {totalChair.toLocaleString()} VND
                        </h3>
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
                            0 VND
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-blue-100 text-blue-600 
                text-2xl mb-4'>
                            <FaUserAlt />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Tổng người dùng
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            0
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-green-100 text-green-600 
                text-2xl mb-4'>
                            <FaChair />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Tổng số ghế bán ra hôm nay
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            0 VND
                        </h3>
                    </div>

                    <div className='bg-white shadow-md p-5 rounded-2xl hover:shadow-xl transition flex flex-col items-center justify-center text-center'>
                        <div className='w-14 h-14 flex items-center justify-center 
                rounded-full bg-green-100 text-green-600 
                text-2xl mb-4'>
                            <FaChair />
                        </div>
                        <p className='text-sm font-bold text-gray-500'>
                            Tổng số ghế bán ra
                        </p>

                        <h3 className='text-2xl font-bold mt-2'>
                            0 VND
                        </h3>
                    </div>
                </div>
            </div>
        </>

    );
}

export default DashBoard;