import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechnicalSkills from "@/components/TechnicalSkills";
import Contact from "@/components/Contact";
import MetricsCounter from "@/components/MetricsCounter";
import AutomationFlow from "@/components/AutomationFlow";
import LiveDemo from "@/components/LiveDemo";
import SmoothScroll from "@/components/SmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <SmoothScroll />
      <Hero />
      <Summary />
      <MetricsCounter />
      {/* <AutomationFlow /> */}
      <Skills />
      <Experience />
      <Projects />
      {/* <LiveDemo /> */}
      <TechnicalSkills />
      <Contact />
    </main>
  );
};

export default Index;
