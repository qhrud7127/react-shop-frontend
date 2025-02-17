import type { Theme, SxProps } from '@mui/material/styles';

import React from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  sx?: SxProps<Theme>;
};

export function ProductListView({ title = '', sx }: Props) {
  const gridLayoutView = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ margin: '10px' }}>
        베스트
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(30)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            {blankContent(index + 1)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  const blankContent = (index: number) => (
    <Box
      sx={[
        (theme) => ({
          mt: 5,
          width: 1,
          borderRadius: 1,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          display: 'flex',
          flexDirection: 'column',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          background: 'url(../images/ico_bedge01.png) 0 0/cover no-repeat',
          zIndex: 11,
          position: 'absolute',
          width: '35px',
          height: '35px',
          fontSize: '18px',
          color: '#fff',
          lineHeight: 1.7,
          textAlign: 'center',
        }}
      >
        {index}
      </Box>
      <img
        src="/images/image_0001_1024x1200.png"
        alt="sample"
        loading="lazy"
        style={{ padding: '0 10px' }}
      />
      {/*  <Typography variant="body1" sx={{ margin: '10px', fontWeight: 'bold' }}>
        59,900원
      </Typography>*/}
      <Typography variant="subtitle1" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
        태그호이어
      </Typography>
      <Typography variant="body2" sx={{ marginLeft: '10px' }}>
        까레라 (남성용)
      </Typography>
      <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
        59,900원
      </Typography>
    </Box>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>
      {gridLayoutView()}
    </DashboardContent>
  );
}
