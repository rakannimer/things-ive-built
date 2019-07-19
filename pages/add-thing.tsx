import React from "react";
import Typography from "@material-ui/core/Typography";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { Page } from "../src/components/Page";
import { Separator } from "../src/components/Separator";
import { ThingPreview } from "../src/components/ThingPreview";
import { ThingFormState } from "../src/types";
import { addThing } from "../src/firebase-mutations/add-thing";
export const defaultThing = {
  name: "",
  description: "",
  url: "",
  thing_type: ["publication"],
  tags: []
} as ThingFormState;

import { AddThingForm } from "../src/components/AddThingForm";
import { AuthAction } from "../src/components/AuthAction";
import { Component } from "../src/utils/component-component";
import { getFirebasePath } from "../src/utils/get-firebase-path";

class Thing extends React.Component {
  render() {
    return (
      <Page>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Add a Thing
        </Typography>
        <IfFirebaseAuthed>
          {({ user: { uid } }) => (
            <Component initialState={{ thingsIds: [], thingsData: [] }}>
              {component => (
                <div>
                  <AddThingForm
                    onAdd={async thing => {
                      const { thingId, thingData } = await addThing(thing, uid);
                      component.setState(state => ({
                        thingsIds: [...state.thingsIds, thingId],
                        thingsData: [...state.thingsData, thingData]
                      }));
                    }}
                  />
                  <Separator vertical space={10} />
                  <div id="added-things-preview">
                    {component.state.thingsIds.map((thingId, i) => (
                      <FirebaseDatabaseNode
                        path={getFirebasePath(`things/${uid}/${thingId}`)}
                        key={thingId}
                      >
                        {({ value }) =>
                          value && (
                            <ThingPreview thingData={value} thingId={thingId} />
                          )
                        }
                      </FirebaseDatabaseNode>
                    ))}
                  </div>
                </div>
              )}
            </Component>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>{() => <AuthAction />}</IfFirebaseUnAuthed>
      </Page>
    );
  }
}

export default Thing;
