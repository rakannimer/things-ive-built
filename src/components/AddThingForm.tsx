import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles, Button, Typography } from "@material-ui/core";
import { styles } from "../utils/styles";
import { Separator } from "./Separator";
import { UrlPreview } from "./UrlPreview";
import { isValidInput } from "../utils/is-valid-thing-input";
import { getTestIdProp } from "../utils/test-id-prop";
import { ControlledTextField } from "./ControlledTextField";
import { ControlledTextFieldWithChips } from "./ControlledTextFieldWithChips";
import { MultiSelect } from "./MultiSelect";
import { defaultThing } from "../constants/";
import FormControl from "@material-ui/core/FormControl";

import DayPickerInput from "react-day-picker/DayPickerInput";

const SetReleaseDate = ({ component }) => (
  <FormControl>
    <Typography> Release Date </Typography>
    <Separator vertical space={5} />
    <DayPickerInput
      format=""
      onDayChange={(day) => {
        component.setState((state) => ({
          ...state,
          release_date: new Date(day),
        }));
      }}
    />
    <Separator vertical space={0} />
  </FormControl>
);

export const AddThingForm = withStyles(styles)(
  ({ classes, onAdd = (state) => {} }: any) => {
    const [state, setState] = React.useState(defaultThing);
    const component = { state, setState };
    return (
      <form
        className={classes.container}
        noValidate
        {...getTestIdProp("add-thing-form")}
        onSubmit={(ev) => {
          ev.preventDefault();
          const isValid = isValidInput(state);
          if (isValid === false) return;
          onAdd(state);
          // Reset the form
          setState(defaultThing);
        }}
      >
        <FormGroup className={classes.addThingForm}>
          <Separator vertical space={20} />
          <SetReleaseDate component={component} />
          <MultiSelect
            component={component}
            id={"thing_type"}
            data-testid="thing-type"
          />
          <Separator vertical space={10} />

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
    );
  }
);
