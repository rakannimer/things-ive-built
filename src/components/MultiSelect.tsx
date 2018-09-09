import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import startCase from "lodash/startCase";
import { styles } from "../utils/styles";
import { POSSIBLE_THING_TYPES } from "../constants";

export const MultiSelect = withStyles(styles)(
  ({ classes, component, id = "", list = POSSIBLE_THING_TYPES }: any) => {
    const label = startCase(id);
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`${id}`}>{label}</InputLabel>
        <Select
          multiple
          value={component.state[id]}
          onChange={ev => {
            const value = ev.target.value;
            component.setState(state => ({
              ...component.state,
              [id]: value
            }));
          }}
          inputProps={{
            name: `${id}`,
            id: `${id}`
          }}
        >
          {list.map(val => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);
