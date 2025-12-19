import React from 'react';

function Payment(props) {
    return (
        <div className="mt-16 min-h-screen bg-[#0d0d0d] py-10">
            <div className="max-w-6xl mx-auto bg-[#1a1a1a] shadow-lg rounded-lg p-6">
                <h2 className='text-center font-semibold text-xl mb-6 text-white'>Hình Thức Thanh Toán</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* left */}
                    <div className='md:col-span-2 space-y-6'>
                        <div className="flex gap-4">
                            <img
                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/c/g/cgv_350x495_1_2.jpg"
                                alt="movie"
                                className="rounded"
                            />
                            <div>
                                <h3 className="font-semibold text-lg text-white">
                                    TRUY TÌM LONG DIÊN HƯƠNG
                                </h3>
                                <p className="text-sm text-gray-400">
                                    RIO Hòa Khánh Đà Nẵng
                                </p>
                                <p className="text-sm text-gray-400">
                                    Rạp: <span>01</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Suất chiếu: 17/12/2025 - 21:50
                                </p>
                            </div>
                        </div>
                        <section>
                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                THÔNG TIN NGƯỜI MUA
                            </h4>
                            <div className="p-4 space-y-1 text-sm">
                                <p><strong>Họ tên:</strong> Phan Nhi</p>
                                <p><strong>Email:</strong> nhihoai0510@gmail.com</p>
                            </div>
                        </section>

                        <section>
                            <h4 className='bg-gray-700 text-white px-3 py-2 font-medium'>THÔNG TIN VÉ</h4>
                            <div className="p-4 text-sm flex justify-between">
                                <span className="border border-red-500 text-red-500 px-2 py-1 rounded">
                                    H07
                                </span>
                                <span>50.000 đ</span>
                            </div>
                        </section>
                        <section>
                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                THÔNG TIN BẮP NƯỚC
                            </h4>
                            <div className="p-4 text-sm flex justify-between">
                                <span>Combo 1 Bắp Caramel + Pepsi 24oz</span>
                                <span>89.000 đ</span>
                            </div>
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
                                <span>50.000 đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Combo</span>
                                <span>89.000 đ</span>
                            </div>
                            <hr className="border-gray-700" />
                            <div className="flex justify-between font-semibold text-white">
                                <span>TỔNG</span>
                                <span className="text-red-500">139.000 đ</span>
                            </div>
                            <div className="mt-4">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="accent-red-500"
                                    />
                                    VNPay
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer mb--2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="accent-red-500"
                                    />
                                    MoMo
                                </label>
                            </div>




                            <button className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                                Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;