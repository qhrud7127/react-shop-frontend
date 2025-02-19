import type {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
  ICheckoutDeliveryOption,
} from 'src/types/checkout';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import {fCurrency} from "../../utils/format-number";
import { CheckoutSummary } from './checkout-summary';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutBillingInfo } from './checkout-billing-info';
import { CheckoutPaymentMethods } from './checkout-payment-methods';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  { id: 1, value: 3000, label: '일반 배송', description: '3-5일 소요' },
  { id: 2, value: 5000, label: '로켓 배송', description: '내일 도착' },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'kakaopay',
    label: '카카오페이',
    description: '카카오톡 앱을 설치한 후, 최초 1회 카드정보를 등록하셔야 사용 가능합니다.',
  },
  {
    value: 'naverpay',
    label: '네이버페이',
    description: '네이버에 회원가입 후, 최초 1회 카드 및 계좌 정보를 등록하셔야 사용 가능합니다.',
  },
  { value: 'cash', label: '무통장입금', description: '가상 계좌로 입금합니다.' },
];

const CARD_OPTIONS: ICheckoutCardOption[] = [
  { value: 'visa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'visa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'mastercard', label: '**** **** **** 4545 - Cole Armstrong' },
];

// ----------------------------------------------------------------------

export type PaymentSchemaType = zod.infer<typeof PaymentSchema>;

export const PaymentSchema = zod.object({
  payment: zod.string().min(1, { message: '결제 방식을 선택하세요.' }),
  delivery: zod.number(),
});

// ----------------------------------------------------------------------

export function CheckoutPayment() {
  const {
    loading,
    onResetCart,
    onChangeStep,
    onApplyShipping,
    state: checkoutState,
  } = useCheckoutContext();

  const defaultValues: PaymentSchemaType = {
    delivery: checkoutState.shipping,
    payment: '',
  };

  const methods = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      onResetCart();
      onChangeStep('next');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutDelivery
            name="delivery"
            onApplyShipping={onApplyShipping}
            options={DELIVERY_OPTIONS}
          />

          <CheckoutPaymentMethods
            name="payment"
            options={{ cards: CARD_OPTIONS, payments: PAYMENT_OPTIONS }}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={() => onChangeStep('back')}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            이전
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutBillingInfo
            loading={loading}
            onChangeStep={onChangeStep}
            checkoutState={checkoutState}
          />

          <CheckoutSummary checkoutState={checkoutState} onEdit={() => onChangeStep('go', 0)} />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {`${fCurrency(checkoutState.total)} 결제하기`}
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}
