import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Divider,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FoodsContext } from '../../../../contexts/FoodProvider';
import { ItemFoodsContext } from '../../../../contexts/ItemFoodsProvider';

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

function ModalFoodOrders({ open, booking, onBack, onClose }) {
     const foods = useContext(FoodsContext);
     const itemFoods = useContext(ItemFoodsContext);
    return (
        <>
            <CyberDialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <CyberTitle>ĐẶT ĐỒ ĂN</CyberTitle>
                <DialogContent sx={{ mt: 2 }}>
                    
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
                    <Button onClick={onBack} sx={{ color: "#00ffff", fontWeight: 600 }}>
                        Quay lại
                    </Button>

                    <NeonButton >
                        Xác nhận
                    </NeonButton>
                </DialogActions>
            </CyberDialog>
        </>
    );
}

export default ModalFoodOrders;