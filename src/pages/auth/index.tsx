import { motion } from "motion/react";
import { AuthForm } from "./ui/auth-form";
import { useNavigate } from "react-router";

export function AuthPage() {
  const navigate = useNavigate();

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
