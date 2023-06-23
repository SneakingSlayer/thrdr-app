import React from "react";

import {
  Hero,
  Footer,
  About,
  Marquee,
  Banner,
  Faq,
  SectionContainer,
} from "@/components";

const Home = () => {
  return (
    <>
      <SectionContainer>
        <Hero />
      </SectionContainer>
      <SectionContainer>
        <Marquee />
      </SectionContainer>
      <SectionContainer>
        <About />
      </SectionContainer>
      <SectionContainer>
        <Banner />
      </SectionContainer>
      <SectionContainer>
        <Faq />
      </SectionContainer>
      <Footer />
    </>
  );
};

export default Home;
