'use client'
import About from "@/components/About";
import Contact from "@/components/Contact";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import LandbotChat from "@/components/LandbotChat";
import Navbar from "@/components/Navbar";
import Tools from "@/components/Tools";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";


export default function Home() {

  return (
   <section className="overflow-hidden transition-colors duration-200">
    <Navbar />
     <Hero /> 
     <Feature />  
     <Programs />
    <Tools />
    <About /> 
    <Contact />
    <Footer />
    <LandbotChat />
    <div className="w-14 h-14 fixed bottom-5 shadow-2xl rounded-full right-7 bg-gradient-to-r from-[#4795E4] to-[#3ABAD7]">

    </div>
   </section>
  );
}
