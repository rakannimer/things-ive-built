import * as React from "react";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { Page } from "../src/components/Page";
import { UserThingsList } from "../src/components/UserThingsList";
class ThingsListPage extends React.Component {
  render() {
    return (
      <Page>
        <IfFirebaseAuthed>
          {({ user: { uid } }) => <UserThingsList uid={uid} />}
        </IfFirebaseAuthed>
      </Page>
    );
  }
}
export default ThingsListPage;
