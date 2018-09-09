import FormControl from "@material-ui/core/FormControl";
import ChipInput from "material-ui-chip-input";
import { withStyles } from "@material-ui/core";
import startCase from "lodash/startCase";
import { styles } from "../utils/styles";

export const ControlledTextFieldWithChips = withStyles(styles)(
  ({ classes, component, id, autoComplete = false }: any) => {
    const label = startCase(id);
    return (
      <FormControl>
        <ChipInput
          value={component.state.tags}
          onAdd={chip => {
            component.setState(state => ({
              ...state,
              [id]: [...component.state[id], chip]
            }));
          }}
          onDelete={(chip, index) => {
            component.setState(state => ({
              ...state,
              [id]: [...component.state[id].filter(c => c !== chip)]
            }));
          }}
          id={id}
          label={label}
          className={classes.textField}
          margin="normal"
          autoComplete={autoComplete ? "" : "off"}
        />
      </FormControl>
    );
  }
);
