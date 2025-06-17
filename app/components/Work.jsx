'use client';

import { assets, workData } from '@/assets/assets'; // Ensure assets.right_arrow etc. are available
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useCallback } from 'react'; // Added useCallback
import { motion } from "framer-motion";
import ProjectPreviewCard from './ProjectPreviewCard'; // Ensure this path is correct

// --- FRAMER MOTION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const headingVariants = { 
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, 
};
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delayChildren: 0.3, staggerChildren: 0.15 } 
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 } 
  },
};
const buttonContainerVariants = { 
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
};
// --- END OF VARIANTS ---


const Work = ({ isDarkMode }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0, visible: false });
  // No need for gridRef if ProjectPreviewCard uses fixed positioning based on viewport coords from getBoundingClientRect

  // useCallback for performance if these were passed to many children, though not strictly necessary here
  const handleMouseEnter = useCallback((project, event) => {
    setHoveredProject(project);
    if (event.currentTarget) {
        const cardRect = event.currentTarget.getBoundingClientRect();
        // For fixed positioning, cardRect.left and cardRect.top are viewport-relative
        // ProjectPreviewCard will use these and transform itself to be centered above the card's top edge.
        setPreviewPosition({ 
            x: cardRect.left + (cardRect.width / 2), // Horizontal center of the hovered card
            y: cardRect.top,                         // Top edge of the hovered card
            visible: true 
        });
    }
  }, []); // Empty dependency array: function is created once

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
    // Allow ProjectPreviewCard to animate out using its own exit animation via AnimatePresence
    // So just make it not render by setting visible to false or hoveredProject to null
    setPreviewPosition(prev => ({ ...prev, visible: false })); 
  }, []);


  return (
    <motion.section
      id='work'
      aria-labelledby="work-heading"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className='w-full py-16 md:py-24 scroll-mt-20 px-4 sm:px-8 md:px-12 lg:px-[8%] xl:px-[10%] relative' // Ensure no "position: relative" if preview is fixed and viewport-positioned
    >
      {/* Section Headings & Paragraph */}
      <motion.h4
        variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}
        transition={{ ...headingVariants.visible.transition, delay: 0.2 }}
        className='text-center mb-3 text-lg font-medium font-Outfit text-light-text-secondary dark:text-dark-text-secondary'
      >
        My Portfolio
      </motion.h4>
      <motion.h2
        id="work-heading" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}
        transition={{ ...headingVariants.visible.transition, delay: 0.35 }}
        className='text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-Outfit mb-6 text-light-text dark:text-dark-text'
      >
        My Latest Work
      </motion.h2>
      <motion.p
        variants={paragraphVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
        className="text-center max-w-xl md:max-w-2xl mx-auto mt-5 mb-12 md:mb-20 text-base md:text-lg leading-relaxed font-Ovo text-light-text-secondary dark:text-dark-text-secondary"
      >
        Welcome to my development portfolio! Here lies a collection of my projects, showcasing my expertise in creating innovative and practical solutions.
      </motion.p>

      {/* Project Cards Grid */}
      {workData && workData.length > 0 ? (
        <motion.div
          // ref={gridRef} // Not needed if preview positioning is based on viewport-relative cardRect
          variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8" // Removed `relative` here as preview is fixed
        >
          {workData.map((project, index) => (
            <motion.div
              key={project.id || project.title + index}
              variants={cardVariants}
              onMouseEnter={(e) => handleMouseEnter(project, e)} // Pass the event object
              onMouseLeave={handleMouseLeave}
              className='group rounded-xl overflow-hidden shadow-lg hover:shadow-card-hover-light dark:hover:shadow-card-hover-dark 
                         transition-all duration-300 ease-custom-ease 
                         bg-light-card dark:bg-dark-card flex flex-col'
            >
              {/* --- Link now wraps the image only if project.link is valid, allowing card hover for preview --- */}
              <div className="block aspect-[16/10] md:aspect-[16/9] relative overflow-hidden">
                {project.bgImage && (
                  <Image
                    src={project.bgImage} alt={`Screenshot of ${project.title}`}
                    layout="fill" objectFit="cover"
                    className="transition-transform duration-500 ease-custom-ease group-hover:scale-105"
                    quality={80}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) calc(50vw - 3rem), 400px" // Adjusted sizes for gaps
                  />
                )}
                {/* Clickable Overlay only if there's a valid link */}
                {project.link && project.link !== '#!' && (
                    <Link 
    href={project.link} 
    // No legacyBehavior, No passHref needed with new behavior
    target={project.link.startsWith('http') ? "_blank" : undefined}
    rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
    aria-label={`View details for ${project.title}`}
    // All classes now on the Link component itself
    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-custom-ease 
               flex items-center justify-center cursor-pointer
               focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dark-primary rounded-xl" // Added focus style to the Link overlay
  >
    {/* Content of the link (the overlay icon) */}
    <div className="p-3 bg-white/25 dark:bg-black/35 backdrop-blur-sm rounded-full text-white group-hover:scale-110 transition-transform duration-300">
      <Image 
        src={isDarkMode ? (assets.arrow_icon_dark || assets.right_arrow) : assets.right_arrow } 
        alt="" // Decorative since Link has aria-label
        width={20} height={20} className="w-5 h-5" 
      /> 
    </div>
  </Link>
                )}
              </div>
              
              {/* Text content below the image */}
              <div className="p-5 md:p-6 bg-light-card dark:bg-dark-card flex-grow flex flex-col"> {/* Using theme card colors */}
                <h3 className='font-Outfit font-semibold text-lg md:text-xl mb-2 text-light-text dark:text-dark-text'>
                  {project.title}
                </h3>
                <p className='font-Ovo text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed line-clamp-3 mb-4 flex-grow'>
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                    <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map(tag => (
                            <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-darkHover dark:text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* ProjectPreviewCard - positioned using 'fixed' strategy in its own component style prop */}
          <ProjectPreviewCard 
            project={hoveredProject} // AnimatePresence in ProjectPreviewCard handles visibility
            isDarkMode={isDarkMode}
            // position prop now directly passes x,y from getBoundingClientRect for 'fixed' positioning.
            // The actual transform (translate(-50%, calc(-100% - 10px))) is handled INSIDE ProjectPreviewCard.
            position={previewPosition.visible ? { x: previewPosition.x, y: previewPosition.y } : null} 
          />
        </motion.div>
      ) : (
        <motion.p variants={paragraphVariants} className="text-center text-light-text-secondary dark:text-dark-text-secondary font-Outfit">
          No projects to display at the moment.
        </motion.p>
      )}

      {/* "Show More" Button */}
      {workData && workData.length > 4 && ( // Adjusted condition slightly for a 2-col layout
        <motion.div
          variants={buttonContainerVariants} 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link 
            href={process.env.NEXT_PUBLIC_PROJECTS_PAGE_URL || "/projects"} // Example for a dedicated projects page URL from env
            className='w-max flex items-center justify-center gap-2 
                       font-Outfit text-base font-medium 
                       border rounded-full py-3 px-8 sm:px-10 mx-auto 
                       transition-all duration-300 ease-custom-ease group
                       border-gray-600 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600/50 focus-visible:ring-offset-2
                       dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-darkTheme dark:focus-visible:ring-gray-400/50 dark:focus-visible:ring-offset-darkTheme'
          >
            Show all projects {/* More descriptive */}
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <Image 
                src={isDarkMode ? (assets.arrow_icon_dark || assets.right_arrow_bold) : assets.right_arrow_bold} 
                alt="" width={16} height={16} className='w-4 h-4' 
              />
            </span>
          </Link>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Work;