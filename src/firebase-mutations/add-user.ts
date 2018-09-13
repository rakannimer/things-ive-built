import * as firebase from "firebase/app";
import { getFirebasePath } from "../utils/get-firebase-path";

export const addUser = async ({
  uid,
  authentication_method,
  authentication_data = {
    displayName: "anonymous",
    photoURL: "https://placekitten.com/g/460/460"
  } as any
}) => {
  await firebase
    .database()
    .ref(getFirebasePath(`users_private/${uid}/`))
    .update({
      authentication_method,
      authentication_data,
      user_id: uid
    });
  const { displayName: username, photoURL: photo_url } = authentication_data;
  await firebase
    .database()
    .ref(getFirebasePath(`users_public/${uid}/`))
    .update({
      username,
      photo_url
    });
};
