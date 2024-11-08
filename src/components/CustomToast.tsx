// CustomToast.tsx
import { Toaster } from "react-hot-toast";

const CustomToast = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#4C1D95",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #7C3AED",
        },
        duration: 4000,
      }}
    />
  );
};

export default CustomToast;
