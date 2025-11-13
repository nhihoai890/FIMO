import { Avatar, Box, Button, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { ActorsContext } from '../../../../contexts/ActorProvider';
import { getOjectById } from '../../../../utils/functionContants';
import { PiUserFocusBold } from 'react-icons/pi';

function ShowActors({ data = [] }) {
    const actors = useContext(ActorsContext);
    const renderActors = (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {data.map(id => {
                const actor = getOjectById(actors, id);
                if (!actor) return null;

                return (
                    <Avatar
                        key={id}
                        src={actor.imgUrl}
                        alt={actor.name}
                        sx={{
                            width: 40,
                            height: 40,
                            border: '2px solid #00ffff',
                            boxShadow: '0 0 10px rgba(0,255,255,0.4)',
                            transition: '0.2s',
                            '&:hover': {
                                transform: 'scale(1.15)',
                                boxShadow: '0 0 20px rgba(0,255,255,0.6)'
                            }
                        }}
                    />
                );
            })}
        </Box>
    );
    return (
        <div>
            <Tooltip
                title={renderActors}
                arrow
                enterDelay={200}
                leaveDelay={100}
                componentsProps={{
                    tooltip: {
                        sx: {
                            background: 'rgba(10,10,25,0.95)',
                            border: '1px solid #00ffff',
                            boxShadow: '0 0 20px rgba(0,255,255,0.4)',
                            borderRadius: 2,
                            p: 1
                        }
                    }
                }}
            >
                <Button
                    sx={{
                        color: '#00ffff',
                        background: 'linear-gradient(135deg, #0ff, #f0f)',
                        borderRadius: 2,
                        minWidth: 36,
                        minHeight: 36,
                        p: 0.5,
                        boxShadow: '0 0 10px rgba(0,255,255,0.5)',
                        transition: '0.3s',
                        '&:hover': {
                            color: '#ff00ff',
                            transform: 'scale(1.25)',
                            boxShadow: '0 0 20px rgba(255,0,255,0.7)'
                        }
                    }}
                >
                    <PiUserFocusBold size={22} />
                </Button>
            </Tooltip>
        </div>
    );
}

export default ShowActors;