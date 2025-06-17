// Assuming all these .png files are in the same directory as this assets.js file
// or you adjust the import paths accordingly.
import user_image from './user-image.png'; // For About section
import profile_img from './profile-img.png'; // For Header section

import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';

import arduino from './arduino.png';
import pytorch from './pytorch.png';
import python from './python.png';
import vscode from './vscode.png';
import figma from './figma.png';
import git from './git.png';
// import esp32 from './esp32.png'; // Example if you have a specific ESP32 icon
// import react_next_icon from './react-next-icon.png'; // Example
// import ros_icon from './ros-icon.png'; // Example

// General UI/UX icons
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png'; // Default/Light mode logo
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png'; // Decorative
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png'; // General purpose arrow (light theme)
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import right_arrow from './right-arrow.png'; // Possibly same as arrow_icon or a different style
// import right_arrow_bold from './right-arrow-bold.png'; // Keep if distinct and used
// import right_arrow_bold_dark from './right-arrow-bold-dark.png'; // Keep if distinct and used

// Service specific icons (can be reused or new ones)
import actual_ai_ml_icon from './ai.png'; 
import actual_embedded_icon from './embb.png'; 
import actual_web_dev_iot_icon from './iot.png';
import actual_frontend_dev_icon from './web.png';

// import placeholder_icon from './placeholder-icon.png'; // Define if you actually use a placeholder fallback

export const assets = {
    user_image,
    profile_img,
    
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,

    vscode_tool: vscode,
    figma_tool: figma,          // Ensure 'figma' is imported
    git_tool: git,
    arduino_tool: arduino,
    python_tool: python,
    pytorch_tool: pytorch,
    
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    right_arrow,
    // right_arrow_bold, // If distinct, for "Show More Projects" button
    // right_arrow_bold_dark,

    // Service Icons (ensure these source icons exist or map to others)
    ai_ml_service_icon: actual_ai_ml_icon,           // *** FIXED HERE ***
    embedded_icon_service: actual_embedded_icon,     // *** FIXED HERE ***
    web_dev_iot_icon_service: actual_web_dev_iot_icon, // *** FIXED HERE ***
    frontend_dev_icon_service: actual_frontend_dev_icon,// *** FIXED HERE ***
    
    // placeholder_icon, // Export if defined and used
};

export const workData = [
    {
        id: "neurahome",
        title: 'NeuraHome',
        description: 'IoT & Web Control based Home Automation system integrating sensors and a responsive web UI for real-time monitoring and control.',
        bgImage: '/work-neurahome.png', // Main image for the card in Work section
        link: 'https://github.com/siddoit/embedded-systems-home-automation',
        tags: ["IoT", "Web Dev", "ESP32", "React", "Automation"],
        preview: {
          image: '/previews/neurahome-github-preview.png', // YOUR SCREENSHOT
          headline: 'NeuraHome on GitHub', // Short, descriptive headline for the preview
          summary: 'View the source code and technical details for the NeuraHome automation project on GitHub.' // Concise summary
        }
    },
    {
        id: "medcab",
        title: 'MedCab App',
        description: 'An IoT-enabled smart medicine dispenser with remote tracking and scheduling capabilities, built using ESP microcontrollers.',
        bgImage: '/work-medcab.png',
        link: 'https://github.com/siddoit/esp-medicine-dispenser',
        tags: ["IoT", "Health Tech", "Embedded Systems", "ESP32"],
        preview: {
          image: '/previews/medcab-github-preview.png', // YOUR SCREENSHOT
          headline: 'MedCab Source Code',
          summary: 'Access the ESP-based smart medicine dispenser project repository on GitHub.'
        }
    },
    {
        id: "srishti2025",
        title: 'Srishti 2025 Innovation Sprint',
        description: 'Led and contributed to multiple rapid prototypes including a Smart Fire Alarm, Anti-Sleep Driving Aid, and Emotion Detection system.',
        bgImage: '/work-srishti.png',
        link: 'https://www.linkedin.com/posts/sidharth-sajith-35403a308_srishti2025-techsprint-buildinpublic-activity-7300075682200485890-lkzo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE5QuHABa5y3MlRuodj1u3HEQd7s4YxktHc',
        tags: ["Hackathon", "Prototyping", "Sensors", "AI"],
        preview: {
          image: '/previews/srishti-linkedin-preview.png', // YOUR SCREENSHOT of the LinkedIn post
          headline: 'Srishti 2025 Tech Sprint Post',
          summary: 'Read more about the Srishti 2025 Innovation Sprint and the projects developed on LinkedIn.'
        }
    },
    {
        id: "lightbot",
        title: 'Light-Following Bot',
        description: 'Developed an autonomous robot using Arduino and LDR sensors to detect and navigate towards a light source.',
        bgImage: '/work-lightbot.png',
        link: 'https://github.com/siddoit/light-following-bot',
        tags: ["Robotics", "Arduino", "Autonomous", "Sensors"],
        preview: {
          image: '/previews/lightbot-github-preview.png', // YOUR SCREENSHOT
          headline: 'Light-Following Bot Repository',
          summary: 'Dive into the code for the Arduino-based autonomous light-following robot.'
        }
    },
];
export const serviceData = [
    { 
        icon: assets.ai_ml_service_icon, // Use your dedicated ai_ml_service_icon
        title: 'AI & ML Development', 
        description: 'Implementing AI algorithms using Python & PyTorch for tasks like computer vision, data processing, and intelligent control in robotic systems.', 
        link: '#contact'
    },
    { 
        icon: assets.embedded_icon_service, // This is mapped to arduino.png via imports
        title: 'Embedded Systems', 
        description: 'Programming microcontrollers (Arduino, ESP32) for IoT, real-time control, and hardware interfacing in automation projects.', 
        link: '#contact'
    },
    { 
        icon: assets.web_dev_iot_icon_service, // Mapped to web_icon via imports
        title: 'Web Dev & UI for IoT', 
        description: 'Developing web-based user interfaces (HTML, CSS, React, Next.js) for controlling and monitoring IoT and automated systems.', 
        link: '#contact'
    },
    { 
        icon: assets.frontend_dev_icon_service, // Mapped to code_icon via imports
        title: 'Front-End Web Development', 
        description: 'Building responsive and interactive user interfaces with HTML, CSS, JavaScript, React, and Next.js for web applications.', 
        link: '#contact'
    },
];

export const infoList = [
    { 
      icon: assets.code_icon, iconDark: assets.code_icon_dark, 
      title: 'Key Technologies', // Broader title
      description: 'Python, C++, JavaScript\nROS2, React, Next.js\nHTML/CSS, Git' // Using \n for multiline display
    },
    { 
      icon: assets.edu_icon, iconDark: assets.edu_icon_dark, 
      title: 'Education', 
      description: 'B.Tech Mechatronics,\nRobotics & Automation Engg.\n(Saintgits College)' // More specific, assuming card can handle 3 lines
    },
    { 
      icon: assets.project_icon, iconDark: assets.project_icon_dark, 
      title: 'Projects', 
      description: '5+ Impactful Projects\nAcross Robotics, AI & IoT' // More descriptive
    }
];

// Order these tools by importance or how you want them displayed
export const toolsData = [
    assets.python_tool,     // From your list
    assets.pytorch_tool,    // From your list
    assets.arduino_tool,    // From your list
    assets.vscode_tool,     // From your list
    assets.git_tool,        // From your list   // You imported figma, so added it here
    // assets.esp32_tool,   // Consider adding if you have a distinct icon & use it heavily
    // assets.react_next_tool, // Consider adding
    // assets.ros_tool,      // Consider adding if you have/find a ROS icon
];