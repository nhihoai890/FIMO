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
import { Button } from '@mui/material';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';

function TableCinemaLocations({ handleEditLocation }) {
  const cinemaLocations = useContext(CinemaLocationsContext);
  const city = useContext(CitiesContext);
  const cinema = useContext(CinemaContext);
  const [cinelcDele, setCineclcDele] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (row) => {
    setOpen(true);
    setCineclcDele(row);

  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleted = async () => {
    await deleteDocument("cinemaLocations", cinelcDele);
    handleClose();
  }

  return (
    <div>
      <TableContainer component={Paper} sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
        boxShadow: "0 0 25px rgba(0,255,255,0.08)",
      }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{
              background:
                "linear-gradient(90deg, rgba(58,134,255,0.15), rgba(174,83,255,0.15))",
            }}>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }}>Cinema</TableCell>
              <TableCell sx={{ color: "#9cafff", fontWeight: "bold" }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cinemaLocations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cinec, index) => (
              <TableRow
                key={cinec.id}
                sx={{
                  backgroundColor: "#252541",
                  "&:hover": { backgroundColor: "#30304d", transition: "0.3s" },
                }}
              >
                <TableCell sx={{ color: "#e0e0ff" }} component="th" scope="row">{page * rowsPerPage + index + 1}</TableCell>
                <TableCell >
                  <img
                    src={cinec.imgUrl}
                    alt={cinec.name}
                    className="w-16 h-16 object-cover "
                  />
                </TableCell>
                <TableCell sx={{ color: "#ffffff" }}>{cinec.name}</TableCell>
                <TableCell sx={{ color: "#ccccff" }}>{cinec.address}</TableCell>
                <TableCell sx={{ color: "#ccccff" }}>{cinec.phone}</TableCell>
                <TableCell sx={{ color: "#b388ff" }}>{getOjectById(city, cinec.idCity)?.name}</TableCell>
                <TableCell sx={{ color: "#b388ff" }}>{getOjectById(cinema, cinec.idCinema)?.name}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEditLocation(cinec)}
                      color="primary"
                      sx={{
                        background: "linear-gradient(90deg, #00e5ff, #7c4dff)",
                        boxShadow: "0 0 10px rgba(0,229,255,0.4)",
                        transition: "0.3s",
                        "&:hover": {
                          background: "linear-gradient(90deg, #7c4dff, #00e5ff)",
                          boxShadow: "0 0 20px rgba(124,77,255,0.6)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleClickOpen(cinec)}
                      sx={{
                        background: "linear-gradient(90deg, #ff4081, #d500f9)",
                        boxShadow: "0 0 10px rgba(255,64,129,0.4)",
                        transition: "0.3s",
                        "&:hover": {
                          background: "linear-gradient(90deg, #d500f9, #ff4081)",
                          boxShadow: "0 0 20px rgba(255,64,129,0.6)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
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