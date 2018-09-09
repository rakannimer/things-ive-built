export type timestamp = number;

export type Thing = {
  author_id: string;
  created_on: timestamp;
  updated_on: timestamp;
  name?: string;
  tags?: {
    [tag: string]: number;
  };
  description?: string;
  main_url?: string;
  github_url?: string;
  website_url?: string;
  twitter_url?: string;
};

export type UserPrivate = {
  authentication_method: "github" | "anonymous";
  authentication_data: any;
  user_id: string;
};
export type UserPublic = {
  username: string;
  user_id: string;
};

export type Schema = {
  users_private: {
    [userId: string]: UserPrivate;
  };
  users_public: {
    [userId: string]: UserPublic;
  };
  things: {
    [thing_id: string]: Thing;
  };
  user_things_map: {
    [user_id: string]: {
      [thing_id: string]: number;
    };
  };
};
