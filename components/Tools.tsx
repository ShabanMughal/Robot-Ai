'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Type definition for each tool
interface Tool {
  title: string;
  description: string;
  image: string;
}

const ToolsData: Tool[] = [
  {
    title: 'Learn Smarter with AI',
    description:
      `Unlock the limitless potential of learning with AI tools at your side. Whether you're exploring new subjects, mastering complex skills, or staying updated on the latest trends, AI-powered platforms provide personalized insights, adaptive learning paths, and instant answers. Dive into a world where knowledge is at your fingertips—learn smarter, faster, and more effectively with the power of Artificial Intelligence. Transform your curiosity into expertise, and let AI be your guide in the journey of lifelong learning.`,
    image: 'images/feature-2.jpg',
  },
  {
    title: 'Creative AI: Redefining Imagination',
    description:
      `AI tools are no longer limited to calculations and data analysis. They’re becoming creative partners, generating stunning artwork, composing music, and even writing stories. Platforms like DeepAI and MidJourney showcase how technology collaborates with human creativity, pushing the boundaries of what’s possible in art, design, and content creation.`,
    image: 'images/tool-1.jpg',
  },
  {
    title: 'The Future of Work with AI',
    description:
      `In the workplace, AI tools streamline workflows and enhance productivity. From automating repetitive tasks to providing actionable insights through data analysis, AI empowers teams to focus on innovation and problem-solving. Collaborative platforms like GitHub Copilot and Google AI assist professionals in coding, writing, and brainstorming.`,
    image: 'images/tool-2.jpg',
  },
  {
    title: 'AI for Social Good: AI solving global challenges',
    description:
      `AI tools are addressing global challenges, from disaster response to climate change. Predictive models help forecast natural disasters, enabling timely evacuations and resource allocation. Meanwhile, AI-powered platforms promote sustainability by optimizing energy usage and reducing waste, contributing to a greener planet.`,
    image: 'images/tool-3.jpg',
  },
];

const Tools: React.FC = () => {
  // UseRef for sections, define ref type as HTMLDivElement[]
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (section) {
        const textElement = section.querySelector('.animated-text');
        
        // Add null check for textElement
        if (textElement) {
          const words = textElement?.textContent?.split(' ');
  
          if (words) {
            
            textElement.innerHTML = words
              .map((word) => `<span class="word">${word}</span>`)
              .join(' ');
  
            const wordSpans = textElement.querySelectorAll('.word');
  
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=1000',
                pin: true,
                scrub: 1,
              },
            });
  
            // Animate each word sequentially
            tl.fromTo(
              wordSpans,
              { opacity: 0.3 },
              {
                opacity: 1,
                stagger: 0.2,
                duration: 0.5,
                ease: 'power4.out',
              }
            );
          }
        }
      }
    });
  }, []);
  

  return (
    <div className="relative bg-body transition-colors">
      {ToolsData.map((tool, index) => (
        <div
        ref={(el) => { sectionsRef.current[index] = el; }}
          key={index}
          className={`section flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 px-2 md:px-8 py-2 md:py-16 min-h-screen`}
        >
          <img
            src={tool.image}
            alt={`Section ${index + 1}`}
            className="h-[500px] object-cover hidden md:block w-[100%]"
          />
          <div className="w-[100%]">
            <h1 className="bento-title special-font">
              Unl<b>o</b>ck the Fut<b>u</b>re: <br /> {tool.title}
            </h1>
            <p className="animated-text font-robert text-lg dark:text-blue-50 mt-10 font-circular-web">
              {tool.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tools;
