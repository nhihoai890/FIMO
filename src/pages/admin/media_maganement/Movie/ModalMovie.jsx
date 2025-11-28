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

// 🔹 Neon Gradient Button
const GradientButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #00FFFF, #9B8FFF)',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 12,
  textTransform: 'none',
  letterSpacing: 0.5,
  boxShadow: '0 0 12px rgba(0,255,255,0.4)',
  '&:hover': {
    background: 'linear-gradient(135deg, #00E0FF, #B28FFF)',
    boxShadow: '0 0 20px rgba(0,255,255,0.8)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.25s ease',
}));

// 🔹 Neon Dialog Title
const GradientDialogTitle = styled(DialogTitle)(() => ({
  background: 'linear-gradient(90deg, #00FFFF, #8F00FF)',
  color: '#fff',
  fontWeight: 800,
  borderRadius: '16px 16px 0 0',
  textAlign: 'center',
  letterSpacing: 1,
  textShadow: '0 0 6px rgba(0,255,255,0.8)',
  boxShadow: '0 0 20px rgba(0,0,0,0.6)',
}));

// 🔹 Neon Chip
const GradientChip = styled(Chip)(() => ({
  background: 'linear-gradient(135deg, #6A00FF, #00FFFF)',
  color: '#fff',
  fontWeight: 600,
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 0 8px rgba(0,255,255,0.4)',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 0 15px rgba(0,255,255,0.7)',
  },
  transition: 'all 0.25s ease',
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
          background: 'radial-gradient(circle at top left, rgba(20,20,40,0.95), rgba(10,10,20,0.95))',
          backdropFilter: 'blur(12px)',
          color: '#E0E7FF',
          border: '1px solid rgba(0,255,255,0.2)',
          boxShadow: '0 0 25px rgba(0,255,255,0.3)',
        },
      }}
    >
      <GradientDialogTitle>
        {movie.id ? "UPDATE MOVIE" : "ADD MOVIE"}
      </GradientDialogTitle>

      <DialogContent dividers sx={{ borderColor: 'rgba(0,255,255,0.2)' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
          {/* LEFT FORM */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {["name", "description", "duration", "ageLimit", "urlTrailer"].map((field, index) => (
              <TextField
                key={index}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                fullWidth
                multiline={field === "description"}
                rows={field === "description" ? 3 : 1}
                type={field === "duration" ? "number" : "text"}
                value={movie[field]}
                onChange={handleInputMovie}
                error={!!error[field]}
                helperText={error[field]}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: '#00FFFF' },
                    '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
                  },
                  '& .MuiInputLabel-root': { color: '#bbb' },
                }}
              />
            ))}

           

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
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: '#00FFFF' },
                      '&.Mui-focused fieldset': { borderColor: '#9B8FFF' },
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
                <MdCategory
                  fontSize={22}
                  onClick={() => handleClickOpenChoose("categories")}
                  style={{ cursor: 'pointer', color: '#00FFFF', textShadow: '0 0 8px #00FFFF' }}
                />
                <span style={{ fontWeight: 600 }}>Categories</span>
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
                <FaUserAlt
                  style={{ cursor: 'pointer', color: '#00FFFF', textShadow: '0 0 8px #00FFFF' }}
                  onClick={() => handleClickOpenChoose("actors")}
                />
                <span style={{ fontWeight: 600 }}>Actors</span>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                {movie.listActor.map(e => (
                  <Box key={e} sx={{ position: 'relative', textAlign: 'center' }}>
                    <Avatar
                      src={getOjectById(actors, e)?.imgUrl}
                      sx={{
                        width: 56,
                        height: 56,
                        border: '2px solid #00FFFF',
                        boxShadow: '0 0 12px rgba(0,255,255,0.4)',
                        transition: '0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.08)',
                          boxShadow: '0 0 20px rgba(0,255,255,0.7)',
                        },
                      }}
                    />
                    <MdCancel
                      size={22}
                      onClick={() => handleClickChoose(e, "actors")}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        cursor: 'pointer',
                        color: '#fff',
                        background: 'linear-gradient(135deg, #FF5A5F, #FF8083)',
                        borderRadius: '50%',
                        padding: 3,
                        boxShadow: '0 0 10px rgba(255,90,95,0.7)',
                        transition: '0.3s ease',
                      }}
                    />
                    <Box sx={{
                      fontSize: 12,
                      mt: 0.5,
                      maxWidth: 56,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
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
              <img
                src={movie.imgUrl}
                alt=""
                style={{
                  width: 140,
                  height: 200,
                  borderRadius: 14,
                  objectFit: 'cover',
                  boxShadow: '0 0 20px rgba(0,255,255,0.3)',
                  border: '1px solid rgba(0,255,255,0.4)',
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ color: '#FF8A80', fontWeight: 600, '&:hover': { textShadow: '0 0 8px #FF8A80' } }}>
          Cancel
        </Button>
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
