'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Type definition for each tool
interface Tool {
  title: React.ReactNode;
  description: string;
  image: string;
}

const ToolsData: Tool[] = [
  {
    title: <>Pers<b>o</b>n <b>a</b>l A<b>s</b>sist<b>a</b>nt</>,
    description:
      `Artificial Intelligence is revolutionizing how we learn. AI tools offer personalized learning experiences, adapting to each individual's pace and preferences. Whether it's self-paced learning, coding tutorials, or even technical problem-solving, AI helps learners at all levels. With features like real-time feedback, AI-driven assessments, and adaptive learning paths, mastering new skills has never been easier. Embrace AI to enhance your learning journey and explore new frontiers of knowledge.`,
    image: 'images/feature-2.jpg',
  },
  {
    title: <>Sma<b>r</b>t w<b>o</b>rkflows wih ai <b>bots</b></>,
    description:
      `AI bots are increasingly being used to optimize workflows and boost productivity. From automating customer service with chatbots to streamlining content management, AI bots are an essential part of modern workplaces. These bots can handle a range of functions, such as scheduling meetings, providing real-time data insights, and assisting in complex decision-making. By integrating AI bots into everyday tasks, businesses improve efficiency and reduce human error, allowing employees to focus on what matters most.`,
    image: 'images/tool-2.jpg',
  },
  {
    title: <>e<b>m</b>rpoweri<b>n</b>g s<b>o</b>luti<b>o</b>ns</>,
    description:
      `AI is at the forefront of solving some of the world’s most pressing challenges. From combatting climate change to improving disaster response, AI tools are helping humanity make significant strides in addressing global issues. For example, predictive models powered by AI can forecast natural disasters, enabling timely evacuations and resource distribution. In the field of healthcare, AI is driving advancements in diagnostics and personalized medicine, improving the quality of life worldwide.`,
    image: 'images/tool-3.jpg',
  },
];

const Programs: React.FC = () => {
  // UseRef for sections, define ref type as HTMLDivElement[]
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
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
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }
  }, []);
  

  return (
    <div className="relative bg-white transition-colors px-5 md:px-10 pb-10" id='programs'>
      
      <h2 className="font-general pt-16 text-lg uppercase text-center" ref={titleRef}>
      Discover the Cutting-Edge World of AI & Robotics
        </h2>
      <div className="px-5 py-10 text-center">
            <p className="text-4xl font-robert-medium">
            Transforming the <span className='bg-gradient-to-r from-[#4795E4] to-[#3ABAD7] bg-clip-text text-transparent'>Present.</span> Innovating the <span className='bg-gradient-to-r from-[#4795E4] to-[#3ABAD7] bg-clip-text text-transparent'>Future</span>.
            </p>
            <p className="max-x-md font-circular-web text-lg opacity-75 mt-10">
            Dive into the groundbreaking advancements in AI and robotics that are reshaping industries, empowering solutions, and optimizing workflows. Explore the tools shaping a smarter tomorrow today.
            </p>
          </div>
      {ToolsData.map((tool, index) => (
        <div
        ref={(el) => { sectionsRef.current[index] = el; }}
          key={index}
          className={`section md:flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 px-2 md:px-8 py-2 md:py-16 min-h-[50vh] md:min-h-screen hidden`}
        >
          <div className='hidden md:flex w-[100%] justify-center items-center'>
          <div className='bg-blue-100 p-3 rounded-2xl shadow-xl'>
          <img
            src={tool.image}
            alt={`Section ${index + 1}`}
            className="object-cover rounded-2xl"
            />
            </div>
            </div>
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
