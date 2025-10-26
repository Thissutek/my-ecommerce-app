import { useState } from "react";
import Carousel from "./Carousel";

export default function HeroInfo() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative">
      {/* HeroInfo Section - Rounded Corners + Lowered Position */}
      <div
        className="absolute left-0 w-full bg-white p-8 rounded-t-[40px] shadow-lg z-10 
        translate-y-24"
      >
        {" "}
        {/* Move Down */}
        <h2 className="text-xl font-semibold">Define Your Style</h2>
        <p className="text-base">
          Your style is your statement. Customize it here.
        </p>
        {/* Interactive Quotes */}
        <div className="flex flex-col gap-4 mt-4">
          {["Make your choices", "Show us who you are", "We can help"].map(
            (text, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r 
              from-gray-700 to-gray-900 transition-all duration-300 hover:from-pink-500 
              hover:to-purple-500"
              >
                {text}
              </button>
            ),
          )}
        </div>
        {/* Carousel Component */}
        <Carousel activeIndex={activeSlide} />
      </div>
    </div>
  );
}
