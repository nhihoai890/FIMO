import React, { useContext, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Box, Button, Tooltip
} from '@mui/material';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { FaPen, FaTrash } from 'react-icons/fa';
import { SiCinema4D } from "react-icons/si";
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';
import { deleteDocument } from '../../../../services/firebaseService';
import ShowRoom from './ShowRoom';

function TableRoom({ handleEditRoom, rooms }) {
    const cinemaLocation = useContext(CinemaLocationsContext);
    const typeChair = useContext(TypeChairsContext);

    const [roomdelete, setRoomDelete] = useState(null);
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
        setRoomDelete(row);
    };

    const handleClose = () => setOpen(false);

    const handleDeleted = async () => {
        await deleteDocument("rooms", roomdelete);
        handleClose();
    };

    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{
                    mt: 3,
                    p: 2,
                    background: "radial-gradient(circle at top left, #0a0a0f 0%, #000 70%)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    borderRadius: 4,
                    boxShadow: "0 0 25px rgba(0,255,255,0.1)",
                    overflow: "hidden",
                    backdropFilter: "blur(8px)",
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: "0 0 35px rgba(0,255,255,0.25)",
                    },
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                background:
                                    "linear-gradient(90deg, #00ffff 0%, #7b2cbf 50%, #ff00ff 100%)",
                                boxShadow: "0 0 10px rgba(255,0,255,0.3)",
                            }}
                        >
                            {["#", "Name", "Cinema", "Rows", "Columns", "List Chair", "Action"].map(
                                (head) => (
                                    <TableCell
                                        key={head}
                                        sx={{
                                            color: "#fff",
                                            fontWeight: 700,
                                            textShadow: "0 0 8px rgba(0,255,255,0.7)",
                                            fontSize: "0.95rem",
                                        }}
                                        align={head === "Action" ? "center" : "left"}
                                    >
                                        {head}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rooms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((r, index) => (
                                <TableRow
                                    key={r.id}
                                    sx={{
                                        transition: "0.3s",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(90deg, rgba(0,255,255,0.05), rgba(255,0,255,0.05))",
                                            boxShadow: "0 0 10px rgba(0,255,255,0.2)",
                                            transform: "scale(1.01)",
                                        },
                                    }}
                                >
                                    <TableCell sx={{ color: "#00ffff" }}>
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell sx={{ color: "#00eaff", fontWeight: 600 }}>
                                        {r.name}
                                    </TableCell>
                                    <TableCell sx={{ color: "#ffffffb3" }}>
                                        {getOjectById(cinemaLocation, r.idCinemaLocation)?.name}
                                    </TableCell>
                                    <TableCell sx={{ color: "#aaa" }}>{r.rows}</TableCell>
                                    <TableCell sx={{ color: "#00eaff" }}>{r.columns}</TableCell>
                                    <TableCell>
                                        <Tooltip title={<ShowRoom data={r} />} arrow>
                                            <Button
                                                sx={{
                                                    color: "#00ffff",
                                                    "&:hover": {
                                                        color: "#ff00ff",
                                                        transform: "scale(1.2)",
                                                    },
                                                    transition: "0.3s",
                                                }}
                                            >
                                                <SiCinema4D size={22} />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleEditRoom(r)}
                                            sx={{
                                                mr: 1,
                                                borderRadius: 2,
                                                background:
                                                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                                                boxShadow: "0 0 10px rgba(102,126,234,0.4)",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)",
                                                    transform: "scale(1.05)",
                                                },
                                            }}
                                        >
                                            <FaPen />
                                        </Button>

                                        <Button
                                            onClick={() => handleClickOpen(r)}
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                background:
                                                    "linear-gradient(90deg, #ff4081, #d500f9)",
                                                boxShadow: "0 0 12px rgba(255,64,129,0.4)",
                                                transition: "0.3s",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(90deg, #d500f9, #ff4081)",
                                                    boxShadow:
                                                        "0 0 20px rgba(255,64,129,0.6)",
                                                    transform: "scale(1.08)",
                                                },
                                            }}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <PaginationTablePage
                    data={rooms}
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
        </div>
    );
}

export default TableRoom;
