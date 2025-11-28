import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { addDocument } from '../../../services/firebaseService';
import { AccountContext } from '../../../contexts/AccountProvider';
import { ROLES } from '../../../utils/Contants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const inner = { name: "", email: "", password: "", confirm: "", role: ROLES.USER };

function Register({ openRegister, handCloseRegister, handleClickOpen }) {
    const [register, setRegister] = useState(inner);
    const [error, setError] = useState(inner);
    const accounts = useContext(AccountContext);

    const handleChange = (e) => setRegister({ ...register, [e.target.name]: e.target.value });

    const handleCloseModal = () => {
        setRegister(inner);
        setError(inner);
        handCloseRegister();
    };

    const validation = () => {
        const newError = {};
        newError.name = register.name ? "" : "Vui lòng nhập họ tên";

        const check = accounts.some(e => e.email === register.email);
        newError.email = register.email ? (check ? "Email đã được sử dụng" : "") : "Vui lòng nhập email";

        newError.password = register.password ? "" : "Vui lòng nhập password";
        newError.confirm = register.confirm === register.password ? "" : "Mật khẩu không trùng";

        setError(newError);
        return Object.values(newError).some(e => e !== "");
    };

    const handleSubmit = async () => {
        if (validation()) return;

        const { confirm, ...newAccount } = register;
        await addDocument("accounts", newAccount);
        setRegister(inner);
        handCloseRegister();
    };

    return (
        <Dialog
            open={openRegister}
            slots={{ transition: Transition }}
            keepMounted
            onClose={handleCloseModal}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    background: "rgba(30,30,30,0.55)", 
                    backdropFilter: "blur(25px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    width: { xs: "90vw", sm: "50vw" },
                    p: 3,
                    color: "white"
                }
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "800",
                    background: "linear-gradient(to right, #ff2e63, #ff7f50, #ffd662)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mb: 2
                }}
            >
                REGISTER
            </DialogTitle>

            <DialogContent>
                <form>
                    {/* Name */}
                    <TextField
                        fullWidth
                        label="User Name"
                        name="name"
                        value={register.name}
                        error={!!error.name}
                        helperText={error.name}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.15)",
                                color: "white",
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" }
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
                        }}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={register.email}
                        error={!!error.email}
                        helperText={error.email}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.15)",
                                color: "white",
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" }
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
                        }}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={register.password}
                        error={!!error.password}
                        helperText={error.password}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.15)",
                                color: "white",
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" }
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
                        }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirm"
                        type="password"
                        value={register.confirm}
                        error={!!error.confirm}
                        helperText={error.confirm}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.15)",
                                color: "white",
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" }
                            },
                            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
                        }}
                    />

                    {/* Register Button */}
                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            py: 1.5,
                            mb: 2,
                            borderRadius: "12px",
                            fontSize: "16px",
                            fontWeight: "700",
                            background: "linear-gradient(to right, #ff2e63, #ff7f50, #ffd662)",
                            color: "white",
                            boxShadow: "0 4px 14px rgba(255,100,140,0.4)",
                            "&:hover": {
                                background: "linear-gradient(to right, #ff1e52, #ff6f40, #ffca52)"
                            }
                        }}
                    >
                        Register
                    </Button>

                    {/* Login link */}
                    <div className="mt-2 text-center text-sm">
                        <span>Đã có tài khoản? </span>
                        <button
                            type="button"
                            onClick={handleClickOpen}
                            className="text-pink-500 underline font-medium"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Register;
