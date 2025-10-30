import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Avatar, Button } from '@mui/material';
import { CinemaContext } from '../../../../contexts/CinemaProvider';
import { deleteDocument } from '../../../../services/firebaseService';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


function TableCinema({ handleEditCinema }) {
    const cinemas = useContext(CinemaContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [cinemaDelete, setCinemaDelete] = useState(null);
    const handleClickOpen = (row) => {
        setOpen(true);
        setCinemaDelete(row);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleDeleted = async () => {
        await deleteDocument("cinemas", cinemaDelete);
        handleClose();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (


        <div>
            <TableContainer component={Paper} sx={{
                mt: 3,
                p: 2,
                background: "linear-gradient(145deg, #111 20%, #1b1b1b 80%)",
                borderRadius: 3,
                border: "1px solid rgba(0,229,255,0.15)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 0 30px rgba(0,229,255,0.05)",
                overflow: "hidden",
            }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{
                            background:
                                "linear-gradient(90deg, rgba(0,229,255,0.15), rgba(179,136,255,0.15))",
                        }} >
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }} >ID</TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }} >Name</TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }}>Logo</TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cinemas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cn, index) => (
                            <TableRow
                                key={cn.id}
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.02)",
                                    transition: "0.4s ease",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(90deg, rgba(0,229,255,0.08), rgba(179,136,255,0.08))",
                                        transform: "scale(1.01)",
                                        boxShadow: "0 0 20px rgba(0,229,255,0.1)",
                                    },
                                }}
                            >
                                <TableCell sx={{ color: "#b2ebf2" }}>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ color: "#b2ebf2" }} >{cn.name}</TableCell>
                                <TableCell >
                                    <Avatar
                                        src={cn.imgUrl}
                                        sx={{
                                            
                                            border: '1px solid #333',
                                            boxShadow: '0 0 4px rgba(255,255,255,0.05)',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        mr: 1,
                                        background: 'linear-gradient(135deg, #5CA8FF, #81BFFF)',
                                        color: '#000',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #81BFFF, #A6D1FF)',
                                            boxShadow: '0 0 8px rgba(92,168,255,0.3)',
                                        },
                                    }} onClick={() => handleEditCinema(cn)} variant="contained" size="small" color="primary" >
                                        <FaPen />
                                    </Button>

                                    <Button sx={{
                                        background: 'linear-gradient(135deg, #FF8A80, #FFB0B0)',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #FFB0B0, #FFC1C1)',
                                            boxShadow: '0 0 8px rgba(255,138,128,0.3)',
                                        },
                                    }} onClick={() => handleClickOpen(cn)} variant="contained" size="small" color="error" >
                                        <FaTrash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
                <PaginationTablePage data={cinemas} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableCinema;