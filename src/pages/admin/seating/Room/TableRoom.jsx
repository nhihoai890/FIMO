import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RoomsContext } from '../../../../contexts/RoomProvider';
import { CinemaLocationsContext } from '../../../../contexts/CinemaLocationProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import { Box, Button } from '@mui/material';
import { FaPen, FaTrash } from 'react-icons/fa';

function TableRoom(props) {
    const rooms = useContext(RoomsContext);
    const cinemaLocation = useContext(CinemaLocationsContext);
    const typeChair = useContext(TypeChairsContext);

 function ShowTypeChairs({ data }) {
     console.log("data chair list:", data);
     console.log("typeChair context:", typeChair);

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {data.map(e => (
                <img
                    key={e}
                    src={getOjectById(typeChair, e)?.imgUrl}
                    alt=""
                    width={30}
                    height={30}
                    
                />
            ))}
        </Box>
    );
}



    return (
        <div>
            <TableContainer component={Paper} sx={{
                mt: 3,
                p: 2,
                background: "linear-gradient(145deg, #0a0a0f, #000)",
                border: "1px solid rgba(0,255,255,0.1)",
                borderRadius: 3,
                boxShadow: "0 0 25px rgba(0,255,255,0.08)",
                overflow: "hidden",
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>

                        <TableRow
                            sx={{
                                background: "linear-gradient(90deg, #00ffff 0%, #7b2cbf 50%, #ff00ff 100%)",
                                boxShadow: "0 0 10px rgba(255,0,255,0.3)",
                            }}
                        >
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>#</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Cinema</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Rows</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }} >Columns</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }}>List Chair</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((r, index) => (

                            <TableRow
                                key={r.id}

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ color: "#00ffff" }} >{r.name}</TableCell>
                                <TableCell sx={{ color: "#fff", fontWeight: 500 }} >{getOjectById(cinemaLocation, r.idCinemaLocation)?.name}</TableCell>
                                <TableCell sx={{ color: "#ccc" }} >{r.rows}</TableCell>
                                <TableCell sx={{ color: "#00eaff" }} >{r.columns}</TableCell>
                                <TableCell ><ShowTypeChairs data={r.list_chair} /></TableCell>
                                <TableCell align="center">
                                    <Button

                                        variant="contained"
                                        size="small"
                                        sx={{
                                            mr: 1,
                                            borderRadius: 2,
                                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                            '&:hover': { background: 'linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)' },
                                        }}
                                    >
                                        <FaPen />
                                    </Button>
                                    <Button
                                        sx={{
                                            background: 'linear-gradient(90deg, #ff4081, #d500f9)',
                                            boxShadow: '0 0 10px rgba(255,64,129,0.4)',
                                            transition: '0.3s',
                                            '&:hover': {
                                                background: 'linear-gradient(90deg, #d500f9, #ff4081)',
                                                boxShadow: '0 0 20px rgba(255,64,129,0.6)',
                                                transform: 'scale(1.05)',
                                            },
                                        }}

                                        variant="contained"
                                        size="small"
                                    >
                                        <FaTrash />
                                    </Button>
                                </TableCell>

                            </TableRow>

                        ))}



                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableRoom;