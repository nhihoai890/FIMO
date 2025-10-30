import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Chip,
  Avatar,
  Box,
  Autocomplete,
} from "@mui/material";
import { MdCancel, MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import ModalChoose from './ModalChoose';
import { DirectorsContext } from '../../../../contexts/DirectorsProvider';
import { ActorsContext } from '../../../../contexts/ActorProvider';
import { CategoriesContext } from '../../../../contexts/CategoryProvider';
import { getOjectById } from '../../../../utils/functionContants';

// Styled components
const GradientButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #5CA8FF, #9B8FFF)',
  color: '#fff',
  fontWeight: 600,
  borderRadius: 12,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #81BFFF, #B3A1FF)',
    boxShadow: '0 0 10px rgba(92,168,255,0.4)',
    transform: 'scale(1.02)',
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

const GradientChip = styled(Chip)(() => ({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: '#fff',
  fontWeight: 600,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 8px rgba(118,75,162,0.5)',
  },
}));

function ModalMovie({ loading, open, handleClose, handleAddMovie, handleInputMovie, movie, setMovie, error, handleImageChangeMovie }) {

  const [openChoose, setOpenChoose] = useState(false);
  const director = useContext(DirectorsContext);
  const actors = useContext(ActorsContext);
  const categories = useContext(CategoriesContext);
  const [dataChoose, setDataChoose] = useState([]);
  const [type, setType] = useState("");

  const handleClickOpenChoose = (key) => {
    setType(key);
    setDataChoose(key === "categories" ? categories : actors);
    setOpenChoose(true);
  };
  const handleCloseChoose = () => setOpenChoose(false);

  const handleClickChoose = (id, type) => {
    const toggleData = (data, id) => data.includes(id) ? data.filter(e => e !== id) : [...data, id];
    if (type === "categories") setMovie(prev => ({ ...prev, listCate: toggleData(prev.listCate, id) }));
    if (type === "actors") setMovie(prev => ({ ...prev, listActor: toggleData(prev.listActor, id) }));
  };

  const getDataChoose = () => type === "categories" ? movie.listCate : movie.listActor;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          background: 'rgba(30,30,60,0.85)',
          backdropFilter: 'blur(10px)',
          color: '#E0E7FF',
        },
      }}
    >
      <GradientDialogTitle>{movie.id ? "Update Movie" : "Add Movie"}</GradientDialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
          {/* LEFT FORM */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={movie.name}
              onChange={handleInputMovie}
              error={!!error.name}
              helperText={error.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={movie.description}
              onChange={handleInputMovie}
              error={!!error.description}
              helperText={error.description}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <TextField
              label="Duration (minutes)"
              name="duration"
              type="number"
              fullWidth
              value={movie.duration}
              onChange={handleInputMovie}
              error={!!error.duration}
              helperText={error.duration}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <TextField
              label="Age Limit"
              name="ageLimit"
              type="number"
              fullWidth
              value={movie.ageLimit}
              onChange={handleInputMovie}
              error={!!error.ageLimit}
              helperText={error.ageLimit}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <TextField
              label="Url Trailer"
              name="urlTrailer"
              fullWidth
              value={movie.urlTrailer}
              onChange={handleInputMovie}
              error={!!error.urlTrailer}
              helperText={error.urlTrailer}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <Autocomplete
              options={director}
              getOptionLabel={(option) => option?.name || ""}
              value={director.find(d => d.id === movie.idDirector) || null}
              onChange={(event, value) => handleInputMovie({ target: { name: "idDirector", value: value?.id } })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Director"
                  error={!!error.idDirector}
                  helperText={error.idDirector}
                  sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#2A2A3A',
                  color: '#fff',
                  '& fieldset': { borderColor: '#444' },
                  '&:hover fieldset': { borderColor: '#5CA8FF' },
                  '&.Mui-focused fieldset': { borderColor: '#81BFFF' },
                },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
                />
              )}
            />
          </Box>

          {/* RIGHT FORM */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Categories */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdCategory fontSize={20} onClick={() => handleClickOpenChoose("categories")} style={{ cursor: 'pointer', color: '#5CA8FF' }} />
                <span>Categories</span>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {movie.listCate.map(e => (
                  <GradientChip
                    key={e}
                    label={getOjectById(categories, e)?.name}
                    onDelete={() => handleClickChoose(e, "categories")}
                  />
                ))}
              </Box>
            </Box>

            {/* Actors */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaUserAlt style={{ cursor: 'pointer', color: '#5CA8FF' }} onClick={() => handleClickOpenChoose("actors")} />
                <span>Actors</span>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {movie.listActor.map(e => (
                  <Box key={e} sx={{ position: 'relative', textAlign: 'center' }}>
                    <Avatar
                      src={getOjectById(actors, e)?.imgUrl}
                      sx={{ width: 48, height: 48, border: '2px solid #9B8FFF', boxShadow: '0 2px 6px rgba(155,143,255,0.4)' }}
                    />
                    <MdCancel
                      fontSize="small"
                      onClick={() => handleClickChoose(e, "actors")}
                      style={{ position: 'absolute', top: -5, right: -5, cursor: 'pointer', color: '#FF5A5F', background: '#fff', borderRadius: '50%' }}
                    />
                    <Box sx={{ fontSize: 11, mt: 0.5, maxWidth: 48, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {getOjectById(actors, e)?.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Movie Image */}
            <GradientButton component="label">
              Upload Image
              <input hidden accept="image/*" type="file" onChange={handleImageChangeMovie} />
            </GradientButton>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <img src={movie.imgUrl} alt="" style={{ width: 128, height: 192, borderRadius: 12, objectFit: 'cover' }} />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ color: '#FF8A80', fontWeight: 600 }}>Cancel</Button>
        <GradientButton onClick={handleAddMovie} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : movie.id ? "Update" : "Add"}
        </GradientButton>
      </DialogActions>

      <ModalChoose
        getDataChoose={getDataChoose()}
        movie={movie}
        handleClickChoose={handleClickChoose}
        type={type}
        dataChoose={dataChoose}
        handleCloseChoose={handleCloseChoose}
        openChoose={openChoose}
      />
    </Dialog>
  );
}

export default ModalMovie;
