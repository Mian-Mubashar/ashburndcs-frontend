import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "./HeroHeader";
import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/SimpleFiveColumn.js";
import { useParams } from "react-router-dom";
import { serviceData } from "AppData/ServiceData";
import { ElearningData } from "AppData/E-learningData";

export default () => {
  
  const { id } = useParams();
  console.log({id})
  const data = serviceData.filter((a)=>a.id==id)
  console.log({data})
  return (
    <AnimationRevealPage>
      <Hero data={data}/>
      <Features data={data}/>
      <Footer />{" "}
      {/* <Blog />
            <ContactUsForm /> */}
    </AnimationRevealPage>
  );
};
