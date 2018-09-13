import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { PageLayout } from "../components/PageLayout";
import { Head } from "./head";
import { Main } from "../components/Main";
import { PersonalDataLoader } from "./headless/PersonalDataLoader";
import { config } from "../config/config";

const { client } = config;
export class Page extends React.Component {
  static async getInitialProps({ req }) {
    return { data: { pathname: req.pathname } };
  }
  render() {
    const { children } = this.props as any;
    return (
      <FirebaseAuthProvider firebase={firebase} {...client}>
        <FirebaseDatabaseProvider firebase={firebase} {...client}>
          <Head />
          <PersonalDataLoader />
          <PageLayout>
            <Main>{children}</Main>
          </PageLayout>
          <style jsx global>{`
            main {
              justify-content: center;
              display: flex;
            }
          `}</style>
        </FirebaseDatabaseProvider>
      </FirebaseAuthProvider>
    );
  }
}
