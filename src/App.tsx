import { BackgroundVideoProvider } from './components/BackgroundVideo';
import { Benefits } from './components/Benefits';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Methodology } from './components/Methodology';
import { Modules } from './components/Modules';
import { Stages } from './components/Stages';
import { TopBar } from './components/TopBar';
import { siteBrand } from './content/landing';

export default function App() {
  return (
    <div id="inicio" className="min-h-screen bg-canvas text-ink">
      <a href="#contenido" className="skip-link">
        {siteBrand.skipToContent}
      </a>

      <BackgroundVideoProvider>
        <TopBar />

        <Hero />

        <main id="contenido">
          <Methodology />
          <Modules />
          <Benefits />
          <Stages />
          <Contact />
        </main>

        <Footer />
      </BackgroundVideoProvider>
    </div>
  );
}
