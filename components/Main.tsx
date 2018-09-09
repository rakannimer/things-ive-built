import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../utils/styles";

export const Main = withStyles(styles)(({ classes, children }) => (
  <main className={classes.heroUnit}>
    <div>
      <div className={classes.heroContent}>{children}</div>
    </div>
  </main>
));
