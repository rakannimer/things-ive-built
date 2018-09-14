export type ThingFormState = {
  name: string;
  description: string;
  url: string;
  thing_type: Array<
    "publication" | "library" | "website" | "mobile_app" | "web_app" | "food"
  >;
  tags: string[];
  release_date: number;
};
