import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FoodsContext } from '../../../../contexts/FoodProvider';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { getOjectById } from '../../../../utils/functionContants';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';
import { styled } from '@mui/material/styles';

// ===== Styled components =====
const CyberCell = styled(TableCell)(() => ({
  border: 'none', // bỏ viền
  '&.MuiTableCell-head': {
    backgroundColor: '#111', // solid dark
    color: '#00ffff',
    fontWeight: 700,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  '&.MuiTableCell-body': {
    color: '#E0E0E0',
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const CyberRow = styled(TableRow)(() => ({
  backgroundColor: '#1A1A1A', // solid dark
  '&:nth-of-type(odd)': { backgroundColor: '#1F1F1F' },
  '&:hover': {
    background: 'rgba(0,255,255,0.08)',
    boxShadow: '0 0 10px rgba(0,255,255,0.3)',
    transform: 'scale(1.002)',
    transition: 'all 0.25s ease',
  },
  '&:last-child td, &:last-child th': { border: 0 },
}));

function TableFood({ handleEditFood }) {
  const foods = useContext(FoodsContext);
  const cinemaLocations = useContext(CinemaLocationsContext);
  const [open, setOpen] = useState(false);
  const [foodDelete, setFoodDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (row) => {
    setFoodDelete(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleDeleted = async () => {
    await deleteDocument("foods", foodDelete);
    handleClose();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: 3,
          backgroundColor: '#111', // solid dark
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <CyberCell>#</CyberCell>
              <CyberCell>Image</CyberCell>
              <CyberCell>Name</CyberCell>
              <CyberCell>Price</CyberCell>
              <CyberCell>Cinema</CyberCell>
              <CyberCell>Discount</CyberCell>
              <CyberCell align="center">Action</CyberCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {foods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((f, index) => (
              <CyberRow key={f.id}>
                <CyberCell>{page * rowsPerPage + index + 1}</CyberCell>
                <CyberCell>
                  <img
                    src={f.imgUrl}
                    alt={f.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      objectFit: 'cover',
                      
                    }}
                  />
                </CyberCell>
                <CyberCell>{f.name}</CyberCell>
                <CyberCell sx={{ color: '#0ff' }}>{Number(f.price).toLocaleString("vi-VN")} đ</CyberCell>
                <CyberCell sx={{ color: '#0ff' }}>{getOjectById(cinemaLocations, f.idCinemaLocation)?.name}</CyberCell>
                <CyberCell sx={{ color: '#f39c12' }}>{f.discount} %</CyberCell>
                <CyberCell align="center">
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEditFood(f)}
                      sx={{
                        minWidth: 50,
                        borderRadius: 1,
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #5a67d8, #6b46c1)',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.25s ease-in-out',
                      }}
                    >
                      <FaPen />
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleClickOpen(f)}
                      sx={{
                        minWidth: 50,
                        borderRadius: 1,
                        background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #ff4b2b, #ff416c)',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.25s ease-in-out',
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </CyberCell>
              </CyberRow>
            ))}
          </TableBody>
        </Table>
        <PaginationTablePage
          data={foods}
          page={page}
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ModalDeleted
        open={open}
        handleClose={handleClose}
        handleDeleted={handleDeleted}
      />
    </>
  );
}

export default TableFood;
