import { Flip, toast } from "react-toastify";

export function notify(type: string, message: string) {
  if (type === 'error') {
    toast.error(message, {
      transition: Flip,
      theme: 'colored',
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
    });
  }
  if (type === 'success') {
    toast.success(message, {
      transition: Flip,
      theme: 'dark',
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
    });
  }
}