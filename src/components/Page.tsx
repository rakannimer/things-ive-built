import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { PageLayout } from "../components/PageLayout";
import { addUser } from "../firebase-mutations/add-user";
import { Head } from "./head";
import { Main } from "../components/Main";
import { config } from "../config/config";
import { getFirebaseAuth } from "src/utils/get-firebase";

try {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config.client);
  }
} catch (err) {
  if (err.code !== "app/duplicate-app") {
    console.log("Error in firebase.initializeApp: ", err);
  }
}

export const Page = ({ children }) => {
  const [user] = useAuthState(getFirebaseAuth());
  React.useEffect(() => {
    if (!user) return;
    const currentUserId = user.uid;
    const authentication_data = user.providerData[0];
    const providerId = user.providerId;
    addUser({
      uid: currentUserId,
      authentication_data,
      authentication_method: providerId,
    });
  }, [user]);
  return (
    <React.Fragment>
      <Head />
      <PageLayout>
        <Main>{children}</Main>
      </PageLayout>
      <style jsx global>{`
        main {
          justify-content: center;
          display: flex;
        }
      `}</style>
    </React.Fragment>
  );
};

Page.getInitialProps = ({ req }) => ({ data: { pathname: req.pathname } });
