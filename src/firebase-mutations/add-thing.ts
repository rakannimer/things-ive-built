import * as firebase from "firebase/app";
import { ThingFormState } from "../types";
import { Thing } from "../schema/types";
import { getFirebasePath } from "../utils/get-firebase-path";

export const createThingFromFormState = (
  thing: ThingFormState,
  uid: string
): Thing => {
  return {
    author_id: uid,
    created_on: firebase.database.ServerValue.TIMESTAMP,
    updated_on: firebase.database.ServerValue.TIMESTAMP,
    name: thing.name,
    description: thing.description,
    main_url: thing.url,
    is_public: true,
    tags: thing.tags.reduce((acc, cur) => {
      acc[cur] = Date.now();
      return acc;
    }, {}),
    types: thing.thing_type.reduce((acc, cur) => {
      acc[cur] = Date.now();
      return acc;
    }, {})
  };
};

export const addThing = async (thing: ThingFormState, uid) => {
  const thingData = createThingFromFormState(thing, uid);

  const result = await firebase
    .database()
    .ref(getFirebasePath(`things/${uid}`))
    .push(thingData);
  const thingId = result.key;
  await firebase
    .database()
    .ref(getFirebasePath(`public_things/${thingId}`))
    .set(thingData);
  return { thingId, thingData };
};
