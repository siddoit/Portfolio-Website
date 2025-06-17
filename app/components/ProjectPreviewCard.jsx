// app/components/ProjectPreviewCard.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/assets/assets'; // For fallback arrow icon

const ProjectPreviewCard = ({ project, isDarkMode, position }) => {
  if (!project || !position) return null; // Don't render if no project or position data

  // Use data from project.preview if available, otherwise fall back to project's main data for display
  const displayData = project.preview || project; 
  const imageToDisplay = displayData.image || project.bgImage; 
  const titleToDisplay = displayData.headline || project.title;
  const descriptionToDisplay = displayData.summary || project.description;

  const currentArrowIcon = isDarkMode ? (assets.arrow_icon_dark || assets.right_arrow) : assets.right_arrow;

  return (
    <AnimatePresence>
      {project && position.visible && ( // Check project, and position.visible flag
        <motion.div
          key={project.id || project.title} // Stable key
          initial={{ opacity: 0, scale: 0.90, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.90, y: 5, transition: { duration: 0.2, ease: "easeOut" } }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.3 }}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, calc(-100% - 12px))`, // Centered above hovered card, 12px gap
            zIndex: 70, // High z-index to be on top
          }}
          className="w-[260px] sm:w-[280px] p-3.5 rounded-lg shadow-2xl backdrop-blur-lg 
                     bg-white/85 dark:bg-neutral-800/90 
                     border border-gray-200/80 dark:border-neutral-700/80 
                     pointer-events-none overflow-hidden" // pointer-events-none essential
        >
          {imageToDisplay && (
            <div className="aspect-video rounded-md overflow-hidden mb-3 shadow-sm">
              <Image
                src={imageToDisplay}
                alt={`Preview of ${titleToDisplay}`}
                layout="fill"
                objectFit="cover"
                quality={70} // Slightly lower quality for preview image if it's large
                unoptimized={imageToDisplay.startsWith('http')} // If image path could be external for preview
              />
            </div>
          )}
          <h3 className="text-sm font-semibold font-Outfit mb-1 text-gray-800 dark:text-white truncate">
            {titleToDisplay}
          </h3>
          
          <p className="text-[11px] text-gray-600 dark:text-gray-400 font-Ovo line-clamp-2 leading-snug mb-2.5">
            {descriptionToDisplay}
          </p>
          
          {project.link && project.link !== '#!' && (
            <div className="mt-auto text-right"> {/* Aligns link to the right if needed */}
                <Link 
                    href={project.link}
                    target={project.link.startsWith('http') ? "_blank" : undefined}
                    rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-[11px] font-medium 
                               text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300
                               pointer-events-auto p-1 -m-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-current"
                    aria-label={`Visit project: ${project.title}`}
                >
                Visit Link
                {currentArrowIcon && (
                    <Image src={currentArrowIcon} alt="" width={10} height={10} className="w-2.5 h-2.5" />
                )}
                </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPreviewCard;