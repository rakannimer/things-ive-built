import * as React from "react";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { renderAndAddProps, Renderable } from "render-and-add-props";
import { Thing } from "../../schema/types";

export const ThingsDataLoader = ({
  uid,
  children
}: {
  uid: string;
  children?: Renderable;
}) => {
  return (
    <FirebaseDatabaseNode path={`things/${uid}`} isList>
      {({ value: things }) => {
        if (Array.isArray(things) === false) return null;
        const thingsIds = things.map(t => t.key);
        const thingsData = things.map(t => t.data);
        if (children)
          return renderAndAddProps(children, { thingsIds, thingsData, uid });
        return null;
      }}
    </FirebaseDatabaseNode>
  );
};
