import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Whatsapp />
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
