import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation

const navItems = ["HOME", "ABOUT", "SERVICES", "PROJECTS", "CONTACT"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  // State for toggling full-page navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  // Get current location for navigation tracking
  const location = useLocation();

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Toggle full-page menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Animate the navigation bar to stay fixed and transparent
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      opacity: 1,
      duration: 0.2,
    });
  }, []);

  // Scroll to middle of page after navigation
  useEffect(() => {
    const scrollToMiddle = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const middlePosition = (pageHeight - viewportHeight) / 2;

      window.scrollTo({
        top: middlePosition,
        behavior: "smooth",
      });
    };

    // Only scroll if we're navigating to a new page (not just opening/closing menu)
    if (location.pathname !== "/" || location.hash) {
      scrollToMiddle();
    }
  }, [location]); // Trigger on location change

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-0 z-50 h-16 bg-transparent transition-all duration-700"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-6">
            {/* Logo on the left */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-black">
                NOVA CREATIVE
              </Link>
            </div>

            {/* Audio Button in the middle */}
            <div className="flex items-center">
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  <div
                    className={clsx("w-4 h-4 rounded-full", {
                      "bg-black": isIndicatorActive,
                      "bg-gray-400": !isIndicatorActive,
                    })}
                  />
                </div>
              </button>
            </div>

            {/* Hamburger Menu with "MENU" label on the right */}
            <div className="flex items-center gap-2">
              <span className="text-black font-medium text-3xl">MENU</span>
              <button onClick={toggleMenu} className="focus:outline-none">
                {isMenuOpen ? (
                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Full-page navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-100 flex items-center justify-start p-10">
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item === "ABOUT" ? "/about" : `/#${item.toLowerCase()}`}
                className="text-6xl font-bold text-black uppercase hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;