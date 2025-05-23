import { Header } from "@/components/layout/Header";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/Dashbord" && "/Studentdash";

  return (
    <>
      {!isDashboard && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
