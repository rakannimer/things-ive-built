import * as React from "react";
import { getFirebaseQuery } from "@react-firebase/database";
import { Page } from "../src/components/Page";
import { ExploreThingsList } from "../src/components/ExploreThingsList";
import { getFirebasePath } from "../src/utils/get-firebase-path";

type ThingsListPageProps = {
  thingsIds: string[];
  thingsData: any[];
};
const isObject = (value: any) => typeof value === "object" && value !== null;

class ThingsListPage extends React.Component<ThingsListPageProps> {
  static getInitialProps = async ({ req }) => {
    if (!req || !req.firebase) return { thingsIds: [], thingsData: [] };
    const ref = getFirebaseQuery({
      path: getFirebasePath("public_things"),
      isList: true,
      limitToLast: 2,
      firebase: req.firebase
    });
    // req.firebase
    //   .database()
    //   .ref("public_things")
    //   .limitToLast(10);

    let things = await ref.once("value");
    things = things.val();
    if (!isObject(things)) return { thingsIds: [], thingsData: [] };

    const thingsIds = Object.keys(things);
    const thingsData = Object.keys(things).map(key => things[key]);
    return {
      thingsIds,
      thingsData
    };
  };
  render() {
    return (
      <Page>
        <ExploreThingsList initial={this.props} />
      </Page>
    );
  }
}
export default ThingsListPage;
