import React, { useContext } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Slide, Autocomplete, TextField, CardMedia, Box, Typography
} from '@mui/material';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalFood({ open, handleClose, handleInputFood, food, addFood, handleImageChange, error }) {
    const cinemaLocations = useContext(CinemaLocationsContext);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
                sx: {
                    backgroundColor: '#0A0F1E',
                    color: '#E0F7FA',
                    border: '1px solid rgba(0,255,255,0.2)',
                    boxShadow: '0 0 25px rgba(0,255,255,0.2)',
                    borderRadius: 3,
                    minWidth: 420,
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: 1,
                    color: '#00FFFF',
                    textShadow: '0 0 10px #00FFFF',
                }}
            >
                {food.id? "Update Food 🍱" : "Add Food 🍱"}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    error={!!error.name}
                    helperText={error.name}
                    variant="outlined"
                    value={food.name}
                    onChange={handleInputFood}
                    InputLabelProps={{ style: { color: '#00E5FF' } }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 8,
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                            '&:hover fieldset': { borderColor: '#00FFFF' },
                            '&.Mui-focused fieldset': {
                                borderColor: '#00FFFF',
                                boxShadow: '0 0 10px #00FFFF',
                            },
                        },
                    }}
                />

                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    error={!!error.price}
                    helperText={error.price}
                    value={food.price}
                    fullWidth
                    variant="outlined"
                    onChange={handleInputFood}
                    InputLabelProps={{ style: { color: '#00E5FF' } }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 8,
                        },
                    }}
                />

                <Autocomplete
                    options={cinemaLocations}
                    getOptionLabel={(option) => option?.name || ""}
                    value={cinemaLocations.find(c => c.id === food.idCinemaLocation) || null}
                    onChange={(event, value) =>
                        handleInputFood({ target: { name: "idCinemaLocation", value: value?.id } })
                    }
                    sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                            color: '#fff',
                        },
                        '& .MuiAutocomplete-popupIndicator:hover': {
                            color: '#00FFFF',
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Cinema"
                            error={!!error.idCinemaLocation}
                            helperText={error.idCinemaLocation}
                            margin="dense"
                            InputLabelProps={{ style: { color: '#00E5FF' } }}
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 8,
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                                    '&:hover fieldset': { borderColor: '#00FFFF' },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00FFFF',
                                        boxShadow: '0 0 10px #00FFFF',
                                    },
                                },

                            }}
                        />
                    )}
                />

                <TextField
                    margin="dense"
                    name="discount"
                    label="Discount (%)"
                    type="number"
                    error={!!error.discount}
                    helperText={error.discount}
                    value={food.discount}
                    fullWidth
                    variant="outlined"
                    onChange={handleInputFood}
                    InputLabelProps={{ style: { color: '#00E5FF' } }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 8,
                        },
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <CardMedia
                        src={food.imgUrl}
                        component="img"
                        height="100"
                        sx={{
                            width: 120,
                            borderRadius: 3,
                            border: '2px solid rgba(0,255,255,0.3)',
                            boxShadow: '0 0 15px rgba(0,255,255,0.2)',
                            objectFit: 'cover',
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            background: 'linear-gradient(135deg, #7F00FF, #00FFFF)',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                            color: '#fff',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00FFFF, #7F00FF)',
                                boxShadow: '0 0 15px rgba(0,255,255,0.5)',
                            },
                        }}
                    >
                        Choose Image
                        <input hidden accept="image/*"
                            type="file"
                            onChange={handleImageChange} />
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: '#FF4081',
                        fontWeight: 600,
                        '&:hover': {
                            textShadow: '0 0 10px #FF4081',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={addFood}
                    sx={{
                        background: 'linear-gradient(135deg, #00E5FF, #2979FF)',
                        color: '#fff',
                        px: 3,
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #2979FF, #00E5FF)',
                            boxShadow: '0 0 12px rgba(0,229,255,0.5)',
                        },
                    }}
                >
                    {food.id? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalFood;
