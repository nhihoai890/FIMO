import React, { useContext, useEffect, useMemo, useState } from "react";
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
import CustomizedSteppers from "./CustomizedSteppers";
import { BookingContext } from "../../../../contexts/BookingProvider";
import { TypeChairsContext } from "../../../../contexts/TypeChairProvider";
import seat from "../../../../assets/seat.png"
import { OrdersContenxt } from "../../../../contexts/OrdersProvider";
import StepBooking from "./StepBooking";
import StepOrderFood from "./StepOrderFood";
import { FoodsContext } from "../../../../contexts/FoodProvider";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import StepPayment from "./StepPayment";

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
const inner = { idCity: "", idCinemaLocation: "", idMovie: "", idMovieScreening: "", idRoom: "", timeMovieScreen: "", listchair: [], idAccount: "booking tai quay", createAt: new Date(), method:"booking tai quay" }
function ModalOrders({ open, handleClose }) {
    const cities = useContext(CitiesContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const movies = useContext(MoviesContext);
    const rooms = useContext(RoomsContext);
    const movieScreens = useContext(MovieScreeningContext);
    const bookings = useContext(BookingContext);
    const typeChairs = useContext(TypeChairsContext);
    const foods = useContext(FoodsContext);
    const orders = useContext(OrdersContenxt);
    const [booking, setBooking] = useState(inner);
    const [activeStep, setActiveStep] = useState(0);
    const [orderItem, setOrderItem] = useState([]);

    useEffect(() => {
        if (!open) {
            setActiveStep(0);
            setBooking(inner);
        }
    }, [open]);
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

    const dataRoom = useMemo(() => {
        return getOjectById(rooms, getOjectById(movieScreens, booking.idMovieScreening)?.idRoom)
    }, [rooms, booking])

    const showImgUrl = (value) => {
        console.log(booking.timeMovieScreen);
        
        const checkOrder = orders.some(
            e =>
                e.idMovieScreening == booking.idMovieScreening &&
                e.timeMovieScreen == booking.timeMovieScreen &&
                (e.listchair || e.listchair || []).some(
                    c => c.row == value.row && c.col == value.col && c.idChair == value.idChair
                )
        );


        const checkSelected = (booking.listchair || []).some(
            c => c.row == value.row && c.col == value.col && c.idChair == value.idChair
        );

        return checkOrder
            ? seat
            : checkSelected
                ? "https://cdn-icons-png.flaticon.com/128/7306/7306270.png"
                : getOjectById(typeChairs, value.idChair)?.imgUrl;
    };

    const handleBooking = async (value) => {
        const sameChair = (c) =>
            c.row == value.row && c.col == value.col && c.idChair == value.idChair;

        const existed = (booking.listchair || []).some(sameChair);

        const newListChair = existed
            ? (booking.listchair || []).filter((c) => !sameChair(c))
            : [...(booking.listchair || []), value];

        const updatedLocal = { ...booking, listchair: newListChair };
        setBooking(updatedLocal);


        if (updatedLocal.id) await updateDocument("bookings", updatedLocal);
        else {
            const created = await addDocument("bookings", updatedLocal);
            setBooking(created || updatedLocal);
        }
    };



    const canGoNextFromBooking = Boolean(
        booking.idCity &&
        booking.idCinemaLocation &&
        booking.idMovie &&
        booking.idMovieScreening &&
        booking.timeMovieScreen
    );
    const handleBack = () => {
        if (activeStep === 0) handleClose();
        else setActiveStep((s) => s - 1);
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            if (!canGoNextFromBooking) return;

            if ((booking.listchair || []).length === 0) {
                alert("Vui lòng chọn ít nhất 1 ghế");
                return;
            }
        }

        if (activeStep === 2) {
            const orderNew = await addDocument("orders", {...booking, total: totalPrice});
            const newFoods = orderItem?.map(({ id, ...rest }) => ({
                ...rest,
                id_order: orderNew.id,
            }));
            await Promise.all(newFoods.map((item) => addDocument("OrderDetails", item)));
            handleClose();
        }
        setActiveStep((s) => Math.min(s + 1, 2));
    };

    
        const totalChair = useMemo(() => {
            if (!booking) return 0;
    
            return booking.listchair.reduce((total, chair) => {
                const typeChair = getOjectById(typeChairs, chair.idChair);
                const price = typeChair?.price || 0;
                const ratio = getOjectById(movieScreens, booking.idMovieScreening)?.ratio || 1;
                return total + price * ratio;
            }, 0);
        }, [booking, typeChairs, movieScreens]);
    
        const totalFood = useMemo(() => {
            if (!orderItem.length) return 0;
            return orderItem.reduce((total, item) => {
                const food = getOjectById(foods, item.idFood);
                const price = food?.price;
                return total + price * item.quantity
            }, 0)
        }, [orderItem, foods])
        const totalPrice = useMemo(() => {
            return totalChair + totalFood;
        }, [totalChair, totalFood]); 
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
                    <CustomizedSteppers activeStep={activeStep} />
                    {
                        activeStep === 0 &&
                        <StepBooking cities={cities}
                            cinemaLocations={cinemaLocations}
                            movies={movies}
                            movieScreens={movieScreens}
                            rooms={rooms}
                            booking={booking}
                            setBooking={setBooking}
                            cinemaOptions={cinemaOptions}
                            getMoviesWithUpcomingShowtimes={getMoviesWithUpcomingShowtimes}
                            movieScreenOption={movieScreenOption}
                            dataRoom={dataRoom}
                            showImgUrl={showImgUrl}
                            handleBooking={handleBooking}
                            CyberTextField={CyberTextField} />
                    }
                    {
                        activeStep === 1 && <StepOrderFood booking={booking} orderItem={orderItem} setOrderItem={setOrderItem} />
                    }

                    {
                        activeStep === 2 && <StepPayment booking={booking} orderItem={orderItem} movies={movies} movieScreens={movieScreens} totalChair={totalChair} totalFood={totalFood} totalPrice={totalPrice} />
                    }
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
                    <Button
                        onClick={handleBack}
                        sx={{ color: "#FF6B6B", fontWeight: 600 }}
                    >
                        {activeStep === 0 ? "Hủy" : "Quay lại"}
                    </Button>


                    <NeonButton onClick={handleNext} disabled={activeStep === 0 ? !canGoNextFromBooking : false} > {activeStep === 2 ? "Thanh toán" : "Tiếp tục"}</NeonButton>
                </DialogActions>
            </CyberDialog>

        </>
    );
}

export default ModalOrders;
