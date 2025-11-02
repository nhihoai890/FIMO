import React, { useContext } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions,
    Card, CardContent, CardMedia, Grid, Typography
} from '@mui/material';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';

function ModalChooseTypeChair({ open, handleClose, onSelectType, selectSeat }) {
    const listChair = useContext(TypeChairsContext);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    background: "radial-gradient(circle at top left, #0a0a0f, #000)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    boxShadow: "0 0 20px rgba(0,255,255,0.15)",
                    color: "#fff",
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Choose Type Of Chair
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    {listChair?.map((type) => (
                        <Grid item xs={6} sm={4} key={type.id || type.name}>
                            <Card
                                onClick={() => {
                                    onSelectType(type);
                                    handleClose();
                                }}
                                sx={{
                                    background:
                                        selectSeat?.idChair === type.id
                                            ? "linear-gradient(90deg, #00bcd4, #002b5b)"
                                            : "linear-gradient(145deg, rgba(20,20,30,1) 0%, rgba(10,10,20,1) 100%)",
                                    color: "#fff",
                                    cursor: "pointer",
                                    border: "1px solid rgba(0,255,255,0.3)",
                                    boxShadow: "0 0 10px rgba(0,255,255,0.2)",
                                    borderRadius: 3,
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0 0 20px rgba(255,0,255,0.5)",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="80"
                                    image={type.imgUrl}
                                    alt={type.name}
                                    sx={{ objectFit: "contain", p: 1 }}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography variant="subtitle1" sx={{ color: "#00ffff" }}>
                                        {type.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                                        {type.price.toLocaleString()} đ
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChooseTypeChair;
