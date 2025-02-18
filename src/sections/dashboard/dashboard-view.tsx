import type { Theme, SxProps } from '@mui/material/styles';

import React from "react";
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { MultiCarousel } from '../../components/carousel/multi-carousel';
import { SingleCarousel } from '../../components/carousel/single-carousel';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  sx?: SxProps<Theme>;
};

const singleSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const multipleSettings = {
  dots: true,
  infinite: true,
  centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

export function DashboardView({ title = '', sx }: Props) {
  const gridLayoutView = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 12 }}>
          <SingleCarousel settings={singleSettings} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h4" sx={{ margin: '10px' }}>
            고객님을 위한 추천상품
          </Typography>
          <MultiCarousel settings={multipleSettings} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <img height="100%" src="/images/image_0997_2550x800.png" alt="sample" loading="lazy" />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h4" sx={{ margin: '10px' }}>
            MD&apos;s Pick
          </Typography>
          <MultiCarousel settings={multipleSettings} />
        </Grid>
      </Grid>
    </Box>
    /*https://mui.com/material-ui/react-grid2/*/
  );
  const blankContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>
      {gridLayoutView()}
    </DashboardContent>
  );
}
