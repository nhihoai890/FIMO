import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalRoom from './ModalRoom';
import TableRoom from './TableRoom';
import { addDocument } from '../../../../services/firebaseService';

const inner = {name: "", idCinemaLocation: "", rows: "" ,columns: "", list_chair:[]}
function Room(props) {
      const [open, setOpen] = useState(false);
      const [room, setRoom] = useState(inner);

  const handleClickOpen = () => {
    setRoom(inner);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
 

  const handleInputRoom = (e) => {
    setRoom({...room, [e.target.name]: e.target.value})
    
  }

    return (
        <>
        <SearchAdmin title="List Rooms" placeholder="Search Room...." handleClickOpen={handleClickOpen} />
        <TableRoom />
        <ModalRoom open={open} handleClose={handleClose} room={room} handleInputRoom={handleInputRoom}  />
        </>
        
    );
}

export default Room;