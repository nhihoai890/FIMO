import React, { useState, useContext } from 'react';
import { OrdersContenxt } from '../../../../contexts/OrdersProvider';
import { MovieScreeningContext } from '../../../../contexts/MovieScreeningProvider';
import { AccountContext } from '../../../../contexts/AccountProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { getOjectById } from '../../../../utils/functionContants';
import { styled } from '@mui/material/styles';
import { MoviesContext } from '../../../../contexts/MovieProvider';
import { LuNotebookPen } from 'react-icons/lu';
import ModalDetail from './ModalDetail';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';

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

function TableOrders(props) {
    const orders = useContext(OrdersContenxt);
    const moviescreens = useContext(MovieScreeningContext);
    const accounts = useContext(AccountContext);
    const movies = useContext(MoviesContext);
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState(null)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleClickOpen = (row) => {
        setOrder(row);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const coverName = (f) => {
        if (f.idAccount.includes("booking tai quay")) {
            return "booking tai quay"
        }
        return getOjectById(accounts, f.idAccount)?.name
    }

    return (
        <div>
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
                            <CyberCell>Tên Người Dùng</CyberCell>
                            <CyberCell>Tên Phim</CyberCell>
                            <CyberCell>Ghế</CyberCell>
                            <CyberCell>Phương Thức Thanh Toán</CyberCell>
                            <CyberCell>Thời gian chiếu</CyberCell>
                            <CyberCell>Tổng Tiền</CyberCell>
                            <CyberCell align="center">Xem</CyberCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((f, index) => (
                            <CyberRow key={f.id}>
                                <CyberCell>{page * rowsPerPage + index + 1}</CyberCell>
                                <CyberCell>
                                    {coverName(f)}
                                </CyberCell>
                                <CyberCell>{getOjectById(movies, getOjectById(moviescreens, f.idMovieScreening).idMovie).name}</CyberCell>
                                <CyberCell sx={{ color: '#0ff' }}>
                                    {f.listchair?.map(s => s.seatCode).join(', ')}
                                </CyberCell>

                                <CyberCell sx={{ color: '#0ff' }}>{f.method}</CyberCell>
                                <CyberCell sx={{ color: '#f39c12' }}>{f.timeMovieScreen} </CyberCell>
                                <CyberCell sx={{ color: '#f39c12' }} >{Number(f.total).toLocaleString("vi-VN")} đ</CyberCell>
                                <CyberCell sx={{ color: '#f39c12' }} align='center' > <Button
                                    variant="contained"
                                    size="small"
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
                                    onClick={() => handleClickOpen(f)}
                                >
                                    <LuNotebookPen />
                                </Button></CyberCell>
                            </CyberRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationTablePage
                    data={orders}
                    page={page}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />

            </TableContainer>

            <ModalDetail order={order} open={open && !!order} handleClose={handleClose} />
        </div>
    );
}

export default TableOrders;