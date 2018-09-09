import { ThingFormState } from "../types";

export const POSSIBLE_THING_TYPES = [
  "publication",
  "demo",
  "library",
  "website",
  "mobile_app",
  "web_app",
  "food"
];

export const defaultThing = {
  name: "",
  description: "",
  url: "",
  thing_type: ["publication"],
  tags: []
} as ThingFormState;
