import * as React from "react";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { renderAndAddProps, Renderable } from "render-and-add-props";
import { getFirebasePath } from "../../utils/get-firebase-path";

const thingMigrations = [
  {
    mapObject: thing => {
      if (!thing.release_date) {
        return {
          ...thing,
          release_date: thing.created_on
        };
      }
      return thing;
    }
  }
];

export const UserThingsDataLoader = ({
  uid,
  children
}: {
  uid: string;
  children?: Renderable;
}) => {
  return (
    <FirebaseDatabaseNode path={getFirebasePath(`things/${uid}`)} isList>
      {({ value: things }) => {
        if (Array.isArray(things) === false) return null;
        const thingsIds = things.map(t => t.key);
        const thingsData = things
          .map(t => t.data)
          .map(d => thingMigrations[0].mapObject(d));
        if (children)
          return renderAndAddProps(children, { thingsIds, thingsData, uid });
        return null;
      }}
    </FirebaseDatabaseNode>
  );
};
