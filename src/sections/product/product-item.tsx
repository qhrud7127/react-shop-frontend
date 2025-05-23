import React from 'react';
import { toast } from 'sonner';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Card, Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Fab, { fabClasses } from '@mui/material/Fab';

import { Image } from 'src/components/image';

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';
import { RouterLink } from '../../routes/components';
import { fCurrency } from '../../utils/format-number';
import { useCheckoutContext } from '../checkout/context';
import { ColorPreview } from '../../components/color-utils';

import type { IProductItem } from '../../types/product';

type Props = {
  product: IProductItem;
  detailsHref: string;
};

export const ProductItem = ({ product, detailsHref }: Props) => {
  const { onAddToCart } = useCheckoutContext();

  const { id, name, coverUrl, price, colors, available, sizes, priceSale, newLabel, saleLabel } =
    product;

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      coverUrl,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      toast.success('장바구니에 상품을 담았습니다.');
      onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = () =>
    (newLabel.enabled || saleLabel.enabled) && (
      <Box
        sx={{
          gap: 1,
          top: 16,
          zIndex: 9,
          right: 16,
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
        }}
      >
        {newLabel.enabled && (
          <Label variant="filled" color="info">
            {newLabel.content}
          </Label>
        )}
        {saleLabel.enabled && (
          <Label variant="filled" color="error">
            {saleLabel.content}
          </Label>
        )}
      </Box>
    );

  const renderImage = () => (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!available && (
        <Fab
          size="medium"
          color="default"
          onClick={handleAddCart}
          sx={[
            (theme) => ({
              right: 16,
              zIndex: 9,
              bottom: 16,
              opacity: 0,
              position: 'absolute',
              transform: 'scale(0)',
              transition: theme.transitions.create(['opacity', 'transform'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
            }),
          ]}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
        <Image
          alt={name}
          src={coverUrl}
          ratio="1/1"
          sx={{ borderRadius: 1.5, ...(!available && { opacity: 0.48, filter: 'grayscale(1)' }) }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={detailsHref} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Tooltip title="Color">
          <ColorPreview colors={colors} />
        </Tooltip>

        <Box sx={{ gap: 0.5, display: 'flex', typography: 'subtitle1' }}>
          {priceSale && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span">{fCurrency(price)}</Box>
        </Box>
      </Box>
    </Stack>
  );
  return (
    <Card
      sx={{
        '&:hover': {
          [`& .${fabClasses.root}`]: { opacity: 1, transform: 'scale(1)' },
        },
      }}
    >
      {renderLabels()}
      {renderImage()}
      {renderContent()}
    </Card>
  );
};
