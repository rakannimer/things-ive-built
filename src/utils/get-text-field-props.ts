import startCase from "lodash/startCase";
export const getTextFieldProps = ({ classes, state, setState, id }) => {
  const label = startCase(id);
  return {
    id,
    label,
    className: classes.textField,
    margin: "normal" as any,
    value: state[id],
    autoComplete: "off",
    onChange: ev => {
      const value = ev.target.value;
      setState(state => ({
        ...state,
        [id]: value
      }));
    }
  };
};
