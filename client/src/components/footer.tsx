import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const programLinks = [
  { name: "Software Development", href: "#" },
  { name: "Data Science", href: "#" },
  { name: "AI & Machine Learning", href: "#" },
  { name: "DevOps & Cloud", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Blog", href: "#" },
];

const supportLinks = [
  { name: "Help Center", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID RESPONSIVE FIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand / Social Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">Qualibytes</h3>
            <p className="text-gray-300 mb-4">
              Transforming careers through quality tech education
            </p>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* PROGRAMS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300">
              {programLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Details</h4>
            <ul className="space-y-3 text-gray-300">

              <li className="flex items-start gap-2">
                📍 D-9, Block-D, Sector 3, Noida, Uttar Pradesh – 201301
              </li>

              <li className="flex items-center gap-2">
                📞
                <a href="tel:+918920942738" className="hover:text-white transition-colors">
                  +91 89209 42738
                </a>
              </li>

              <li className="flex items-center gap-2">
                ✉️
                <a href="mailto:hi@qualibytes.com" className="hover:text-white transition-colors">
                  hi@qualibytes.com
                </a>
              </li>

              <li className="flex items-center gap-2">
                🌐
                <a
                  href="https://www.qualibytes.com"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.qualibytes.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Qualibytes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
