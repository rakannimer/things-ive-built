import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import { styles } from "../utils/styles";

export const HeroActions = withStyles(styles)(({ classes }) => (
  <div className={classes.heroButtons}>
    <Grid container spacing={10} justify="center">
      <Grid item>
        <Link href={{ pathname: "/add-thing" }}>
          <Button variant="contained" color="primary" data-testid="add-thing">
            Add a thing you've built.
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" data-testid="explore">
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={"/explore"}
          >
            Explore things built by others.
          </a>
        </Button>
      </Grid>
    </Grid>
  </div>
));
