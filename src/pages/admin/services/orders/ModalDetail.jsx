import React, { useContext, useMemo } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { MoviesContext } from "../../../../contexts/MovieProvider";
import { MovieScreeningContext } from "../../../../contexts/MovieScreeningProvider";
import { CinemaLocationsContext } from "../../../../contexts/CinemaLocationProvider";
import { RoomsContext } from "../../../../contexts/RoomProvider";
import { AccountContext } from "../../../../contexts/AccountProvider";
import { TypeChairsContext } from "../../../../contexts/TypeChairProvider";
import { FoodsContext } from "../../../../contexts/FoodProvider";
import { orderDetailsContext } from "../../../../contexts/OrderDetailsProvider";

import { filterById, getOjectById } from "../../../../utils/functionContants";

/* ================= TRANSITION ================= */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CyberTitle = styled(DialogTitle)(() => ({
  textAlign: "center",
  fontWeight: 700,
  color: "#22d3ee",
  letterSpacing: 1,
}));


function ModalDetail({ order, open, handleClose }) {
  const movies = useContext(MoviesContext);
  const movieScreens = useContext(MovieScreeningContext);
  const cinemaLocations = useContext(CinemaLocationsContext);
  const rooms = useContext(RoomsContext);
  const accounts = useContext(AccountContext);
  const typeChairs = useContext(TypeChairsContext);
  const foods = useContext(FoodsContext);
  const orderDetails = useContext(orderDetailsContext);

  const movieScreen = getOjectById(movieScreens, order?.idMovieScreening);

  const movie = useMemo(
    () => getOjectById(movies, movieScreen?.idMovie),
    [movies, movieScreen]
  );

  const cinema = useMemo(
    () => getOjectById(cinemaLocations, movieScreen?.idCinemaLocation),
    [cinemaLocations, movieScreen]
  );

  const room = useMemo(
    () => getOjectById(rooms, movieScreen?.idRoom),
    [rooms, movieScreen]
  );

  const account = useMemo(
    () => getOjectById(accounts, order?.idAccount),
    [accounts, order]
  );

  /* ===== TOTAL TICKET ===== */
  const totalChair = useMemo(() => {
    if (!order?.listchair?.length) return 0;

    return order.listchair.reduce((sum, seat) => {
      const type = typeChairs.find(t => t.id === seat.idChair);
      return sum + (type?.price || 0) * (movieScreen?.ratio || 1);
    }, 0);
  }, [order, typeChairs, movieScreen]);

  const totalFood = useMemo(() => {
    if (!order?.id || !orderDetails.length || !foods.length) return 0;

    const foodOrder = filterById(orderDetails, order.id, "id_order");

    return foodOrder.reduce((sum, item) => {
      const food = getOjectById(foods, item.idFood);
      return sum + (food?.price || 0) * item.quantity;
    }, 0);
  }, [order, orderDetails, foods]);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          background: "linear-gradient(145deg, #0f0f1a, #1a1a2e)",
          borderRadius: 4,
          color: "#E5E7EB",
          p: 4,
        },
      }}
    >
      <CyberTitle> THÔNG TIN VÉ ĐÃ ĐẶT</CyberTitle>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* ================= LEFT ================= */}
        <div className="md:col-span-3 space-y-6">
          {/* MOVIE */}
          <div className="flex gap-4">
            <img
              src={movie?.imgUrl}
              alt={movie?.name}
              className="w-24 h-36 rounded-xl shadow-lg"
            />
            <div className="text-sm space-y-1">
              <h3 className="text-lg font-semibold text-white">{movie?.name}</h3>
              <p className="text-gray-400">Rạp: {cinema?.name}</p>
              <p className="text-gray-400">Phòng: {room?.name}</p>
              <p className="text-gray-400">
                Suất chiếu: {order?.timeMovieScreen}
              </p>
            </div>
          </div>

          {/* BUYER */}
          <section className="rounded-xl bg-[#10101c] border border-gray-700">
            <h4 className="px-4 py-2 font-semibold text-cyan-400 border-b border-gray-700">
              NGƯỜI MUA
            </h4>
            <div className="p-4 text-sm space-y-1">
              <p>Họ tên: {account?.name}</p>
              <p>Email: {account?.email}</p>
            </div>
          </section>

          {/* TICKET */}
          <section className="rounded-xl bg-[#10101c] border border-gray-700">
            <h4 className="px-4 py-2 font-semibold text-cyan-400 border-b border-gray-700">
              VÉ
            </h4>
            <div className="p-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {order?.listchair?.map(seat => (
                  <span
                    key={seat.seatCode}
                    className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {seat.seatCode}
                  </span>
                ))}
              </div>
              <span className="font-semibold">
                {totalChair.toLocaleString()}đ
              </span>
            </div>
          </section>

          {/* FOOD */}
          <section className="rounded-xl bg-[#10101c] border border-gray-700">
            <h4 className="px-4 py-2 font-semibold text-cyan-400 border-b border-gray-700">
              BẮP NƯỚC
            </h4>
            {filterById(orderDetails, order?.id, "id_order").map((item, i) => {
              const food = getOjectById(foods, item.idFood);
              return (
                <div
                  key={i}
                  className="px-4 py-3 flex justify-between text-sm border-b border-gray-700 last:border-none"
                >
                  <span>{food?.name} × {item.quantity}</span>
                  <span className="text-purple-400 font-semibold">
                    {(food?.price * item.quantity).toLocaleString()}đ
                  </span>
                </div>
              );
            })}
          </section>
        </div>

        <div className="md:col-span-2 rounded-2xl p-5 bg-gradient-to-br from-[#141428] to-[#0f0f1c] border border-gray-700">
          <h4 className="text-center text-lg font-bold text-cyan-400 mb-6">
            THANH TOÁN
          </h4>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Vé</span>
              <span>{totalChair.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Combo</span>
              <span>{totalFood.toLocaleString()}đ</span>
            </div>

            <div className="pt-4 border-t border-gray-600 flex justify-between text-lg font-bold">
              <span>TỔNG</span>
              <span className="text-red-500">
                {order?.total?.toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>
      </div>

      <DialogActions sx={{ mt: 4 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "#FF6B6B",
            fontWeight: 600,
            "&:hover": { background: "rgba(255,107,107,0.1)" },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDetail;
