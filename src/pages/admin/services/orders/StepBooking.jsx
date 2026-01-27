import React from "react";
import { Box, Autocomplete } from "@mui/material";
import ShowRoomBooking from "../../../client/booking/ShowRoomBooking";
import { getOjectById } from "../../../../utils/functionContants";

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
}) {
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
          value={getOjectById(movieScreens, booking.idMovieScreen)}
          getOptionLabel={(option) => option?.release_date || ""}
          onChange={(e, value) =>
            setBooking({
              ...booking,
              idMovieScreen: value?.id || "",
              time: "",
            })
          }
          renderInput={(params) => <CyberTextField {...params} label="⏰ Suất chiếu" />}
        />

        <Autocomplete
          options={getOjectById(movieScreens, booking.idMovieScreen)?.list_showtime || []}
          value={booking.time || null}
          onChange={(e, value) => setBooking({ ...booking, time: value || "" })}
          renderInput={(params) => <CyberTextField {...params} label="Giờ Chiếu" />}
        />
      </Box>

      {/* RIGHT – SEAT */}
      <Box>
        {booking.time ? (
          <ShowRoomBooking data={dataRoom} showImgUrl={showImgUrl} />
        ) : null}
      </Box>
    </Box>
  );
}
