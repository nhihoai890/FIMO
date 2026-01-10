import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { OrdersContenxt } from "../../../contexts/OrdersProvider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";
import { MoviesContext } from "../../../contexts/MovieProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";
import { AuthContext } from "../../../contexts/AuthsProvider";
import { useNavigate } from "react-router-dom";
import { getOjectById } from "../../../utils/functionContants";

const gradientText = {
  background: "linear-gradient(90deg, #38BDF8, #A78BFA)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};


const colors = {
  bg: "#0B0F19",
  panel: "#111827",
  panelHeader: "#0F172A",
  border: "rgba(148,163,184,0.12)",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
  accent: "#38BDF8",
  accent2: "#A78BFA",
  success: "#22C55E",
  danger: "#EF4444",
};


function HistoryBooking() {
  const orders = useContext(OrdersContenxt);
  const moviescreens = useContext(MovieScreeningContext);
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const movies = useContext(MoviesContext);
  const cinemaLocations = useContext(CinemaLocationsContext);
  const [status, setStatus] = useState(true);
  const showNow = useMemo(() => {
    const now = new Date();
    return orders.filter(e => {
      if (e.idAccount !== isLogin.id) return false;
      const screening = getOjectById(moviescreens, e.idMovieScreening);
      if (!screening) return false;

      const date = screening.release_date;
      const time = e.timeMovieScreen;

      const showDate = new Date(`${date}T${time}`);

      return status
        ? showDate > now
        : showDate <= now

    })
  }, [status, isLogin])




  return (
    <Box
      sx={{
        mt: 14,
        minHeight: "100vh",
        bgcolor: colors.bg,
        px: { xs: 2, md: 6 },
        py: 5,
        color: colors.textPrimary,
      }}
    >

      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(167,139,250,0.05))",
          backdropFilter: "blur(8px)",
          border: `1px solid ${colors.border}`,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={gradientText}>
          Lịch sử đặt vé
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant={status ? "contained" : "outlined"}
            onClick={() => setStatus(true)}
            sx={{
              bgcolor: status ? colors.accent : "transparent",
              color: status ? "#000" : colors.textSecondary,
              borderColor: colors.accent,
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.accent,
                color: "#000",
              },
            }}
          >
            Phim sắp xem
          </Button>

          <Button
            variant={!status ? "contained" : "outlined"}
            onClick={() => setStatus(false)}
            sx={{
              bgcolor: !status ? colors.danger : "transparent",
              color: !status ? "#000" : colors.textSecondary,
              borderColor: colors.danger,
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.danger,
                color: "#000",
              },
            }}
          >
            Phim đã xem
          </Button>
        </Stack>
      </Box>


      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: colors.panel,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: colors.panelHeader }}>
              {["Tên phim", "Rạp", "Ghế", "Thời gian", "Tổng tiền", "Chi tiết"].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: colors.textSecondary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: 12,
                    letterSpacing: 0.5,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>


          <TableBody>
            {showNow.map((row) => (
              <TableRow
                hover
                sx={{
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(56,189,248,0.08), transparent)",
                  },
                  "& td": {
                    borderBottom: `1px solid ${colors.border}`,
                  },
                }}
              >

                <TableCell>
                  <Typography fontWeight={600} sx={gradientText}>
                    {getOjectById(movies, getOjectById(moviescreens, row.idMovieScreening).idMovie).name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="#9CA3AF" fontSize={14}>{getOjectById(cinemaLocations, getOjectById(moviescreens, row.idMovieScreening).idCinemaLocation).name}</Typography>
                </TableCell>

                <TableCell>
                  <Typography color="#9CA3AF" fontSize={14}>{row.listchair.map(s => s.seatCode).toString()}</Typography>
                </TableCell>

                <TableCell>
                  <Typography fontSize={13} color="#9CA3AF">
                    {row.timeMovieScreen} - {getOjectById(moviescreens, row.idMovieScreening).release_date}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography fontWeight={700} sx={gradientText}>
                    {row.total.toLocaleString()} ₫
                  </Typography>

                </TableCell>

                <TableCell>
                  <Button onClick={() => navigate(`/view/${row.id}`)} size="small" variant="outlined">
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default HistoryBooking;
