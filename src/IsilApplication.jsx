import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { AppLayout } from "./ui/layouts/AppLayout";
import { CalculadoraPage } from "./features/calculadora/CalculadoraPage";
import { isDevelopment } from "./utils/isDevelopment";
const RoutePosition = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};
export const IsilApplication = () => {
  const isDev = isDevelopment() ? "/" : "/landing-page";
  return (
    <>
      <BrowserRouter basename={isDev}>
        <RoutePosition />
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/calculadora" element={<CalculadoraPage />} />
          <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
