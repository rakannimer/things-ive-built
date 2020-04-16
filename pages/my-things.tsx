import * as React from "react";
import { Page } from "../src/components/Page";
import { UserThingsList } from "../src/components/UserThingsList";
import { useAuthState } from "react-firebase-hooks/auth/";
import { getFirebaseAuth } from "src/utils/get-firebase";

const ThingsListPage = () => {
  const [user] = useAuthState(getFirebaseAuth());
  return <Page>{user && <UserThingsList uid={user.uid} />}</Page>;
};
export default ThingsListPage;
