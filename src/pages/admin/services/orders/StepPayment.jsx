import React, { useContext, useMemo } from 'react';
import { FoodsContext } from '../../../../contexts/FoodProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';

function StepPayment({ booking, orderItem, movies, movieScreens, totalChair, totalFood, totalPrice }) {
    const foods = useContext(FoodsContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const typeChairs = useContext(TypeChairsContext);

    return (
        <div>
            <div className="mt-16 min-h-screen bg-[#0d0d0d] py-10">
                <div className="max-w-6xl mx-auto bg-[#1a1a1a] shadow-lg rounded-lg p-6">
                    <h2 className='text-center font-semibold text-xl mb-6 text-white'>Hình Thức Thanh Toán</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {/* left */}
                        <div className='md:col-span-2 space-y-6'>
                            <div className="flex gap-4">
                                <img
                                    src={getOjectById(movies, booking.idMovie)?.imgUrl}
                                    alt="movie"
                                    className="rounded w-24"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg text-white">
                                        {getOjectById(movies, booking.idMovie)?.name}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {getOjectById(cinemaLocations, booking.idCinemaLocation)?.name} - {getOjectById(cinemaLocations, booking.idCinemaLocation)?.address}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {/* Rạp: <span>{showRoom?.name}</span> */}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Suất chiếu: <span> {getOjectById(movieScreens, booking.idMovieScreening)?.release_date} - {booking?.timeMovieScreen}</span>
                                    </p>
                                </div>
                            </div>


                            <section>
                                <h4 className='bg-gray-700 text-white px-3 py-2 font-medium'>THÔNG TIN VÉ</h4>
                                <div className="p-4 text-sm flex justify-between">
                                    <div className='flex gap-3'>
                                        {booking?.listchair.map((seat, index) => (
                                            <span key={index} className="border  border-red-500 text-red-500 px-2 py-1 rounded">
                                                {seat?.seatCode}
                                            </span>
                                        ))}
                                    </div>

                                    <span>{totalChair.toLocaleString()}đ</span>
                                </div>
                            </section>
                            <section>

                                <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                    THÔNG TIN BẮP NƯỚC
                                </h4>
                                {
                                    orderItem.map((food, index) => (
                                        <div key={index} className='p-4 text-sm flex justify-between'>
                                            <span>{getOjectById(foods, food.idFood)?.name}</span>
                                            <span>{food?.quantity} - {(getOjectById(foods, food.idFood)?.price * food?.quantity).toLocaleString()}đ</span>
                                        </div>
                                    ))
                                }

                            </section>
                        </div>
                        {/* RIGHT */}
                        <div className='border border-gray-700 rounded-lg p-4 h-fit bg-[#141414]'>
                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium mb-4">
                                THÔNG TIN THANH TOÁN
                            </h4>
                            <div className='space-y-2 text-sm '>
                                <div className='flex justify-between'>
                                    <span>Vé</span>
                                    <span>{totalChair.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Combo</span>
                                    <span>{totalFood.toLocaleString()} đ</span>
                                </div>
                                <hr className="border-gray-700" />
                                <div className="flex justify-between font-semibold text-white">
                                    <span>TỔNG</span>
                                    <span className="text-red-500">{totalPrice.toLocaleString()} đ</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepPayment;