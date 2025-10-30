import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Avatar, TextField } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalCinema({ open, handleClose, handleImage, handleInput, cinema, addCinema, error }) {
    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{cinema.id ? "Edit Cinema" : "Add Cinema"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Cinema Name"
                    type="text"
                    fullWidth
                    name="name"
                    value={cinema.name}
                    variant="outlined"
                    onChange={handleInput}
                    error={!!error.name}
                    helperText={error.name}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                    <Avatar
                        src={cinema.imgUrl || ""}
                        alt="Avatar Preview"
                        sx={{ width: 100, height: 100 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Chọn ảnh
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleImage}
                        />
                    </Button>
                  
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCinema}>{cinema.id ? "Edit" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalCinema;