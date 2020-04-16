import React from "react";
import Typography from "@material-ui/core/Typography";
import { useAuthState } from "react-firebase-hooks/auth";

import { Page } from "src/components/Page";
import { Separator } from "src/components/Separator";
import { ThingPreview } from "src/components/ThingPreview";
import { ThingFormState, Thing } from "src/types";
import { addThing } from "src/firebase-mutations/add-thing";
import { AddThingForm } from "src/components/AddThingForm";
import { AuthAction } from "src/components/AuthAction";
import { getFirebasePath } from "src/utils/get-firebase-path";
import { getFirebaseAuth, getFirebaseDatabase } from "src/utils/get-firebase";
import { getIsomorphicUseObjectVal } from "src/hooks/use-object-val";

export const defaultThing = {
  name: "",
  description: "",
  url: "",
  thing_type: ["publication"],
  tags: [],
  release_date: 0,
} as ThingFormState;

type ThingsListState = {
  thingsIds: string[];
  thingsData: Thing[];
};

const ThingPreviewFetcher = ({ thingId, uid }) => {
  const database = getFirebaseDatabase();
  const useObjectVal = getIsomorphicUseObjectVal();
  const [thing] = useObjectVal<Thing>(
    database.ref(getFirebasePath(`things/${uid}/${thingId}`))
  );
  return thing ? <ThingPreview thingData={thing} thingId={thingId} /> : null;
};

const ThingComponent = () => {
  const [state, setState] = React.useState<ThingsListState>({
    thingsIds: [],
    thingsData: [],
  });
  const auth = getFirebaseAuth();
  const [user] = useAuthState(auth);

  return (
    <Page>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Add a Thing
      </Typography>

      {user && (
        <div>
          <AddThingForm
            onAdd={async (thing) => {
              const { thingId, thingData } = await addThing(thing, user.uid);
              setState((state) => ({
                thingsIds: [...state.thingsIds, thingId],
                thingsData: [...state.thingsData, thingData],
              }));
            }}
          />
          <Separator vertical space={10} />
          <div id="added-things-preview">
            {state.thingsIds.map((thingId, i) => (
              <ThingPreviewFetcher uid={user.uid} thingId={thingId} />
            ))}
          </div>
        </div>
      )}
      {!user && <AuthAction />}
    </Page>
  );
};

export default ThingComponent;
