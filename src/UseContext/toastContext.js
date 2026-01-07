import { useState, createContext, useContext } from "react";
import SnackBar from "../Components/snakBar";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleSnakBar(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <>
      <SnackBar open={open} message={message} onClose={() => setOpen(false)} />
      <ToastContext.Provider value={{ handleSnakBar }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
