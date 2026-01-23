import React, { useContext, useMemo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    Button,
    Autocomplete,
    TextField,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CitiesContext } from "../../../../contexts/CitiesProvider";
import { CinemaLocationsContext } from "../../../../contexts/CinemaLocationProvider";
import { MoviesContext } from "../../../../contexts/MovieProvider";
import { RoomsContext } from "../../../../contexts/RoomProvider";
import { MovieScreeningContext } from "../../../../contexts/MovieScreeningProvider";
import { getOjectById } from "../../../../utils/functionContants";
import ShowRoomBooking from "../../../client/booking/ShowRoomBooking";
import ModalFoodOrders from "./ModalFoodOrders";
import CustomizedSteppers from "./CustomizedSteppers";
import { BookingContext } from "../../../../contexts/BookingProvider";
import { TypeChairsContext } from "../../../../contexts/TypeChairProvider";
import selected from "../../../../assets/seatSelected.png"
import seat from "../../../../assets/seat.png"
import { OrdersContenxt } from "../../../../contexts/OrdersProvider";

/* ================= TRANSITION ================= */

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/* ================= STYLES ================= */

const CyberDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
        background: "radial-gradient(circle at top left, #0f0f1a, #121225)",
        borderRadius: 20,
        border: "1px solid rgba(0,255,255,0.25)",
        boxShadow: "0 0 40px rgba(0,255,255,0.35)",
        color: "#E6F7FF",
    },
}));

const CyberTitle = styled(DialogTitle)(() => ({
    textAlign: "center",
    fontWeight: 700,
    letterSpacing: 2,
    color: "#00FFFF",
    textShadow: "0 0 12px #00FFFF",
    borderBottom: "1px solid rgba(0,255,255,0.2)",
}));

const CyberTextField = styled(TextField)(() => ({
    "& .MuiInputLabel-root": {
        color: "#6ffcff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#00ffff",
    },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#0b0b16",
        color: "#fff",
        borderRadius: 12,
        "& fieldset": {
            borderColor: "rgba(0,255,255,0.35)",
        },
        "&:hover fieldset": {
            borderColor: "#00ffff",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00ffff",
            boxShadow: "0 0 12px rgba(0,255,255,0.6)",
        },
    },
}));

const NeonButton = styled(Button)(() => ({
    background: "linear-gradient(135deg, #00ffff, #9b8fff)",
    color: "#000",
    fontWeight: 700,
    borderRadius: 14,
    padding: "10px 28px",
    boxShadow: "0 0 18px rgba(0,255,255,0.7)",
    textTransform: "none",
    "&:hover": {
        boxShadow: "0 0 30px rgba(0,255,255,1)",
        transform: "scale(1.05)",
    },
}));

/* ================= COMPONENT ================= */
const inner = { idCity: "", idCinemaLocation: "", idMovie: "", idMovieScreen: "", idRoom: "", time: ""}
function ModalOrders({ open, handleClose }) {
    const cities = useContext(CitiesContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const movies = useContext(MoviesContext);
    const rooms = useContext(RoomsContext);
    const movieScreens = useContext(MovieScreeningContext);
    const bookings = useContext(BookingContext);
    const typeChairs = useContext(TypeChairsContext);
    const orders = useContext(OrdersContenxt);
    const [booking, setBooking] = useState(inner);
    const [openFood, setOpenFood] = useState(false)
    const cinemaOptions = useMemo(() => {
        return cinemaLocations.filter(ct => ct.idCity === booking.idCity)
    }, [booking, cinemaLocations])

    const getMoviesWithUpcomingShowtimes = useMemo(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const next7Days = new Date(now);
        next7Days.setDate(now.getDate() + 7);

        const movieIds = new Set(
            movieScreens
                .filter(st => {
                    const showDate = new Date(st.release_date);
                    showDate.setHours(0, 0, 0, 0);
                    return showDate >= now && showDate <= next7Days && st.idCinemaLocation === booking.idCinemaLocation;
                })
                .map(st => st.idMovie)
        );

        return movies.filter(movie => movieIds.has(movie.id));
    }, [movies, movieScreens, booking])

    const movieScreenOption = useMemo(() => {
        return movieScreens.filter(mv => mv.idCinemaLocation === booking.idCinemaLocation && mv.idMovie === booking.idMovie)
    }, [movieScreens, booking])
    console.log(movieScreenOption);

    const dataRoom = useMemo(() => {
        return getOjectById(rooms, getOjectById(movieScreens, booking.idMovieScreen)?.idRoom)
    }, [rooms, booking])

   const showImgUrl = (value) => {
    const checkOrder = orders.some(e => e.idMovieScreening == booking.idMovieScreen && e.timeMovieScreen == booking.time && e.listchair.some(c => c.row == value.row && c.col == value.col && c.idChair == value.idChair) )
         const check = bookings.some(e => e.idMovieScreening == booking.idMovieScreen && e.time == booking.time
             && e.listChair.some(c => c.row == value.row && c.col == value.col && c.idChair == value.idChair));
         return checkOrder? seat : check ? "https://cdn-icons-png.flaticon.com/128/7306/7306270.png" : getOjectById(typeChairs, value.idChair)?.imgUrl;
     }
 
    const closeModal = () => {
        setOpenFood(false);
        setBooking(inner);
        handleClose();
    }

    const handleNext = () => {
        setOpenFood(true);
    }

    return (
        <>
            <CyberDialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth
                maxWidth="md"
            >
                <CyberTitle>ĐẶT VÉ TẠI QUẦY</CyberTitle>

                <DialogContent sx={{ mt: 3 }}>
                    <CustomizedSteppers />
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 3,
                            mt: 3,
                        }}
                    >
                        {/* LEFT – FORM */}
                        <Box sx={{ display: "grid", gap: 2.5 }}>
                            <Autocomplete
                                options={cities}
                                value={getOjectById(cities, booking.idCity)}
                                onChange={(e, value) => setBooking({ ...booking, idCity: value.id })}
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => (
                                    <CyberTextField {...params} label="Thành Phố" />
                                )}
                            />

                            <Autocomplete
                                options={cinemaOptions}
                                value={getOjectById(cinemaLocations, booking.idCinemaLocation)}
                                onChange={(e, value) => setBooking({ ...booking, idCinemaLocation: value.id })}
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => (
                                    <CyberTextField {...params} label="Rạp" />
                                )}
                            />

                            <Autocomplete
                                options={getMoviesWithUpcomingShowtimes}
                                value={getOjectById(movies, booking.idMovie)}
                                onChange={(e, value) => setBooking({ ...booking, idMovie: value.id })}
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => (
                                    <CyberTextField {...params} label="Phim" />
                                )}
                            />

                            <Autocomplete
                                options={movieScreenOption}
                                getOptionLabel={(option) => option?.release_date}
                                onChange={(e, value) => setBooking({ ...booking, idMovieScreen: value.id })}
                                renderInput={(params) => (
                                    <CyberTextField {...params} label="⏰ Suất chiếu" />
                                )}
                            />

                            <Autocomplete
                                options={getOjectById(movieScreens, booking.idMovieScreen).list_showtime}
                                onChange={(e,value) =>setBooking({...booking, time: value}) }
                                renderInput={(params) => (
                                    <CyberTextField {...params} label="Gio Chieu" />
                                )}
                            />
                        </Box>
                        <Box>
                            {booking.time &&  <ShowRoomBooking data={dataRoom} showImgUrl={showImgUrl} /> }
                           
                        </Box>
                        {/* RIGHT – ORDER INFO */}
                        {/* <Box
                        sx={{
                            border: "1px solid rgba(0,255,255,0.3)",
                            borderRadius: 3,
                            p: 2.5,
                            background: "#0c0c18",
                        }}
                    >
                        <Box
                            sx={{
                                color: "#00ffff",
                                fontWeight: 700,
                                mb: 2,
                                letterSpacing: 1,
                            }}
                        >
                           
                        </Box>

                        <Box sx={{ fontSize: 14, lineHeight: 2 }}>
                            <p>🎬 Phim: <b>Avatar</b></p>
                            <p>🏢 Rạp: <b>CGV Vincom</b></p>
                            <p>⏰ Suất: <b>19:00</b></p>
                            <p>🎥 Phòng: <b>IMAX</b></p>
                        </Box>

                        <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.2)" }} />

                        <Box sx={{ mb: 1 }}>🎟 Ghế đã chọn</Box>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Chip label="A1" color="error" />
                            <Chip label="A2" color="error" />
                            <Chip label="A3" color="error" />
                        </Box>

                        <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.2)" }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: 700,
                                fontSize: 16,
                            }}
                        >
                            <span>TỔNG TIỀN</span>
                            <span style={{ color: "#ff5cf4" }}>240.000đ</span>
                        </Box>
                    </Box> */}

                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
                    <Button
                        onClick={closeModal}
                        sx={{ color: "#FF6B6B", fontWeight: 600 }}
                    >
                        Hủy
                    </Button>
                    <NeonButton onClick={handleNext}>Tiếp Tục</NeonButton>
                </DialogActions>
            </CyberDialog>
            <ModalFoodOrders open={openFood} booking={booking} onBack={() => setOpenFood(false)}
                onClose={() => setOpenFood(false)} />
        </>
    );
}

export default ModalOrders;
