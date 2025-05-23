import type { IOrderPayment } from 'src/types/order';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  payment?: IOrderPayment;
};

export function OrderDetailsPayment({ payment }: Props) {
  return (
    <>
      <CardHeader
        title="결제 정보"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box
        sx={{
          p: 3,
          gap: 0.5,
          display: 'flex',
          typography: 'body2',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {payment?.cardType}
        <img src="/images/payment_icon_yellow_medium.png" alt="kakaopay" width={60}/>
      </Box>
    </>
  );
}
