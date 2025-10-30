import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalRoom from './ModalRoom';

const inner = {name: "", idCinemaLocation: "", rows: "" ,columns: "", list_chair:[]}
function Room(props) {
      const [open, setOpen] = useState(false);
      const [room, setRoom] = useState(inner);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputRoom = (e) => {
    setRoom({...room, [e.target.name]: e.target.value})
    
  }
  console.log(room);
  
    return (
        <>
        <SearchAdmin title="List Rooms" placeholder="Search Room...." handleClickOpen={handleClickOpen} />
        <ModalRoom open={open} handleClose={handleClose} room={room} handleInputRoom={handleInputRoom} />
        </>
        
    );
}

export default Room;