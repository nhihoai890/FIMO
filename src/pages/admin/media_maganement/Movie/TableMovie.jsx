import React, { useContext, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Tooltip, Box
} from '@mui/material';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { DirectorsContext } from '../../../../contexts/DirectorsProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { FaPen, FaTrash } from 'react-icons/fa';
import { PiFilmReelFill } from 'react-icons/pi';
import { deleteDocument } from '../../../../services/firebaseService';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';
import ShowCategories from './ShowCategories';
import ShowActors from './ShowActors';

function TableMovie({ handleEditMovie }) {
  const movies = useContext(MoviesContext);
  const directors = useContext(DirectorsContext);
  const [open, setOpen] = useState(false);
  const [movieDelete, setMovieDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (movie) => {
    setMovieDelete(movie);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDeleted = async () => {
    await deleteDocument('movies', movieDelete);
    handleClose();
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #0a0a1f, #1a1a3f)',
          boxShadow: '0 8px 24px rgba(0,255,255,0.1)',
          border: '1px solid rgba(0,255,255,0.15)',
          overflow: 'visible !important',
        }}
      >
        <Table >
          {/* Header */}
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(90deg, #1f1f3a, #292952)' }}>
              {['#', 'Image', 'Name', 'Director', 'Age', 'Duration', 'Actors', 'Categories', 'Action'].map((col, i) => (
                <TableCell
                  key={i}
                  sx={{
                    color: '#00eaff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid rgba(0,238,255,0.2)',
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((mv, index) => (
              <TableRow
                key={mv.id}
                sx={{
                  background: 'rgba(10,10,30,0.7)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, rgba(0,238,255,0.08), rgba(155,143,255,0.08))',
                    boxShadow: '0 0 15px rgba(0,255,255,0.2)',
                    transform: 'scale(1.002)',
                  },
                  '& td': { borderBottom: 'none', color: '#e0e6ff' },
                }}
              >
                <TableCell sx={{ color: '#00ffff' }}>{page * rowsPerPage + index + 1}</TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={mv.imgUrl}
                      alt={mv.name}
                      style={{
                        width: 60,
                        height: 80,
                        borderRadius: 6,
                        objectFit: 'cover',
                        boxShadow: '0 0 6px #00ffff',
                      }}
                    />
                  </Box>
                </TableCell>

                <TableCell>{mv.name}</TableCell>
                <TableCell>{getOjectById(directors, mv.idDirector)?.name}</TableCell>
                <TableCell sx={{ color: '#ff55ff' }}>{mv.ageLimit}</TableCell>
                <TableCell>{mv.duration} min</TableCell>

                <TableCell>
                  <ShowActors data={mv.listActor} />
                </TableCell>

                <TableCell>
                  <Tooltip title={<ShowCategories data={mv.listCate || []} />} arrow>
                    <PiFilmReelFill size={20} color="#00ffff" style={{ filter: 'drop-shadow(0 0 4px #00ffff)' }} />
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      onClick={() => handleEditMovie(mv)}
                      variant="contained"
                      size="small"
                      sx={{
                        minWidth: 32,
                        p: 1,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        '&:hover': { background: 'linear-gradient(90deg, #5a67d8, #6b46c1)' },
                      }}
                    >
                      <FaPen />
                    </Button>

                    <Button
                      onClick={() => handleClickOpen(mv)}
                      variant="contained"
                      size="small"
                      sx={{
                        minWidth: 32,
                        p: 1,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                        boxShadow: '0 0 10px rgba(255,64,129,0.4)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #d500f9, #ff4081)',
                          boxShadow: '0 0 20px rgba(255,64,129,0.6)',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <PaginationTablePage
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        data={movies}
      />

      {/* Delete Modal */}
      <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
    </Box>
  );
}

export default TableMovie;
