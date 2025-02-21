import type { IAddressItem } from 'src/types/common';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewAddressSchemaType = zod.infer<typeof NewAddressSchema>;

export const NewAddressSchema = zod.object({
  city: zod.string().min(1, { message: 'City is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'Country is required!' }), {
    // message for null value
    message: 'Country is required!',
  }),
  // Not required
  primary: zod.boolean(),
  addressType: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (address: IAddressItem) => void;
};

export function AddressNewForm({ open, onClose, onCreate }: Props) {
  const defaultValues: NewAddressSchemaType = {
    name: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    country: '',
    primary: true,
    phoneNumber: '',
    addressType: 'Home',
  };

  const methods = useForm<NewAddressSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (data) => {
    try {
      onCreate({
        name: data.name,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        primary: data.primary,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>배송지 등록</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Field.RadioGroup
              row
              name="addressType"
              options={[
                { label: '집', value: 'Home' },
                { label: '회사', value: 'Office' },
              ]}
            />

            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="name" label="이름" />

              <Field.Phone name="phoneNumber" label="휴대폰 번호" country="KR" />
            </Box>

            <Field.Text name="address" label="주소" />

            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <Field.Text name="city" label="시/군/구" />

              <Field.Text name="state" label="동/읍/면" />

              <Field.Text name="zipCode" label="우편번호" />
            </Box>

            <Field.Checkbox name="primary" label="기본 배송지로 등록" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            취소
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            배송지 목록에 추가
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
