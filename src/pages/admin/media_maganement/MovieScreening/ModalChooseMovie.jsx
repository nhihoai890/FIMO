import React, { useContext, useState } from 'react';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Slide, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalChooseMovie({ openChoose, handleCloseChoose, setMovieScreen, movieScreen }) {
    const movies = useContext(MoviesContext);
    const [search, setSearch] = useState("");

    const filteredMovie = movies.filter(mo => mo.name.toLowerCase().includes(search.toLowerCase()))

    const handleSelectMovie = (movie) => {

        setMovieScreen(prev => {
            if (prev.idMovie === movie.id) {
                return {
                    ...prev,
                    idMovie: null
                };
            }

            return {
                ...prev,
                idMovie: movie.id
            };
        });

    };

    return (
        <Dialog
            open={openChoose}
            slots={{ transition: Transition }}
            keepMounted
            onClose={handleCloseChoose}
            PaperProps={{
                sx: {
                    background: "linear-gradient(145deg, #141421, #1c1c2e)",
                    color: "#E0E0E0",
                    minWidth: 600,
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,255,255,0.15)"
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#00eaff',
                fontWeight: 600,
                letterSpacing: '0.5px',
                borderBottom: '1px solid rgba(0,255,255,0.15)',
                pb: 1.5
            }}>🎬 Chọn phim chiếu
                <TextField
                    size="small"
                    placeholder="Enter keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        input: { color: '#e0e6ff' },
                        width: 200,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                            '&:hover fieldset': { borderColor: '#00eaff' },
                            '&.Mui-focused fieldset': {
                                borderColor: '#00eaff',
                                boxShadow: '0 0 10px #00eaff'
                            },
                        },
                    }}
                />
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
                    gap: 2,
                    mt: 1
                }}>
                    {filteredMovie.map(movie => (
                        <Box
                            key={movie.id}
                            onClick={() => handleSelectMovie(movie)}
                            sx={{
                                cursor: "pointer",
                                borderRadius: 2,
                                overflow: "hidden",
                                background: "linear-gradient(180deg, #202034, #181826)",
                                position: "relative",
                                transition: "all 0.3s ease",
                                border: "1px solid rgba(0,255,255,0.1)",
                                boxShadow: movieScreen.idMovie === movie.id
                                    ? "0 0 15px 3px #00FFF7, 0 0 25px 5px rgba(0,255,255,0.3)"
                                    : "none",
                                transform: movieScreen.idMovie === movie.id ? "translateY(-3px)" : "none",
                                "&:hover": {
                                    transform: "scale(1.05) translateY(-3px)",
                                    boxShadow: movieScreen.idMovie === movie.id
                                        ? "0 0 20px 5px #00FFF7, 0 0 30px 8px rgba(0,255,255,0.4)"
                                        : "0 0 15px 3px rgba(0,255,255,0.2)",
                                    border: "1px solid #00FFF7"
                                }

                            }}
                        >
                            <Box
                                component="img"
                                src={movie.imgUrl}
                                alt={movie.name}
                                sx={{
                                    width: "100%",
                                    height: 220,
                                    objectFit: "cover",
                                    filter: "brightness(0.9)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        filter: "brightness(1.05)"
                                    }
                                }}
                            />
                            <Typography sx={{
                                mt: 1,
                                mb: 1.5,
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: "center",
                                color: "#E0E0E0",
                                textShadow: "0 0 5px rgba(0,255,255,0.3)"
                            }}>
                                {movie.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseChoose} sx={{
                    color: "#00FFF7",
                    textTransform: "none",
                    "&:hover": {
                        background: "rgba(0,255,255,0.1)",
                        boxShadow: "0 0 10px #00FFF7"
                    }
                }}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChooseMovie;
