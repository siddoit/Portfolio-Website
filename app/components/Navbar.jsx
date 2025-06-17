'use client';

import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';
// Removed Framer Motion import as it's not directly used for element animations in Navbar itself in this version
// If you plan to animate the Navbar appearance as a whole, it could be added to a parent or here.

// Reusable NavLinkItem Component (already using new Link behavior)
const NavLinkItem = ({ href, children, onClick, isMobile = false }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={`
        block rounded-md text-sm font-medium transition-colors duration-200 ease-custom-ease
        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme
        ${isMobile 
          ? 'px-3 py-3 text-base hover:bg-light-hover-subtle dark:hover:bg-dark-hover-subtle focus:bg-light-hover-subtle dark:focus:bg-dark-hover-subtle' 
          : 'px-3 py-2 hover:text-light-primary focus:text-light-primary dark:hover:text-dark-primary dark:focus:text-dark-primary'
        }
        text-light-text-secondary dark:text-dark-text-secondary 
        focus:ring-light-primary dark:focus:ring-dark-primary 
      `}
    >
      {children}
    </Link>
  </li>
);


const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null); 

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ( isMobileMenuOpen && sideMenuRef.current && !sideMenuRef.current.contains(event.target) && mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#top', label: 'Home' },
    { href: '#about', label: 'About Me' },
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'My Work' },
    { href: '#contact', label: 'Contact me' },
  ];

  const currentLogo = isDarkMode ? (assets.logo_dark || assets.logo) : assets.logo;
  const currentArrowIcon = isDarkMode ? (assets.arrow_icon_dark || assets.arrow_icon) : assets.arrow_icon;
  const currentMenuIcon = isDarkMode ? (assets.menu_white || assets.menu_black) : assets.menu_black;
  const currentCloseIcon = isDarkMode ? (assets.close_white || assets.close_black) : assets.close_black;
  const currentThemeToggleIcon = isDarkMode ? assets.sun_icon : assets.moon_icon;

  return (
    <>
      {/* Decorative Background Element */}
      <div
        className={`fixed top-0 right-0 w-11/12 -z-10 transition-opacity duration-500 translate-y-[-80%] ${isDarkMode ? 'opacity-0 pointer-events-none' : 'opacity-100'} dark:hidden`}
        aria-hidden="true"
      >
        {assets.header_bg_color && (
          <Image src={assets.header_bg_color} alt="" width={1920} height={400} className="w-full object-cover" quality={75} priority={true} />
        )}
      </div>

      {/* Main Navbar using <header> for semantic HTML */}
      <header 
        className={`
          w-full fixed top-0 left-0 px-4 sm:px-6 lg:px-8 xl:px-[6%] py-3.5 
          flex items-center justify-between z-50 
          transition-all duration-300 ease-custom-ease
          ${isScrolled
            ? `shadow-lg ${isDarkMode ? 'bg-darkTheme/85 backdrop-blur-lg border-b border-dark-border/50' : 'bg-light-background/85 backdrop-blur-lg border-b border-light-border/70'}`
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        {/* Logo - NEW LINK BEHAVIOR */}
        <Link 
          href="#top" 
          className="flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkTheme rounded-sm"
          aria-label="Sidharth Sajith - Navigate to homepage"
        >
          {currentLogo && (
            <Image
              src={currentLogo} alt="Sidharth Sajith - Logo"
              width={170} height={95} // YOUR intrinsic dimensions
              className="w-20 md:w-24 h-auto cursor-pointer transition-transform duration-200 group-hover:scale-105"
              priority={true}
            />
          )}
        </Link>

        {/* Desktop Navigation Links (NavLinkItem already uses new Link) */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => (
              <NavLinkItem key={item.label} href={item.href}>{item.label}</NavLinkItem>
            ))}
          </ul>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 rounded-full transition-colors duration-200 ease-custom-ease 
                       hover:bg-light-hover-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                       dark:hover:bg-dark-hover-subtle dark:focus-visible:ring-offset-darkTheme 
                       focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary"
          >
            {currentThemeToggleIcon && (
              <Image src={currentThemeToggleIcon} alt="Theme toggle icon" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6"/>
            )}
          </button>

          {/* Desktop Contact Button - NEW LINK BEHAVIOR */}
          <Link 
            href="#contact" 
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 
                          border rounded-full ml-2 text-sm font-medium font-ovo  
                          transition-all duration-300 ease-custom-ease group
                          border-light-text-secondary text-light-text hover:bg-light-text hover:text-light-background focus:outline-none focus-visible:ring-2 focus-visible:ring-light-text/50 focus-visible:ring-offset-2
                          dark:border-dark-text-secondary dark:text-dark-text-secondary dark:hover:bg-dark-text-secondary dark:hover:text-darkTheme dark:focus-visible:ring-dark-text-secondary/50 dark:focus-visible:ring-offset-darkTheme"
          >
            Contact
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              {currentArrowIcon && (
                <Image src={currentArrowIcon} alt="" width={16} height={16} className="w-3 h-3"/>
              )}
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileMenuButtonRef} 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="block md:hidden p-2 rounded-full transition-colors duration-200 ease-custom-ease 
                       hover:bg-light-hover-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                       dark:hover:bg-dark-hover-subtle dark:focus-visible:ring-offset-darkTheme
                       focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary"
          >
            { (isMobileMenuOpen ? currentCloseIcon : currentMenuIcon) && (
              <Image src={isMobileMenuOpen ? currentCloseIcon : currentMenuIcon} alt="Menu toggle icon" width={24} height={24} className="w-6 h-6"/>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel - Off-canvas */}
      <div
        id="mobile-menu" ref={sideMenuRef} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title"
        className={`md:hidden fixed inset-0 z-[55] transition-opacity duration-300 ease-custom-ease ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={toggleMobileMenu} aria-hidden="true"></div>
        <nav 
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 right-0 w-64 sm:w-72 h-screen bg-light-background dark:bg-darkTheme shadow-2xl transform transition-transform duration-300 ease-custom-ease flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-5 border-b border-light-border dark:border-dark-border/50">
            {/* Logo in Mobile Menu - NEW LINK BEHAVIOR */}
            <Link href="#top" onClick={toggleMobileMenu} className="group focus:outline-none focus-visible:ring-1 focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-sm">
                {currentLogo && (
                  <Image src={currentLogo} alt="Logo" width={170} height={95} className="w-24 h-auto group-hover:scale-105 transition-transform"/>
                )}
            </Link>
            <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
            <button 
              onClick={toggleMobileMenu} aria-label="Close menu"
              className="p-2 -mr-2 rounded-full transition-colors hover:bg-light-hover-subtle dark:hover:bg-dark-hover-subtle focus:outline-none focus-visible:ring-1 focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary"
            >
              {currentCloseIcon && (
                <Image src={currentCloseIcon} alt="Close menu icon" width={20} height={20} className='w-5 h-5' />
              )}
            </button>
          </div>
          <ul className="flex-grow p-5 space-y-1 overflow-y-auto">
            {navItems.map(item => ( <NavLinkItem key={item.label} href={item.href} onClick={toggleMobileMenu} isMobile={true}>{item.label}</NavLinkItem> ))}
            <li className="pt-4 mt-auto">
              {/* Contact Button in Mobile Menu - NEW LINK BEHAVIOR */}
              <Link 
                href="#contact" 
                onClick={toggleMobileMenu}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 
                           border rounded-full text-sm font-medium font-ovo 
                           transition-all duration-300 ease-custom-ease group
                           border-light-text-secondary text-light-text bg-gray-100 hover:bg-light-text hover:text-light-background
                           dark:border-dark-text-secondary dark:text-dark-text-secondary dark:bg-darkHover dark:hover:bg-dark-text-secondary dark:hover:text-darkTheme
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkTheme" // Added focus-visible
              >
                Contact
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  {currentArrowIcon && (
                    <Image src={currentArrowIcon} alt="" width={16} height={16} className="w-3 h-3"/>
                  )}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;