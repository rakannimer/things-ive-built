import * as firebase from "firebase/app";

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

export type timestamp = typeof firebase.database.ServerValue.TIMESTAMP | number;

export type Thing = {
  author_id: string;
  created_on: timestamp;
  updated_on: timestamp;
  name?: string;
  types: {
    [type: string]: number;
  };
  tags?: {
    [tag: string]: number;
  };
  is_public: boolean;
  description?: string;
  main_url?: string;
  github_url?: string;
  website_url?: string;
  twitter_url?: string;
  release_date: timestamp;
};

export type UserPrivate = {
  authentication_method: "github" | "anonymous";
  authentication_data: any;
  user_id: string;
};
export type UserPublic = {
  username: string;
  photo_url: string;
  user_id: string;
};
