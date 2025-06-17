'use client';

import { assets } from '@/assets/assets'; // Ensure all assets are defined
import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion"; // Using framer-motion as it's common for this syntax

const Header = ({ isDarkMode }) => { // isDarkMode prop received, though not explicitly used in this version for styling yet, but good to have
  // Motion variants for a staggered effect (optional, but nice for grouped animations)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation of children
        delayChildren: 0.3,   // Initial delay before children start
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, duration: 0.8 },
    },
  };

  const profileImageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 10, duration: 0.7 },
    },
  };

  const buttonVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 80, duration: 0.6 },
    }
  }

  // Make sure these assets are defined in assets/assets.js
  const profileImageSrc = assets.profile_img;
  const handIconSrc = assets.hand_icon;
  const rightArrowWhiteSrc = assets.right_arrow_white;
  const downloadIconSrc = assets.download_icon;
  const resumePath = "/Sidharth_Sajith_Resume.pdf"; // PLACEHOLDER - MUST BE IN /public folder

  return (
    <header 
      id="top" // For the "Home" link in Navbar
      className="w-11/12 max-w-4xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-y-5 sm:gap-y-6 py-12 md:py-16" // Changed max-w-3xl to 4xl, h-screen to min-h-screen for flexibility, adjusted gaps and padding
    >
      {/* Profile Image */}
      <motion.div
        variants={profileImageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
        className="mb-2 sm:mb-4" // Added some bottom margin
      >
        {profileImageSrc && (
          <Image 
            src={profileImageSrc} 
            alt="Sidharth Sajith profile picture" 
            width={144} // e.g., 32 * 4.5 (w-32 is 128px, 144px provides good quality)
            height={144}
            className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-contain bg-gray-100 dark:bg-neutral-700 shadow-lg border-2 border-white dark:border-darkTheme" // Adjusted size and added border/shadow
            priority={true} // Important for LCP
            quality={90}
          />
        )}
      </motion.div>

      {/* Pre-title / Greeting */}
      <motion.h2 // Changed to h2 for semantic structure
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center justify-center gap-2 text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300" // font-medium for emphasis
      >
        Hi! I'm Sidharth Sajith
        {handIconSrc && (
          <Image src={handIconSrc} alt="Waving hand icon" width={28} height={28} className="w-6 sm:w-7" />
        )}
      </motion.h2>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="font-Outfit font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                   leading-tight sm:leading-tight md:leading-tight 
                   text-gray-800 dark:text-white" // Explicit font, color
        // If you used <br /> for line break previously:
        // dangerouslySetInnerHTML={{ __html: "Robotics & Automation<br />student based in Kerala" }}
        // OR better:
      >
        Robotics & Automation <br className="sm:hidden"/> {/* Break line only on small screens if needed */}
        Engineer
        {/* student <span className="block sm:inline">based in Kerala</span> */}{/* Previous line break style */}
      </motion.h1>

      {/* Sub-headline / Description */}
      <motion.p
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-2xl mx-auto font-Ovo text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
      >
        A passionate Mechatronics, Robotics, and Automation Engineering student, blending hands-on innovation with AI/ML. Currently developing intelligent systems using PyTorch-CUDA and exploring ROS2 & modern web technologies.
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8"
        // For grouped button animation (optional)
        // variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {/* Contact Me Button */}
        <motion.a
          href="#contact"
        //   variants={buttonVariants} // Use if parent is containerVariants
          initial={{ y:30, opacity:0 }} whileInView={{ y:0, opacity:1 }} transition={{duration:0.6, delay:0.4, type: 'spring', stiffness:80}} viewport={{ once: true }}
          className="px-8 sm:px-10 py-3 text-sm sm:text-base rounded-full font-semibold flex items-center justify-center gap-2
                     text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:focus:ring-offset-darkTheme
                     dark:bg-dark-primary dark:hover:bg-opacity-80 dark:text-white dark:focus:ring-dark-primary
                     transition-all duration-300 ease-custom-ease transform hover:scale-105 shadow-md"
        >
          Contact me
          {rightArrowWhiteSrc && (
            <Image src={rightArrowWhiteSrc} alt="" width={16} height={16} className="w-4 h-4 ml-1" />
          )}
        </motion.a>

        {/* My Resume Button */}
        <motion.a
          href={resumePath}
          download="Sidharth_Sajith_Resume.pdf" // Suggests the filename for download
        //   variants={buttonVariants} // Use if parent is containerVariants
          initial={{ y:30, opacity:0 }} whileInView={{ y:0, opacity:1 }} transition={{duration:0.6, delay:0.6, type: 'spring', stiffness:80}} viewport={{ once: true }}
          className="px-8 sm:px-10 py-3 text-sm sm:text-base border rounded-full font-semibold flex items-center justify-center gap-2
                     border-gray-600 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-darkTheme
                     dark:border-gray-400 dark:text-gray-300 dark:hover:bg-darkHover
                     transition-all duration-300 ease-custom-ease transform hover:scale-105 shadow-md"
        >
          My Resume
          {downloadIconSrc && (
            <Image src={downloadIconSrc} alt="" width={16} height={16} className="w-4 h-4 ml-1" />
          )}
        </motion.a>
      </motion.div>
    </header>
  );
};

export default Header;