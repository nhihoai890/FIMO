import React, { useState, useContext, useEffect } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Slide, Autocomplete, Grid, Paper, TextField, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PiBrowserFill } from "react-icons/pi";
import seat from "../../../../assets/seat.png";
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import ModalChooseTypeChair from './ModalChooseTypeChair';
import { getOjectById } from '../../../../utils/functionContants';
import { addDocument } from '../../../../services/firebaseService';

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
    const typeChairs = useContext(TypeChairsContext);
    const [grid, setGrid] = useState([]);
    const [chooseType, setChooseType] = useState(false);
    const [selectSeat, setSelectSeat] = useState(null);
    useEffect(() => {
        const newGrid = Array.from({ length: room.rows }, (_, rowIndex) =>
            Array.from({ length: room.columns }, (_, colIndex) =>
                grid[rowIndex]?.[colIndex] || { col:'', row: "", idChair: "" }
            )
        );
        setGrid(newGrid);
    }, [room.rows, room.columns]);

    const handleClickSeat = (row, col, idChair) => {
        setSelectSeat({ row, col ,idChair });
        setChooseType(true);
    }

     const addRoom = async () => {
      const listChair = grid.flat().filter(e => e.idChair !== "");
       room.listChair = listChair ;
       console.log(room);
      await addDocument("rooms", room);
      handleClose();
  }

    const handleSelectType = (type) => {
        const { row, col, idChair } = selectSeat;
        const updateGrid = [...grid];
   
        updateGrid[row][col] = {
            row: row,
            col: col,
            idChair: idChair == type.id ? "" : type.id  || seat,
        };
        setGrid(updateGrid);
        setChooseType(false);
    }


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
                        value={room.name}
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
                            value={room.rows}
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
                            value={room.columns}
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
                    </Box>

                    {/* Seat Grid */}
                    {grid.length > 0 && (
                        <Item sx={{ display: "flex" }}>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${room.columns}, 1fr)`,
                                    gap: '10px',
                                    justifyContent: 'center',
                                }}
                            >
                                {grid.flat().map((e, index) => {
                                    const rowIndex = Math.floor(index / room.columns);
                                    const colIndex = index % room.columns;
                                    const key = `${rowIndex}-${colIndex}`;
                                    
                                    return (
                                        <Box key={key} sx={{ position: 'relative' }}>
                                            <img
                                                src={getOjectById(typeChairs,e.idChair)?.imgUrl || seat}
                                                alt="#"
                                                className="cursor-pointer"
                                                width={40}
                                                height={40}
                                                onClick={() => handleClickSeat(rowIndex, colIndex, e.idChair)}
                                                style={{
                                                    filter: getOjectById(typeChairs,e.idChair)
                                                        ? 'drop-shadow(0 0 8px #ff00ff)'
                                                        : 'drop-shadow(0 0 8px #00ffff)',
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
                    onClick={addRoom}
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
            <ModalChooseTypeChair selectSeat={selectSeat} open={chooseType} handleClose={() => setChooseType(false)} onSelectType={handleSelectType} />
        </Dialog>
    );
}

export default ModalRoom;
