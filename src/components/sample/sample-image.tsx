import React from 'react';

import Box from '@mui/material/Box';

type Props = {
  shape: string;
  width?: number;
  height?: number;
};

export const SampleImage = ({ shape, width = 300, height = 300 }: Props) => (
  <Box sx={{ width: '100%' }}>
    {shape == 'horizontal' && (
      <img
        width="100%"
        src={`https://picsum.photos/${width}/${height}`}
        alt="sample"
        loading="lazy"
      />
    )}
    {shape == 'vertical' && (
      <img
        height="100%"
        src={`https://picsum.photos/${width}/${height}`}
        alt="sample"
        loading="lazy"
      />
    )}
  </Box>
);
