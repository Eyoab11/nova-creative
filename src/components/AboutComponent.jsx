import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutComponent = () => {
  const headingRef = useRef(null);
  const cardLeftRefs = useRef([]);
  const cardRightRefs = useRef([]);
  const teamCardRefs = useRef([]); // Ref for team cards
  const marqueeRef = useRef(null); // Ref for the marquee container

  // Animation for the h1 in the second section (slide from left to middle)
  useEffect(() => {
    const heading = headingRef.current;

    gsap.fromTo(
      heading,
      {
        x: "-100%", // Start from the left (off-screen)
        opacity: 0,
      },
      {
        x: "0%", // Move to the middle
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Animation for cards on the left (slide from left)
  useEffect(() => {
    cardLeftRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        {
          x: "-100%", // Start from the left (off-screen)
          opacity: 0,
        },
        {
          x: "0%", // Move to the center
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Animation for cards on the right (slide from right)
  useEffect(() => {
    cardRightRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        {
          x: "100%", // Start from the right (off-screen)
          opacity: 0,
        },
        {
          x: "0%", // Move to the center
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Animation for team cards (fade in and scale up)
  useEffect(() => {
    teamCardRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8, // Start slightly scaled down
          y: 50, // Start slightly below
        },
        {
          opacity: 1,
          scale: 1, // Scale to normal size
          y: 0, // Move to original position
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Marquee animation for the company logos
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const logos = marquee.children;
    const totalWidth = Array.from(logos).reduce((acc, logo) => acc + logo.offsetWidth, 0);

    // Duplicate the logos to create a seamless loop
    const clone = marquee.innerHTML;
    marquee.innerHTML += clone;

    // GSAP animation to move the logos to the left
    gsap.to(marquee, {
      x: -totalWidth,
      duration: 20, // Adjust speed (lower = faster)
      ease: "none",
      repeat: -1, // Infinite loop
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`, // Seamless loop
      },
    });
  }, []);

  // Helper to add refs to cardLeftRefs
  const addToLeftRefs = (el) => {
    if (el && !cardLeftRefs.current.includes(el)) {
      cardLeftRefs.current.push(el);
    }
  };

  // Helper to add refs to cardRightRefs
  const addToRightRefs = (el) => {
    if (el && !cardRightRefs.current.includes(el)) {
      cardRightRefs.current.push(el);
    }
  };

  // Helper to add refs to teamCardRefs
  const addToTeamCardRefs = (el) => {
    if (el && !teamCardRefs.current.includes(el)) {
      teamCardRefs.current.push(el);
    }
  };

  // State for the team section filter
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false); // State for "See More"

  // Sample team data with categories (duplicated to 8 members)
  const teamMembers = [
    { name: "Sara Desalegn", role: "Founder", category: "Manager", image: "/img/person-4.jpg" },
    { name: "Abebe Mitike", role: "VP Global Partner Services", category: "Branding", image: "/img/person-1.jpg" },
    { name: "Kirubel Desalegn", role: "Curation Director", category: "Technology", image: "/img/person-2.jpg" },
    { name: "Leah Kebede", role: "CMO", category: "Branding", image: "/img/person-3.jpg" },
    { name: "Sara Desalegn", role: "Founder", category: "Manager", image: "/img/person-4.jpg" }, // Duplicate
    { name: "Abebe Mitike", role: "VP Global Partner Services", category: "Branding", image: "/img/person-1.jpg" }, // Duplicate
    { name: "Kirubel Desalegn", role: "Curation Director", category: "Technology", image: "/img/person-2.jpg" }, // Duplicate
    { name: "Leah Kebede", role: "CMO", category: "Branding", image: "/img/person-3.jpg" }, // Duplicate
  ];

  // Sample company logos data
  const companyLogos = [
    { name: "Logopsum", image: "/img/logopsum.png" },
    { name: "Lunyr", image: "/img/lunyr.png" },
    { name: "Power Module", image: "/img/power-module.png" },
    { name: "Loco", image: "/img/loco.png" },
    { name: "Logopsum", image: "/img/logopsum.png" }, // Duplicate for more logos
    { name: "Lunyr", image: "/img/lunyr.png" },
    { name: "Power Module", image: "/img/power-module.png" },
    { name: "Loco", image: "/img/loco.png" },
  ];

  // Filter team members based on the active filter
  const filteredMembers = activeFilter === "All"
    ? teamMembers
    : teamMembers.filter(member => member.category === activeFilter);

  // Limit the displayed members based on showAll state
  const displayedMembers = showAll ? filteredMembers : filteredMembers.slice(0, 4);

  return (
    <div className="bg-gray-100">
      {/* First Section (Existing) */}
      <section className="min-h-screen w-screen flex items-center justify-center">
        <div className="text-center px-4">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black uppercase leading-tight">
            Create <br /> Grow Your Brand <br /> Shaping Digital Experiences
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg mx-auto text-sm md:text-base text-black opacity-70">
            With a passion for creativity and a commitment to excellence, we
            empower brands to thrive in the ever-evolving digital landscape.
          </p>

          {/* Call-to-Action Button */}
          <button className="mt-8 px-6 py-3 border border-black rounded-full text-black font-semibold hover:bg-black hover:text-white transition duration-300">
            Book A Free Call!
          </button>
        </div>
      </section>

      {/* Second Section (Updated for Responsiveness) */}
      <section className="min-h-screen w-screen flex items-center justify-center py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Large Heading */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-9xl font-bold text-black uppercase leading-none"
            >
              We Are <br />
              Nova Creative
            </h1>
          </div>

          {/* Right Side: Description */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
            <p className="max-w-md mx-auto md:mx-0 text-base sm:text-lg text-black opacity-70">
              We're not just a design agency; we're storytellers, crafting every
              brand narrative with vision, precision, and a touch of magic.
            </p>
          </div>
        </div>
      </section>

      {/* Third Section (Image Section) */}
      <section className="w-screen py-10">
        <div className="container mx-auto px-4">
          <div className="relative w-full aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
            <img
              src="/img/brand.jpg"
              alt="Nova Creative Team"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Fourth Section (Stats Cards) */}
      <section className="w-screen py-10 mt-20 sm:mt-32 md:mt-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Card 1: 50+ Projects Completed (Left) */}
            <div
              ref={addToLeftRefs}
              className="bg-gray-200 rounded-lg p-12 text-center min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col justify-center items-center transition-all duration-150 hover:bg-gray-300"
              onMouseEnter={(e) => {
                const h2 = e.currentTarget.querySelector("h2");
                gsap.to(h2, {
                  y: -20, // Jump up
                  scale: 1.1, // Slightly scale up
                  duration: 0.15, // Faster duration (150ms)
                  ease: "power2.out",
                  yoyo: true, // Go back to original position
                  repeat: 1, // Repeat once (jump up and back down)
                });
              }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-black">
                50+
              </h2>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-black uppercase max-w-[200px] mx-auto">
                Projects Completed
              </p>
            </div>

            {/* Card 2: 90+ Creative Minds (Right) */}
            <div
              ref={addToRightRefs}
              className="bg-gray-200 rounded-lg p-12 text-center min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col justify-center items-center transition-all duration-150 hover:bg-gray-300"
              onMouseEnter={(e) => {
                const h2 = e.currentTarget.querySelector("h2");
                gsap.to(h2, {
                  y: -20, // Jump up
                  scale: 1.1, // Slightly scale up
                  duration: 0.15, // Faster duration (150ms)
                  ease: "power2.out",
                  yoyo: true, // Go back to original position
                  repeat: 1, // Repeat once (jump up and back down)
                });
              }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-black">
                90+
              </h2>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-black uppercase max-w-[200px] mx-auto">
                Creative Minds
              </p>
            </div>

            {/* Card 3: 20+ Years of Experience (Left) */}
            <div
              ref={addToLeftRefs}
              className="bg-gray-200 rounded-lg p-12 text-center min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col justify-center items-center transition-all duration-150 hover:bg-gray-300"
              onMouseEnter={(e) => {
                const h2 = e.currentTarget.querySelector("h2");
                gsap.to(h2, {
                  y: -20, // Jump up
                  scale: 1.1, // Slightly scale up
                  duration: 0.15, // Faster duration (150ms)
                  ease: "power2.out",
                  yoyo: true, // Go back to original position
                  repeat: 1, // Repeat once (jump up and back down)
                });
              }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-black">
                20+
              </h2>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-black uppercase max-w-[200px] mx-auto">
                Years of Experience
              </p>
            </div>

            {/* Card 4: 30+ Awards and Recognitions (Right) */}
            <div
              ref={addToRightRefs}
              className="bg-gray-200 rounded-lg p-12 text-center min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col justify-center items-center transition-all duration-150 hover:bg-gray-300"
              onMouseEnter={(e) => {
                const h2 = e.currentTarget.querySelector("h2");
                gsap.to(h2, {
                  y: -20, // Jump up
                  scale: 1.1, // Slightly scale up
                  duration: 0.15, // Faster duration (150ms)
                  ease: "power2.out",
                  yoyo: true, // Go back to original position
                  repeat: 1, // Repeat once (jump up and back down)
                });
              }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-black">
                30+
              </h2>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-black uppercase max-w-[200px] mx-auto">
                Awards and Recognitions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section (Our Team Heading) */}
      <section className="min-h-screen w-screen flex items-center justify-center py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Large Heading */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-9xl font-bold text-black uppercase leading-none"
            >
              Our <br />
              Team!
            </h1>
          </div>

          {/* Right Side: Description */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
            <p className="max-w-md mx-auto md:mx-0 text-base sm:text-lg text-black opacity-70">
              We're not just a design agency; we're storytellers, crafting every
              brand narrative with vision, precision, and a touch of magic.
            </p>
          </div>
        </div>
      </section>

      {/* Sixth Section (Team Cards with Filter) */}
      <section className="w-screen py-10">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-10">
            {["All", "Branding", "Technology", "Manager"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedMembers.map((member, index) => (
              <div
                key={index}
                ref={addToTeamCardRefs}
                className="relative bg-gray-200 rounded-lg overflow-hidden flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10"
              >
                {/* Image */}
                <div className="w-full h-[45vh] sm:h-[35vh] md:h-[40vh]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {member.category}
                  </span>
                </div>

                {/* Name and Role */}
                <div className="p-6 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-black">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base md:text-base text-black opacity-70">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {filteredMembers.length > 4 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 bg-gray-200 text-black hover:bg-gray-300"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Seventh Section (We've Worked For...) */}
      <section className="w-screen py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black text-center mb-12">
            We've worked for...
          </h2>

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <div
              ref={marqueeRef}
              className="flex flex-row space-x-8 whitespace-nowrap"
            >
              {companyLogos.map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 rounded-lg p-6 flex items-center justify-center"
                >
                  <img
                    src={company.image}
                    alt={company.name}
                    className="h-12 sm:h-16 md:h-20 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;