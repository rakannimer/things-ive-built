import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { AuthAction } from "./AuthAction";
import Link from "next/link";
import { Separator } from "./Separator";

export const Header = () => (
  <React.Fragment>
    <CssBaseline />
    <AppBar position="static" color="default" data-testid="header">
      <Toolbar>
        <Link href={{ pathname: "/" }} prefetch>
          <div style={{ flexGrow: 1 }}>
            <Button>
              <Typography variant="title">Things I've Built</Typography>
            </Button>
          </div>
        </Link>
        <Button variant="outlined" data-testid="explore">
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={"/explore"}
          >
            Explore
          </a>
        </Button>
        <Separator horizontal space={4} />
        <Link href={"/add-thing"}>
          <Button variant="outlined" data-testid="explore">
            Add thing
          </Button>
        </Link>
        <IfFirebaseAuthed>
          {({ user }) => {
            return (
              <Link
                href={{ pathname: "/things-list", query: { uid: user.uid } }}
                prefetch
              >
                <Button>My Things</Button>
              </Link>
            );
          }}
        </IfFirebaseAuthed>
        <AuthAction />
      </Toolbar>
    </AppBar>
  </React.Fragment>
);
