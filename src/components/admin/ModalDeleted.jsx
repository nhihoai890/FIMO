import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { FaExclamationTriangle } from 'react-icons/fa';


function ModalDeleted({ open, handleClose, handleDeleted }) {
    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(145deg, #0a0a0f, #000)',
                        border: '1px solid rgba(255,0,255,0.2)',
                        borderRadius: 3,
                        boxShadow: '0 0 30px rgba(255,0,255,0.2)',
                        color: '#fff',
                        p: 2,
                    },
                }}
            >
                {/* Header */}
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Box
                      
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                            color: '#ff4081',
                        }}
                    >
                        <FaExclamationTriangle size={24} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Confirm Delete
                        </Typography>
                    </Box>
                </DialogTitle>

                {/* Content */}
                <DialogContent>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{
                            color: '#ccc',
                            fontSize: '1rem',
                            textShadow: '0 0 8px rgba(255,255,255,0.1)',
                        }}
                    >
                        Bạn có chắc chắn muốn xóa mục này không?<br />
                        Hành động này <span style={{ color: '#ff4081', fontWeight: 600 }}>không thể hoàn tác</span>.
                    </Typography>
                </DialogContent>

                {/* Action buttons */}
                <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                            color: '#00ffff',
                            borderColor: 'rgba(0,255,255,0.5)',
                            borderRadius: 2,
                            px: 3,
                            '&:hover': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0,255,255,0.3)',
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleted}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 600,
                            boxShadow: '0 0 15px rgba(255,64,129,0.4)',
                            transition: '0.3s',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #d500f9, #ff4081)',
                                boxShadow: '0 0 25px rgba(255,64,129,0.6)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDeleted;