import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Tooltip } from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


const NeonCell = styled(TableCell)(() => ({
    border: 'none', // bỏ viền hoàn toàn
    '&.MuiTableCell-head': {
        backgroundColor: '#111827', // header tối, dễ nhìn
        color: '#0ff', // chữ neon cyan
        fontWeight: 600,
        fontSize: 15,
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

const NeonRow = styled(TableRow)(() => ({
    backgroundColor: '#1A1A1A', 
    transition: 'all 0.3s ease',
    '&:nth-of-type(odd)': {
        backgroundColor: '#1F1F1F',
    },
    '&:hover': {
        background: 'rgba(0,255,255,0.1)', // hover nhẹ, không gradient chói
        boxShadow: '0 0 10px rgba(0,255,255,0.2)',
    },
}));


function TableCities({ handleEditCities }) {
    const cities = useContext(CitiesContext);
    const [citiesDelete, setCitiesDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleted = async () => {
        await deleteDocument("cities", citiesDelete);
        handleClose();
    };
    const handleClose = () => setOpen(false);
    const handleClickOpen = (row) => {
        setOpen(true);
        setCitiesDelete(row);
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{
                mt: 3, p: 2,
                background: 'linear-gradient(180deg, #1A1A2E, #1E1E3A)',
                borderRadius: 3,
                boxShadow: '0 0 20px rgba(0,255,255,0.05)',
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="cities table">
                    <TableHead>
                        <TableRow>
                            <NeonCell>ID</NeonCell>
                            <NeonCell>Name</NeonCell>
                            <NeonCell>Description</NeonCell>
                            <NeonCell>Image</NeonCell>
                            <NeonCell align="center">Action</NeonCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ct, index) => (
                            <NeonRow key={ct.id}>
                                <NeonCell>{page * rowsPerPage + index + 1}</NeonCell>
                                <NeonCell>{ct.name}</NeonCell>
                                <NeonCell title={ct.description}>{ct.description}</NeonCell>
                                <NeonCell>
                                    <Box component="img"
                                        src={ct.imgUrl}
                                        alt={ct.name}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            border: '2px solid #0ff',
                                            boxShadow: '0 0 8px #0ff, 0 0 12px #f0f',
                                        }}
                                    />
                                </NeonCell>
                                <NeonCell align="center">
                                    <Tooltip title="Edit">
                                        <Button
                                            onClick={() => handleEditCities(ct)}
                                            sx={{
                                                mr: 1,
                                                background: 'linear-gradient(90deg, #0ff, #f0f)',
                                                color: '#000',
                                                borderRadius: '8px',
                                                minWidth: 36,
                                                '&:hover': { boxShadow: '0 0 10px #0ff, 0 0 15px #f0f' },
                                            }}
                                        >
                                            <FaPen />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <Button
                                            onClick={() => handleClickOpen(ct)}
                                            sx={{
                                                background: 'linear-gradient(90deg, #ff0080, #ff4b2b)',
                                                color: '#fff',
                                                borderRadius: '8px',
                                                minWidth: 36,
                                                '&:hover': { boxShadow: '0 0 10px #ff0080, 0 0 15px #ff4b2b' },
                                            }}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Tooltip>
                                </NeonCell>
                            </NeonRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationTablePage
                    data={cities}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </Box>
    );
}

export default TableCities;
