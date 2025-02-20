import type { IOrderDelivery } from 'src/types/order';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  delivery?: IOrderDelivery;
};

export function OrderDetailsDelivery({ delivery }: Props) {
  return (
    <>
      <CardHeader
        title="배송 정보"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            택배사
          </Box>

          {delivery?.shipBy}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            택배 유형
          </Box>

          {delivery?.speedy}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            송장 번호
          </Box>

          <Link underline="always" color="inherit">
            {delivery?.trackingNumber}
          </Link>
        </Box>
      </Stack>
    </>
  );
}
