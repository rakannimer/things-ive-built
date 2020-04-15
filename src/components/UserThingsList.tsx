import * as React from "react";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { deleteThing } from "../firebase-mutations/delete-thing";
import { getFirebaseDatabase } from "src/utils/get-firebase";
import { getIsomorphicUseObjectVal } from "src/hooks/use-object-val";
import { getFirebasePath } from "src/utils/get-firebase-path";
import { Thing } from "src/types";

export const UserThingsList = ({ uid }) => {
  const ref = getFirebaseDatabase().ref(getFirebasePath(`things/${uid}`));
  const useObjectVal = getIsomorphicUseObjectVal();
  const [things, , error] = useObjectVal<{ [id: string]: Thing }>(ref);
  if (error) {
    console.log(`Faild to fetch user things in UserThingsList `, error);
  }
  const ids = Object.keys(things || {});
  const data = Object.values(things || {});

  return (
    <div data-testid="user-things-list">
      {ids.length === 0 && (
        <p>
          No items in <pre>things</pre> list
        </p>
      )}
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
