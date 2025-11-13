import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, TextField } from '@mui/material';
import logo from "../../../../assets/logo.png"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalCinema({ open, handleClose, handleImage, handleInput, cinema, addCinema, error }) {
    return (
        <Dialog
            open={open}
            slots={{ transition: Transition }}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 3,
                    background: 'linear-gradient(145deg, #0a0a0f, #1a1a2e)',
                    color: '#00ffff',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(0,255,255,0.3), 0 0 35px rgba(255,0,255,0.2)',
                },
            }}
        >
            <DialogTitle sx={{ color: '#00ffff', fontWeight: 600 }}>
                {cinema.id ? "Edit Cinema" : "Add Cinema"}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                <TextField
                    autoFocus
                    label="Cinema Name"
                    type="text"
                    fullWidth
                    name="name"
                    value={cinema.name}
                    variant="outlined"
                    onChange={handleInput}
                    error={!!error.name}
                    helperText={error.name}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#1e1e2f',
                            color: '#00ffff',
                            '& fieldset': { borderColor: '#444' },
                            '&:hover fieldset': { borderColor: '#ff00ff' },
                            '&.Mui-focused fieldset': { borderColor: '#00ffff' },
                        },
                        '& .MuiInputLabel-root': { color: '#00ffff' },
                        '& .MuiInputBase-input': { color: '#00ffff' },
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src={cinema.imgUrl || logo}
                        alt="Cinema Preview"
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 2,
                            objectFit: 'cover',
                            border: '2px solid #00ffff',
                            boxShadow: '0 0 20px #00ffff, 0 0 35px #ff00ff',
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                            '&:hover': { background: 'linear-gradient(135deg, #ff00ff, #00ffff)' },
                        }}
                    >
                        Chọn ảnh
                        <input hidden accept="image/*" type="file" onChange={handleImage} />
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{ color: '#ff00ff' }} onClick={handleClose}>Cancel</Button>
                <Button
                    sx={{
                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                        color: '#fff',
                        '&:hover': { background: 'linear-gradient(135deg, #ff00ff, #00ffff)' },
                    }}
                    onClick={addCinema}
                >
                    {cinema.id ? "Edit" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalCinema;
