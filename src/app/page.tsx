import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getGitHubRepos } from '@/lib/github';

export default async function Home() {
  const repos = await getGitHubRepos();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects repos={repos} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
