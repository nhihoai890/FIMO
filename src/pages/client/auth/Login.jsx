import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { AccountContext } from '../../../contexts/AccountProvider';
import { useNotification } from '../../../contexts/NotificationProvider';
import { AuthContext } from '../../../contexts/AuthsProvider';
import Divider from '@mui/material/Divider';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../config/firebaseConfig';
import { addDocument } from '../../../services/firebaseService';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const inner = { email: "", password: "" }
function Login({ open, handleClose, handleClickOpenRegister }) {
    // all accounts 
    const accounts = useContext(AccountContext);
    const [login, setLogin] = useState(inner);
    const showNotification = useNotification();
    const { loginContext } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setLogin(inner);
        handleClose();
    }

    // ham  khi nut login => dung ham find kiem tra acc login => log => dong modal login
    const handleLogin = () => {
        const user = accounts.find((acc) => acc.email === login.email && acc.password === login.password)
        if (user) {
            showNotification("Dang nhap thanh cong", "success");
            loginContext(user);
            handleClose();
        } else {
            showNotification("ten tai khoan ko ton tai", "error");
        }
    }

    useEffect(() => {
        if (open) {
            setLogin(inner);
        }
    }, [open])

    // Google sign-in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const existingCustomer = accounts.find(customer => customer.email === user.email);
            let loggedInCustomer;
              console.log(existingCustomer);
              
            if (!existingCustomer) {
                      console.log("fsdfvdg");
                const newCustomer = {
                    name: user.displayName,
                    imgUrl: user.photoURL,
                    role: ROLES.USER,
                };
          
                
                await addDocument('accounts', newCustomer);
                loggedInCustomer = newCustomer;
            } else {
                loggedInCustomer = existingCustomer;
            }
            loginContext(loggedInCustomer);
            showNotification('Đăng nhập thành công!', "success");
            handleClose();
            navigate("/");
        } catch (error) {
            showNotification('Đăng nhập thất bại. Vui lòng thử lại.', "error");
        }
    };
    return (
        <Dialog
            open={open}
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
                LOGIN
            </DialogTitle>

            <DialogContent>
                <form>
                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={login.email}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mt: 1,
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
                        value={login.password}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 1,
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

                    {/* Forgot password */}
                    <div className="text-right mb-3">
                        <button
                            type="button"
                            className="text-blue-400 text-sm underline font-medium"
                        >
                            Quên mật khẩu?
                        </button>
                    </div>

                    {/* Login button */}
                    <Button
                        fullWidth
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
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    {/* Divider */}
                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }}>Or</Divider>

                    {/* Login with Google */}
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FcGoogle />}

                        sx={{
                            py: 1.5,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "white",
                            "&:hover": { borderColor: "rgba(255,255,255,0.6)" }
                        }}
                        onClick={signInWithGoogle}
                    >
                        Login with Google
                    </Button>

                    {/* Register link */}
                    <div className="mt-4 text-center text-sm">
                        <span>Bạn chưa có tài khoản? </span>
                        <button
                            type="button"
                            onClick={handleClickOpenRegister}
                            className="text-pink-500 underline font-medium"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );

}

export default Login;
