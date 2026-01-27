import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { PiArmchairFill } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import { MdPayments } from "react-icons/md";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient(95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient(95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
        ...theme.applyStyles?.("dark", { backgroundColor: theme.palette.grey[800] }),
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...theme.applyStyles?.("dark", { backgroundColor: theme.palette.grey[700] }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
                boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <PiArmchairFill />,
        2: <IoFastFood />,
        3: <MdPayments />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
};

const steps = ["Booking", "Order Food", "Payment"];

export default function CustomizedSteppers({ activeStep = 0 }) {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                // mặc định
                                "& .MuiStepLabel-label": {
                                    color: "rgba(255,255,255,0.65)",
                                    fontWeight: 500,
                                    transition: "all .2s ease",
                                },

                                // step đang active
                                "& .MuiStepLabel-label.Mui-active": {
                                    color: "#00ffff",
                                    fontWeight: 800,
                                    textShadow: "0 0 10px rgba(0,255,255,0.9)",
                                },

                                // step đã completed
                                "& .MuiStepLabel-label.Mui-completed": {
                                    color: "#9b8fff",
                                    fontWeight: 700,
                                    textShadow: "0 0 10px rgba(155,143,255,0.7)",
                                },
                            }}
                            StepIconComponent={ColorlibStepIcon}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

CustomizedSteppers.propTypes = {
    activeStep: PropTypes.number,
};
