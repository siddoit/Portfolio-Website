'use client';

import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";

// Framer Motion Variant for a subtle fade-in
const footerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } // Slightly delayed fade-in
  },
};

const Footer = ({ isDarkMode }) => {
  const currentLogo = isDarkMode ? (assets.logo_dark || assets.logo) : assets.logo;
  const currentMailIcon = isDarkMode ? (assets.mail_icon_dark || assets.mail_icon) : assets.mail_icon;
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      // REMOVED: Distinct background and prominent top border. Added more bottom padding.
      // A very subtle top border can be added back if desired for slight separation.
      className='w-full pt-12 md:pt-16 pb-10 md:pb-12 mt-20' 
    >
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Optional: Logo and Email - can be removed if too much for a minimal footer */}
        {/* If keeping, ensure they don't feel too heavy */}
        <div className='text-center mb-8 md:mb-10'>
          {currentLogo && (
            <Link href="#top" passHref legacyBehavior>
              <a className="inline-block mb-5 group" aria-label="Navigate to top of page">
                <Image 
                  src={currentLogo} alt="Sidharth Sajith - Logo" 
                  width={120} // Adjusted: Slightly smaller for a less prominent footer logo
                  height={30} // Adjusted: Corresponding height
                  className='w-28 sm:w-32 h-auto mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-200' // Made slightly transparent
                />
              </a>
            </Link>
          )}
          {assets.mail_icon && (
            <a 
              href="mailto:sidharthsajith005@gmail.com" 
              className='w-max flex items-center justify-center gap-2.5 sm:gap-3 mx-auto 
                         text-sm sm:text-base font-medium 
                         text-gray-500 dark:text-gray-400  // Subtler text color
                         hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200'
            >
              {currentMailIcon && (
                <Image 
                  src={currentMailIcon} alt="Email icon" 
                  width={20} height={20} // Adjusted: Slightly smaller mail icon
                  className='w-4 sm:w-5 h-auto opacity-80' // Subtler icon
                />
              )}
              sidharthsajith005@gmail.com
            </a>
          )}
        </div>

        {/* Divider for the very bottom part - subtle */}
        <div className="border-t border-gray-200 dark:border-neutral-700/60 my-6 md:my-8 max-w-xs mx-auto"></div>


        <div className='text-center sm:flex sm:items-center sm:justify-between 
                        max-w-3xl mx-auto px-4'> {/* Slightly padded this inner section */}
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-Outfit'>
            © {currentYear} Sidharth Sajith. All rights reserved.
          </p>
          <ul className='flex items-center justify-center gap-5 sm:gap-6 mt-4 sm:mt-0'>
            <li>
              <a 
                target='_blank' rel='noopener noreferrer' 
                href="https://github.com/siddoit" 
                aria-label="Sidharth Sajith's GitHub Profile"
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                GitHub
              </a>
            </li>
            <li>
              <a 
                target='_blank' rel='noopener noreferrer' 
                href="https://www.linkedin.com/in/sidharth-sajith-35403a308/" 
                aria-label="Sidharth Sajith's LinkedIn Profile"
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
         {/* Optional: "Built with..."/"Inspired by..." line for a very subtle touch */}
        <p className="text-center text-xs text-gray-400 dark:text-neutral-500 mt-8 font-Outfit">
          Crafted with Next.js & Tailwind CSS
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;