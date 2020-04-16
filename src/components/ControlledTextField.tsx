import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core";
import startCase from "lodash/startCase";
import { styles } from "../utils/styles";

const getTextFieldProps = ({ classes, state, setState, id }) => {
  const label = startCase(id);
  return {
    id,
    label,
    className: classes.textField,
    margin: "normal" as any,
    value: state[id],
    autoComplete: "off",
    onChange: (ev) => {
      const value = ev.target.value;
      setState((state) => ({
        ...state,
        [id]: value,
      }));
    },
  };
};
export const ControlledTextField = withStyles(styles)(
  ({ classes, component, id, autoComplete = false, ...rest }: any) => {
    return (
      <FormControl>
        <TextField
          {...getTextFieldProps({ classes, ...component, id })}
          autoComplete={autoComplete ? "" : "off"}
          {...rest}
        />
      </FormControl>
    );
  }
);
