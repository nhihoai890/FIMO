import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Autocomplete,
  Box,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import { CinemaContext } from '../../../../contexts/CinemaProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 🔮 Nút Neon Gradient
const NeonButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #5CA8FF, #9B8FFF)',
  color: '#fff',
  fontWeight: 600,
  borderRadius: 12,
  textTransform: 'none',
  boxShadow: '0 0 10px rgba(155,143,255,0.4)',
  transition: '0.25s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #7FB5FF, #B3A1FF)',
    boxShadow: '0 0 20px rgba(155,143,255,0.8)',
    transform: 'scale(1.03)',
  },
}));

// 🌌 Tiêu đề kiểu Cyberpunk
const CyberTitle = styled(DialogTitle)(() => ({
  background: 'linear-gradient(90deg, #1E1E2F, #2E2E4A)',
  color: '#00FFFF',
  fontWeight: 700,
  textAlign: 'center',
  textShadow: '0 0 10px #00FFFF',
  borderBottom: '2px solid rgba(0,255,255,0.3)',
  letterSpacing: 1.2,
}));

function ModalCinemaLocations({
  open,
  handleClose,
  handleInputLocation,
  cinemaLocation,
  addLocations,
  handleImageChangeLocations,
  error,
  loading,
}) {
  const city = useContext(CitiesContext);
  const cinemas = useContext(CinemaContext);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: 'radial-gradient(circle at top left, #121212, #1A1A2E 70%)',
          border: '1px solid rgba(0,255,255,0.2)',
          boxShadow: '0 0 25px rgba(92,168,255,0.4)',
          borderRadius: 3,
          color: '#E0E7FF',
          p: 1,
        },
      }}
    >
      <CyberTitle>
        {cinemaLocation.id ? 'Update Cinema Location' : 'Add Cinema Location'}
      </CyberTitle>

      <DialogContent>
        <DialogContentText component="div">
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
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#fff',
                '& fieldset': { borderColor: '#444' },
                '&:hover fieldset': { borderColor: '#00FFFF' },
                '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
              },
            }}
            InputLabelProps={{ style: { color: '#A0A0C0' } }}
          />

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
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#fff',
                '& fieldset': { borderColor: '#444' },
                '&:hover fieldset': { borderColor: '#00FFFF' },
                '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
              },
            }}
            InputLabelProps={{ style: { color: '#A0A0C0' } }}
          />

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
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#fff',
                '& fieldset': { borderColor: '#444' },
                '&:hover fieldset': { borderColor: '#00FFFF' },
                '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
              },
            }}
            InputLabelProps={{ style: { color: '#A0A0C0' } }}
          />

          <Autocomplete
            options={city}
            getOptionLabel={(option) => option?.name || ''}
            disablePortal
            fullWidth
            sx={{ mt: 2 }}
            value={city.find((d) => d.id === cinemaLocation.idCity) || null}
            onChange={(event, value) =>
              handleInputLocation({
                target: { name: 'idCity', value: value?.id || '' },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find City"
                variant="outlined"
                error={!!error.idCity}
                helperText={error.idCity}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#00FFFF' },
                    '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
                  },
                }}
                InputLabelProps={{ style: { color: '#A0A0C0' } }}
              />
            )}
          />

          <Autocomplete
            options={cinemas}
            getOptionLabel={(option) => option?.name || ''}
            disablePortal
            fullWidth
            sx={{ mt: 2 }}
            value={cinemas.find((c) => c.id === cinemaLocation.idCinema) || null}
            onChange={(event, value) =>
              handleInputLocation({
                target: { name: 'idCinema', value: value?.id || '' },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find Cinema"
                variant="outlined"
                error={!!error.idCinema}
                helperText={error.idCinema}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#00FFFF' },
                    '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
                  },
                }}
                InputLabelProps={{ style: { color: '#A0A0C0' } }}
              />
            )}
          />

          {/* Upload Image */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2.5}
            mt={3}
            sx={{
              p: 2,
              border: '1px dashed rgba(0,255,255,0.4)',
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.04)',
              boxShadow: '0 0 10px rgba(0,255,255,0.2)',
              transition: '0.3s ease',
              '&:hover': {
                boxShadow: '0 0 16px rgba(0,255,255,0.6)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              alt="Cinema Preview"
              src={cinemaLocation.imgUrl}
              sx={{
                width: 160,
                borderRadius: 3,
                border: '2px solid rgba(0,255,255,0.5)',
                objectFit: 'cover',
                boxShadow: '0 0 10px rgba(0,255,255,0.3)',
              }}
            />

            <NeonButton component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChangeLocations}
              />
            </NeonButton>
          </Box>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#FF6B6B',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              textShadow: '0 0 6px #FF6B6B',
            },
          }}
        >
          Cancel
        </Button>
        <NeonButton onClick={addLocations}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : cinemaLocation.id ? (
            'Update'
          ) : (
            'Add'
          )}
        </NeonButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCinemaLocations;
