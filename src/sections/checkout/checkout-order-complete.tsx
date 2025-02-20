import type { DialogProps } from '@mui/material/Dialog';
import type { CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import {_mock} from "../../_mock";

// ----------------------------------------------------------------------

type Props = DialogProps & {
  onResetCart: CheckoutContextValue['onResetCart'];
};

export function CheckoutOrderComplete({ onResetCart, ...other }: Props) {
  const orderId = _mock.id(4);
  return (
    <Dialog fullWidth {...other}>
      <Box
        sx={{
          py: 5,
          gap: 5,
          m: 'auto',
          maxWidth: 480,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 0 },
          flexDirection: 'column',
        }}
      >
        {/*<Typography variant="h4">주문 완료</Typography>*/}
        <Typography variant="h4" sx={{ py: 2 }}>
          주문이 완료되었습니다.
        </Typography>

        <img src="/images/complete.png" width={300} />

        <Typography>
          고객님의 주문번호는
          <Link sx={{ px: 1 }} href={paths.product.order(orderId)}>
            {_mock.id(1)}
          </Link>
          입니다.
        </Typography>
        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            component={RouterLink}
            href={paths.dashboard.root}
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onResetCart}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            쇼핑 계속하기
          </Button>
          <Button
            component={RouterLink}
            href={paths.product.order(orderId)}
            size="large"
            variant="contained"
            onClick={onResetCart}
            endIcon={<Iconify icon="eva:arrow-forward-outline" />}
          >
            주문내역 확인
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
