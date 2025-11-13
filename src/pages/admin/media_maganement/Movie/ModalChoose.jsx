import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(135deg, #0a0f1a 0%, #141b2d 100%)',
    color: '#e0e6ff',
    borderRadius: '16px',
    border: '1px solid rgba(0,255,255,0.2)',
    boxShadow: '0 0 25px rgba(0,255,255,0.2)',
    transition: 'all 0.3s ease-in-out',
    minWidth: '480px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(255,255,255,0.1)',
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
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#00eaff',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
          id="customized-dialog-title"
          className="flex items-center gap-10 justify-between"
        >
          Choose {type}
          <TextField
            size="small"
            placeholder="Enter keywords..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              input: {
                color: '#e0e6ff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0,255,255,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#00eaff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00eaff',
                  boxShadow: '0 0 8px #00eaff',
                },
              },
            }}
          />
        </DialogTitle>

        <DialogContent dividers>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {filteredData.map((dt) => {
              return (
                type === "actors" ? (
                  <div
                    key={dt.id}
                    onClick={() => handleClickChoose(dt.id, type)}
                    className="cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={dt.imgUrl}
                      alt={dt.name}
                      className={`w-20 h-20 rounded-full object-cover transition-all duration-300 ${
                        check(dt.id)
                          ? "border-2 border-cyan-400 shadow-[0_0_15px_#00eaff]"
                          : "border border-gray-600 hover:border-cyan-400"
                      }`}
                    />
                    <p
                      className={`mt-2 text-xs font-semibold text-center truncate w-14 transition-colors duration-150 ${
                        check(dt.id)
                          ? "text-cyan-300"
                          : "text-gray-400 hover:text-cyan-300"
                      }`}
                    >
                      {dt.name}
                    </p>
                  </div>
                ) : (
                  <button
                    key={dt.id}
                    onClick={() => handleClickChoose(dt.id, type)}
                    className={`p-2 rounded-md font-semibold text-xs transition-all duration-300 ${
                      check(dt.id)
                        ? "bg-cyan-500 text-black shadow-[0_0_10px_#00eaff]"
                        : "bg-gray-700 text-gray-300 hover:bg-cyan-600 hover:text-black"
                    }`}
                  >
                    {dt.name}
                  </button>
                )
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseChoose}
            sx={{
              color: '#00eaff',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(0,255,255,0.1)',
                boxShadow: '0 0 10px #00eaff',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ModalChoose;
