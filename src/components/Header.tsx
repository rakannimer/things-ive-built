import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import { AuthAction } from "./AuthAction";

export const Header = () => (
  <React.Fragment>
    <CssBaseline />
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
          Things I've Built
        </Typography>
        <AuthAction />
      </Toolbar>
    </AppBar>
  </React.Fragment>
);
