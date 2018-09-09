import React from "react";
import { Page } from "../components/Page";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles, Button } from "@material-ui/core";
import { styles } from "../utils/styles";
import { Component } from "../utils/component-component";

const defaultThing = {
  name: "",
  description: "",
  url: "",
  tags: []
};

class Thing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Page>
        <pre>Thing</pre>
        <Component>
          {component => (
            <form
              onSubmit={ev => {
                ev.preventDefault();
                console.warn("Submitted");
              }}
            >
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                id="description"
                label="Name"
                className={classes.textField}
                margin="normal"
              />
              <Button type="submit">asd</Button>
            </form>
          )}
        </Component>
      </Page>
    );
  }
}

export default withStyles(styles)(Thing);
