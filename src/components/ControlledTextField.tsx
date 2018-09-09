import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core";
import { styles } from "../utils/styles";
import { getTextFieldProps } from "../utils/get-text-field-props";

export const ControlledTextField = withStyles(styles)(
  ({ classes, component, id, autoComplete = false }: any) => {
    return (
      <FormControl>
        <TextField
          {...getTextFieldProps({ classes, ...component, id })}
          autoComplete={autoComplete ? "" : "off"}
        />
      </FormControl>
    );
  }
);
