import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Box, CardMedia, CircularProgress, Slide, TextField } from '@mui/material';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import { CinemaContext } from '../../../../contexts/CinemaProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalCinemaLocations({ open, handleClose, handleInputLocation, cinemaLocation, addLocations, handleImageChangeLocations, error, loading }) {

    const city = useContext(CitiesContext);
    const cinemas = useContext(CinemaContext);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle id="alert-dialog-title">
                {cinemaLocation.id? "Update CinemaLocations" : "Add CinemaLocations"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" component="div">
                    {/* Cinema Name */}
                    <TextField
                        label="Cinema Name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onChange={handleInputLocation}
                        error={!!error.name}
                        helperText={error.name}
                        value={cinemaLocation.name}
                    />

                    {/* Address */}
                    <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onChange={handleInputLocation}
                        error={!!error.address}
                        helperText={error.address}
                        value={cinemaLocation.address}

                    />

                    {/* Phone */}
                    <TextField
                        label="Phone"
                        name="phone"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onChange={handleInputLocation}
                        error={!!error.phone}
                        helperText={error.phone}
                        value={cinemaLocation.phone}

                    />

                    {/* City */}
                    <Autocomplete
                        options={city}
                        getOptionLabel={(option) => option?.name || ""}
                        disablePortal
                        fullWidth
                        sx={{ mt: 2 }}
                        value={city.find((d) => d.id === cinemaLocation.idCity) || null}
                        onChange={(event, value) =>
                            handleInputLocation({
                                target: { name: "idCity", value: value?.id || "" }
                            })}
                        renderInput={(params) => (
                            <TextField {...params} label="Find City" variant="outlined" error={!!error.idCity}
                                helperText={error.idCity} />
                        )}
                    />

                    <Autocomplete
                        options={cinemas}
                        getOptionLabel={(option) => option?.name || ""}
                        disablePortal
                        fullWidth
                        sx={{ mt: 2 }}
                        value={cinemas.find((c) => c.id === cinemaLocation.idCinema) || null}
                        onChange={(event, value) =>
                            handleInputLocation({
                                target: { name: "idCinema", value: value?.id || "" },
                            })
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Find Cinema" variant="outlined" error={!!error.idCinema}
                                helperText={error.idCinema} />
                        )}
                    />


                    {/* Upload Image */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2.5}
                        mt={2}
                        sx={{
                            p: 2,
                            border: "1px dashed #ccc",
                            borderRadius: 2,
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            alt="Cinema Preview"
                            src={cinemaLocation.imgUrl}
                            sx={{
                                width: 140,
                                borderRadius: 3,
                                border: "2px solid #ddd",
                                objectFit: "cover",
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            sx={{ px: 3, borderRadius: 3 }}
                        >
                            Chọn ảnh
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleImageChangeLocations}

                            />
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addLocations} autoFocus>
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : cinemaLocation.id ? (
                        "Update"
                    ) : (
                        "Add"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalCinemaLocations;