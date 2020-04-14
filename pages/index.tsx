import React from "react";

import { HeroTitle } from "../src/components/HeroTitle";
import { Page } from "../src/components/Page";
import { HeroActions } from "../src/components/HeroActions";
import { PersonalDataLoader } from "../src/components/headless/PersonalDataLoader";

const Home = () => (
  <Page>
    <PersonalDataLoader />
    <HeroTitle />
    <HeroActions />
  </Page>
);

export default Home;
