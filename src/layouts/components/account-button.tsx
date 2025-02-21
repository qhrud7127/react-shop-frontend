import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Menu } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Logout, Person } from '@mui/icons-material';

import { varTap, varHover, transitionTap } from 'src/components/animate';

import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

export function AccountButton() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openOrderList = () => {
    router.push(paths.product.order.list);
  };

  return (
    <Box>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Account button"
        onClick={handleClick}
      >
        <Iconify icon="mingcute:user-3-line" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={openOrderList}>
          <Person fontSize="small" sx={{ marginRight: '5px' }} />
          마이페이지
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Logout fontSize="small" sx={{ marginRight: '5px' }} />
          로그아웃
        </MenuItem>
      </Menu>
    </Box>
  );
}
