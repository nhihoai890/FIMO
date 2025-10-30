import React, { useContext, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from "@mui/material";
import { FaPen, FaTrash } from 'react-icons/fa';
import { CategoriesContext } from '../../../contexts/CategoryProvider';
import ModalDeleted from '../../../components/admin/ModalDeleted';
import { deleteDocument } from '../../../services/firebaseService';
import PaginationTablePage from '../../../components/admin/PaginationTablePage';

function TableCategory({ handleEdit }) {
    const categories = useContext(CategoriesContext);
    const [open, setOpen] = useState(false);
    const [categoryDele, setCategoryDele] = useState(null);
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
        setCategoryDele(row);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleted = async () => {
        await deleteDocument("categories", categoryDele);
        handleClose();
    }

    return (
        <div>
            <TableContainer component={Paper} sx={{
                mt: 3,
                p: 2,
                borderRadius: 3,
                background: "linear-gradient(180deg, #111111, #1a1a1a)", // nền tối nhẹ
                border: "1px solid rgba(0,229,255,0.15)",
                boxShadow: "0 0 15px rgba(0,229,255,0.05)",
                position: "relative",
                overflow: "hidden",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(120deg, rgba(0,229,255,0.15), rgba(179,136,255,0.15), rgba(0,229,255,0.15))",
                    backgroundSize: "300% 300%",
                    animation: "slowGlow 12s ease infinite",
                    zIndex: 0,
                    opacity: 0.1,
                },
                "& *": { position: "relative", zIndex: 1 },

                "@keyframes slowGlow": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            background:
                                "linear-gradient(90deg, rgba(0,229,255,0.08), rgba(179,136,255,0.08))",
                            "& th": {
                                color: "#c9eaff", 
                                fontWeight: "600",
                                fontSize: "0.95rem",
                                letterSpacing: "0.4px",
                                textTransform: "uppercase",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                py: 1.2,
                            },
                        }}>
                            <TableCell sx={{ color: "#00e5ff", fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ color: "#00e5ff", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ color: "#00e5ff", fontWeight: "bold" }} >Description</TableCell>
                            <TableCell sx={{ color: "#00e5ff", fontWeight: "bold" }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
                            <TableRow key={cat.id}>
                                <TableCell sx={{ color: "#fff" }}>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ color: "#fff" }}>{cat.name}</TableCell>
                                <TableCell sx={{ color: "#bbb" }}>{cat.description}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => handleEdit(cat)} size="small" color="primary" sx={{
                                        mr: 1,
                                        background:
                                            "linear-gradient(45deg, #00e5ff, #6200ea)",
                                        color: "#fff",
                                        boxShadow:
                                            "0 0 8px rgba(0,229,255,0.5), 0 0 12px rgba(98,0,234,0.3)",
                                        "&:hover": {
                                            boxShadow:
                                                "0 0 15px rgba(0,229,255,0.8), 0 0 25px rgba(98,0,234,0.5)",
                                            transform: "scale(1.05)",
                                        },
                                    }}>
                                        <FaPen />
                                    </Button>
                                    <Button sx={{
                                        background:
                                            "linear-gradient(45deg, #ff1744, #ff9100)",
                                        color: "#fff",
                                        boxShadow:
                                            "0 0 8px rgba(255,23,68,0.5), 0 0 12px rgba(255,145,0,0.3)",
                                        "&:hover": {
                                            boxShadow:
                                                "0 0 15px rgba(255,23,68,0.8), 0 0 25px rgba(255,145,0,0.6)",
                                            transform: "scale(1.05)",
                                        },
                                    }} variant="contained" size="small" color="error" onClick={() => handleClickOpen(cat)}>
                                        <FaTrash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationTablePage data={categories} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </TableContainer>
            <ModalDeleted open={open} handleClose={handleClose} handleDeleted={handleDeleted} />
        </div>

    );
}

export default TableCategory;