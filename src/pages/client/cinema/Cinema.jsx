import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { CitiesContext } from "../../../contexts/CitiesProvider";
import { CinemaContext } from "../../../contexts/CinemaProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";

function Cinema() {
  const cities = useContext(CitiesContext);
  const cinemaLocations = useContext(CinemaLocationsContext);
  const cinemas = useContext(CinemaContext);

  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");




  useEffect(() => {
    setKeyword("");
  }, [city]);


  const cinemaBrandMap = useMemo(() => {
    if (!cinemas?.length) return {};
    return cinemas.reduce((acc, c) => {
      acc[c.name] = c.imgUrl;
      return acc;
    }, {});
  }, [cinemas]);



  const filteredCinemas = useMemo(() => {
    if (!cinemaLocations?.length || !city) return [];

    return cinemaLocations
      .filter(c => c.idCity === city)
      .filter(c =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
      );
  }, [cinemaLocations, city, keyword]);



  return (
    <Box
      sx={{
        mt: 14,
        maxWidth: 960,
        mx: "auto",
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #020617 100%)",
        boxShadow: "0 40px 120px rgba(99,102,241,.35)",

      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 1,
            textShadow: "0 0 12px rgba(99,102,241,.35)",
            fontFamily: "inherit",
            fontStyle: "normal",
          }}
        >
          HỆ THỐNG RẠP CHIẾU PHIM
        </Typography>
        <Typography sx={{ color: "#9ca3af", mt: 1 }}>
          Chọn thành phố để xem các rạp gần bạn
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          p: 2,
          borderRadius: 3,
          background: "rgba(15,23,42,.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Tìm rạp..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            sx: {
              bgcolor: "rgba(255,255,255,.08)",
              color: "#ffffff",
              borderRadius: 3,
              "& input::placeholder": {
                color: "#c7d2fe",
                opacity: 1,
              },
            },
          }}

        />

        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          displayEmpty
          renderValue={(selected) =>
            selected
              ? cities.find((c) => c.id === selected)?.name
              : "Chọn thành phố"
          }
          sx={{
            minWidth: 200,
            bgcolor: "rgba(255,255,255,.08)",
            color: city ? "#ffffff" : "#c7d2fe",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,.1)",
            "& .MuiSelect-icon": {
              color: "#e0e7ff",
            },
          }}

        >
          <MenuItem disabled value="">
            Chọn thành phố
          </MenuItem>

          {cities?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>

      </Box>

      {/* ================= LIST ================= */}
      {filteredCinemas.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography sx={{ color: "#9ca3af" }}>
            Không tìm thấy rạp phù hợp 😢
          </Typography>
        </Box>
      )}

      {filteredCinemas.map((cinema) => {
        const brand = cinema.name.split(" ")[0];

        return (
          <Box key={cinema.id}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                p: 3,
                borderRadius: 3,
                background: "rgba(2,6,23,.6)",
                cursor: "pointer",
                transition: "all .25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(135deg, #1e293b, #020617)",
                  boxShadow: "0 10px 30px rgba(99,102,241,.25)",
                },
              }}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "#020617",
                }}
              >
                <img
                  src={
                    cinema.imgUrl ||
                    cinemaBrandMap[brand]
                  }
                  alt={cinema.name}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    objectFit: 'cover',
                    boxShadow: '0 0 8px rgba(0,255,255,0.2)',
                  }}
                />
              </Box>

              {/* INFO */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#e5e7eb",
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {cinema.name}
                  </Typography>

                  <Chip
                    label={brand}
                    size="small"
                    sx={{
                      bgcolor: "rgba(99,102,241,.15)",
                      color: "#a5b4fc",
                      fontSize: 11,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "#9ca3af",
                    mt: 0.5,
                    fontSize: 14,
                  }}
                >
                  {cinema.address}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1, borderColor: "#1f2937" }} />
          </Box>
        );
      })}
    </Box>
  );
}

export default Cinema;
