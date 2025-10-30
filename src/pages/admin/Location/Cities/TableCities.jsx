import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Button } from '@mui/material';
import { CitiesContext } from '../../../../contexts/CitiesProvider';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


const StyledTableCell = styled(TableCell)(() => ({
    '&.MuiTableCell-head': {
        background: 'linear-gradient(90deg, #5CA8FF 0%, #9B8FFF 100%)',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: 15,
        borderBottom: '1px solid #2C2C2C',
    },
    '&.MuiTableCell-body': {
        color: '#E0E0E0',
        borderBottom: '1px solid #2A2A2A',
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: '#1A1A1A',
    transition: 'all 0.25s ease',
    '&:nth-of-type(odd)': {
        backgroundColor: '#1F1F1F',
    },
    '&:hover': {
        background: 'linear-gradient(90deg, rgba(92,168,255,0.08), rgba(155,143,255,0.08))', // hover gradient mờ, nhẹ
        transform: 'scale(1.002)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function TableCities({ handleEditCities }) {
    const cities = useContext(CitiesContext);
    const [citiesDelete, setCitiesDelete] = useState(null);
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
    const handleDeleted = async () => {
        await deleteDocument("cities", citiesDelete);
        handleClose();
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (row) => {
        setOpen(true);
        setCitiesDelete(row);
    }
    return (
        <div>
            <TableContainer component={Paper} sx={{
                mt: 3, p: 2, backgroundColor: '#1E1E1E',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(255,255,255,0.05)',
            }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell >Name</StyledTableCell>
                            <StyledTableCell >Description</StyledTableCell>
                            <StyledTableCell >Image</StyledTableCell>
                            <StyledTableCell align="center" >Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ct, index) => {
                            return (
                                <StyledTableRow key={ct.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {page * rowsPerPage + index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>{ct.name}</StyledTableCell>
                                    <StyledTableCell>{ct.description}</StyledTableCell>
                                    <StyledTableCell>
                                        <img src={ct.imgUrl} alt={ct.name} className="w-15 h-15 object-cover rounded-full" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button sx={{
                                            mr: 1,
                                            background: 'linear-gradient(135deg, #4FC3F7, #81D4FA)',
                                            color: '#000',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #81D4FA, #B3E5FC)',
                                                boxShadow: '0 0 8px rgba(79,195,247,0.3)',
                                            },
                                        }} onClick={() => handleEditCities(ct)} variant="contained" size="small" color="primary" >
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
                                        }} variant="contained" size="small" color="error" onClick={() => handleClickOpen(ct)}>
                                            <FaTrash />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <PaginationTablePage data={cities} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableCities;