import * as React from "react";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { getFirebasePath } from "../utils/get-firebase-path";

export const ExploreThingsListUI = ({
  thingsIds,
  thingsData,
  onDelete = () => {}
}) => {
  return (
    <div data-testid="explore-things-list">
      {thingsIds.map((thingId, i) => (
        <div key={thingId}>
          <ThingPreview
            thingId={thingId}
            thingData={thingsData[i]}
            onDelete={onDelete}
            showDelete={false}
          />
          <Separator vertical space={10} />
        </div>
      ))}
    </div>
  );
};

export const ExploreThingsList = ({
  initial: { thingsIds: initTi, thingsData: initTd }
}) => {
  return (
    <FirebaseDatabaseNode
      path={getFirebasePath(`public_things`)}
      isList
      limitToFirst={10}
    >
      {({ value: things }) => {
        if (things === null)
          return <ExploreThingsListUI thingsIds={initTi} thingsData={initTd} />;
        const thingsIds = things.map(t => t.key);
        const thingsData = things.map(t => t.data).map(thing => {
          if (!thing.release_date) {
            return {
              ...thing,
              release_date: thing.created_on
            };
          }
          return thing;
        });
        return (
          <ExploreThingsListUI thingsIds={thingsIds} thingsData={thingsData} />
        );
      }}
    </FirebaseDatabaseNode>
  );
};
