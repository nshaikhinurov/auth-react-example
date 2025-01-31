import { AnimatePresence } from "motion/react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { AuthPage } from "~/pages/auth";
import { ProfilePage } from "~/pages/profile";

export function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* /auth — страница входа/регистрации */}
        <Route path="/auth" element={<AuthPage />} />

        {/* /profile — страница профиля */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Корневой путь */}
        <Route path="/" element={<Navigate to="/profile" />} />

        {/* Обработка несуществующих маршрутов */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </AnimatePresence>
  );
}
