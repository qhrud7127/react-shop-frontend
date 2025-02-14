import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';

import { Iconify } from '../../components/iconify';
import { varTap, varHover, transitionTap } from '../../components/animate';

export const CartButton = () => (
    <IconButton
      component={m.button}
      whileTap={varTap(0.96)}
      whileHover={varHover(1.04)}
      transition={transitionTap()}
      aria-label="Account button"
    >
      <Iconify icon="mingcute:shopping-cart-2-line" />
    </IconButton>
  );
