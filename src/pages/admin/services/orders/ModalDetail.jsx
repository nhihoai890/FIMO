import React, { useContext, useMemo } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField,
    Autocomplete,
    Box,
    CardMedia,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { filterById, getOjectById } from '../../../../utils/functionContants';
import { MovieScreeningContext } from '../../../../contexts/MovieScreeningProvider';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { RoomsContext } from '../../../../contexts/RoomProvider';
import { AccountContext } from '../../../../contexts/AccountProvider';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import { FoodsContext } from '../../../../contexts/FoodProvider';
import { orderDetailsContext } from '../../../../contexts/OrderDetailsProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// 🔮 Nút Neon Gradient
const NeonButton = styled(Button)(() => ({
    background: 'linear-gradient(135deg, #5CA8FF, #9B8FFF)',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 12,
    textTransform: 'none',
    boxShadow: '0 0 10px rgba(155,143,255,0.4)',
    transition: '0.25s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #7FB5FF, #B3A1FF)',
        boxShadow: '0 0 20px rgba(155,143,255,0.8)',
        transform: 'scale(1.03)',
    },
}));

// 🌌 Tiêu đề kiểu Cyberpunk
const CyberTitle = styled(DialogTitle)(() => ({
    background: 'linear-gradient(90deg, #1E1E2F, #2E2E4A)',
    color: '#00FFFF',
    fontWeight: 700,
    textAlign: 'center',
    textShadow: '0 0 10px #00FFFF',
    borderBottom: '2px solid rgba(0,255,255,0.3)',
    letterSpacing: 1.2,
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
    const movieShow = useMemo(() => {
         return getOjectById(movies, getOjectById(movieScreens, order?.idMovieScreening).idMovie)
    }, [order,movies, movieScreens])
    
    const cinemaShow = useMemo(() => {
         return getOjectById(cinemaLocations, getOjectById(movieScreens, order?.idMovieScreening).idCinemaLocation)
    
    },[order, cinemaLocations, movieScreens]) 

    const showRoom = useMemo(() => {
        return getOjectById(rooms, getOjectById(movieScreens, order?.idMovieScreening).idRoom)
    },[order, rooms,movieScreens])
        
    const showAcc = useMemo(() => {
        return getOjectById(accounts, order?.idAccount)
    }, [order, accounts])

   
    const totalChair = useMemo(() => {
            if (!movieScreens || !order?.listchair) return 0;
    
            return order?.listchair.reduce((sum, seat) => {
                const typeChair = typeChairs.find(
                    t => t.id === seat.idChair
                );
    
                const price = typeChair?.price || 0;
                const ratio = movieScreens.ratio || 1;
    
                return sum + price * ratio;
            }, 0);
        }, [order, typeChairs, movieScreens]);
    
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        
                        background: 'radial-gradient(circle at top left, #121212, #1A1A2E 70%)',
                        border: '1px solid rgba(0,255,255,0.2)',
                        boxShadow: '0 0 25px rgba(92,168,255,0.4)',
                        borderRadius: 3,
                        color: '#E0E7FF',
                        p: 3,
                    },
                }}
            >
                <CyberTitle>
                    Thông tin Vé Đã Đặt
                </CyberTitle>


                <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6">

                    {/* LEFT */}
                    <div className="md:col-span-3 space-y-6">

                        {/* MOVIE INFO */}
                        <div className="flex gap-5">
                            <div className="w-24 h-36 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-400">
                                <img src={movieShow?.imgUrl} alt={movieShow?.name} className="rounded" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-white">
                                    Phim: {movieShow?.name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Rạp: {cinemaShow?.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Phòng: {showRoom?.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Suất chiếu: {order?.timeMovieScreen}
                                </p>
                            </div>
                        </div>

                        {/* BUYER INFO */}
                        <section className="rounded overflow-hidden border border-gray-700">
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-medium">
                                THÔNG TIN NGƯỜI MUA
                            </h4>
                            <div className="p-4 space-y-1 text-sm">
                                <p><strong>Họ tên:</strong> {showAcc?.name}</p>
                                <p><strong>Email: </strong>{showAcc?.email}</p>
                            </div>
                        </section>

                        {/* TICKET INFO */}
                        <section className="rounded overflow-hidden border border-gray-700">
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-medium">
                                THÔNG TIN VÉ
                            </h4>
                            <div className="p-4 flex justify-between items-center text-sm">
                                <div className="flex gap-2 flex-wrap">
                                    {order?.listchair.map(seat => (
                                        <span
                                            key={seat.seatCode}
                                            className="border border-red-500 text-red-500 px-2 py-1 rounded text-xs"
                                        >
                                            {seat.seatCode}
                                        </span>
                                    ))}
                                </div>
                                <span className="font-semibold text-white">
                                    {totalChair.toLocaleString()}đ
                                </span>
                            </div>
                        </section>

                        <section>

                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                THÔNG TIN BẮP NƯỚC
                            </h4>
                            {
                                filterById(orderDetails,order?.id, "id_order").map((food, index) => (
                                    <div key={index} className='p-4 text-sm flex justify-between'>
                                        <span>{getOjectById(foods, food.idFood)?.name}</span>
                                        <span>{food?.quantity} - {(getOjectById(foods, food.idFood)?.price * food?.quantity).toLocaleString()}đ</span>
                                    </div>
                                ))
                            }

                        </section>


                    </div>

                    {/* RIGHT - PAYMENT */}
                    <div className="md:col-span-2 border border-gray-700 rounded-xl p-4 h-fit bg-[#141414]">
                        <h4 className="bg-gray-700 text-white px-4 py-2 font-medium mb-4 rounded">
                            THÔNG TIN ĐÃ THANH TOÁN
                        </h4>

                        {/* <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Vé</span>
                                <span>{totalChair.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Combo</span>
                                <span>{totalFoodOrder.toLocaleString()}đ</span>
                            </div>

                            <hr className="border-gray-700" />

                            <div className="flex justify-between font-semibold text-lg text-white">
                                <span>TỔNG</span>

                                <span className="text-red-500">{orderView?.total.toLocaleString()}d</span>
                            </div>
                        </div> */}
                    </div>

                </div>


                <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#FF6B6B',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                textShadow: '0 0 6px #FF6B6B',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDetail;