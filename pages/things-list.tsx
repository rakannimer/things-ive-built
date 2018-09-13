import * as React from "react";

import { Page } from "../src/components/Page";
import { UserThingsList } from "../src/components/UserThingsList";
class ThingsListPage extends React.Component<{ uid: string }> {
  static getInitialProps = async req => {
    return {
      uid: req.query.uid
    };
  };
  render() {
    const { uid } = this.props;
    return <Page>{uid && <UserThingsList uid={uid} />}</Page>;
  }
}
export default ThingsListPage;
