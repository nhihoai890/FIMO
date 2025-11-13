import React, { useContext, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalRoom from './ModalRoom';
import TableRoom from './TableRoom';
import { RoomsContext } from '../../../../contexts/RoomProvider';
import { useEffect } from 'react';

const inner = { name: "", idCinemaLocation: "", rows: "", columns: "", listChair: [] }
function Room(props) {
  const rooms = useContext(RoomsContext);
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState(inner);
  const [error, setError] = useState(inner);
  const [roomFilter, setRoomFilter] = useState([]);

  useEffect(() => {
    setRoomFilter(rooms)
  }, [rooms])

const handleClickOpen = () => {
  setRoom(inner);
  setError(inner);
  setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditRoom = (re) => {
    setRoom(re);
    setOpen(true);
  }

  const handleSearch = (query) => {
    const filtered = rooms.filter(room => room.name.toLowerCase().includes(query.toLowerCase().trim()))
    setRoomFilter(filtered);
  }


  const handleInputRoom = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value })

  }

  return (
    <>
      <SearchAdmin title="List Rooms" placeholder="Search Room...." handleClickOpen={handleClickOpen} onSearch={handleSearch} />
      <TableRoom handleEditRoom={handleEditRoom} rooms={roomFilter} />
      <ModalRoom open={open} handleClose={handleClose} room={room} handleInputRoom={handleInputRoom} error={error} setError={setError} />
    </>

  );
}

export default Room;