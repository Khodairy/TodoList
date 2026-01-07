import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function SnackBar({ open, message, onClose }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    if (onClose) onClose(event, reason);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
