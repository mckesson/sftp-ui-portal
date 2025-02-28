import { ReactNode } from "react";
import Header from "../shared/Header";
import SideNav from "../shared/SideNav";
import Footer from "./Footer";

interface SideNavProps {
  children: ReactNode;
}

const Container = ({ children }: SideNavProps) => {
  return (
    <>
      <Header />
      <SideNav>{children}</SideNav>
      <Footer />
    </>
  );
};

export default Container;
