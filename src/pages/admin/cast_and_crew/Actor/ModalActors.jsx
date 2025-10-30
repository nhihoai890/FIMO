import React from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Styled components
const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #5CA8FF, #9B8FFF)',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 10,
    textTransform: 'none',
    '&:hover': {
        background: 'linear-gradient(135deg, #81BFFF, #B3A1FF)',
        boxShadow: '0 0 10px rgba(92,168,255,0.4)',
    },
}));

const GradientDialogTitle = styled(DialogTitle)(() => ({
    background: 'linear-gradient(90deg, #5CA8FF, #9B8FFF)',
    color: '#fff',
    fontWeight: 700,
    borderRadius: '16px 16px 0 0',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
}));

const GradientAvatar = styled(Avatar)(() => ({
    width: 100,
    height: 100,
    border: '3px solid #5CA8FF',
    boxShadow: '0 4px 12px rgba(92,168,255,0.3)',
}));

function ModalActors({ open, handleClose, handleInput, addActors, errorText, actor, handleImageChange }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                    background: '#1E1E1E', // dark mode background
                    color: '#E0E0E0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                },
            }}
        >
            <GradientDialogTitle>
                {actor.id ? "Edit Actor" : "Add Actor"}
            </GradientDialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Actor Name"
                        type="text"
                        fullWidth
                        name="name"
                        value={actor.name}
                        variant="outlined"
                        onChange={handleInput}
                        error={!!errorText.name}
                        helperText={errorText.name}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#2A2A2A',
                                color: '#fff',
                                '& fieldset': { borderColor: '#444' },
                                '&:hover fieldset': { borderColor: '#5CA8FF' },
                                '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                            },
                            '& .MuiInputLabel-root': { color: '#bbb' },
                            '& .MuiFormHelperText-root': { color: '#FF8A80' },
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        name="description"
                        variant="outlined"
                        onChange={handleInput}
                        value={actor.description}
                        error={!!errorText.description}
                        helperText={errorText.description}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#2A2A2A',
                                color: '#fff',
                                '& fieldset': { borderColor: '#444' },
                                '&:hover fieldset': { borderColor: '#5CA8FF' },
                                '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                            },
                            '& .MuiInputLabel-root': { color: '#bbb' },
                            '& .MuiFormHelperText-root': { color: '#FF8A80' },
                        }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <GradientAvatar
                            key={actor.imgUrl}
                            src={actor.imgUrl}
                            alt="Avatar Preview"
                        />

                        <GradientButton component="label">
                            Chọn ảnh
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </GradientButton>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                <Button onClick={handleClose} sx={{ color: '#FF8A80', fontWeight: 600 }}>
                    Cancel
                </Button>
                <GradientButton onClick={addActors}>
                    {actor.id ? "Update" : "Add"}
                </GradientButton>
            </DialogActions>
        </Dialog>
    );
}

export default ModalActors;
