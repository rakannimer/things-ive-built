import FormGroup from "@material-ui/core/FormGroup";
import { withStyles, Button } from "@material-ui/core";
import { styles } from "../utils/styles";
import { Component } from "../utils/component-component";
import { Separator } from "./Separator";
import { UrlPreview } from "./UrlPreview";
import { isValidInput } from "../utils/is-valid-thing-input";
import { ControlledTextField } from "./ControlledTextField";
import { ControlledTextFieldWithChips } from "./ControlledTextFieldWithChips";
import { MultiSelect } from "./MultiSelect";
import { defaultThing } from "../constants/";

export const AddThingForm = withStyles(styles)(
  ({ classes, onAdd = state => {} }: any) => {
    return (
      <Component initialState={defaultThing}>
        {component => (
          <form
            className={classes.container}
            noValidate
            onSubmit={ev => {
              ev.preventDefault();
              const isValid = isValidInput(component.state);
              if (isValid === false) return;
              onAdd(component.state);
              component.setState(defaultThing);
            }}
          >
            <FormGroup className={classes.addThingForm}>
              <Separator vertical space={20} />
              <MultiSelect component={component} id={"thing_type"} />
              <Separator vertical space={5} />
              <ControlledTextField component={component} id={"name"} />
              <ControlledTextField component={component} id={"description"} />
              <ControlledTextField
                component={component}
                id={"url"}
                autoComplete={true}
              />
              <UrlPreview url={component.state.url} />
              <ControlledTextFieldWithChips component={component} id="tags" />
              <Separator vertical space={10} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Thing
              </Button>
            </FormGroup>
          </form>
        )}
      </Component>
    );
  }
);
