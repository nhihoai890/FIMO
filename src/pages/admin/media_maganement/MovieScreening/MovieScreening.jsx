import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalMovieScreen from './ModalMovieScreen';
import { addDocument } from '../../../../services/firebaseService';
import TableMovieScreening from './TableMovieScreening';
const inner = { list_showtime: [], idMovie: "", ratio: "", release_date: "", idCity: "", idCinemaLocation: "" }
function MovieScreening(props) {
    const [open, setOpen] = useState(false);
    const [movieScreen, setMovieScreen] = useState(inner);
    const [error, setError] = useState(inner);
    const handleClickOpen = () => {
        setMovieScreen(inner);
        setOpen(true);
    }

    const validation = () => {
        const newError = {};
        newError.release_date = movieScreen.release_date ? "" : "Please Enter Release Date"
        newError.ratio = movieScreen.ratio ? "" : "Please Enter Ratio"
        newError.list_showtime = movieScreen.list_showtime ? "" : "Please Choose Time";
        newError.idCity = movieScreen.idCity ? "" : "Please Choose City"
        newError.idCinemaLocation = movieScreen.idCinemaLocation ? "" : "Please Choose Cinema"
        setError(newError)
        return Object.values(newError)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const addMovieScreen = async () => {
        await addDocument("movieSceens", movieScreen)
        handleClose();
    }
    const handleInput = (e) => {
        setMovieScreen({ ...movieScreen, [e.target.name]: e.target.value })
    }
    console.log(movieScreen);

    return (
        <>
            <SearchAdmin title="List MovieScreen" placeholder="Search MovieScreen..." handleClickOpen={handleClickOpen} />
            <TableMovieScreening />
            <ModalMovieScreen addMovieScreen={addMovieScreen} setMovieScreen={setMovieScreen} handleClose={handleClose} open={open} movieScreen={movieScreen} handleInput={handleInput} />
        </>

    );
}


export default MovieScreening;