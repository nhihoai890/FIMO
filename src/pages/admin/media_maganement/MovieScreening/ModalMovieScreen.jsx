import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Autocomplete, Box, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { PiFilmSlateBold } from "react-icons/pi";
import logo from "../../../../assets/logo.png"
import { FaTrashAlt } from 'react-icons/fa';
import { filterById, getOjectById } from '../../../../utils/functionContants';
import ModalChooseMovie from './ModalChooseMovie';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import ShowRoom from '../../seating/Room/ShowRoom';
import { RoomsContext } from '../../../../contexts/RoomProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function ModalMovieScreen({ handleClose, open, movieScreen, handleInput, setMovieScreen, addMovieScreen }) {
    const cities = useContext(CitiesContext);
    const movies = useContext(MoviesContext);
    const rooms = useContext(RoomsContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const [time, setTime] = useState("");
    const [openChoose, setOpenChoose] = useState(false);
    const handleChoose = () => {
        setOpenChoose(true);
    }

    const handleCloseChoose = () => {
        setOpenChoose(false)
    }

    const handleTime = () => {
        if (!time) return;
        setMovieScreen(prev => ({ ...prev, list_showtime: [...prev.list_showtime, time] }));
        setTime("");
    }

    const removeTime = (timeRemove) => {
        setMovieScreen(prev => ({ ...prev, list_showtime: prev.list_showtime.filter(t => t !== timeRemove) }))

    }
    return (
        <div>

            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 3,
                        backdropFilter: 'blur(12px)',
                        background: 'linear-gradient(145deg, #0a0a0f, #1a1a2e)',
                        boxShadow: '0 0 25px rgba(0,255,255,0.2), 0 0 40px rgba(255,0,255,0.15)',
                        color: '#00ffff',
                    },
                }}

            >
                <DialogTitle sx={{ color: '#00ffff', fontWeight: 600 }}>Add Movie Screen</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
                                <TextField
                                    label="Release Date"
                                    type="date"
                                    name="release_date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { color: '#7fffff' },
                                    }}
                                    onChange={handleInput}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#1a1a2b',
                                            color: '#00ffff',
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#ff00ff' },
                                            '&.Mui-focused fieldset': { borderColor: '#00ffff' },
                                            '& input': {
                                                appearance: 'none', //  tắt UI gốc
                                                color: '#00ffff',
                                                backgroundColor: '#1a1a2b',
                                                caretColor: '#ff00ff',
                                                textShadow: '0 0 6px #00ffff',
                                                borderRadius: 4,
                                            },
                                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                                filter:
                                                    'invert(80%) sepia(100%) saturate(500%) hue-rotate(150deg)',
                                                cursor: 'pointer',
                                            },
                                        },
                                    }}
                                />



                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => option?.name || ""}
                                    value={cities.find(c => c.id === movieScreen.idCity) || null}
                                    onChange={(event, value) => handleInput({ target: { name: "idCity", value: value?.id } })}
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            sx={{
                                                backgroundColor: '#12121f',
                                                color: '#00ffff',
                                                border: '1px solid #333',
                                                boxShadow: '0 0 10px #00ffff40',
                                                '& .MuiAutocomplete-option': {
                                                    color: '#00ffff',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#2a0033',
                                                        color: '#ff00ff',
                                                    },
                                                    '&[aria-selected="true"]': {
                                                        backgroundColor: '#1a0040',
                                                        color: '#ff00ff',
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select City"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: '#1e1e2f',
                                                    color: '#00ffff',
                                                    transition: 'all 0.3s ease',
                                                    '& fieldset': { borderColor: '#444' },
                                                    '&:hover fieldset': { borderColor: '#ff00ff', boxShadow: '0 0 6px #ff00ff80' },
                                                    '&.Mui-focused fieldset': { borderColor: '#00ffff', boxShadow: '0 0 6px #00ffff80' },
                                                    '& input': {
                                                        color: '#00ffff',
                                                        textShadow: '0 0 6px #00ffff',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': { color: '#7fffff' },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#00ffff',
                                                    filter: 'drop-shadow(0 0 5px #00ffff)',
                                                    transition: '0.3s ease',
                                                },
                                            }}
                                        />
                                    )}
                                />

                                <TextField
                                    label="Ratio"
                                    type="number"
                                    name="ratio"
                                    fullWidth
                                    onChange={handleInput}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#1e1e2f',
                                            color: '#00ffff',
                                            '& fieldset': { borderColor: '#444' },
                                            '&:hover fieldset': { borderColor: '#ff00ff' },
                                            '&.Mui-focused fieldset': { borderColor: '#ff00ff' },
                                        },
                                        '& .MuiInputLabel-root': { color: '#00ffff' },
                                        '& .MuiInputBase-input': { color: '#00ffff' },
                                    }}

                                />

                                <Autocomplete
                                    options={filterById(cinemaLocations, movieScreen.idCity, 'idCity')}
                                    getOptionLabel={(option) => option?.name || ""}
                                    value={cinemaLocations.find(c => c.id === movieScreen.idCinemaLocation) || null}
                                    onChange={(event, value) =>
                                        handleInput({ target: { name: "idCinemaLocation", value: value?.id } })
                                    }
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            sx={{
                                                backgroundColor: '#12121f',
                                                color: '#00ffff',
                                                border: '1px solid #333',
                                                boxShadow: '0 0 10px #00ffff40',
                                                '& .MuiAutocomplete-option': {
                                                    color: '#00ffff',
                                                    '&:hover': {
                                                        backgroundColor: '#2a0033',
                                                        color: '#ff00ff',
                                                    },
                                                    '&[aria-selected="true"]': {
                                                        backgroundColor: '#1a0040',
                                                        color: '#ff00ff',
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Cinema"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: '#1e1e2f',
                                                    color: '#00ffff',
                                                    '& fieldset': { borderColor: '#444' },
                                                    '&:hover fieldset': { borderColor: '#ff00ff' },
                                                    '&.Mui-focused fieldset': { borderColor: '#00ffff' },
                                                    '& input': {
                                                        color: '#00ffff',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': { color: '#7fffff' },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#00ffff',
                                                    filter: 'drop-shadow(0 0 4px #00ffff)',
                                                },
                                            }}
                                        />
                                    )}
                                />


                                <TextField
                                    label="Time"
                                    type="time"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setTime(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment onClick={handleTime} position="end">
                                                <IconButton sx={{
                                                    color: '#00ffff',
                                                    '&:hover': { color: '#ff00ff', transform: 'scale(1.2)' },
                                                    transition: '0.3s'
                                                }}>
                                                    <IoMdAddCircleOutline />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#1a1a2b',
                                            color: '#00ffff',
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#ff00ff' },
                                            '&.Mui-focused fieldset': { borderColor: '#00ffff' },
                                            '& input': {
                                                appearance: 'none', //  tắt UI gốc
                                                color: '#00ffff',
                                                backgroundColor: '#1a1a2b',
                                                caretColor: '#ff00ff',
                                                textShadow: '0 0 6px #00ffff',
                                                borderRadius: 4,
                                            },
                                            '& input[type="time"]::-webkit-calendar-picker-indicator': {
                                                filter:
                                                    'invert(80%) sepia(100%) saturate(500%) hue-rotate(150deg)',
                                                cursor: 'pointer',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    sx={{
                                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                                        color: '#fff',
                                        minWidth: 40,
                                        minHeight: 40,
                                        borderRadius: 2,
                                        boxShadow: '0 0 8px rgba(0,255,255,0.6)',
                                        transition: '0.3s',
                                        '&:hover': {
                                            boxShadow: '0 0 15px rgba(255,0,255,0.9)',
                                            transform: 'scale(1.1)',
                                            background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                                        },
                                        p: 1
                                    }}
                                    onClick={handleChoose}
                                >
                                    <PiFilmSlateBold size={24} />
                                </Button>
                                <Box>
                                    <div className='flex gap-2 flex-wrap'>
                                        {movieScreen.list_showtime.map((time, index) => (
                                            <button
                                                key={index}
                                                className='relative flex items-center justify-center border border-cyan-400 rounded-md py-2 px-4 text-center text-cyan-200 hover:border-magenta-400 hover:shadow-[0_0_10px_rgba(255,0,255,0.5)] transition-all'
                                            >
                                                {time}
                                                <FaTrashAlt onClick={() => removeTime(time)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        cursor: 'pointer',
                                                        color: 'red',
                                                    }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <img
                                        src={getOjectById(movies, movieScreen.idMovie)?.imgUrl || logo}
                                        alt=""
                                        style={{
                                            width: 140,
                                            height: 200,
                                            borderRadius: 14,
                                            objectFit: 'cover',
                                            boxShadow: '0 0 25px #00ffff, 0 0 40px #ff00ff',
                                            border: '1px solid #00ffff',
                                        }}
                                    />
                                </Box>
                            </Box>
                            <div className="flex gap-4 flex-wrap">
                                {filterById(rooms, movieScreen.idCinemaLocation, "idCinemaLocation").map(m => (
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="
                    w-[160px] h-[120px] 
                    overflow-hidden flex items-center justify-center
                    rounded-xl
                    bg-[#0f0f1a]
                    border border-cyan-500/40
                    shadow-[0_0_12px_rgba(0,255,255,0.25)]
                    hover:shadow-[0_0_18px_rgba(255,0,255,0.4)]
                    transition-all duration-300
                "
                                        >
                                            <ShowRoom data={m} />
                                        </div>

                                      
                                        <div
                                            className="
                    w-full mt-2 py-1 
                    text-center text-white font-medium text-sm
                    rounded-md
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    shadow-[0_0_8px_rgba(0,255,255,0.4)]
                "
                                        >
                                            {m.name}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#ff00ff' }} onClick={handleClose}>Cancel</Button>
                    <Button sx={{
                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                        color: '#fff',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                        }
                    }} onClick={addMovieScreen}>Add</Button>
                </DialogActions>
            </Dialog>
            <ModalChooseMovie openChoose={openChoose} handleCloseChoose={handleCloseChoose} setMovieScreen={setMovieScreen} movieScreen={movieScreen} />

        </div>
    );
}

export default ModalMovieScreen;