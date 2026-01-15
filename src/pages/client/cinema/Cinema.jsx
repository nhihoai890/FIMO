import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { CitiesContext } from "../../../contexts/CitiesProvider";
import { CinemaContext } from "../../../contexts/CinemaProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";

function Cinema() {
  const cities = useContext(CitiesContext);
  const cinemaLocations = useContext(CinemaLocationsContext)
  const cinemas = useContext(CinemaContext)
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (cities?.length) {
      setCity(cities[0].name);
    }
  }, [cities]);


  const cinemaBrand = useMemo(() => {
    if (!cinemas?.length) return {};
    return cinemas.reduce((acc, c) => {
      acc[c.name] = c.imgUrl;
      return acc;
    }, {});
  }, [cinemas]);



  const filteredCinemas = useMemo(() => {
    if (!cinemaLocations?.length || !city) return [];

    return cinemaLocations
      .filter((c) => c.idCity === city)
      .filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
      );
  }, [cinemaLocations, city, keyword]);
console.log("city:", city);
console.log("cinema idCity:", cinemaLocations?.[0]?.idCity);


  return (
    <Box
      sx={{
        mt: 16,
        maxWidth: 920,
        mx: "auto",
        p: 3,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* SEARCH */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm rạp tại"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            sx: {
              bgcolor: "rgba(2,6,23,0.8)",
              color: "#e5e7eb",
              borderRadius: 3,
              backdropFilter: "blur(8px)",
            },
          }}
        />

        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{
            minWidth: 170,
            bgcolor: "rgba(2,6,23,0.8)",
            color: "#e5e7eb",
            borderRadius: 3,
          }}
        >
          {cities.map((c) => (
            <MenuItem key={c.name} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* LIST */}
      {filteredCinemas.map((cinema) => (
        <Box key={cinema.idCinema}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 2.5,
              borderRadius: 3,
              cursor: "pointer",
              transition: "all .25s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #111827, #020617)",
                boxShadow: "0 0 0 1px rgba(99,102,241,.6)",
              },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #38bdf8, #6366f1)",
                p: "2px",
              }}
            >
              <img
                src={cinema?.imgUrl || cinemaBrand[cinema.name.split(" ")[0]]}
                alt=""
                width="100%"
                height="100%"
                style={{
                  borderRadius: "50%",
                  background: "#020617",
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    color: "#e5e7eb",
                    fontWeight: 600,
                    letterSpacing: 0.3,
                  }}
                >
                  {cinema?.name}
                </Typography>


              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#9ca3af", mt: 0.5 }}
              >
                {cinema?.address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#1f2937", my: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

export default Cinema;
