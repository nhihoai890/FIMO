import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { deleteDocument } from "../../../../services/firebaseService";
import ModalDeleted from "../../../../components/admin/ModalDeleted";
import PaginationTablePage from "../../../../components/admin/PaginationTablePage";

function TableActors({ handleEditActor, actors }) {
  const [open, setOpen] = useState(false);
  const [actorDelete, setActorDetete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = (row) => {
    setOpen(true);
    setActorDetete(row);
  };
  const handleClose = () => setOpen(false);
  const handleDeleted = async () => {
    await deleteDocument("actors", actorDelete);
    handleClose();
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(20,20,35,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background:
                  "linear-gradient(90deg, rgba(0,255,255,0.15), rgba(255,0,255,0.15))",
                "& th": {
                  color: "#00e0ff",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  fontSize: 15,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                },
              }}
            >
              <TableCell>ID</TableCell>
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
                <TableRow
                  key={ac.id}
                  sx={{
                    background:
                      index % 2 === 0
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.05)",
                    "&:hover": {
                      background: "rgba(0,255,255,0.08)",
                      boxShadow: "inset 0 0 20px rgba(0,255,255,0.2)",
                      transform: "scale(1.01)",
                      transition: "0.3s ease",
                    },
                  }}
                >
                  <TableCell sx={{ color: "#E0E7FF" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ color: "#E0E7FF" }}>{ac.name}</TableCell>
                  <TableCell sx={{ color: "#CBD5E1",maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ac.description}
                  </TableCell>
                  <TableCell>
                    <img
                      src={ac.imgUrl}
                      alt={ac.name}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        border: "1px solid rgba(0,255,255,0.4)",
                        objectFit: "cover",
                        boxShadow:
                          "0 0 12px rgba(0,255,255,0.2), 0 0 8px rgba(255,0,255,0.15)",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                      <Button
                        onClick={() => handleEditActor(ac)}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(90deg, #00e0ff, #7b2ff7)",
                          borderRadius: "8px",
                          boxShadow: "0 0 12px rgba(0,255,255,0.3)",
                          color: "#fff",
                          minWidth: 36,
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #7b2ff7, #00e0ff)",
                            boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <FaPen size={13} />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleClickOpen(ac)}
                        sx={{
                          background:
                            "linear-gradient(90deg, #ff4b2b, #ff416c)",
                          borderRadius: "8px",
                          color: "#fff",
                          minWidth: 36,
                          boxShadow: "0 0 12px rgba(255,64,129,0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #ff416c, #ff4b2b)",
                            boxShadow: "0 0 20px rgba(255,64,129,0.5)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <FaTrash size={13} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <PaginationTablePage
          data={actors}
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

export default TableActors;
