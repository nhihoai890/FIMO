import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalMovieScreen from './ModalMovieScreen';
import { addDocument } from '../../../../services/firebaseService';
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
   
    const addMovieScreen = async() => {
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
            <ModalMovieScreen addMovieScreen={addMovieScreen} setMovieScreen={setMovieScreen} handleClose={handleClose} open={open} movieScreen={movieScreen} handleInput={handleInput} />
        </>

    );
}


export default MovieScreening;