import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import { CinemaContext } from '../../../../contexts/CinemaProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Button, Tooltip } from '@mui/material';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';
import { styled } from '@mui/material/styles';

// Styled cells & rows kiểu cyber minimal
const CyberCell = styled(TableCell)(() => ({
  border: 'none',
  '&.MuiTableCell-head': {
    backgroundColor: '#111',
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
  backgroundColor: '#1A1A1A',
  '&:nth-of-type(odd)': { backgroundColor: '#1F1F1F' },
  '&:hover': {
    background: 'rgba(0,255,255,0.08)',
    boxShadow: '0 0 10px rgba(0,255,255,0.3)',
    transform: 'scale(1.002)',
    transition: 'all 0.25s ease',
  },
  '&:last-child td, &:last-child th': { border: 0 },
}));

function TableCinemaLocations({ handleEditLocation }) {
  const cinemaLocations = useContext(CinemaLocationsContext);
  const city = useContext(CitiesContext);
  const cinema = useContext(CinemaContext);
  const [cinelcDele, setCineclcDele] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (row) => {
    setOpen(true);
    setCineclcDele(row);
  };

  const handleClose = () => setOpen(false);
  const handleDeleted = async () => {
    await deleteDocument("cinemaLocations", cinelcDele);
    handleClose();
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#111', // solid dark
          boxShadow: '0 0 15px rgba(0,255,255,0.1)',
        }}
      >
        <Table >
          <TableHead>
            <TableRow>
              <CyberCell>#</CyberCell>
              <CyberCell>Image</CyberCell>
              <CyberCell>Name</CyberCell>
              <CyberCell>Address</CyberCell>
              <CyberCell>Phone</CyberCell>
              <CyberCell>City</CyberCell>
              <CyberCell>Cinema</CyberCell>
              <CyberCell align="center">Action</CyberCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cinemaLocations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cinec, index) => (
              <CyberRow key={cinec.id}>
                <CyberCell>{page * rowsPerPage + index + 1}</CyberCell>
                <CyberCell>
                  <img
                    src={cinec.imgUrl}
                    alt={cinec.name}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                      objectFit: 'cover',
                      boxShadow: '0 0 8px rgba(0,255,255,0.2)',
                    }}
                  />
                </CyberCell>
                <CyberCell>{cinec.name}</CyberCell>
                <Tooltip title={cinec.address} arrow>
                  <CyberCell
                    sx={{
                      color: '#ccccff',
                      maxWidth: 180,            
                      whiteSpace: 'nowrap',     
                      overflow: 'hidden',       
                      textOverflow: 'ellipsis', 
                    }}
                  >
                    {cinec.address}
                  </CyberCell>
                </Tooltip>

                < CyberCell sx={{ color: '#ccccff' }}>{cinec.phone}</CyberCell>
                <CyberCell sx={{ color: '#b388ff' }}>{getOjectById(city, cinec.idCity)?.name}</CyberCell>
                <CyberCell sx={{ color: '#b388ff' }}>{getOjectById(cinema, cinec.idCinema)?.name}</CyberCell>
                <CyberCell align="center">
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEditLocation(cinec)}
                      sx={{
                        minWidth: 50,
                        borderRadius: 1,
                        background: 'linear-gradient(90deg, #00e5ff, #7c4dff)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #7c4dff, #00e5ff)',
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
                      onClick={() => handleClickOpen(cinec)}
                      sx={{
                        minWidth: 50,
                        borderRadius: 1,
                        background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #d500f9, #ff4081)',
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
          data={cinemaLocations}
          page={page}
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
    </div>
  );
}

export default TableCinemaLocations;
