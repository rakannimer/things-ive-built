import React from "react";

import { HeroTitle } from "../src/components/HeroTitle";
import { Page } from "../src/components/Page";
import { HeroActions } from "../src/components/HeroActions";

const Home = () => (
  <Page>
    <HeroTitle />
    <HeroActions />
  </Page>
);

export default Home;
