import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutCartProductList } from './checkout-cart-product-list';

// ----------------------------------------------------------------------

export function CheckoutCart() {
  const {
    loading,
    onChangeStep,
    onApplyDiscount,
    onDeleteCartItem,
    state: checkoutState,
    onChangeItemQuantity,
  } = useCheckoutContext();

  const isCartEmpty = !checkoutState.items.length;

  const renderLoading = () => (
    <Box
      sx={{
        height: 340,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 320 }} />
    </Box>
  );

  const renderEmpty = () => (
    <EmptyContent
      title="장바구니가 비어 있습니다."
      description="장바구니에 담긴 상품이 없습니다."
      imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-cart.svg`}
      sx={{ height: 340 }}
    />
  );

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                장바구니
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp; ({checkoutState.totalItems})
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {loading ? (
            renderLoading()
          ) : (
            <>
              {isCartEmpty ? (
                renderEmpty()
              ) : (
                <CheckoutCartProductList
                  checkoutState={checkoutState}
                  onDeleteCartItem={onDeleteCartItem}
                  onChangeItemQuantity={onChangeItemQuantity}
                />
              )}
            </>
          )}
        </Card>

        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          쇼핑 계속하기
        </Button>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <CheckoutSummary checkoutState={checkoutState} onApplyDiscount={onApplyDiscount} />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isCartEmpty}
          onClick={() => onChangeStep('next')}
        >
          전체 상품 주문
        </Button>
      </Grid>
    </Grid>
  );
}
