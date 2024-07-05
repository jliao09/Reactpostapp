import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { FooterSocial } from "./FooterSocial";
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <FooterSocial />
    </div>
  );
};

export default Layout;
