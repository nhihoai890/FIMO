import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { getOjectById } from '../../../../utils/functionContants';
import { CategoriesContext } from '../../../../contexts/CategoryProvider';

function ShowCategories({data}) {
    const categories = useContext(CategoriesContext);
    return (
        <div>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {data.map(e => (
          <Box
            key={e}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              background: 'rgba(126,87,194,0.15)',
              color: '#E0E7FF',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {getOjectById(categories, e)?.name}
          </Box>
        ))}
      </Box>
        </div>
    );
}

export default ShowCategories;