import type { DialogProps } from '@mui/material/Dialog';

import { z as zod } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type ReviewSchemaType = zod.infer<typeof ReviewSchema>;

export const ReviewSchema = zod.object({
  rating: zod.number().min(1, '별점을 선택해 주세요..'),
  review: zod.string().min(1, { message: '리뷰를 작성해 주세요.' }),
});

// ----------------------------------------------------------------------

type Props = DialogProps & {
  onClose: () => void;
};

export function ProductReviewNewForm({ onClose, ...other }: Props) {
  const defaultValues: ReviewSchemaType = {
    rating: 0,
    review: '',
  };

  const methods = useForm<ReviewSchemaType>({
    mode: 'all',
    resolver: zodResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle> 구매 후기 작성 </DialogTitle>

        <DialogContent>
          <div>
            <Typography variant="body2" sx={{ mb: 1 }}>
              이 상품의 품질에 대해 얼마나 만족하시나요?
            </Typography>
            <Field.Rating name="rating" />
          </div>
          <Field.Text name="review" label="리뷰 작성란 *" multiline rows={6} sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            취소
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            등록
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
