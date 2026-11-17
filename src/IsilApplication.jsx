import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { AppLayout } from "./ui/layouts/AppLayout";
import { CalculadoraPage } from "./features/calculadora/CalculadoraPage";

const RoutePosition = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title =
      pathname === "/calculadora"
        ? "Calculadora de promedios | ISIL Developers Club"
        : "ISIL Developers Club — Aprende. Crea. Conecta.";
    if (hash)
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
};
export const IsilApplication = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
    <RoutePosition />
    <Routes>
      <Route path="/" element={<AppLayout />} />
      <Route path="/calculadora" element={<CalculadoraPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
