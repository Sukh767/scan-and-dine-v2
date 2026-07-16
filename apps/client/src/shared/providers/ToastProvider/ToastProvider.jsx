import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        className:
          "rounded-none-force glass font-ui border border-border shadow-brand-sm",
        style: {
          borderRadius: "0px", // Force override for Sonner's inline styles
        },
      }}
    />
  );
};
