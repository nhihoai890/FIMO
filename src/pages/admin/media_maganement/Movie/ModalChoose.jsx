import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function ModalChoose({ handleCloseChoose, openChoose, dataChoose, type, handleClickChoose, getDataChoose }) {

    const [search, setSearch] = useState("");

    const check = (id) => getDataChoose.includes(id);
  
    const filteredData = dataChoose.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>
            <BootstrapDialog
                onClose={handleCloseChoose}
                aria-labelledby="customized-dialog-title"
                open={openChoose}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2 }}
                    id="customized-dialog-title"
                    className="flex items-center gap-10 justify-between"
                >
                    Choose {type}
                    <TextField
                        size="small"
                        placeholder="Enter keywords..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </DialogTitle>

                <DialogContent dividers>
                    <div className="flex items-center gap-3 flex-wrap" >
                        {filteredData.map((dt) => {
                            return (
                                type == "actors" ? <div onClick={() => handleClickChoose(dt.id, type)}>
                                    <img
                                        src={dt.imgUrl}
                                        alt={dt.name}
                                        className={`w-15 h-15 rounded-full object-cover  ${check(dt.id) ? "border border-3 border-blue-700" : ""}`}
                                    />
                                    <p className={`mt-2 text-xs font-semibold text-center truncate w-12 cursor-pointer transition-colors duration-150 ${check(dt.id) ? "text-blue-700" : "text-gray-800 hover:text-blue-500"}`}>{dt.name}</p>
                                </div> : <button onClick={() => handleClickChoose(dt.id, type)} className={`p-2 text-white ${check(dt.id) ? "bg-amber-300" : "bg-gray-500"}`}>{dt.name}</button>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseChoose}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>

    );
}

export default ModalChoose;