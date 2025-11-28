import React, { useState } from 'react';

import ModalMovie from './ModalMovie';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import logo from "../../../../assets/logo.png"
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import TableMovie from './TableMovie';

const inner = { name: "", description: "", idDirector: "", duration: "", listActor: [], listCate: [], ageLimit: "", imgUrl: logo, urlTrailer: "" }
function Movie(props) {

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(inner);
  const [movie, setMovie] = useState(inner);
  const [loading, setLoading] = useState(false);

  const handleInputMovie = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }

  const handleAddMovie = async () => {
    if (validation()) return;

    try {
      setLoading(true);
      if (movie.id) {
        await updateDocument("movies", movie);
      } else {
        await addDocument("movies", movie);
      }
      handleClose();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
    setError(inner);
    setMovie(inner);
  };

  const handleEditMovie = (mve) => {
    handleClickOpen();
    setMovie({
      ...mve,
      status: mve.status?.toLowerCase() === "now_showing" ? "now_showing" : "upcoming"
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleImageChangeMovie = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMovie({ ...movie, imgUrl: reader.result })
      };
      reader.readAsDataURL(file)
    }
  }

  const validation = () => {
    const newError = {};
    newError.name = movie.name ? "" : "Please Enter Movie"
    newError.description = movie.description ? "" : "Please Enter description"
    newError.duration = movie.duration ? "" : "Please Enter Duration"
    newError.ageLimit = movie.ageLimit ? "" : "Please Enter Age Limit"
    newError.urlTrailer = movie.urlTrailer ? "" : "Please Enter Url Trailer"
    newError.idDirector = movie.idDirector ? "" : "Please choose Director"
    newError.status = movie.status ? "" : "Please choose status";
    setError(newError);
    return Object.values(newError).some(e => e !== "");
  }
  return (
    <div >
      <SearchAdmin title="List Movie"
        placeholder="Search Movie...."
        handleClickOpen={handleClickOpen} />
      <TableMovie handleEditMovie={handleEditMovie} />
      <ModalMovie loading={loading} handleImageChangeMovie={handleImageChangeMovie} error={error} movie={movie} setMovie={setMovie} open={open} handleClose={handleClose} handleInputMovie={handleInputMovie} handleAddMovie={handleAddMovie} />
    </div>
  );
}

export default Movie;