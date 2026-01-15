import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, CardMedia, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalUser({open, handleClose}) {
    return (
       <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 2,
                        bgcolor: '#12121A',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 0 30px rgba(0,0,0,0.6)',
                        minWidth: 420,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: 0.5,
                        pb: 1,
                    }}
                >
                 {/* {typechair.id? "Update TypeChair" : "Add TypeChair"} */} ADD USER
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Email"
                                type="text"
                                fullWidth
                                name="email"
                                // variant="outlined"
                                // error={!!error.name}
                                // helperText={error.name}
                                // value={typechair.name}
                                
                                InputLabelProps={{ style: { color: '#aaa' } }}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderColor: '#444',
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#555' },
                                        '&:hover fieldset': { borderColor: '#888' },
                                        '&.Mui-focused fieldset': { borderColor: '#6c63ff' },
                                    },
                                }}
                            />
                            <TextField
                                label="Name"
                                type="text"
                                fullWidth
                                name="name"
                                variant="outlined"
                                // onChange={handleInputTypeChairs}
                                // error={!!error.price}
                                // helperText={error.price}
                                // value={typechair.price}
                                inputProps={{ min: 0 }}
                                InputLabelProps={{ style: { color: '#aaa' } }}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderColor: '#444',
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#555' },
                                        '&:hover fieldset': { borderColor: '#888' },
                                        '&.Mui-focused fieldset': { borderColor: '#6c63ff' },
                                    },
                                }}
                            />

                     </Box>       
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        color: '#bbb',
                        textTransform: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderColor: 'rgba(255,255,255,0.2)',
                        },
                    }} onClick={handleClose}>Cancel</Button>
                    
                    <Button sx={{
                        background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
                        textTransform: 'none',
                        fontWeight: 600,
                        color: '#fff',
                        borderRadius: 2,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #9B3DFF, #5B0FFF)',
                            boxShadow: '0 0 12px rgba(142,45,226,0.4)',
                        },
                    }} >ADD</Button>
                </DialogActions>
            </Dialog>
    );
}

export default ModalUser;