import * as React from "react";
import { styles, useStyles } from "../utils/styles";

export const Main = ({ children }) => {
  const classes = useStyles(styles);
  return (
    <main className={classes.heroUnit}>
      <div>
        <div className={classes.heroContent}>{children}</div>
      </div>
    </main>
  );
};
