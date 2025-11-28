import React, { useContext, useState } from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Tooltip,
  Table,
} from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { MovieScreeningContext } from '../../../../contexts/MovieScreeningProvider';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { RoomsContext } from '../../../../contexts/RoomProvider';
import { getOjectById } from '../../../../utils/functionContants';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';

function TableMovieScreening() {
  const movieScreens = useContext(MovieScreeningContext);
  const movies = useContext(MoviesContext);
  const cities = useContext(CitiesContext);
  const cinemas = useContext(CinemaLocationsContext);
  const rooms = useContext(RoomsContext);
  const [open, setOpen] = useState(false);
  const [moviescreenDelete, setMovieScreenDelete] = useState(null);

  const handleClickOpen = (sc) => {
    setOpen(true);
    setMovieScreenDelete(sc);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleDeleted = async () => {
    await deleteDocument("movieSceens",moviescreenDelete);
    handleClose();
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 3,
          backgroundColor: '#0d0d0d',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.08)',
          border: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="movie-screening-table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#111',
                '& th': {
                  color: '#00f0ff',
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  borderBottom: 'none',

                  textShadow: '0 0 5px rgba(0,240,255,0.7)',
                },
              }}
            >
              <TableCell>#</TableCell>
              <TableCell >Movie</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Ratio</TableCell>
              <TableCell>List Showtime</TableCell>
              <TableCell>City</TableCell>
              <TableCell >Cinema</TableCell>
              <TableCell >Room</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movieScreens.map((ms, index) => {
              const roomsOfCinema = rooms.filter(
                (r) => r.idCinemaLocation === ms.idCinemaLocation
              );

              return (
                <TableRow
                  key={ms.id}
                  sx={{
                    '&:hover': {
                      background: 'rgba(0,255,255,0.05)',
                      transform: 'scale(1.01)',
                      transition: '0.3s',
                    },
                    transition: '0.3s',
                  }}
                >
                  <TableCell sx={{ color: '#00ffff' }}>{index + 1}</TableCell>

                  {/* Movie Poster */}
                  <TableCell >
                    <img
                      src={getOjectById(movies, ms.idMovie)?.imgUrl}
                      alt=""
                      width={60}
                      height={80}
                      style={{
                        borderRadius: 6,
                        objectFit: 'cover',
                        boxShadow: '0 0 8px #00ffff, 0 0 15px #0077ff',
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ color: '#b0e5ff' }} >
                    {ms.release_date}
                  </TableCell>
                  <TableCell sx={{ color: '#00eaff' }} >
                    {ms.ratio}
                  </TableCell>

                  {/* Showtime Tooltip */}
                  <TableCell>
                    {ms.list_showtime?.length > 0 ? (
                      <Tooltip
                        title={ms.list_showtime.join(' | ')}
                        arrow
                        placement="top"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: 'rgba(0,255,255,0.1)',
                              color: '#00ffff',
                              fontSize: '0.85rem',
                              border: '1px solid #00ffff',
                              boxShadow: '0 0 10px #00ffff',
                            },
                          },
                        }}
                      >
                        <IoTime size={24} className="cursor-pointer text-cyan-400 hover:text-cyan-200" />
                      </Tooltip>
                    ) : (
                      <span style={{ color: '#555' }}>No showtime</span>
                    )}
                  </TableCell>

                  {/* City */}
                  <TableCell sx={{ color: '#b0e5ff' }} >
                    {getOjectById(cities, ms.idCity)?.name}
                  </TableCell>

                  {/* Cinema */}
                  <TableCell sx={{ color: '#b0e5ff' }} >
                    {getOjectById(cinemas, ms.idCinemaLocation)?.name}
                  </TableCell>

                  {/* Rooms */}
                  <TableCell >
                    {roomsOfCinema.length > 0 ? (
                      <Tooltip
                        title={roomsOfCinema.map(r => r.name).join(' | ')}
                        arrow
                        placement="top"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: 'rgba(0,255,255,0.1)',
                              color: '#00ffff',
                              fontSize: '0.85rem',
                              border: '1px solid #00ffff',
                              boxShadow: '0 0 10px #00ffff',
                            },
                          },
                        }}
                      >
                        <MdOutlineMeetingRoom size={24} className="cursor-pointer text-cyan-400 hover:text-cyan-200" />
                      </Tooltip>
                    ) : "—"}
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          minWidth: 32,
                          p: 1,
                          borderRadius: 2,
                          background: 'linear-gradient(90deg, #00ffff, #0077ff)',
                          boxShadow: '0 0 10px #00ffff',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #0077ff, #00ffff)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 15px #00ffff',
                          },
                        }}
                      >
                        <FaPen />
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          minWidth: 32,
                          p: 1,
                          borderRadius: 2,
                          background: 'linear-gradient(90deg, #0055aa, #00ffff)',
                          boxShadow: '0 0 10px #00ffff',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #00ffff, #0055aa)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 15px #00ffff',
                          },
                        }}
                        onClick={() => handleClickOpen(ms)}
                      >
                        <FaTrash />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDeleted open={open} handleDeleted={handleDeleted} handleClose={handleClose} />
    </>

  );
}

export default TableMovieScreening;
