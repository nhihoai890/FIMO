import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    Button,
    Autocomplete,
    TextField,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* ================= TRANSITION ================= */

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/* ================= STYLES ================= */

const CyberDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
        background: "radial-gradient(circle at top left, #0f0f1a, #121225)",
        borderRadius: 20,
        border: "1px solid rgba(0,255,255,0.25)",
        boxShadow: "0 0 40px rgba(0,255,255,0.35)",
        color: "#E6F7FF",
    },
}));

const CyberTitle = styled(DialogTitle)(() => ({
    textAlign: "center",
    fontWeight: 700,
    letterSpacing: 2,
    color: "#00FFFF",
    textShadow: "0 0 12px #00FFFF",
    borderBottom: "1px solid rgba(0,255,255,0.2)",
}));

const CyberTextField = styled(TextField)(() => ({
    "& .MuiInputLabel-root": {
        color: "#6ffcff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#00ffff",
    },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#0b0b16",
        color: "#fff",
        borderRadius: 12,
        "& fieldset": {
            borderColor: "rgba(0,255,255,0.35)",
        },
        "&:hover fieldset": {
            borderColor: "#00ffff",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00ffff",
            boxShadow: "0 0 12px rgba(0,255,255,0.6)",
        },
    },
}));

const NeonButton = styled(Button)(() => ({
    background: "linear-gradient(135deg, #00ffff, #9b8fff)",
    color: "#000",
    fontWeight: 700,
    borderRadius: 14,
    padding: "10px 28px",
    boxShadow: "0 0 18px rgba(0,255,255,0.7)",
    textTransform: "none",
    "&:hover": {
        boxShadow: "0 0 30px rgba(0,255,255,1)",
        transform: "scale(1.05)",
    },
}));

/* ================= COMPONENT ================= */

function ModalOrders({ open, handleClose }) {
    return (
        <CyberDialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="md"
        >
            <CyberTitle>ĐẶT VÉ TẠI QUẦY</CyberTitle>

            <DialogContent sx={{ mt: 3 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: 3,
                    }}
                >
                    {/* LEFT – FORM */}
                    <Box sx={{ display: "grid", gap: 2.5 }}>
                        <Autocomplete
                            options={["Avatar", "Dune", "Oppenheimer"]}
                            renderInput={(params) => (
                                <CyberTextField {...params} label="🎬 Phim" />
                            )}
                        />

                        <Autocomplete
                            options={["Hà Nội", "TP.HCM", "Đà Nẵng"]}
                            renderInput={(params) => (
                                <CyberTextField {...params} label="🌆 Thành phố" />
                            )}
                        />

                        <Autocomplete
                            options={["CGV Vincom", "Lotte Cinema", "Galaxy"]}
                            renderInput={(params) => (
                                <CyberTextField {...params} label="🏢 Rạp" />
                            )}
                        />

                        <Autocomplete
                            options={["14:00", "16:30", "19:00", "21:45"]}
                            renderInput={(params) => (
                                <CyberTextField {...params} label="⏰ Suất chiếu" />
                            )}
                        />

                        <Autocomplete
                            options={["Phòng 1", "IMAX", "VIP"]}
                            renderInput={(params) => (
                                <CyberTextField {...params} label="🎥 Phòng chiếu" />
                            )}
                        />
                    </Box>

                    {/* RIGHT – ORDER INFO */}
                    <Box
                        sx={{
                            border: "1px solid rgba(0,255,255,0.3)",
                            borderRadius: 3,
                            p: 2.5,
                            background: "#0c0c18",
                        }}
                    >
                        <Box
                            sx={{
                                color: "#00ffff",
                                fontWeight: 700,
                                mb: 2,
                                letterSpacing: 1,
                            }}
                        >
                            THÔNG TIN ĐƠN HÀNG
                        </Box>

                        <Box sx={{ fontSize: 14, lineHeight: 2 }}>
                            <p>🎬 Phim: <b>Avatar</b></p>
                            <p>🏢 Rạp: <b>CGV Vincom</b></p>
                            <p>⏰ Suất: <b>19:00</b></p>
                            <p>🎥 Phòng: <b>IMAX</b></p>
                        </Box>

                        <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.2)" }} />

                        <Box sx={{ mb: 1 }}>🎟 Ghế đã chọn</Box>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Chip label="A1" color="error" />
                            <Chip label="A2" color="error" />
                            <Chip label="A3" color="error" />
                        </Box>

                        <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.2)" }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: 700,
                                fontSize: 16,
                            }}
                        >
                            <span>TỔNG TIỀN</span>
                            <span style={{ color: "#ff5cf4" }}>240.000đ</span>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
                <Button
                    onClick={handleClose}
                    sx={{ color: "#FF6B6B", fontWeight: 600 }}
                >
                    Hủy
                </Button>
                <NeonButton>Thanh toán</NeonButton>
            </DialogActions>
        </CyberDialog>
    );
}

export default ModalOrders;
