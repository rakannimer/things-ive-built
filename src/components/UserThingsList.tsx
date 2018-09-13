import * as React from "react";

import { UserThingsDataLoader } from "./headless/UserThingsDataLoader";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { deleteThing } from "../firebase-mutations/delete-thing";

export const UserThingsListUI = ({ thingsIds, thingsData, onDelete }) => {
  return (
    <div data-testid="user-things-list">
      {thingsIds.map((thingId, i) => (
        <div key={thingId}>
          <ThingPreview
            thingId={thingId}
            thingData={thingsData[i]}
            onDelete={onDelete}
          />
          <Separator vertical space={10} />
        </div>
      ))}
    </div>
  );
};
export const UserThingsList = ({ uid }) => {
  return (
    <UserThingsDataLoader uid={uid}>
      {({ thingsIds, thingsData }) => (
        <UserThingsListUI
          thingsIds={thingsIds}
          thingsData={thingsData}
          onDelete={async thingId => {
            await deleteThing(uid, thingId);
          }}
        />
      )}
    </UserThingsDataLoader>
  );
};
