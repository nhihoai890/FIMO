import React, { useState, useContext } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Slide, Autocomplete, Grid, Paper, TextField, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PiBrowserFill } from "react-icons/pi";
import seat from "../../../../assets/seat.png";
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(145deg, rgba(20,20,30,1) 0%, rgba(10,10,20,1) 100%)',
    borderRadius: 16,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 0 20px rgba(0,255,255,0.1), inset 0 0 10px rgba(0,255,255,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 0 25px rgba(0,255,255,0.25), inset 0 0 12px rgba(0,255,255,0.1)',
    },
}));

function ModalRoom({ open, handleClose, room, handleInputRoom }) {
    const cinemaLocations = useContext(CinemaLocationsContext);
    const listChair = useContext(TypeChairsContext);
    const [grid, setGrid] = useState([]);

    const generateGrid = () => {
        const rows = parseInt(room.rows);
        const cols = parseInt(room.columns);
        if (!rows || !cols) return;
        setGrid(Array.from({ length: rows }, () => Array(cols).fill("")));
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    background: 'radial-gradient(circle at top left, #0a0a0f, #000)',
                    border: '1px solid rgba(0,255,255,0.2)',
                    boxShadow: '0 0 20px rgba(0,255,255,0.15)',
                    color: '#fff',
                    borderRadius: 4,
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    textAlign: 'center',
                    background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 10px rgba(0,255,255,0.5)',
                }}
            >
                💡 Add Room
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Room Name */}
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        onChange={handleInputRoom}
                        InputLabelProps={{ style: { color: '#00ffff' } }}
                        InputProps={{
                            style: {
                                color: '#fff',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: 8,
                            },
                        }}
                    />

                    {/* Cinema Select */}
                    <Autocomplete
                        options={cinemaLocations}
                        getOptionLabel={(option) => option?.name || ""}
                        value={cinemaLocations.find(c => c.id === room.idCinemaLocation) || null}
                        onChange={(event, value) =>
                            handleInputRoom({ target: { name: "idCinemaLocation", value: value?.id } })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Cinema"
                                margin="dense"
                                InputLabelProps={{ style: { color: '#00ffff' } }}
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        color: '#fff',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: 8,
                                    },
                                }}
                            />
                        )}
                    />


                    <Box display="flex" gap={2} alignItems="center">
                        <TextField
                            fullWidth
                            label="Rows"
                            onChange={handleInputRoom}
                            name="rows"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#00ffff' } }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 8,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Columns"
                            onChange={handleInputRoom}
                            name="columns"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#00ffff' } }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 8,
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={generateGrid}
                            sx={{
                                height: '56px',
                                minWidth: '56px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                                color: '#000',
                                fontWeight: 'bold',
                                boxShadow: '0 0 15px rgba(255,0,255,0.5)',
                                '&:hover': {
                                    boxShadow: '0 0 25px rgba(0,255,255,0.8)',
                                },
                            }}
                        >
                            <PiBrowserFill size={22} />
                        </Button>
                    </Box>

                    {/* Seat Grid */}
                    {grid.length > 0 && (
                        <Item>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${room.columns}, 1fr)`,
                                    gap: '10px',
                                    justifyContent: 'center',
                                }}
                            >
                                {grid.flat().map((_, index) => {
                                    const rowIndex = Math.floor(index / room.columns);
                                    const colIndex = index % room.columns;
                                    const key = `${rowIndex}-${colIndex}`;
                                    return (
                                        <Box key={key} sx={{ position: 'relative' }}>
                                            <img
                                                src={seat}
                                                alt={`Chair ${key}`}
                                                className="cursor-pointer"
                                                width={40}
                                                height={40}
                                                style={{
                                                    filter: 'drop-shadow(0 0 8px #00ffff)',
                                                    transition: '0.2s',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.filter = 'drop-shadow(0 0 12px #ff00ff) brightness(1.2)')}
                                                onMouseOut={(e) => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #00ffff)')}
                                            />
                                        </Box>
                                    );
                                })}
                            </div>
                        </Item>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ borderTop: '1px solid rgba(0,255,255,0.2)', p: 2 }}>
                <Button onClick={handleClose} sx={{ color: '#ccc' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                        borderRadius: 2,
                        px: 3,
                        color: '#000',
                        fontWeight: 700,
                        boxShadow: '0 0 15px rgba(0,255,255,0.4)',
                        '&:hover': {
                            boxShadow: '0 0 25px rgba(255,0,255,0.7)',
                        },
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalRoom;
