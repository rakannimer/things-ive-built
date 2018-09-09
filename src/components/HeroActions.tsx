import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import { styles } from "../utils/styles";

export const HeroActions = withStyles(styles)(({ classes }) => (
  <div className={classes.heroButtons}>
    <Grid container spacing={16} justify="center">
      <Grid item>
        <Link href={{ pathname: "/add-thing" }} prefetch>
          <Button variant="contained" color="primary">
            Add a thing you've built.
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary">
          Explore things built by others.
        </Button>
      </Grid>
    </Grid>
  </div>
));
