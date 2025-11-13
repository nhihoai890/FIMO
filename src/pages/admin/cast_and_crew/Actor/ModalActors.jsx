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
    Box,
} from "@mui/material";
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Cyber neon button
const NeonButton = styled(Button)(() => ({
    background: 'linear-gradient(135deg, #0ff, #f0f)',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 12,
    textTransform: 'none',
    boxShadow: '0 0 8px #0ff, 0 0 15px #f0f',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 12px #0ff, 0 0 25px #f0f',
    },
}));

// Cyber neon dialog title
const NeonDialogTitle = styled(DialogTitle)(() => ({
    background: 'linear-gradient(90deg, #0ff, #f0f)',
    color: '#fff',
    fontWeight: 700,
    borderRadius: '16px 16px 0 0',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,255,255,0.3), 0 2px 12px rgba(255,0,255,0.3)',
}));

// Cyber neon Avatar
const NeonAvatar = styled(Avatar)(() => ({
    width: 120,
    height: 120,
    borderRadius: '16px',
    border: '3px solid #0ff',
    boxShadow: '0 0 15px #0ff, 0 0 25px #f0f',
    transition: '0.3s',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 0 25px #0ff, 0 0 40px #f0f, inset 0 0 10px #fff',
    },
}));

function ModalActorsCyber({ open, handleClose, handleInput, addActors, errorText, actor, handleImageChange }) {
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
                   
                    background: '#1a1a2e',
                    color: '#fff',
                    boxShadow: '0 4px 25px rgba(0,0,0,0.6)',
                },
            }}
        >
            <NeonDialogTitle>
                {actor.id ? "Edit Actor" : "Add Actor"}
            </NeonDialogTitle>

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
                                backgroundColor: '#2a2a40',
                                color: '#0ff',
                                '& fieldset': { borderColor: '#444' },
                                '&:hover fieldset': { borderColor: '#0ff' },
                                '&.Mui-focused fieldset': { borderColor: '#f0f' },
                            },
                            '& .MuiInputLabel-root': { color: '#0ff' },
                            '& .MuiFormHelperText-root': { color: '#ff0080' },
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
                                backgroundColor: '#2a2a40',
                                color: '#0ff',
                                '& fieldset': { borderColor: '#444' },
                                '&:hover fieldset': { borderColor: '#0ff' },
                                '&.Mui-focused fieldset': { borderColor: '#f0f' },
                            },
                            '& .MuiInputLabel-root': { color: '#0ff' },
                            '& .MuiFormHelperText-root': { color: '#ff0080' },
                        }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <NeonAvatar
                            key={actor.imgUrl}
                            src={actor.imgUrl}
                            alt="Avatar Preview"
                        />

                        <NeonButton component="label">
                            Chọn ảnh
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </NeonButton>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                <Button onClick={handleClose} sx={{ color: '#ff0080', fontWeight: 600 }}>
                    Cancel
                </Button>
                <NeonButton onClick={addActors}>
                    {actor.id ? "Update" : "Add"}
                </NeonButton>
            </DialogActions>
        </Dialog>
    );
}

export default ModalActorsCyber;
