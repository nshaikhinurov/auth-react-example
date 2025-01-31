import { motion } from "motion/react";
import { AuthForm } from "./ui/auth-form";
import { useNavigate } from "react-router";

export function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-muted p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthForm
          onSuccess={() => {
            navigate("/profile");
          }}
        />
      </motion.div>
    </div>
  );
}
