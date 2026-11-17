import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { AppLayout } from "./ui/layouts/AppLayout";
const RoutePosition = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};
export const IsilApplication = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <RoutePosition />
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
