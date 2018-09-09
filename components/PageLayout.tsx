import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
export const PageLayout = ({ children }) => (
  <React.Fragment>
    <Header />
    {children}
    <Footer />
  </React.Fragment>
);
