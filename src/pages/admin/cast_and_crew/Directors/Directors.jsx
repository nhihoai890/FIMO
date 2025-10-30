import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableDirectors from './TableDirectors';
import ModalDirectors from './ModalDirectors';
import { addDocument, updateDocument } from '../../../../services/firebaseService';

const inner = { name: "", description: "" };
function Directors(props) {
  const [director, setDirector] = useState(inner);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(inner);
  const handleClickOpen = () => {
    setDirector(inner);
    setError(inner);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleChangeDirector = (e) => {
    setDirector({ ...director, [e.target.name]: e.target.value })
  }

  const validation = () => {
    const newError = {};
    newError.name = director.name ? "" : "Please Enter director name";
    newError.description = director.description ? "" : "  Please enter your description";
    setError(newError);
    return Object.values(newError).some(e => e !== "");
  }

  const handleEditDirectors = (dr) => {
    handleClickOpen();
    setDirector(dr);
  }
  const addDirector = async () => {
    if (validation()) {
      return;
    }
    if (director.id) {
      await updateDocument("directors", director);
    } else {
      await addDocument("directors", director);
    }
    handleClose();
  }
  return (
    <div >
      <SearchAdmin title="List Directors"
        placeholder="Search Directors"
        handleClickOpen={handleClickOpen} />
      <TableDirectors handleEditDirectors={handleEditDirectors} />
      <ModalDirectors director={director} open={open} error={error} handleClose={handleClose} handleChangeDirector={handleChangeDirector} addDirector={addDirector} />
    </div>
  );
}

export default Directors;