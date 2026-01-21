import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MoviesContext } from '../../contexts/MovieProvider';
import { MovieScreeningContext } from '../../contexts/MovieScreeningProvider';
import { CinemaLocationsContext } from '../../contexts/CinemaLocationProvider';
import { getMoviesWithUpcomingShowtimes, getOjectById } from '../../utils/functionContants';
import { Link } from 'react-router-dom';

const inner = { movieId: "" };

function PageSearch() {
    const movies = useContext(MoviesContext);
    const movieScreen = useContext(MovieScreeningContext);
    const cinemaLocation = useContext(CinemaLocationsContext);
    const [movieShow, setMovieShow] = useState([]);
    const [locationShow, setLocationShow] = useState([]);
    const [search, setSearch] = useState(inner);

    useEffect(() => {
        setMovieShow(getMoviesWithUpcomingShowtimes(movies, movieScreen));
    }, [movies, movieScreen]);

    useEffect(() => {
        setLocationShow(getLocationWithUpcomingShowtimes(cinemaLocation, movieScreen));
    }, [search]);



    function getLocationWithUpcomingShowtimes(location, movieScreen) {
        const now = new Date();
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);

        const movieIds = new Set(
            movieScreen
                .filter(st => {
                    const showDate = new Date(st.release_date);
                    return (
                        showDate >= now &&
                        showDate <= next7Days &&
                        st.idMovie == search.movieId
                    );
                })
                .map(st => st.idCinemaLocation)
        );

        return location.filter(loc => movieIds.has(loc.id));
    }

    const getSearchMovieScreen = useMemo(() => {
        const now = new Date();
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        return movieScreen.filter(st => {
            const showDate = new Date(st.release_date);
            return (
                showDate >= now &&
                showDate <= next7Days &&
                st.idMovie == search.movieId &&
                st.idCinemaLocation == search.locationId
            );
        })
    }, [search])


    const handleChangeInput = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };


    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&:hover fieldset': { borderColor: '#00ffff' },
            '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
        },
        '& .MuiInputLabel-root': { color: '#e0e0e0' },
    };

    return (
        <div className="w-full px-16 mt-6 relative z-10">
            <div className="grid grid-cols-5 gap-4 bg-black/30 p-6 rounded-2xl backdrop-blur-xl shadow-lg">

                {/* CHỌN PHIM */}
                <Autocomplete
                    options={movieShow}
                    getOptionLabel={(o) => o?.name || ""}
                    value={movies.find(d => d.id === search.movieId) || null}
                    onChange={(event, value) =>
                        handleChangeInput({ target: { name: "movieId", value: value?.id } })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Chọn Phim" sx={inputStyle} />
                    )}
                />

                {/* CHỌN RẠP */}
                <Autocomplete
                    options={locationShow}
                    getOptionLabel={(o) => o?.name || ""}
                    onChange={(event, value) =>
                        handleChangeInput({ target: { name: "locationId", value: value?.id } })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Chọn Rạp" sx={inputStyle} />
                    )}
                />

                <Autocomplete
                    options={getSearchMovieScreen}
                    getOptionLabel={(o) => o?.release_date || ""}
                    onChange={(event, value) =>
                        handleChangeInput({ target: { name: "movieScreenId", value: value?.id } })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Chọn Ngày" sx={inputStyle} />
                    )}
                />

                {/* GIỜ (demo) */}
                <Autocomplete
                    options={getOjectById(movieScreen, search.movieScreenId).list_showtime}
                    getOptionLabel={(o) => o || ""}
                    onChange={(event, value) =>
                        handleChangeInput({ target: { name: "time", value: value } })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Chọn Giờ" sx={inputStyle} />
                    )}
                />

                {/* BUTTON */}
                <Link to={`/booking/${search.movieScreenId}/${search.time}`}>
                    <Button
                        variant="contained"
                        className="!bg-gradient-to-r !from-purple-500 !to-blue-500 
                               !text-white !font-semibold !rounded-xl !shadow-lg hover:opacity-90"
                    >
                        Mua vé nhanh
                    </Button>
                </Link>

            </div>
        </div>
    );
}

export default PageSearch;
