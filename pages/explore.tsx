import * as React from "react";
import { Page } from "../src/components/Page";
import { ExploreThingsList } from "../src/components/ExploreThingsList";
import { getFirebasePath } from "../src/utils/get-firebase-path";

type ThingsListPageProps = {
  thingsIds: string[];
  thingsData: any[];
};
const isObject = (value: any) => typeof value === "object" && value !== null;

const ThingsListPage = (props: ThingsListPageProps) => (
  <Page>
    <ExploreThingsList initial={props} />
  </Page>
);
ThingsListPage.getInitialProps = async ({ req }) => {
  if (!req || !req.firebase) return { thingsIds: [], thingsData: [] };
  const ref = req.firebase
    .database()
    .ref(getFirebasePath("public_things"))
    .limitToFirst(2);

  let things = await ref.once("value");
  things = things.val();
  if (!isObject(things)) return { thingsIds: [], thingsData: [] };

  const thingsIds = Object.keys(things);
  const thingsData = Object.keys(things)
    .map((key) => things[key])
    .map((thing) => {
      if (!thing.release_date) {
        return {
          ...thing,
          release_date: thing.created_on,
        };
      }
      return thing;
    });
  return {
    thingsIds,
    thingsData,
  };
};
export default ThingsListPage;
