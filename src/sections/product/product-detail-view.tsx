import type { Theme, SxProps } from '@mui/material/styles';

import React from 'react';
import { useTabs } from 'minimal-shared';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../routes/paths';
import { CustomBreadcrumbs } from '../../components/custom-breadcrumbs';
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

export function ProductDetailView({ title = '', sx }: Props) {
  const tabs = useTabs('description');
  const gridLayoutView = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>{productDetailCarousel()}</Grid>
        <Grid size={{ xs: 12, md: 6 }}>{productDetailInfo()}</Grid>
        <Grid size={{ xs: 12, md: 12 }}>{productDetail()}</Grid>
      </Grid>
    </Box>
  );
  const productDetail = () => (
    <Card>
      <Tabs
        value={tabs.value}
        onChange={tabs.onChange}
        sx={[
          (theme) => ({
            px: 3,
            boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }),
        ]}
      >
        {[
          { value: 'description', label: 'Description' },
          { value: 'reviews', label: `Reviews ()` },
        ].map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {/*   {tabs.value === 'description' && (
        <ProductDetailsDescription description={product?.description ?? ''} />
      )}

      {tabs.value === 'reviews' && (
        <ProductDetailsReview
          ratings={product?.ratings ?? []}
          reviews={product?.reviews ?? []}
          totalRatings={product?.totalRatings ?? 0}
          totalReviews={product?.totalReviews ?? 0}
        />
      )}*/}
    </Card>
  );
  const productDetailInfo = () => (
    <Box>
      <Typography variant="h4" sx={{ margin: '10px' }}>
        태그호이어 | TAG HEUER
      </Typography>
      <Typography variant="h4" sx={{ margin: '10px' }}>
        까레라 (남성용)
      </Typography>
      <Typography variant="h4" sx={{ margin: '10px' }}>
        $6,800 (9,863,400원)
      </Typography>
      <Stack spacing={2} direction="row" flexGrow={1}>
        <Button variant="outlined">장바구니</Button>
        <Button color="primary" variant="contained">
          구매하기
        </Button>
      </Stack>
    </Box>
  );

  const productDetailCarousel = () => (
    <Box
      sx={[
        (theme) => ({
          width: 1,
          height: 600,
          borderRadius: 2,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SingleCarousel settings={singleSettings} />
    </Box>
  );

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={title}
        links={[{ name: '홈', href: paths.dashboard.root }, { name: '신발' }, { name: '단화' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {gridLayoutView()}
    </DashboardContent>
  );
}
