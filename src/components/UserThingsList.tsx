import * as React from "react";
import produce from "immer";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { deleteThing } from "../firebase-mutations/delete-thing";
import { Thing } from "src/schema/types";
import { useFirebase } from "../hooks/use-firebase";
import { getFirebasePath } from "../utils/get-firebase-path";

type State = {
  ids: string[];
  data: Thing[];
};
type Action =
  | {
      type: "child_added" | "child_moved";
      payload: {
        snapshot: firebase.database.DataSnapshot | null;
        prevChildKey: string | null | undefined;
      };
    }
  | {
      type: "child_removed" | "child_changed";
      payload: {
        snapshot: firebase.database.DataSnapshot | null;
      };
    };
const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "child_added": {
      const {
        payload: { snapshot, prevChildKey }
      } = action;
      const newState = produce(state, draft => {
        if (snapshot === null || snapshot.key === null) {
          return;
        }
        if (!prevChildKey) {
          draft.ids.unshift(snapshot.key);
          draft.data.unshift(snapshot.val());
          return;
        }
        const index = state.ids.indexOf(prevChildKey);
        if (index === -1) {
          return;
        }
        draft.ids.splice(index, 0, snapshot.key);
        draft.data.splice(index, 0, snapshot.val());
      });
      return newState;
    }
    case "child_removed": {
      const {
        payload: { snapshot }
      } = action;
      return produce(state, draft => {
        if (snapshot === null || snapshot.key === null) {
          return;
        }
        const index = state.ids.indexOf(snapshot.key);
        draft.ids.splice(index, 1);
        draft.data.splice(index, 1);
      });
    }
    case "child_moved": {
      const {
        payload: { snapshot, prevChildKey }
      } = action;
      return produce(state, draft => {
        if (snapshot === null || snapshot.key === null) {
          return;
        }
        const index = state.ids.indexOf(snapshot.key);
        const [id] = draft.ids.splice(index, 1);
        const [val] = draft.data.splice(index, 1);

        if (!prevChildKey) {
          draft.ids.unshift(id);
          draft.data.unshift(val);
          return;
        }
        const newIndex = state.ids.indexOf(prevChildKey);
        if (newIndex === -1) {
          return;
        }
        draft.ids.splice(newIndex, 0, id);
        draft.data.splice(newIndex, 0, val);
      });
    }
    case "child_changed": {
      const {
        payload: { snapshot }
      } = action;
      return produce(state, draft => {
        if (snapshot === null || snapshot.key === null) {
          return;
        }
        const index = state.ids.indexOf(snapshot.key);
        draft.ids[index] = snapshot.key;
        draft.data[index] = snapshot.val();
      });
    }
    default: {
      throw new Error(`Unsupported action: ${JSON.stringify(action)} `);
    }
  }
};

export const UserThingsList = ({ uid }) => {
  const [state, dispatch] = React.useReducer(reducer, { ids: [], data: [] });
  const firebase = useFirebase();
  React.useEffect(
    () => {
      if (firebase === null || uid === "") return;
      let listeners: Function[] = [];
      const ref = firebase.database().ref(getFirebasePath(`things/${uid}`));
      listeners.push(
        ref.on("child_added", (snapshot, prevChildKey) => {
          dispatch({
            type: "child_added",
            payload: { snapshot, prevChildKey }
          });
        })
      );
      listeners.push(
        ref.on("child_changed", snapshot => {
          dispatch({
            type: "child_changed",
            payload: { snapshot }
          });
        })
      );
      listeners.push(
        ref.on("child_moved", (snapshot, prevChildKey) => {
          dispatch({
            type: "child_moved",
            payload: { snapshot, prevChildKey }
          });
        })
      );
      listeners.push(
        ref.on("child_removed", snapshot => {
          dispatch({
            type: "child_removed",
            payload: { snapshot }
          });
        })
      );
      return () => {
        for (let unsub of listeners) {
          unsub();
        }
      };
    },
    [firebase, uid]
  );
  if (firebase === null) {
    return <div>Loading..</div>;
  }
  console.warn(uid, state.ids.length);

  return (
    <div data-testid="user-things-list">
      {state.ids.map((thingId, i) => {
        return (
          <div key={thingId}>
            <ThingPreview
              thingId={thingId}
              thingData={state.data[i]}
              onDelete={async thingId => {
                await deleteThing(uid, thingId);
              }}
            />
            <Separator vertical space={10} />
          </div>
        );
      })}
    </div>
  );
};
