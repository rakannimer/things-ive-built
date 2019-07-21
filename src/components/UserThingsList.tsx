import * as React from "react";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { deleteThing } from "../firebase-mutations/delete-thing";
import { useFirebaseDatabaseList } from "../hooks/use-firebase";

export const UserThingsList = ({ uid }) => {
  const { ids, data, firebase } = useFirebaseDatabaseList(
    uid === "" ? null : `things/${uid}`
  );
  if (firebase === null) {
    return <div>Loading..</div>;
  }

  return (
    <div data-testid="user-things-list">
      {ids.map((thingId, i) => {
        return (
          <div key={thingId}>
            <ThingPreview
              thingId={thingId}
              thingData={data[i]}
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
