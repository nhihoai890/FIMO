import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function ForgotPassword({ openForgotPassword, handleCloseForgotPassword, Transition }) {
  return (
    <Dialog
      open={openForgotPassword}                 
      onClose={handleCloseForgotPassword}
      slots={Transition ? { transition: Transition } : undefined}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: 5,
          overflow: "hidden",
          width: { xs: "92vw", sm: 520 },
          maxWidth: "92vw",
          fontFamily: "initial",
          bgcolor: "rgba(18,18,22,0.65)",
          backdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
          position: "relative",
        },
      }}
    >
      {/* Glow background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(600px 260px at 30% -10%, rgba(255,46,99,0.35), transparent 60%), radial-gradient(520px 220px at 110% 30%, rgba(255,214,98,0.25), transparent 55%)",
        }}
      />

      {/* Header */}
      <DialogTitle sx={{ position: "relative", px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
          <Box>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 900,
                lineHeight: 1.1,
                background: "linear-gradient(90deg, #ff2e63, #ff7f50, #ffd662)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Quên mật khẩu
            </Typography>
            <Typography sx={{ mt: 0.8, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
              Nhập email để nhận hướng dẫn đặt lại mật khẩu.
            </Typography>
          </Box>

          <IconButton
            onClick={handleCloseForgotPassword}   
            sx={{
              color: "rgba(255,255,255,0.75)",
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,0.12)" }} />
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ position: "relative", px: 3, pb: 3 }}>
        <Box component="form" sx={{ display: "grid", gap: 2.2, mt: 0.5 }}>
          <TextField
            fullWidth
            label="Email"
            placeholder="name@example.com"
            variant="outlined"
            size="medium"
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                "& input": { color: "white" },
                "& fieldset": { borderColor: "rgba(255,255,255,0.20)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.38)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(255,214,98,0.75)" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255,255,255,0.45)",
                opacity: 1,
              },
            }}
          />

          <Button
            fullWidth
            sx={{
              py: 1.4,
              borderRadius: 3,
              fontSize: 16,
              fontWeight: 800,
              textTransform: "none",
              background: "linear-gradient(90deg, #ff2e63, #ff7f50, #ffd662)",
              color: "white",
              boxShadow: "0 10px 26px rgba(255,46,99,0.25)",
              "&:hover": {
                background: "linear-gradient(90deg, #ff1e52, #ff6f40, #ffca52)",
                boxShadow: "0 12px 34px rgba(255,46,99,0.32)",
              },
            }}
          >
            Tiếp tục
          </Button>

          <Button
            onClick={handleCloseForgotPassword}   
            fullWidth
            variant="text"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              color: "rgba(255,255,255,0.72)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
            }}
          >
            Quay lại đăng nhập
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPassword;
