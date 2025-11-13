import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalMovieScreen from './ModalMovieScreen';
const inner = { list_showtime: [], idMovie: "", ratio: "", release_date: "", idCity: "", idCinemaLocation: ""}
function MovieScreening(props) {
    const [open, setOpen] = useState(false);
    const [movieScreen, setMovieScreen] = useState(inner);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleInput = (e) => {
        setMovieScreen({ ...movieScreen, [e.target.name]: e.target.value })
    }

    return (
        <>
            <SearchAdmin title="List MovieScreen" placeholder="Search MovieScreen..." handleClickOpen={handleClickOpen} />
            <ModalMovieScreen setMovieScreen={setMovieScreen} handleClose={handleClose} open={open} movieScreen={movieScreen} handleInput={handleInput} />
        </>

    );
}


export default MovieScreening;