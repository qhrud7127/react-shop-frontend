import type { Theme, SxProps } from '@mui/material/styles';

import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Stack, Rating, Pagination } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../routes/paths';
import { CustomBreadcrumbs } from '../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  sx?: SxProps<Theme>;
};

export function ProductListView({ title = '', sx }: Props) {
  const gridLayoutView = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 6, md: 12 }}>
        {Array.from(Array(24)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 2, md: 3 }}>
            {productItem(index + 1)}
          </Grid>
        ))}
      </Grid>
      <Stack alignItems="center" sx={{ my: 4 }}>
        <Pagination count={10} />
      </Stack>
    </Box>
  );
  const productItem = (index: number) => {
    const path = `/assets/images/mock/m-product/product-${index}.webp`
    return (
      <Link href={paths.product.details(index)} color="inherit">
        <Stack
          sx={[
            (theme) => ({
              mt: 3,
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
          <img src={path} alt="sample" loading="lazy" style={{}} />

          <Typography variant="subtitle1" sx={{fontWeight: 'bold',  my:1}}>
            태그호이어
          </Typography>
          <Typography variant="body2">까레라 (남성용)</Typography>
          <Rating name="read-only" value={4.5} readOnly precision={0.5} sx={{my:1}}/>
          <Typography variant="h6" sx={{fontWeight: 'bold'}}>
            59,900원
          </Typography>
        </Stack>
      </Link>
    )
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={title}
        links={[{ name: '홈', href: paths.dashboard.root }, { name: '상품' }, { name: '베스트' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {gridLayoutView()}
    </DashboardContent>
  );
}
