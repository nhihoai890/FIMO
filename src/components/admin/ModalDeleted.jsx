import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ModalDeleted({open, handleClose, handleDeleted}) {
    return (
        <div>
               
                <Dialog
                   open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" 
                > 
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ban co chac chan muon xoa khong?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined'>CANCEL</Button>
                        <Button onClick={handleDeleted} autoFocus variant='contained' color='error'>
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
}

export default ModalDeleted;