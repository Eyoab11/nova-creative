import { FaTwitter, FaYoutube, FaMedium, FaEnvelope, FaPhone } from "react-icons/fa";

const socialLinks = [
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
  { href: "mailto:contact@nova.com", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-transparent py-8 text-black">
      <div className="container mx-auto flex flex-row items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <p className="text-lg font-light tracking-wide">
            ©Nova 2024. All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <FaPhone className="text-xl" />
            <p className="text-lg font-light tracking-wide">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <span className="text-2xl">{link.icon}</span>
              </a>
            ))}
          </div>
          <a
            href="#privacy-policy"
            className="text-lg font-light tracking-wide transition-transform duration-300 ease-in-out hover:scale-105 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;