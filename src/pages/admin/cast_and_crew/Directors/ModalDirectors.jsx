import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalDirectors({ open, handleClose, director, handleChangeDirector, addDirector, error }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(30,30,50,0.95), rgba(60,45,85,0.95))",
          color: "#E0E7FF",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          textAlign: "center",
          color: "#A78BFA",
          letterSpacing: 0.5,
          fontSize: "1.3rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          pb: 1.5,
        }}
      >
        {director.id ? "Edit Director" : "Add Director"}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          py: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Director Name"
            type="text"
            fullWidth
            name="name"
            variant="outlined"
            value={director.name}
            onChange={handleChangeDirector}
            error={!!error.name}
            helperText={error.name}
            InputLabelProps={{ style: { color: "#C4B5FD" } }}
            InputProps={{
              style: {
                color: "#fff",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 8,
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
            value={director.description}
            onChange={handleChangeDirector}
            error={!!error.description}
            helperText={error.description}
            InputLabelProps={{ style: { color: "#C4B5FD" } }}
            InputProps={{
              style: {
                color: "#fff",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 8,
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="secondary"
          onClick={handleClose}
          sx={{
            color: "#E0E7FF",
            borderRadius: 2,
            px: 2.5,
            py: 1,
            textTransform: "none",
            "&:hover": {
              background: "rgba(255,255,255,0.08)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={addDirector}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(90deg, #7C3AED, #8B5CF6)",
            boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #6D28D9, #7C3AED)",
              boxShadow: "0 6px 20px rgba(124,58,237,0.6)",
              transform: "scale(1.03)",
              transition: "all 0.25s ease",
            },
          }}
        >
          {director.id ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDirectors;
