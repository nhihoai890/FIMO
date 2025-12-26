import React from 'react';

function HistoryBooking(props) {
  return (
    <div className='min-h-screen mt-16 bg-[#0F1115] text-white px-4 py-6 max-w-md mx-auto'>
      <h1 className='text-xl font-semibold mb-5 '>
        Lịch Sử Đặt Vé
      </h1>
      <div className='bg-[#181A20] rounded-xl p-4 mb-5'>
        <div className='flex justify-between items-center'>
          <span className="text-sm text-gray-400">Tổng điểm 2025</span>
          <span className="text-orange-400 text-sm font-semibold">
            5 ⭐
          </span>
        </div>
        <div className="text-3xl font-bold my-3">
          1.435
        </div>
        {/* Progress */}
        <div className="w-full h-2 bg-[#2A2D34] rounded-full">
          <div className="h-2 bg-orange-500 rounded-full w-[55%]" />
        </div>

        <div className="flex justify-between text-xs text-white">
          <span>0</span>
          <span>2.000</span>
          <span>4.000</span>
        </div>
        {/* TABS (demo only) */}
        <div className=" mt-3 flex bg-[#181A20] rounded-xl p-1 mb-4">
          <div className="flex-1 items-center py-2 text-center rounded-lg bg-orange-500 text-sm font-medium">
            Giao dịch
          </div>
        </div>

        {/* TRANSACTION LIST */}
        <div className="space-y-3">

          {/* Item */}
          <div className="bg-[#181A20] rounded-xl p-4 flex justify-between">
            <div>
              <p className="text-sm font-medium">
                Combo 1 Big Extra STD
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Galaxy Đà Nẵng • 16/12/2025 14:22
              </p>
            </div>
            <span className="text-orange-400 font-semibold text-sm">
              -135.000đ
            </span>
          </div>

          {/* Item */}
          <div className="bg-[#181A20] rounded-xl p-4 flex justify-between">
            <div>
              <p className="text-sm font-medium">
                Vé IMAX Avatar
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Galaxy Huế • 12/12/2025 20:10
              </p>
            </div>
            <span className="text-orange-400 font-semibold text-sm">
              -180.000đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryBooking;