"use client";
import React, { useState } from "react";
import HeroBanner from "./heroBanner";
import HeroInfo from "./heroInfo.js";

export default function Heropage() {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <>
      <HeroBanner />
      <HeroInfo setActiveSlide={setActiveSlide} />
    </>
  );
}
