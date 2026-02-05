import React, { useMemo } from "react";
import { Box, Autocomplete } from "@mui/material";
import ShowRoomBooking from "../../../client/booking/ShowRoomBooking";
import { getOjectById } from "../../../../utils/functionContants";

const toDateTime = (dateStr, timeStr) => {
  const [y, m , d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);

  return new Date(y, m-1, d, hh, mm);
}
export default function StepBooking({
  cities,
  cinemaLocations,
  movies,
  movieScreens,
  rooms,
  booking,
  setBooking,
  cinemaOptions,
  getMoviesWithUpcomingShowtimes,
  movieScreenOption,
  dataRoom,
  showImgUrl,
  CyberTextField,
  handleBooking
}) {
  const selectMovieScreen = getOjectById(movieScreens, booking.idMovieScreening);

  const filteredShowtimes = useMemo(() => {
    if(!selectMovieScreen) return;

    const now = new Date();

    return (selectMovieScreen.list_showtime || []).filter((time) => {
       const showTime = toDateTime(selectMovieScreen.release_date, time);
       return showTime > now;
    })
  }, [selectMovieScreen])
  return (
    
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 3,
        mt: 3,
      }}
    >
      {/* LEFT – FORM */}
      <Box sx={{ display: "grid", gap: 2.5 }}>
        <Autocomplete
          options={cities}
          value={getOjectById(cities, booking.idCity)}
          onChange={(e, value) => setBooking({ ...booking, idCity: value?.id || "" })}
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => <CyberTextField {...params} label="Thành Phố" />}
        />

        <Autocomplete
          options={cinemaOptions}
          value={getOjectById(cinemaLocations, booking.idCinemaLocation)}
          onChange={(e, value) =>
            setBooking({
              ...booking,
              idCinemaLocation: value?.id || "",
              idMovie: "",
              idMovieScreen: "",
              time: "",
            })
          }
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => <CyberTextField {...params} label="Rạp" />}
        />

        <Autocomplete
          options={getMoviesWithUpcomingShowtimes}
          value={getOjectById(movies, booking.idMovie)}
          onChange={(e, value) =>
            setBooking({
              ...booking,
              idMovie: value?.id || "",
              idMovieScreen: "",
              time: "",
            })
          }
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => <CyberTextField {...params} label="Phim" />}
        />

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
          renderInput={(params) => <CyberTextField {...params} label="⏰ Suất chiếu" />}
        />

        <Autocomplete
          options={filteredShowtimes}
          value={booking.timeMovieScreen || null}
          onChange={(e, value) => setBooking({ ...booking, timeMovieScreen: value || "" })}
          renderInput={(params) => <CyberTextField {...params} label="Giờ Chiếu" />}
        />
      </Box>

      {/* RIGHT – SEAT */}
      <Box>
        {booking.timeMovieScreen ? (
          <ShowRoomBooking data={dataRoom} showImgUrl={showImgUrl} handleBooking={handleBooking} />
        ) : null}
      </Box>
    </Box>
  );
}
