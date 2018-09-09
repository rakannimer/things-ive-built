import React from "react";
import Typography from "@material-ui/core/Typography";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import { Page } from "../src/components/Page";
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

class Thing extends React.Component {
  render() {
    return (
      <Page>
        <Typography variant="display2" style={{ textAlign: "center" }}>
          Add a Thing
        </Typography>
        <IfFirebaseAuthed>
          {({ user }) => (
            <AddThingForm
              onAdd={async thing => {
                await addThing(thing, user.uid);
              }}
            />
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>{() => <AuthAction />}</IfFirebaseUnAuthed>
      </Page>
    );
  }
}

export default Thing;
