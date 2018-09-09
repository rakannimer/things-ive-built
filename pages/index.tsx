import React from "react";

import { HeroTitle } from "../components/HeroTitle";
import { Page } from "../components/Page";
import { HeroActions } from "../components/HeroActions";
import { PersonalDataLoader } from "../components/PersonalDataLoader";

class Home extends React.Component {
  render() {
    return (
      <Page>
        <PersonalDataLoader />
        <HeroTitle />
        <HeroActions />
      </Page>
    );
  }
}

export default Home;
