import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { alpha } from "@mui/material/styles";

function PaginationTablePage({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  data,
}) {
  return (
    <TablePagination
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      sx={{
        color: "#c9eaff", // chữ sáng
        background: "linear-gradient(90deg, #111, #1a1a1a)",
        borderTop: "1px solid rgba(0,229,255,0.15)",
        borderRadius: "0 0 12px 12px",
        "& .MuiTablePagination-toolbar": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(0,229,255,0.05), rgba(179,136,255,0.05))",
          borderRadius: "0 0 12px 12px",
          color: "#c9eaff",
        },
        "& .MuiSelect-select": {
          color: "#80deea",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "6px",
        },
        "& .MuiSvgIcon-root": {
          color: "#80deea",
          transition: "0.3s",
          "&:hover": {
            color: "#b388ff",
            transform: "scale(1.2)",
            filter: "drop-shadow(0 0 5px rgba(0,229,255,0.5))",
          },
        },
        "& .MuiTablePagination-actions": {
          "& button": {
            color: "#00e5ff",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: alpha("#00e5ff", 0.08),
              boxShadow: "0 0 10px rgba(0,229,255,0.4)",
              transform: "scale(1.05)",
            },
          },
        },
      }}
    />
  );
}

export default PaginationTablePage;
