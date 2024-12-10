'use client'
import About from "@/components/About";
import Contact from "@/components/Contact";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";


export default function Home() {

  return (
   <section className="overflow-hidden transition-colors duration-200">
     <Hero /> 
     <Feature />  
    <Programs />
    <About /> 
    <Contact />
   </section>
  );
}
