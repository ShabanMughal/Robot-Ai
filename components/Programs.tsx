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
    title: 'AI-Powered Learning: Your Personal Assistant',
    description:
      `Artificial Intelligence is revolutionizing how we learn. AI tools offer personalized learning experiences, adapting to each individual's pace and preferences. Whether it's self-paced learning, coding tutorials, or even technical problem-solving, AI helps learners at all levels. With features like real-time feedback, AI-driven assessments, and adaptive learning paths, mastering new skills has never been easier. Embrace AI to enhance your learning journey and explore new frontiers of knowledge.`,
    image: 'images/feature-2.jpg',
  },
  {
    title: 'AI Robots: Transforming Industries',
    description:
      `AI robots are transforming industries by taking over repetitive tasks, improving efficiency, and enabling new levels of automation. These robots are equipped with machine learning algorithms and advanced sensors, enabling them to perform complex tasks across various fields, from manufacturing to healthcare. With human-robot collaboration on the rise, AI-powered robots are revolutionizing the workforce, allowing humans to focus on higher-level, creative tasks while robots handle the mundane.`,
    image: 'images/tool-1.jpg',
  },
  {
    title: 'Smart Workflows with AI Bots',
    description:
      `AI bots are increasingly being used to optimize workflows and boost productivity. From automating customer service with chatbots to streamlining content management, AI bots are an essential part of modern workplaces. These bots can handle a range of functions, such as scheduling meetings, providing real-time data insights, and assisting in complex decision-making. By integrating AI bots into everyday tasks, businesses improve efficiency and reduce human error, allowing employees to focus on what matters most.`,
    image: 'images/tool-2.jpg',
  },
  {
    title: 'AI for Global Change: Empowering Solutions',
    description:
      `AI is at the forefront of solving some of the world’s most pressing challenges. From combatting climate change to improving disaster response, AI tools are helping humanity make significant strides in addressing global issues. For example, predictive models powered by AI can forecast natural disasters, enabling timely evacuations and resource distribution. In the field of healthcare, AI is driving advancements in diagnostics and personalized medicine, improving the quality of life worldwide.`,
    image: 'images/tool-3.jpg',
  },
];

const Programs: React.FC = () => {
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
                scrub: 0.5,
              },
            });
  
            // Animate each word sequentially
            tl.fromTo(
              wordSpans,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.3,
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
    <div className="relative bg-body transition-colors px-10">
       <div className="text-center pt-16 pb-10">
        <h1 className="text-4xl font-bold text-blue-700">AI & Robot Programs: Shaping the Future</h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore the transformative potential of AI and robotic technology in learning, work, and global change. Discover how these innovations are revolutionizing industries and enhancing human capabilities.
        </p>
      </div>
      {ToolsData.map((tool, index) => (
        <div
        ref={(el) => { sectionsRef.current[index] = el; }}
          key={index}
          className={`section flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 px-2 md:px-8 py-2 md:py-16 min-h-screen`}
        >
          <img
            src={tool.image}
            alt={`Section ${index + 1}`}
            className="h-[500px] object-cover w-[200px] md:w-[100%]"
          />
          <div className="w-[100%]">
            <h1 className="bento-title special-font">
               {tool.title}
            </h1>
            <p className="animated-text font-robert text-sm md:text-lg dark:text-blue-50 mt-10 font-circular-web">
              {tool.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Programs;
