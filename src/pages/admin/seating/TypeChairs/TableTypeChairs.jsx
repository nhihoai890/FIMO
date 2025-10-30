import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import { tsParticles } from '@tsparticles/engine';
import { Button } from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import { deleteDocument } from '../../../../services/firebaseService';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


function TableTypeChairs({ handleEditTypeChair }) {
    const typechairs = useContext(TypeChairsContext);
    const [open, setOpen] = useState(false);
    const [typeChairDelete, setTypeChairDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleDeleted = async () => {
        await deleteDocument("typechairs", typeChairDelete);
        handleClose();
    }

    const handleClickOpen = (row) => {
        setOpen(true);
        setTypeChairDelete(row);
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <TableContainer component={Paper} sx={{
                mt: 3,
                p: 2,
                borderRadius: 4,
                background: 'linear-gradient(180deg, #0f0c29 0%, #1b183f 50%, #302b63 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                            '& th': { color: '#fff', fontWeight: 600, fontSize: 15 },
                        }}>
                            <TableCell >#</TableCell>
                            <TableCell >Image</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typechairs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ts, index) => (
                            <TableRow key={ts.id}

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ color: "#ffffff" }} component="th" scope="row">
                                    {page * rowsPerPage + index + 1}
                                </TableCell>
                                <TableCell >

                                    <img
                                        src={ts.imgUrl}
                                        alt={ts.name}
                                        className="w-16 h-16 object-cover "
                                    />

                                </TableCell>
                                <TableCell sx={{ color: "#ccccff" }} align="right">{ts.name}</TableCell>
                                <TableCell sx={{ color: "#ccccff" }} align="right">{ts.price}</TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center gap-3">
                                        <Button
                                            variant="contained"

                                            size="small"
                                            color="primary"
                                            sx={{
                                                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                                borderRadius: '8px',
                                                boxShadow: '0 0 10px rgba(118,75,162,0.4)',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #5a67d8, #6b46c1)',
                                                    boxShadow: '0 0 20px rgba(118,75,162,0.6)',
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onClick={() => handleEditTypeChair(ts)}
                                        >
                                            <FaPen />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="error"

                                            sx={{
                                                background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
                                                borderRadius: '8px',
                                                boxShadow: '0 0 10px rgba(255,64,129,0.4)',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #ff4b2b, #ff416c)',
                                                    boxShadow: '0 0 20px rgba(255,64,129,0.6)',
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onClick={() => handleClickOpen(ts)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <PaginationTablePage data={typechairs} page={page}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableTypeChairs;