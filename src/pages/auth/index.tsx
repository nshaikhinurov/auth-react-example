import { motion } from "motion/react";
import { AuthForm } from "./ui/auth-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useToast } from "~/shared/lib/use-toast";

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.from === "/profile" && location.state.toastProps) {
      toast(location.state.toastProps);
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -150 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 150 }}
      transition={{ duration: 0.5 }}
    >
      <AuthForm
        onSuccess={() => {
          navigate("/profile");
        }}
      />
    </motion.div>
  );
}
