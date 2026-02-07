import React, { useMemo } from "react";
import { Box, Autocomplete, Card, Typography, Divider } from "@mui/material";
import ShowRoomBooking from "../../../client/booking/ShowRoomBooking";
import { getOjectById } from "../../../../utils/functionContants";

/* Convert date + time => Date object */
const toDateTime = (dateStr, timeStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm);
};

export default function StepBooking({
  cities,
  cinemaLocations,
  movies,
  movieScreens,
  booking,
  setBooking,
  cinemaOptions,
  getMoviesWithUpcomingShowtimes,
  movieScreenOption,
  dataRoom,
  showImgUrl,
  CyberTextField,
  handleBooking,
}) {
  /* Selected movie screening */
  const selectMovieScreen = getOjectById(
    movieScreens,
    booking.idMovieScreening
  );

  /* Filter showtimes (only future) */
  const filteredShowtimes = useMemo(() => {
    if (!selectMovieScreen) return [];

    const now = new Date();

    return (selectMovieScreen.list_showtime || []).filter((time) => {
      const showTime = toDateTime(selectMovieScreen.release_date, time);
      return showTime > now;
    });
  }, [selectMovieScreen]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1500px",
        mx: "auto",
        mt: 3,
        px: 2,
      }}
    >
      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        🎬 Đặt vé xem phim
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "380px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* ================= LEFT FORM ================= */}
        <Card
          sx={{
            p: 2.5,
            borderRadius: 4,
            border: "1px solid #333",
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            Thông tin đặt vé
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "grid", gap: 2 }}>
            {/* City */}
            <Autocomplete
              options={cities}
              value={getOjectById(cities, booking.idCity)}
              onChange={(e, value) =>
                setBooking({ ...booking, idCity: value?.id || "" })
              }
              getOptionLabel={(option) => option?.name || ""}
              renderInput={(params) => (
                <CyberTextField {...params} label="Thành phố" />
              )}
            />

            {/* Cinema */}
            <Autocomplete
              options={cinemaOptions}
              value={getOjectById(cinemaLocations, booking.idCinemaLocation)}
              onChange={(e, value) =>
                setBooking({
                  ...booking,
                  idCinemaLocation: value?.id || "",
                  idMovie: "",
                  idMovieScreening: "",
                  timeMovieScreen: "",
                })
              }
              getOptionLabel={(option) => option?.name || ""}
              renderInput={(params) => (
                <CyberTextField {...params} label="Rạp chiếu" />
              )}
            />

            {/* Movie */}
            <Autocomplete
              options={getMoviesWithUpcomingShowtimes}
              value={getOjectById(movies, booking.idMovie)}
              onChange={(e, value) =>
                setBooking({
                  ...booking,
                  idMovie: value?.id || "",
                  idMovieScreening: "",
                  timeMovieScreen: "",
                })
              }
              getOptionLabel={(option) => option?.name || ""}
              renderInput={(params) => (
                <CyberTextField {...params} label="Phim" />
              )}
            />

            {/* Screening Date */}
            <Autocomplete
              options={movieScreenOption}
              value={getOjectById(movieScreens, booking.idMovieScreening)}
              getOptionLabel={(option) => option?.release_date || ""}
              onChange={(e, value) =>
                setBooking({
                  ...booking,
                  idMovieScreening: value?.id || "",
                  timeMovieScreen: "",
                })
              }
              renderInput={(params) => (
                <CyberTextField {...params} label="Ngày chiếu" />
              )}
            />

            {/* Showtime */}
            <Autocomplete
              options={filteredShowtimes}
              value={booking.timeMovieScreen || null}
              onChange={(e, value) =>
                setBooking({ ...booking, timeMovieScreen: value || "" })
              }
              renderInput={(params) => (
                <CyberTextField {...params} label="Giờ chiếu" />
              )}
            />
          </Box>
        </Card>

        {/* ================= RIGHT SEAT MAP ================= */}
        <Card
          sx={{
            p: 2.5,
            borderRadius: 4,
            border: "1px solid #333",
            minHeight: 600,
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            🎟 Chọn ghế
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* If no showtime */}
          {!booking.timeMovieScreen ? (
            <Box
              sx={{
                height: 450,
                border: "2px dashed gray",
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                opacity: 0.7,
              }}
            >
              <Typography>
                Vui lòng chọn giờ chiếu để hiện sơ đồ ghế
              </Typography>
            </Box>
          ) : (
            
            <Box
              sx={{
                width: "100%",
                overflowX: "auto", 
                overflowY: "auto",
                pb: 2,
              }}
            >
              
              <Box
                sx={{
                  minWidth: "950px",
                  width: "fit-content",
                }}
              >
                <ShowRoomBooking
                  data={dataRoom}
                  showImgUrl={showImgUrl}
                  handleBooking={handleBooking}
                />
              </Box>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
}
