import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParticleVoid from '@/components/ParticleVoid';
import DimensionalRift from '@/components/DimensionalRift';
import { getGitHubRepos } from '@/lib/github';

export default async function Home() {
  const repos = await getGitHubRepos();

  return (
    <>
      {/* Living particle background — reacts to scroll velocity */}
      <ParticleVoid />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        
        {/* Reality tear between Hero → About */}
        <DimensionalRift />
        
        <About />
        
        {/* Reality tear between About → Services */}
        <DimensionalRift />
        
        <Services />
        
        {/* Reality tear between Services → Projects */}
        <DimensionalRift />
        
        <Projects repos={repos} />
        
        {/* Reality tear between Projects → Contact */}
        <DimensionalRift />
        
        <Contact />
      </main>
      <Footer />
    </>
  );
}
