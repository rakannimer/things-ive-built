import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { FirebaseAuthProvider } from "@react-firebase/auth";

import { config } from "../config/config";
import { PageLayout } from "../components/PageLayout";

import { Main } from "../components/Main";
export class Page extends React.Component {
  static async getInitialProps({ req }) {
    return { data: { pathname: req.pathname } };
  }
  render() {
    const { children } = this.props as any;
    return (
      <FirebaseAuthProvider firebase={firebase} {...config.firebase.client}>
        <FirebaseDatabaseProvider
          firebase={firebase}
          {...config.firebase.client}
        >
          <PageLayout>
            <Main>{children}</Main>
          </PageLayout>
        </FirebaseDatabaseProvider>
      </FirebaseAuthProvider>
    );
  }
}
