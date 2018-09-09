import { ThingFormState } from "../types";
import { defaultThing } from "../constants/";

export const isValidInput = (state: ThingFormState) => {
  const isValid =
    state.name !== defaultThing.name &&
    state.url !== defaultThing.url &&
    state.description !== defaultThing.description &&
    Array.isArray(state.thing_type) &&
    state.thing_type.length > 0;
  return isValid;
};
