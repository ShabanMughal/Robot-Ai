'use client'
import About from "@/components/About";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";


export default function Home() {

  return (
   <section className="overflow-hidden">
     <Hero /> 
     <Feature /> 
    <Programs />
    <About /> 
   </section>
  );
}
