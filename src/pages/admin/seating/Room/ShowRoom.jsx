import { Box, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { TypeChairsContext } from '../../../../contexts/TypeChairProvider';
import { getOjectById } from '../../../../utils/functionContants';
import seat from "../../../../assets/seat.png";
import styled from '@emotion/styled';

const Item = styled(Paper)(() => ({
    background: 'linear-gradient(145deg, rgba(20,20,30,1) 0%, rgba(10,10,20,1) 100%)',
    borderRadius: 16,
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 0 20px rgba(0,255,255,0.1), inset 0 0 10px rgba(0,255,255,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 0 25px rgba(0,255,255,0.25), inset 0 0 12px rgba(0,255,255,0.1)',
    },
}));

function ShowRoom({ data }) {
    const [grid, setGrid] = useState([]);
    const typeChairs = useContext(TypeChairsContext);
    useEffect(() => {
        if (!data) return;
        const newGrid = Array.from({ length: Number(data.rows) }, (_, rowIndex) =>
            Array.from({ length: Number(data.columns) }, (_, colIndex) => {
                // tìm ghế đã có trong listChair
                const found = data.listChair?.find(
                    (chair) => chair.row === rowIndex && chair.col === colIndex
                );
                // nếu có thì trả về ghế đó, không thì trả về ô trống
                return found || { row: rowIndex, col: colIndex, idChair: "" };
            })
        );
        setGrid(newGrid);
    }, [data]);
    return (
        <Item sx={{ display: "flex" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${data.rows}, 1fr)`,
                    gap: '10px',
                    justifyContent: 'center',
                }}
            >
                {grid.flat().map((e, index) => {
                    const rowIndex = Math.floor(index / data.columns);
                    const colIndex = index % data.columns;
                    const key = `${rowIndex}-${colIndex}`;

                    return (
                        <Box key={key} sx={{ position: 'relative' }}>
                            <img
                                src={getOjectById(typeChairs, e.idChair)?.imgUrl || seat}
                                alt="#"
                                className={`cursor-pointer ${getOjectById(typeChairs, e.idChair)?.imgUrl ? "" : "opacity-0"}`}
                                width={40}
                                height={40}
                                style={{
                                    filter: getOjectById(typeChairs, e.idChair)
                                        ? 'drop-shadow(0 0 8px #ff00ff)'
                                        : 'drop-shadow(0 0 8px #00ffff)',
                                    transition: '0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.filter = 'drop-shadow(0 0 12px #ff00ff) brightness(1.2)')}
                                onMouseOut={(e) => (e.currentTarget.style.filter = 'drop-shadow(0 0 8px #00ffff)')}
                            />
                        </Box>
                    );
                })}
            </div>
        </Item>
    );
}

export default ShowRoom;