// components/admin/ConfirmDialog.tsx
"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: (confirmed: boolean) => void;
}

export default function ConfirmDialog({
  open,
  title = "تأیید",
  message = "آیا مطمئن هستید؟",
  confirmText = "تأیید",
  cancelText = "انصراف",
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={() => onClose(false)} dir="rtl">
      <DialogTitle>{title}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={() => onClose(false)}>{cancelText}</Button>
        <Button color="error" variant="contained" onClick={() => onClose(true)}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
