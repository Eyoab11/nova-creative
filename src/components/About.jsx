import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
      <p className="font-general text-sm uppercase md:text-[10px]">
  Welcome to{" "}
  <span
    className="inline-block text-2xl md:text-xl font-bold"
    style={{
      fontFamily: "'Great Vibes', cursive",
      background: "linear-gradient(90deg, #ff6f61, #de1d5a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      letterSpacing: "1px",
    }}
  >
    Nova Creatives
  </span>
</p>

        <AnimatedTitle
          title="Un<b>l</b>eash your brand's <br /> ultimate digital <b>s</b>uccess"
          containerClass="mt-5 !text-black text-center"
        />

            <div className="about-subtext">
              <p>Unlock Your Digital Potential—Elevate Your Brand Today</p>
              <p className="text-gray-500">
                Nova Creatives empowers businesses with cutting-edge digital marketing and
                custom software solutions, driving growth in a connected online world
              </p>
            </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/digital_marketing.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
