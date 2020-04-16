import * as React from "react";

import { Page } from "../src/components/Page";
import { UserThingsList } from "../src/components/UserThingsList";

const ThingsListPage = (props) => {
  const { uid } = props;
  return <Page>{uid && <UserThingsList uid={uid} />}</Page>;
};

ThingsListPage.getInitialProps = async (req) => {
  return {
    uid: req.query.uid,
  };
};

export default ThingsListPage;
