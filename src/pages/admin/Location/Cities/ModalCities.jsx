import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CardMedia, TextField } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




function ModalCities({ open, handleClose, addCities, handleInputCities, handleImageChange, city, error }) {
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {city.id ? "Update City" : "Add City" }
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cities Name"
                        type="text"
                        fullWidth
                        name="name"
                        variant="outlined"
                        value={city.name}
                        onChange={handleInputCities}
                        error={!!error.name}
                        helperText={error.name}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description"
                        variant="outlined"
                        rows={3}
                        error={!!error.description}
                        value={city.description}
                        helperText={error.description} 
                        onChange={handleInputCities}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                        <CardMedia
                            src={city.imgUrl}
                            component="img"
                            height="100"
                            alt="City Preview"
                            sx={{ width: 100, borderRadius: 2, border: "2px solid #ccc", objectFit: "cover" }}
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
                                onChange={handleImageChange}

                            />
                        </Button>

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={addCities}>
                        {city.id ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </div >
    );
}

export default ModalCities;