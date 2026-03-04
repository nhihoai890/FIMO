import React, { useContext, useEffect, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalMovieScreen from './ModalMovieScreen';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import TableMovieScreening from './TableMovieScreening';
import { MovieScreeningContext } from '../../../../contexts/MovieScreeningProvider';
const inner = { list_showtime: [], idMovie: "", ratio: "", release_date: "", idCity: "", idCinemaLocation: "", idRoom: "" }
function MovieScreening(props) {
    const movieScreens = useContext(MovieScreeningContext);
    const [open, setOpen] = useState(false);
    const [movieScreen, setMovieScreen] = useState(inner);
    const [error, setError] = useState(inner);
    const [filterScreens, setFilterScreen] = useState([]);

    useEffect(() => {
        setFilterScreen(movieScreens || []);
    }, [movieScreens]);
    const handleClickOpen = () => {
        setMovieScreen(inner);
        setError({ ...inner, list_showtime: "" });
        setOpen(true);
    }

    const validation = () => {
        const newError = {};
        newError.release_date = movieScreen.release_date ? "" : "Please Enter Release Date";
        newError.ratio = movieScreen.ratio ? "" : "Please Enter Ratio";
        newError.list_showtime =
            movieScreen.list_showtime && movieScreen.list_showtime.length > 0
                ? ""
                : "Please Choose Time";

        newError.idCity = movieScreen.idCity ? "" : "Please Choose City";
        newError.idCinemaLocation = movieScreen.idCinemaLocation ? "" : "Please Choose Cinema";

        setError(newError);


        return Object.values(newError).some(x => x !== "");
    };

    const handleClose = () => {
        setOpen(false);
    }

    const addMovieScreen = async () => {
        if (validation()) {
            return;
        }
        if (movieScreen.id) {
            await updateDocument("movieSceens", movieScreen)
        } else {
            await addDocument("movieSceens", movieScreen)
        }

        handleClose();
    }
    const handleInput = (e) => {
        setMovieScreen({ ...movieScreen, [e.target.name]: e.target.value })
    }

    const handleEdit = (msc) => {
        handleClickOpen();
        setMovieScreen(msc);
    }
    const handleSearch = (query) => {
        const q = query.trim().toLowerCase();
        const filtered = movieScreens.filter(mc => mc.idCinemaLocation.toLowerCase().includes(q))
        setFilterScreen(filtered)
    }

    return (
        <>
            <SearchAdmin title="List MovieScreen" placeholder="Search MovieScreen..." handleClickOpen={handleClickOpen} onSearch={handleSearch} />
            <TableMovieScreening handleEdit={handleEdit} movieScreens={filterScreens} />
            <ModalMovieScreen addMovieScreen={addMovieScreen} error={error} setMovieScreen={setMovieScreen} handleClose={handleClose} open={open} movieScreen={movieScreen} handleInput={handleInput} />
        </>

    );
}


export default MovieScreening;