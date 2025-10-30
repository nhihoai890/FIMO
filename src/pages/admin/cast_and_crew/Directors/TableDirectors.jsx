import React, { useContext, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from "@mui/material";
import { FaPen, FaTrash } from 'react-icons/fa';
import { DirectorsContext } from '../../../../contexts/DirectorsProvider';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../../services/firebaseService';
import PaginationTablePage from '../../../../components/admin/PaginationTablePage';


function TableDirectors({ handleEditDirectors }) {
    const directors = useContext(DirectorsContext)
    const [open, setOpen] = useState(false);
    const [directorDele, setDeleDirector] = useState(null);
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
        setDeleDirector(row);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleted = async () => {
        await deleteDocument("directors", directorDele);
        handleClose();
    }
    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{
                    mt: 3,
                    p: 2,
                    background: "linear-gradient(145deg, #111 20%, #1b1b1b 80%)",
                    borderRadius: 3,
                    border: "1px solid rgba(0,229,255,0.15)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 0 30px rgba(0,229,255,0.05)",
                    overflow: "hidden",
                }}
                className="p-4 shadow-md rounded-lg overflow-x-auto"
            >
                <Table

                    sx={{
                        tableLayout: 'fixed',
                    }}
                >
                    <TableHead>
                        <TableRow sx={{
                            background:
                                "linear-gradient(90deg, rgba(0,229,255,0.15), rgba(179,136,255,0.15))",
                        }} >
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }}>#</TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }} className="font-semibold w-[400px] truncate">
                                Description
                            </TableCell>
                            <TableCell sx={{ color: "#b3e5fc", fontWeight: 700 }} align="center" className="font-semibold w-[150px]">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {directors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((direc, index) => (
                            <TableRow
                                key={direc.id}
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
                                <TableCell sx={{ color: "#fff", fontWeight: 500 }} className="truncate">{direc.name}</TableCell>
                                <TableCell sx={{ color: "#b0bec5" }} className="truncate">{direc.description}</TableCell>

                                <TableCell align="center">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleEditDirectors(direc)}
                                            sx={{
                                                background:
                                                    "linear-gradient(90deg, #00e5ff, #7c4dff)",
                                                boxShadow: "0 0 10px rgba(0,229,255,0.4)",
                                                transition: "0.3s",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(90deg, #7c4dff, #00e5ff)",
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
                                            onClick={() => handleClickOpen(direc)}
                                            sx={{
                                                background:
                                                    "linear-gradient(90deg, #ff4081, #d500f9)",
                                                boxShadow: "0 0 10px rgba(255,64,129,0.4)",
                                                transition: "0.3s",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(90deg, #d500f9, #ff4081)",
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
                <PaginationTablePage data={directors} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>

            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>
    );
}

export default TableDirectors;