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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            <TableCell align="center">#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {typechairs
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ts, index) => (
                                <TableRow
                                    key={ts.id}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#121212' : '#181818',
                                        '& td': { borderBottom: 'none' },
                                        '&:hover': {
                                            background: 'rgba(0,240,255,0.05)',
                                            boxShadow: '0 0 15px rgba(0,240,255,0.15)',
                                            transform: 'scale(1.003)',
                                            transition: '0.3s ease-in-out',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ color: '#e0e0ff', textAlign: 'center' }}>
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <img
                                            src={ts.imgUrl}
                                            alt={ts.name}
                                            className="w-16 h-16 object-cover rounded-lg shadow-lg"
                                            style={{ boxShadow: '0 0 10px rgba(0,240,255,0.2)' }}
                                        />
                                    </TableCell>

                                    <TableCell sx={{ color: '#00f0ff', fontWeight: 500 }}>
                                        {ts.name}
                                    </TableCell>

                                    <TableCell sx={{ color: '#ff75b0', fontWeight: 500 }}>
                                        {ts.price}
                                    </TableCell>

                                    <TableCell align="center">
                                        <div className="flex justify-center gap-3">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleEditTypeChair(ts)}
                                                sx={{
                                                    background: 'linear-gradient(90deg, #00f0ff, #7c4dff)',
                                                    color: '#000',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 10px rgba(0,240,255,0.5)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(90deg, #7c4dff, #00f0ff)',
                                                        boxShadow: '0 0 20px rgba(0,240,255,0.7)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                            >
                                                <FaPen />
                                            </Button>

                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleClickOpen(ts)}
                                                sx={{
                                                    background: 'linear-gradient(90deg, #ff0080, #ff75b0)',
                                                    color: '#fff',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 10px rgba(255,0,128,0.5)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(90deg, #ff75b0, #ff0080)',
                                                        boxShadow: '0 0 20px rgba(255,0,128,0.7)',
                                                        transform: 'scale(1.1)',
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
                    data={typechairs}
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

            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableTypeChairs;