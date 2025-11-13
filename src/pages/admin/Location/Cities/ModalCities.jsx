import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CardMedia, TextField, Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background:
      'linear-gradient(145deg, rgba(10,10,30,0.98), rgba(25,25,60,0.98))',
    border: '1px solid rgba(0,255,255,0.2)',
    boxShadow:
      '0 0 20px rgba(0,255,255,0.3), inset 0 0 15px rgba(255,0,255,0.1)',
    color: '#E0E0E0',
    borderRadius: '16px',
    transition: 'all 0.3s ease-in-out',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
}));

function ModalCities({
  open,
  handleClose,
  addCities,
  handleInputCities,
  handleImageChange,
  city,
  error,
}) {
  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: 600,
            color: '#00E0FF',
            textShadow: '0 0 10px #00E0FF',
            borderBottom: '1px solid rgba(0,255,255,0.2)',
          }}
        >
          {city.id ? 'Update City' : 'Add City'}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#E0E0E0',
                '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                '&:hover fieldset': { borderColor: '#00FFFF' },
                '&.Mui-focused fieldset': { borderColor: '#FF00FF' },
              },
              '& .MuiInputLabel-root': {
                color: '#9B8FFF',
                '&.Mui-focused': { color: '#FF00FF' },
              },
            }}
          />

          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            variant="outlined"
            rows={3}
            multiline
            value={city.description}
            error={!!error.description}
            helperText={error.description}
            onChange={handleInputCities}
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                color: '#E0E0E0',
                '& fieldset': { borderColor: 'rgba(255,0,255,0.3)' },
                '&:hover fieldset': { borderColor: '#FF00FF' },
                '&.Mui-focused fieldset': { borderColor: '#00FFFF' },
              },
              '& .MuiInputLabel-root': {
                color: '#9B8FFF',
                '&.Mui-focused': { color: '#00E0FF' },
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
              mt: 3,
              p: 2,
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: 2,
              background:
                'linear-gradient(145deg, rgba(30,30,60,0.6), rgba(10,10,30,0.8))',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 10px rgba(0,255,255,0.3)',
              },
            }}
          >
            <CardMedia
              src={city.imgUrl}
              component="img"
              height="120"
              alt="City Preview"
              sx={{
                width: 120,
                borderRadius: 2,
                border: '2px solid rgba(0,255,255,0.4)',
                objectFit: 'cover',
                boxShadow: '0 0 12px rgba(255,0,255,0.3)',
              }}
            />

            <Button
              variant="contained"
              component="label"
              sx={{
                background:
                  'linear-gradient(90deg, #FF00FF, #00FFFF)',
                color: '#000',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #00FFFF, #FF00FF)',
                  boxShadow: '0 0 15px rgba(0,255,255,0.5)',
                },
              }}
            >
              Choose Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{
              color: '#00FFFF',
              '&:hover': { textShadow: '0 0 6px #00FFFF' },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addCities}
            sx={{
              background:
                'linear-gradient(90deg, #00FFFF, #FF00FF)',
              color: '#000',
              fontWeight: 600,
              borderRadius: '10px',
              px: 3,
              '&:hover': {
                background:
                  'linear-gradient(90deg, #FF00FF, #00FFFF)',
                boxShadow: '0 0 15px rgba(255,0,255,0.6)',
              },
            }}
          >
            {city.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ModalCities;
