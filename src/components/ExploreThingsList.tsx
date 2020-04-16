import * as React from "react";
import firebase from "firebase/app";

import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { getFirebasePath } from "src/utils/get-firebase-path";
import { getFirebaseDatabase } from "src/utils/get-firebase";
import { getIsomorphicUseObjectVal } from "src/hooks/use-object-val";
import { Thing } from "src/types";

export const ExploreThingsListUI = ({
  thingsIds,
  thingsData,
  onDelete = () => {},
}) => {
  return (
    <div data-testid="explore-things-list">
      {thingsIds.map(
        (thingId, i) =>
          thingsData[i] && (
            <div key={thingId}>
              <ThingPreview
                thingId={thingId}
                thingData={thingsData[i]}
                onDelete={onDelete}
                showDelete={false}
              />
              <Separator vertical space={10} />
            </div>
          )
      )}
    </div>
  );
};

export const ExploreThingsList = ({
  initial: { thingsIds: initTi, thingsData: initTd },
}) => {
  const db = getFirebaseDatabase();

  const ref = db.ref(
    getFirebasePath("public_things")
  ) as firebase.database.Query;

  const useObjectValHook = getIsomorphicUseObjectVal();

  const [thingsVal, , error] = useObjectValHook<{ [thingId: string]: Thing }>(
    ref
  );
  if (error) {
    console.error("Failed to fetch things in ExploreThingsList ", error);
  }

  if (!thingsVal) {
    return <ExploreThingsListUI thingsIds={initTi} thingsData={initTd} />;
  }
  const thingsIds = Object.keys(thingsVal);
  const things = Object.values(thingsVal);

  const thingsData = things.map((thing: any) => {
    if (!thing.release_date) {
      return {
        ...thing,
        release_date: thing.created_on,
      };
    }
    return thing;
  });

  return <ExploreThingsListUI thingsIds={thingsIds} thingsData={thingsData} />;
};
