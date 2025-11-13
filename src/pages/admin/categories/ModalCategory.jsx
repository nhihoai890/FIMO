import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 🌌 Nút gradient neon
const NeonButton = styled(Button)(() => ({
  background: "linear-gradient(135deg, #8A2BE2, #00FFFF)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: 12,
  textTransform: "none",
  boxShadow: "0 0 12px rgba(0,255,255,0.4)",
  "&:hover": {
    background: "linear-gradient(135deg, #9B30FF, #00CED1)",
    boxShadow: "0 0 18px rgba(0,255,255,0.8)",
    transform: "scale(1.03)",
  },
  transition: "0.3s ease",
}));

// 🌈 Dialog Title kiểu Cyberpunk
const CyberDialogTitle = styled(DialogTitle)(() => ({
  background: "linear-gradient(90deg, #1E1E2F, #2E2E4A)",
  color: "#00FFFF",
  textShadow: "0 0 10px #00FFFF",
  fontWeight: 700,
  textAlign: "center",
  borderBottom: "2px solid rgba(0,255,255,0.3)",
}));

function ModalCategory({
  handleClose,
  open,
  handleChangeInput,
  addCategory,
  error,
  category,
}) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background:
            "radial-gradient(circle at top left, #121212 0%, #1A1A2E 60%, #000 100%)",
          border: "1px solid rgba(0,255,255,0.3)",
          boxShadow: "0 0 25px rgba(138,43,226,0.4)",
          borderRadius: 3,
          color: "#E0E7FF",
        },
      }}
    >
      <CyberDialogTitle>
        {category.id ? "Edit Category" : "Add New Category"}
      </CyberDialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            name="name"
            variant="outlined"
            value={category.name}
            onChange={handleChangeInput}
            error={!!error.name}
            helperText={error.name}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#fff",
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#00FFFF" },
                "&.Mui-focused fieldset": { borderColor: "#9B30FF" },
              },
              "& .MuiInputLabel-root": {
                color: "#A0A0C0",
              },
              "& .MuiFormHelperText-root": {
                color: "#FF6B6B",
              },
            }}
          />

          <TextField
            margin="dense"
            label="Description"
            type="text"
            name="description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={category.description}
            onChange={handleChangeInput}
            error={!!error.description}
            helperText={error.description}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#fff",
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#00FFFF" },
                "&.Mui-focused fieldset": { borderColor: "#9B30FF" },
              },
              "& .MuiInputLabel-root": {
                color: "#A0A0C0",
              },
              "& .MuiFormHelperText-root": {
                color: "#FF6B6B",
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "#FF6B6B",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              textShadow: "0 0 6px #FF6B6B",
            },
          }}
        >
          Cancel
        </Button>
        <NeonButton onClick={addCategory}>
          {category.id ? "Update" : "Add"}
        </NeonButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCategory;
