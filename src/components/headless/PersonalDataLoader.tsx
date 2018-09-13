import * as React from "react";
import * as firebase from "firebase/app";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import get from "lodash/get";
import { Component } from "../../utils/component-component";
import { getFirebasePath } from "../../utils/get-firebase-path";
import { addUser } from "../../firebase-mutations/add-user";
export const PersonalDataLoader = () => (
  <React.Fragment>
    <FirebaseAuthConsumer>
      {({ providerId, user, isSignedIn }) => (
        <Component
          user={user}
          isSignedIn={isSignedIn}
          didMount={() => {
            // console.warn("Mounted "); // , { uid: user.uid, isSignedIn });
          }}
          didUpdate={async prevProps => {
            const previousUserId = get(prevProps.user, "uid", "");
            const currentUserId = get(user, "uid", "");
            if (previousUserId !== currentUserId && currentUserId !== "") {
              const authentication_data = get(
                user,
                "providerData.0",
                undefined
              );
              await addUser({
                uid: currentUserId,
                authentication_data,
                authentication_method: providerId
              });
            }
          }}
        >
          {null}
        </Component>
      )}
    </FirebaseAuthConsumer>
  </React.Fragment>
);
