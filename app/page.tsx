'use client'
import About from "@/components/About";
import Contact from "@/components/Contact";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import LandbotChat from "@/components/LandbotChat";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import Tools from "@/components/Tools";


export default function Home() {

  return (
   <section className="overflow-hidden transition-colors duration-200">
    <Navbar />
     <Hero /> 
     <Feature />  
     <Tools />
    <Programs />
    <About /> 
    <Contact />
    <LandbotChat />
   </section>
  );
}
