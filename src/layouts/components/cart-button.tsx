import { m } from 'framer-motion';

import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { paths } from '../../routes/paths';
import { Iconify } from '../../components/iconify';
import { varTap, varHover, transitionTap } from '../../components/animate';

export const CartButton = () => (
    <Tooltip title="장바구니">
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Account button"
      >
        <Link href={paths.product.checkout} color="inherit">
          <Iconify icon="mingcute:shopping-cart-2-line" />
        </Link>{' '}
      </IconButton>
    </Tooltip>
  );
