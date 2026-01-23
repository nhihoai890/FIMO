import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { TypeChairsContext } from '../../../contexts/TypeChairProvider';
import { getOjectById } from '../../../utils/functionContants';
import seat from "../../../assets/seat.png"

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

function ShowRoomBooking({ data, handleBooking, showImgUrl }) {
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

    const generateSeatCodes = (data) => {
        let rowCharCode = "A".charCodeAt(0);

        // Group theo row
        const rows = Object.values(
            data.reduce((acc, item) => {
                acc[item.row] ??= [];
                acc[item.row].push(item);
                return acc;
            }, {})
        );

        const result = [];

        for (const rowItems of rows) {
            const chairs = rowItems.filter(i => i.idChair);

            // Nếu row không có ghế → bỏ qua
            if (chairs.length === 0) {
                result.push(...rowItems);
                continue;
            }

            let seatNumber = 1;
            const rowChar = String.fromCharCode(rowCharCode++);

            for (const item of rowItems) {
                if (!item.idChair) {
                    result.push(item);
                } else {
                    result.push({
                        ...item,
                        seatCode: `${rowChar}${seatNumber++}`
                    });
                }
            }
        }

        return result;
    }

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
                {generateSeatCodes(grid.flat())?.map((e, index) => {
                    const rowIndex = Math.floor(index / data.columns);
                    const colIndex = index % data.columns;
                    const key = `${rowIndex}-${colIndex}`;
                    return (
                        <Box key={key} sx={{ position: 'relative' }} onClick={() => handleBooking(e)}>
                            <img
                                src={showImgUrl(e)}
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
                            <div className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-sm font-bold'>{e.seatCode}</div>
                        </Box>
                    );
                })}
            </div>
        </Item>
    );
}

export default ShowRoomBooking;