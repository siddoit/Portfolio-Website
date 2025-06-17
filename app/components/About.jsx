'use client';

import { assets, infoList, toolsData } from '@/assets/assets'; // Ensure assets have user_image, icons
import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion"; // Assuming framer-motion

// Framer Motion Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", // Changed to spring for a nice effect
      stiffness: 120,  // Adjust stiffness for bounciness
      damping: 15,    // Adjust damping for how quickly it settles
      duration: 0.7    // Duration is more of a hint for spring animations
    } 
  },
};
const infoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

const toolIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10 } },
};


const About = ({ isDarkMode }) => {
  // Prepare asset paths with fallbacks for icons in infoList
  const processedInfoList = infoList.map(item => ({
    ...item,
    currentIcon: isDarkMode ? (item.iconDark || item.icon) : item.icon,
  }));

  return (
    <motion.section // Changed div to section
      id='about'
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% in view
      className='w-full py-16 md:py-24 scroll-mt-20 px-4 sm:px-8 md:px-12 lg:px-[8%] xl:px-[10%]' // Standardized padding
    >
      <motion.h2
        variants={headingVariants}
        className='text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-Outfit mb-4 text-gray-800 dark:text-white'
      >
        About Me
      </motion.h2>
      <motion.p 
        variants={itemVariants} // Simple variant for the subtitle
        className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-16 md:mb-20 font-Ovo max-w-3xl mx-auto"
      >
        A brief introduction to my journey, passions, and what drives me.
      </motion.p>

      <motion.div
        variants={contentVariants} // This will stagger children: Image, Paragraph, InfoList, Tools
        className='flex w-full flex-col lg:flex-row items-start gap-12 lg:gap-16 max-w-6xl mx-auto' // max-w-6xl for content area
      >
        {/* About Me Image */}
        <motion.div
          variants={imageVariants}
          className='lg:w-2/5 xl:w-1/3 w-full max-w-md mx-auto lg:mx-0 
                     rounded-2xl overflow-hidden shadow-xl 
                     hover:shadow-2xl transition-shadow duration-300 ease-custom-ease group'
        >
          {assets.user_image && ( // Ensure asset exists
            <Image
              src={assets.user_image} alt='Sidharth Sajith - A picture of me'
              width={500} // Set intrinsic width of your user_image
              height={600} // Set intrinsic height (adjust if image is landscape or square)
              className='w-full h-auto object-cover aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group-hover:scale-105 transition-transform duration-300 ease-custom-ease' // Example aspect ratios
              priority={false} // Typically not highest priority unless it's a small page
            />
          )}
        </motion.div>

        {/* About Me Text & Details */}
        <motion.div
          // No specific variant here, will inherit from parent's staggerChildren if parent uses contentVariants
          className='flex-1 mt-8 lg:mt-0'
        >
          <motion.p variants={itemVariants} className='mb-8 md:mb-10 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo max-w-3xl'>
            I am a passionate and driven Mechatronics, Robotics, and Automation Engineering student at Saintgits College. With a strong enthusiasm for AI/ML, I am focused on developing intelligent systems and bridging theoretical knowledge with hands-on projects. My current work involves leveraging tools like PyTorch for complex tasks and exploring cutting-edge technologies such as ROS2 and modern web development with React and Next.js. I thrive on innovative problem-solving and am committed to contributing to the future of intelligent automation and robotics.
          </motion.p>

          {/* InfoList Cards (Languages, Education, Projects style) */}
          {processedInfoList && processedInfoList.length > 0 && (
            <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold font-Outfit mb-6 text-gray-700 dark:text-gray-200">
                    My Credentials
                </h3>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10 md:mb-12'>
                    {processedInfoList.map(({ currentIcon, title, description }, index) => (
                    <motion.li
                        key={index}
                        variants={infoCardVariants} // Staggered animation for each card
                        className={`
                        p-6 rounded-xl transition-all duration-300 ease-custom-ease group 
                        border bg-white hover:shadow-lg hover:-translate-y-1 
                        border-gray-200 
                        dark:bg-darkHover dark:border-neutral-700 dark:hover:border-blue-500 dark:hover:shadow-blue-500/20
                        `}
                    >
                        {currentIcon && (
                        <Image
                            src={currentIcon} alt={`${title} icon`}
                            width={32} height={32} // Slightly larger icons
                            className='w-8 h-8 mb-4 text-light-primary dark:text-dark-primary transition-transform duration-300 group-hover:scale-110' // If SVG, text color can be applied
                        />
                        )}
                        <h4 className='text-lg font-semibold font-Outfit mb-2 text-gray-800 dark:text-white'>{title}</h4>
                        {/* For multi-line descriptions from assets.js (using \n) */}
                        <p className='text-sm text-gray-600 dark:text-gray-400 leading-snug whitespace-pre-line'>
                            {description}
                        </p>
                    </motion.li>
                    ))}
                </ul>
            </motion.div>
          )}
          

          {/* Tools I Use */}
          {toolsData && toolsData.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className='text-2xl font-semibold font-Outfit mb-6 text-gray-700 dark:text-gray-200'>
                Tools & Technologies
              </h3>
              <ul className='flex flex-wrap items-center gap-3 sm:gap-4'>
                {toolsData.map((toolIconPath, index) => (
                  <motion.li
                    key={index}
                    variants={toolIconVariants}
                    whileHover={{ y: -3, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
                    title={`Tool ${index + 1}`} // You could add actual tool names here if toolsData becomes an array of objects
                    className='p-2 sm:p-3 border border-gray-300 dark:border-neutral-700 rounded-lg 
                               bg-gray-50 dark:bg-neutral-800 
                               cursor-pointer shadow-sm hover:shadow-md'
                  >
                    <Image
                      src={toolIconPath} alt={`Tech tool ${index + 1}`}
                      width={28} height={28} // For w-7 in CSS
                      className='w-6 h-6 sm:w-7 sm:h-7 object-contain'
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;