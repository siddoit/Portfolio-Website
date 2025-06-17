'use client';

import { assets, serviceData } from "@/assets/assets";
import Image from "next/image";
import Link from 'next/link';
import React from "react"; // No need for useState/useEffect here unless you add more interactivity
import { motion } from "framer-motion";

// --- FRAMER MOTION VARIANTS (Consistent definitions) ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const subHeadingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
};
const mainHeadingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.35 } },
};
const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.5 } },
};
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.15 }, // Adjusted delayChildren for smoother start
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 18, duration: 0.5 }, // Slightly tweaked spring
  },
};

// Fallback Icon (as you had, good for robustness)
const ExclamationFallbackIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);


const Services = ({ isDarkMode }) => { // isDarkMode prop received for arrow icon

  // Helper to determine if a link is external
  const isExternalLink = (url) => url && url.startsWith('http');

  // Determine arrow icon based on theme
  const currentArrowIcon = isDarkMode ? (assets.arrow_icon_dark || assets.right_arrow) : assets.right_arrow;

  return (
    <motion.section
      id='services'
      aria-labelledby="services-heading"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className='w-full py-16 md:py-24 scroll-mt-20 px-4 sm:px-8 md:px-12 lg:px-[8%] xl:px-[10%]'
    >
      <motion.h4
        variants={subHeadingVariants}
        className='text-center mb-3 text-lg font-medium font-Outfit text-light-text-secondary dark:text-dark-text-secondary'
      >
        What I Offer
      </motion.h4>
      <motion.h2
        id="services-heading"
        variants={mainHeadingVariants}
        className='text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-Outfit mb-6 text-light-text dark:text-dark-text'
      >
        My Services
      </motion.h2>

      <motion.p
        variants={paragraphVariants}
        className="text-center max-w-xl md:max-w-2xl mx-auto mt-5 mb-12 md:mb-20 text-base md:text-lg leading-relaxed font-Ovo text-light-text-secondary dark:text-dark-text-secondary"
      >
        I leverage my skills in AI/ML, embedded systems, and web technologies to develop innovative solutions for robotics and automation challenges.
      </motion.p>

      {serviceData && serviceData.length > 0 ? (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} // Trigger slightly earlier for the grid itself
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {serviceData.map(({ icon, title, description, link }, index) => {
            const iconToDisplay = icon || assets.placeholder_icon; // Define your assets.placeholder_icon
            const linkIsValid = link && link.trim() !== '' && link !== '#!';
            const isExt = isExternalLink(link);

            return (
            <motion.div
              key={title + index} // Using title+index for key (ensure titles are unique enough)
              variants={cardVariants}
              whileHover={{ y: -7, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              // Removed onClick from card div if link itself is the primary action point
              className="flex flex-col rounded-xl p-6 md:p-8 
                         transition-shadow duration-300 ease-custom-ease group
                         bg-light-card                 dark:bg-dark-card 
                         border border-light-border   dark:border-dark-border
                         hover:shadow-card-hover-light  dark:hover:shadow-card-hover-dark dark:hover:border-dark-primary/50" // Example card hover shadow & border
            >
              {/* Icon with Themed Background */}
              <div className="mb-6 w-12 h-12 p-2.5 flex items-center justify-center rounded-full 
                              bg-light-primary/10 dark:bg-dark-primary/15  
                              transition-transform duration-300 ease-custom-ease group-hover:scale-110">
                {((typeof iconToDisplay === 'string' && iconToDisplay.startsWith('/')) || (typeof iconToDisplay === 'object' && iconToDisplay?.src)) ? (
                  <Image
                    src={iconToDisplay} alt="" // Decorative, as title provides context
                    width={32} height={32}
                    className="w-full h-full object-contain text-light-primary dark:text-dark-primary" // Apply color if SVG and using currentColor
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" title={`Icon for ${title} is missing`}>
                    <ExclamationFallbackIcon className="w-6 h-6 text-gray-400 dark:text-neutral-500" />
                  </div>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold font-Outfit mb-3 text-light-text dark:text-dark-text">
                {title}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-grow font-Ovo text-light-text-secondary dark:text-dark-text-secondary">
                {description}
              </p>
              
              {/* --- "Read more" Link - UPDATED BEHAVIOR --- */}
              {linkIsValid && (
                <Link 
                  href={link}
                  target={isExt ? '_blank' : undefined}
                  rel={isExt ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-1.5 text-sm font-medium mt-auto font-Outfit group/link  // Added group/link for nested group hover
                             text-light-primary           dark:text-dark-primary
                             hover:text-light-primary-hover dark:hover:text-dark-primary-hover
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-card 
                             transition-colors duration-200 ease-custom-ease rounded-sm" // Added rounding for focus ring
                  aria-label={`Learn more about my ${title} services`}
                >
                  Read more
                  <span className="transition-transform duration-200 ease-custom-ease group-hover/link:translate-x-1">
                    {currentArrowIcon && (
                      <Image
                        src={currentArrowIcon} alt=""
                        width={16} height={16}
                        className="w-4 h-4"
                      />
                    )}
                  </span>
                </Link>
              )}
            </motion.div>
          );
        })}
        </motion.div>
      ) : (
        <motion.p variants={paragraphVariants} className="text-center text-light-text-secondary dark:text-dark-text-secondary">
          Services information is currently unavailable.
        </motion.p>
      )}
    </motion.section>
  );
};

export default Services;