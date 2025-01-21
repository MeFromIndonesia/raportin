import type { FC } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { router } from "@inertiajs/react";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  message: string;
  method?: "get" | "delete" | "post" | "put" | "patch";
}

const AlertDialog: FC<AlertDialogProps> = ({ open, onClose, url, title, message, method = "post" }) => {
  const handleAction = () => {
    router[method](url);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAction} color="error">Ya</Button>
        <Button onClick={onClose} autoFocus>
          Tidak
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
