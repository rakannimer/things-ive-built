import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import startCase from "lodash/startCase";
import { styles } from "../utils/styles";
import { POSSIBLE_THING_TYPES } from "../constants";
import { getTestIdProp } from "../utils/test-id-prop";

export const MultiSelect = withStyles(styles)(
  ({
    classes,
    component,
    id = "",
    list = POSSIBLE_THING_TYPES,
    ...rest
  }: any) => {
    const label = startCase(id);
    return (
      <FormControl className={classes.formControl} {...rest}>
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
          {list.map((val, i) => (
            <MenuItem
              key={val}
              value={val}
              {...getTestIdProp(`thing-type-${i}`)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);
