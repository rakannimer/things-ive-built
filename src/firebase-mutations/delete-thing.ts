import * as firebase from "firebase/app";
import { getFirebasePath } from "../utils/get-firebase-path";

export const deleteThing = async (uid, thingId) => {
  await firebase
    .database()
    .ref(getFirebasePath(`things/${uid}/${thingId}`))
    .set(null);
};
