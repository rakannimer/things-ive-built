import * as React from "react";
import * as firebase from "firebase/app";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import get from "lodash/get";
import { Component } from "../../utils/component-component";
export const PersonalDataLoader = () => (
  <React.Fragment>
    <FirebaseAuthConsumer>
      {({ providerId, user, isSignedIn }) => (
        <Component
          user={user}
          isSignedIn={isSignedIn}
          didMount={() => {
            console.warn("Mounted "); // , { uid: user.uid, isSignedIn });
          }}
          didUpdate={async prevProps => {
            const previousUserId = get(prevProps.user, "uid", "");
            const currentUserId = get(user, "uid", "");
            if (previousUserId !== currentUserId && currentUserId !== "") {
              const authentication_data = get(user, "providerData.0", {});
              await firebase
                .database()
                .ref(`users_private/${currentUserId}/`)
                .update({
                  authentication_method: providerId,
                  authentication_data,
                  user_id: currentUserId
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
