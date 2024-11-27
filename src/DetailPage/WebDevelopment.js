//es
import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "./HeroHeader";
import Features from "components/features/VerticalWithAlternateImageAndText.js";

import Footer from "components/footers/SimpleFiveColumn.js";
import { useParams, useSearchParams } from "react-router-dom";
import { serviceData } from "AppData/ServiceData";
import { ElearningData } from "AppData/E-learningData";
import { DServiceData } from "AppData/Data-Service";

export default () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("type");
  const data =
    paramValue === "service"
      ? serviceData.filter((a) => a.id == id)
      : paramValue === "Data-service"
      ? DServiceData.filter((a) => a.id == id)
      : ElearningData.filter((a) => a.id == id);
  return (
    <AnimationRevealPage>
      <Hero data={data} />
      <Features data={data} />
      <Footer />
    </AnimationRevealPage>
  );
};
