import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ModalDirectors({ open, handleClose,director, handleChangeDirector, addDirector, error }) {
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{director.id ? "Edit Director" : "Add Director"}</DialogTitle>
                <DialogContent dividers>
                    <div className="flex flex-col gap-4">
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Directors Name"
                            type="text"
                            fullWidth
                            name="name"
                            variant="outlined"
                            value={director.name}
                            onChange={handleChangeDirector}
                            error={!!error.name}
                            helperText={error.name}

                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            name="description"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            value={director.description}
                            onChange={handleChangeDirector}
                            error={!!error.description}
                            helperText={error.description}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={addDirector}>
                        {director.id ? "Edit" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDirectors;