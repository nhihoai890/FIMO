import { Box, Divider } from '@mui/material';
import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

function StepOrderFood(props) {
    return (
        <div>
            <Box sx={{ mt: 3, color: "#E6F7FF" }}>
                <Box sx={{ fontWeight: 700, color: "#00ffff", mb: 1 }}>
                    ORDER FOOD
                </Box>
                <Divider sx={{ borderColor: "rgba(0,255,255,0.2)", mb: 2 }} />

                <Box>
                    <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3 ">
                       


                            
                                <div
                                    // key={f.id}
                                    className="flex col-span-1 items-center bg-[#1a1a1a] rounded-xl p-4 shadow-lg"
                                >
                                    {/* Image */}
                                    <div className="bg-white rounded-lg p-2 flex-shrink-0">
                                        {/* <img
                                            src={f.imgUrl}
                                            alt={f.name}
                                            className="h-20 w-20 object-contain"
                                        /> */}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg font-bold text-orange-400">
                                            {/* {f.name} */}
                                        </h3>
                                        <p className="text-orange-500 font-extrabold mt-1">
                                            {/* {f.price.toLocaleString()} đ */}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            // onClick={() => minusFoodItem(f)}
                                            className={"w-9 h-9 rounded-md flex items-center justify-center transition border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"}
                                        >
                                            <FiMinus />
                                        </button>

                                        <div className="w-10 h-9 flex items-center justify-center border border-orange-500 rounded-md font-semibold">
                                            {/* {showQuantity(f)} */}
                                        </div>

                                        <button
                                            // onClick={() => addFoodItem(f)}
                                            className="w-9 h-9 bg-orange-500 text-white rounded-md flex items-center justify-center hover:bg-orange-600 transition"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                            
                        
                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default StepOrderFood;