import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { DirectorsContext } from '../../../../contexts/DirectorsProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Button, Avatar, Box } from '@mui/material';
import { deleteDocument } from '../../../../services/firebaseService';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { ActorsContext } from '../../../../contexts/ActorProvider';
import { CategoriesContext } from '../../../../contexts/CategoryProvider';

// Styled components
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    background: 'linear-gradient(90deg, #5C6BC0, #7E57C2)',
    color: '#E0E7FF',
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#E8EAF6',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(5px)',
  borderRadius: '12px',
  margin: '4px 0',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(92,107,192,0.15), rgba(126,87,194,0.15))',
    boxShadow: '0 4px 20px rgba(126,87,194,0.3)',
    transform: 'scale(1.002)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TableMovie({ handleEditMovie }) {
  const movies = useContext(MoviesContext);
  const directors = useContext(DirectorsContext);
  const actors = useContext(ActorsContext);
  const categories = useContext(CategoriesContext);
  const [open, setOpen] = useState(false);
  const [movieDelete, setMovieDelete] = useState(null);

  const handleDeleted = async () => {
    await deleteDocument('movies', movieDelete);
    handleClose();
  };
  const handleClickOpen = (row) => {
    setOpen(true);
    setMovieDelete(row);
  };
  const handleClose = () => setOpen(false);

  function ShowActors({ data }) {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {data.map(e => (
          <Avatar
            key={e}
            src={getOjectById(actors, e)?.imgUrl}
            sx={{
              width: 32,
              height: 32,
              border: '2px solid #7E57C2',
              boxShadow: '0 2px 6px rgba(126,87,194,0.3)',
              '&:hover': { transform: 'scale(1.1)', transition: '0.2s' },
            }}
          />
        ))}
      </Box>
    );
  }

  function ShowCategories({ data }) {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {data.map(e => (
          <Box
            key={e}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              background: 'rgba(126,87,194,0.15)',
              color: '#E0E7FF',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {getOjectById(categories, e)?.name}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 3,
          background: 'rgba(30,30,60,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Director</StyledTableCell>
              <StyledTableCell>Age Limit</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Actors</StyledTableCell>
              <StyledTableCell>Categories</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((mv, index) => (
              <StyledTableRow key={mv.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={mv.imgUrl}
                    alt=""
                    className="w-16 h-20 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
                  />
                </StyledTableCell>
                <StyledTableCell>{mv.name}</StyledTableCell>
                <StyledTableCell>{getOjectById(directors, mv.idDirector)?.name}</StyledTableCell>
                <StyledTableCell>{mv.ageLimit}</StyledTableCell>
                <StyledTableCell>{mv.duration}</StyledTableCell>
                <StyledTableCell><ShowActors data={mv.listActor} /></StyledTableCell>
                <StyledTableCell><ShowCategories data={mv.listCate} /></StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => handleEditMovie(mv)}
                    variant="contained"
                    size="small"
                    sx={{
                      mr: 1,
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': { background: 'linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)' },
                    }}
                  >
                    <FaPen />
                  </Button>
                  <Button
                    sx={{
                      background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                      boxShadow: '0 0 10px rgba(255,64,129,0.4)',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #d500f9, #ff4081)',
                        boxShadow: '0 0 20px rgba(255,64,129,0.6)',
                        transform: 'scale(1.05)',
                      },
                    }}
                    onClick={() => handleClickOpen(mv)}
                    variant="contained"
                    size="small"
                  >
                    <FaTrash />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
    </div>
  );
}

export default TableMovie;
