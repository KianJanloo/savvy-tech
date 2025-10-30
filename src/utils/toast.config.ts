import { toast, type ToastOptions } from "react-toastify";

const customToast = (content: string, options?: ToastOptions) => {
  const theme = document.documentElement.classList.value;

  toast(content, {
    ...options,
    position: "top-center",
    closeButton: false,
    icon: false,
    style: {
      background: theme === "dark" ? "#111827" : "#FFFFFF",
      color: theme === "dark" ? "white" : "black",
    },
  });
};

export { customToast };
