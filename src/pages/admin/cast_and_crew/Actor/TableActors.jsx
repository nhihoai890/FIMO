import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import { deleteDocument } from '../../../../services/firebaseService';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


function TableActors({ handleEditActor, actors }) {
    
    const [open, setOpen] = useState(false);
    const [actorDelete, setActorDetete] = useState(null);
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
        setActorDetete(row);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleted = async () => {
        await deleteDocument("actors", actorDelete);
        handleClose();
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
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                            '& th': { color: '#fff', fontWeight: 600, fontSize: 15 },
                        }}>

                            <TableCell >ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actors
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ac, index) => (
                                <TableRow key={ac.id} sx={{
                                    backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                                    '&:hover': {
                                        background: 'rgba(102,126,234,0.15)',
                                        boxShadow: '0 0 10px rgba(102,126,234,0.3)',
                                        transition: '0.3s',
                                    },
                                }}>
                                    <TableCell sx={{ color: '#E0E7FF' }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ color: '#E0E7FF' }}>{ac.name}</TableCell>
                                    <TableCell sx={{ color: '#CBD5E1' }}>{ac.description}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={ac.imgUrl}
                                            alt={ac.name}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                border: '2px solid rgba(118,75,162,0.6)',
                                                boxShadow: '0 0 8px rgba(124,77,255,0.3)',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center gap-3">
                                            <Button
                                                variant="contained"
                                                onClick={() => handleEditActor(ac)}
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
                                            >
                                                <FaPen />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="error"
                                                onClick={() => handleClickOpen(ac)}
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
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                       
                    </TableBody>
                </Table>
                <PaginationTablePage data={actors} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableActors;