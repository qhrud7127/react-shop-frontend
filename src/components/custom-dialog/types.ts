import type { ReactNode } from 'react';
import type { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: () => void;
  title: ReactNode;
  action: ReactNode;
  content?: ReactNode;
};
