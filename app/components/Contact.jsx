'use client';

import { assets } from '@/assets/assets'; // Ensure assets.right_arrow_white exists
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from "framer-motion"; // Assuming framer-motion

// Framer Motion Variants for consistent animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.35 } },
};

const formElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.1 } }, // Added slight delay to individual items if staggered from form
};

const formContainerVariants = { // To stagger children input/textarea
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5, // Start animating children after initial form fade-in
            staggerChildren: 0.15,
        },
    },
};


const Contact = ({ isDarkMode }) => { // Receive isDarkMode if needed for assets not handled by CSS
  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false); // For loading state on button

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "7274371c-3d8a-4611-8c23-afbe82529bc1"); // Keep your access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        console.error("Error from Web3Forms:", data);
        setResult(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network or Submission Error:", error);
      setResult("An error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  // Determine dynamic asset paths
  const rightArrowSubmit = isDarkMode ? (assets.right_arrow_white) : assets.right_arrow_white; // Assuming white arrow for dark button bg

  return (
    <motion.section // Changed div to section
      id='contact'
      aria-labelledby="contact-heading"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      // Background image styling reviewed:
      // Using CSS variables for cleaner control if needed, or direct classes
      // For a subtle background that doesn't interfere with readability:
      className='relative w-full py-16 md:py-24 scroll-mt-20 px-4 sm:px-8 md:px-12 lg:px-[8%] xl:px-[10%] 
                 overflow-hidden isolate' // isolate for z-index stacking context if needed
    >
      {/* Decorative background - subtle pattern or gradient preferred over large image */}
      {assets.footer_bg_color && ( // Check if asset is defined
        <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-[0.03]" aria-hidden="true">
          <Image
            src={assets.footer_bg_color} // CORRECTED FILENAME (was "footer-bg-color=png")
            alt="" // Decorative
            layout="fill"
            objectFit="cover" // Or "contain" and adjust opacity/blur if it's a pattern
            className="blur-sm" // Example: subtle blur
            // Dark mode will inherently hide it if no dark variant specified. 
            // If you want a different subtle bg for dark mode, handle it here or via CSS.
          />
        </div>
      )}
      
      <motion.h4
        variants={headingVariants}
        className='text-center mb-3 text-lg font-medium font-Outfit text-gray-600 dark:text-gray-400'
      >
        Connect With Me
      </motion.h4>
      <motion.h2
        id="contact-heading"
        variants={headingVariants}
        transition={{ ...headingVariants.visible.transition, delay:0.3 }} // slightly later delay
        className='text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-Outfit mb-6 text-gray-800 dark:text-white'
      >
        Get In Touch
      </motion.h2>
      <motion.p
        variants={paragraphVariants}
        className="text-center max-w-xl md:max-w-2xl mx-auto mt-5 mb-12 md:mb-20 text-base md:text-lg leading-relaxed font-Ovo text-gray-700 dark:text-gray-300"
      >
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
      </motion.p>

      <motion.form
        variants={formContainerVariants} // Use container to stagger children
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        onSubmit={onSubmit}
        className='max-w-xl mx-auto space-y-6' // Using space-y for consistent vertical spacing
        aria-live="polite" // For announcing "result" changes
      >
        {/* Name Input */}
        <motion.div variants={formElementVariants}>
          <label htmlFor="name" className="sr-only">Your Name</label> {/* Visually hidden label for a11y */}
          <input
            id="name" type='text' placeholder='Enter your name' required name='name'
            className='w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-lg border 
                       border-gray-300 dark:border-neutral-600 
                       bg-white dark:bg-darkHover/30
                       text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
                       placeholder-gray-400 dark:placeholder-neutral-500 transition-colors duration-200'
                       // Typo: out;ine-none -> outline-none
          />
        </motion.div>

        {/* Email Input */}
        <motion.div variants={formElementVariants}>
          <label htmlFor="email" className="sr-only">Your Email</label>
          <input
            id="email" type='email' placeholder='Enter your email' required name='email' // Changed type to 'email' for validation
            className='w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-lg border 
                       border-gray-300 dark:border-neutral-600 
                       bg-white dark:bg-darkHover/30 
                       text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
                       placeholder-gray-400 dark:placeholder-neutral-500 transition-colors duration-200'
          />
        </motion.div>

        {/* Message Textarea */}
        <motion.div variants={formElementVariants}>
          <label htmlFor="message" className="sr-only">Your Message</label>
          <textarea
            id="message" rows='6' placeholder='Enter your message' required name='message'
            className='w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-lg border 
                       border-gray-300 dark:border-neutral-600 
                       bg-white dark:bg-darkHover/30 
                       text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
                       placeholder-gray-400 dark:placeholder-neutral-500 transition-colors duration-200 resize-none' // Added resize-none
          />
        </motion.div>
        
        {/* Submit Button & Result Message */}
        <motion.div variants={formElementVariants} className="text-center"> {/* Centering the button */}
          <button
            type='submit'
            disabled={isSending} // Disable button while sending
            className={`
              py-3 px-8 sm:py-3.5 sm:px-10 w-auto min-w-[150px] inline-flex items-center justify-center gap-2 
              text-sm sm:text-base font-semibold rounded-full 
              transition-all duration-300 ease-custom-ease transform hover:scale-105 group shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme
              ${isSending 
                ? 'bg-gray-400 dark:bg-neutral-600 cursor-not-allowed' 
                : `text-white bg-gray-800 hover:bg-gray-700 focus:ring-gray-800
                   dark:text-white dark:bg-dark-primary dark:hover:bg-opacity-80 dark:focus:ring-dark-primary`
              }
            `}
          >
            {isSending ? (
                <>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                    Sending...
                </>
            ) : (
                <>
                    Submit Message
                    {rightArrowSubmit && ( // Check if asset is defined
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                        <Image src={rightArrowSubmit} alt="" width={16} height={16} className='w-4 h-4' />
                      </span>
                    )}
                </>
            )}
          </button>
          {result && ( // Only show if there's a result message
            <p className={`mt-5 text-sm font-medium
                           ${result.toLowerCase().includes("success") 
                             ? "text-green-600 dark:text-green-400" 
                             : "text-red-600 dark:text-red-400"}`}
               aria-atomic="true" // Helps screen readers announce changes to this specific area
            >
              {result}
            </p>
          )}
        </motion.div>
      </motion.form>
    </motion.section>
  );
};

export default Contact;