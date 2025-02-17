import React from 'react';

import Box from '@mui/material/Box';

type Props = {
  shape: string;
};

export const SampleImage = ({ shape }: Props) => (
  <Box sx={{ width: '100%' }}>
    {shape == 'horizontal' && (
      <img width="100%" src="/images/image_16_1366x768.png" alt="sample" loading="lazy" />
    )}
    {shape == 'vertical' && (
      <img height="100%" src="/images/image_0001_1024x1200.png" alt="sample" loading="lazy" />
    )}
  </Box>
);
