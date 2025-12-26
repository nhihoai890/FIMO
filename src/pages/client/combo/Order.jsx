import React, { useContext, useMemo, useState } from 'react';
import { FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { FoodsContext } from '../../../contexts/FoodProvider';
import { filterById, getOjectById } from '../../../utils/functionContants';
import { BookingContext } from '../../../contexts/BookingProvider';
import { Link, useParams } from 'react-router-dom';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { ItemFoodsContext } from '../../../contexts/ItemFoodsProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { TypeChairsContext } from '../../../contexts/TypeChairProvider';



function Order() {

    const { id, idLocation } = useParams();
    const foods = useContext(FoodsContext);
    const bookings = useContext(BookingContext);
    const movieScreens = useContext(MovieScreeningContext);
    const showFoods = filterById(foods, idLocation, 'idCinemaLocation');
    const itemFoods = useContext(ItemFoodsContext);
    const movies = useContext(MoviesContext)
    const bookingName = bookings.find(b => b.id === id);
    const typeChairs = useContext(TypeChairsContext)

    const movieScreening = movieScreens.find(
        ms => ms.id === bookingName?.idMovieScreening
    );

    const movie = movies.find(
        m => m.id === movieScreening?.idMovie
    );

    const selectFoods = itemFoods.filter(i => i.idBooking === id)
    
    const displaySeat = useMemo(() => {
    if (!bookingName) return [];

    const result = [];

    bookingName.listChair.forEach(se => {

        const type = getOjectById(
             typeChairs, 
            se.idChair
        );

        if (type?.name === "Ghế Đôi") {
            const match = se.seatCode.match(/^([A-Z]+)(\d+)$/);

            if (match) {
                const row = match[1];
                const num = Number(match[2]);

                result.push(`${row}${num}`);
                result.push(`${row}${num + 1}`);
            }
        }
       
        else {
            result.push(se.seatCode);
        }
    });

    return result;
}, [bookingName]);


   const seatText = displaySeat.join(', ');

    const totalPrice = useMemo(() => {
        return itemFoods
            .filter(i => i.idBooking === id)
            .reduce((sum, item) => {
                const food = foods.find(f => f.id === item.idFood)
                if (!food) return sum;
                return sum + food.price * item.quantity
            }, 0)
    }, [itemFoods, foods, id])

    const addFoodItem = async (food) => {

        const foodItem = itemFoods.find(e => e.idFood === food.id && e.idBooking === id);
        if (foodItem) {
            foodItem.quantity = parseInt(foodItem.quantity) + 1;
            await updateDocument("itemFoods", foodItem);
        } else {
            const itemFoods = {
                idFood: food.id,
                quantity: 1,
                discount: food.discount,
                idBooking: id,
            }
            await addDocument("itemFoods", itemFoods);
        }

    }
    /// ham tru khi quantity no bang 1 xoa luon di / neu tren 1 update tru  di 1 
    const minusFoodItem = async (food) => {
        const foodItem = itemFoods.find(e => e.idFood === food.id && e.idBooking === id);
        if (!foodItem) return;

        if (parseInt(foodItem.quantity) === 1) {
            await deleteDocument("itemFoods", foodItem);
        } else {
            foodItem.quantity = parseInt(foodItem.quantity) - 1;
            await updateDocument("itemFoods", foodItem)
        }
    }
    // viet ham add foodItems 
    const showQuantity = (food) => {
        const foodItem = itemFoods?.find(e => e.idFood === food.id && e.idBooking === id);
        return foodItem ? foodItem.quantity : 0;
    }
    return (
        <div className="mt-16 min-h-screen bg-[#0d0d0d] px-4 md:px-10 py-12 text-white pb-28">
            {/* ===== TITLE ===== */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-orange-500">
                    🍿 ĐẶT BẮP & NƯỚC
                </h1>
                <p className="text-gray-400 mt-2">
                    Chọn combo để thưởng thức phim trọn vẹn hơn
                </p>
            </div>

            {/* ===== LIST ===== */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3 ">
                {showFoods?.map(f => {


                    return (
                        <div
                            key={f.id}
                            className="flex col-span-1 items-center bg-[#1a1a1a] rounded-xl p-4 shadow-lg"
                        >
                            {/* Image */}
                            <div className="bg-white rounded-lg p-2 flex-shrink-0">
                                <img
                                    src={f.imgUrl}
                                    alt={f.name}
                                    className="h-20 w-20 object-contain"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-bold text-orange-400">
                                    {f.name}
                                </h3>
                                <p className="text-orange-500 font-extrabold mt-1">
                                    {f.price.toLocaleString()} đ
                                </p>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => minusFoodItem(f)}
                                    className={"w-9 h-9 rounded-md flex items-center justify-center transition border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"}
                                >
                                    <FiMinus />
                                </button>

                                <div className="w-10 h-9 flex items-center justify-center border border-orange-500 rounded-md font-semibold">
                                    {showQuantity(f)}
                                </div>

                                <button
                                    onClick={() => addFoodItem(f)}
                                    className="w-9 h-9 bg-orange-500 text-white rounded-md flex items-center justify-center hover:bg-orange-600 transition"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== FOOTER ===== */}
            <div className="fixed bottom-0 left-0 w-full bg-[#111] border-t border-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Back */}
                    <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                        <FiArrowLeft />
                        Quay lại
                    </button>
                     
                    <div className='flex  items-center gap-3 text-sm text-gray-300'>
                        <img src={movie?.imgUrl} alt={movie?.name} className="w-12 h-16 object-cover rounded-md" />
                        <div>
                            <p className='font-semibold text-white'>{movie?.name}</p>
                            <p>Ghế: {seatText}</p>
                            <p>Combo: {selectFoods.length === 0
                                ? 'Chua Chon' : selectFoods.map(i => {
                                    const food = foods.find(f => f.id === i.idFood)
                                    return `${food?.name}  x${i.quantity}`
                                }).join(', ')} </p>
                        </div>
                    </div>

                    {/* Total + Pay */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Tổng tiền</p>
                            <p className="text-xl font-extrabold text-orange-500">
                                {totalPrice.toLocaleString()} đ
                            </p>
                        </div>
                        
                        <Link to={`/payment/${id}`}>
                        <button

                            className={"px-6 py-3 rounded-xl font-bold transition bg-orange-500 hover:bg-orange-600 text-white"}
                        >
                            Tiếp Tục
                        </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
