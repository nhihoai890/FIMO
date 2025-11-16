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
                    borderRadius: 4,
                    backgroundColor: "#0b0b12",
                    boxShadow: "0 0 25px rgba(0,255,255,0.1)",
                    overflow: "hidden",
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "#111",
                                '& th': {
                                    color: "#00f0ff",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    textAlign: "center",
                                    textShadow: "0 0 6px rgba(0,240,255,0.7)",
                                    borderBottom: "none",
                                }
                            }}
                        >
                            {["#", "Name", "Cinema", "Rows", "Columns", "List Chair", "Action"].map((head) => (
                                <TableCell key={head} align={head === "Action" ? "center" : "left"}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, idx) => (
                            <TableRow
                                key={r.id}
                                sx={{
                                    backgroundColor: idx % 2 === 0 ? "#121212" : "#1a1a1a",
                                    "& td": { borderBottom: "none" },
                                    "&:hover": {
                                        background: "rgba(0,240,255,0.05)",
                                        boxShadow: "0 0 12px rgba(0,240,255,0.2)",
                                        transform: "scale(1.01)",
                                        transition: "0.3s",
                                    }
                                }}
                            >
                                <TableCell sx={{ color: "#00ffff", textAlign: "center" }}>{page * rowsPerPage + idx + 1}</TableCell>
                                <TableCell sx={{ color: "#00eaff", fontWeight: 600, textAlign: "center" }}>{r.name}</TableCell>
                                <TableCell sx={{ color: "#ffffffb3", textAlign: "center" }}>{getOjectById(cinemaLocation, r.idCinemaLocation)?.name}</TableCell>
                                <TableCell sx={{ color: "#aaa", textAlign: "center" }}>{r.rows}</TableCell>
                                <TableCell sx={{ color: "#00eaff", textAlign: "center" }}>{r.columns}</TableCell>
                                <TableCell sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Tooltip
                                        title={<ShowRoom data={r} />}
                                        arrow
                                        sx={{
                                            "& .MuiTooltip-tooltip": {
                                                background: "rgba(0,0,0,0.9)",
                                                color: "#00ffff",
                                                fontSize: "0.85rem",
                                                boxShadow: "0 0 10px rgba(0,240,255,0.4)",
                                                borderRadius: 2,
                                            }
                                        }}
                                    >
                                        <Button sx={{ color: "#00ffff", "&:hover": { color: "#ff00ff", transform: "scale(1.2)", transition: "0.3s" } }}>
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
                                            background: "linear-gradient(90deg,#00f0ff,#7c4dff)",
                                            boxShadow: "0 0 10px rgba(0,240,255,0.4)",
                                            "&:hover": {
                                                background: "linear-gradient(90deg,#7c4dff,#00f0ff)",
                                                transform: "scale(1.05)",
                                            }
                                        }}
                                    ><FaPen /></Button>

                                    <Button
                                        onClick={() => handleClickOpen(r)}
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            background: "linear-gradient(90deg,#ff0080,#ff75b0)",
                                            boxShadow: "0 0 10px rgba(255,0,128,0.4)",
                                            "&:hover": {
                                                background: "linear-gradient(90deg,#ff75b0,#ff0080)",
                                                transform: "scale(1.05)",
                                            }
                                        }}
                                    ><FaTrash /></Button>
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
