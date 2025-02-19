import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from '../../routes/paths';
import {RouterLink} from "../../routes/components";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MoveToCartPopup({ open, onClose }: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>장바구니 담기</DialogTitle>

      <DialogContent dividers>
        <Typography sx={{py:3}} variant="body1">장바구니에 상품이 정상적으로 담겼습니다.</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          쇼핑 계속하기
        </Button>

        <Button component={RouterLink} variant="contained" href={paths.product.checkout} sx={{ ml: 2 }} >
          장바구니로 이동
        </Button>
      </DialogActions>
    </Dialog>
  );
}
