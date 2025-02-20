import type { IOrderCustomer } from 'src/types/order';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  customer?: IOrderCustomer;
};

export function OrderDetailsCustomer({ customer }: Props) {
  return (
    <>
      <CardHeader
        title="주문자 정보"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box sx={{ p: 3, display: 'flex' }}>
        <Avatar
          alt={customer?.name}
          src={customer?.avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} sx={{ typography: 'body2', alignItems: 'flex-start' }}>
          <Typography variant="subtitle2">{customer?.name}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
        </Stack>
      </Box>
    </>
  );
}
