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
  tags: [],
  release_date: -1
} as ThingFormState;

export const project = {
  name: "TIB - Thing's I've Built",
  tagline:
    "Showcase the projects you have built, and see what your peers are building."
};
