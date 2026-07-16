import { MotionConfig } from "framer-motion";
import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeSwitch from "./components/ThemeSwitch";

// Template 1 — "Block": warm color-blocked light theme.
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Works from "./components/Works";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

// Template 2 — "Signal": dark, bold, minimal.
import NavV2 from "./components/NavV2";
import HeroV2 from "./components/HeroV2";
import MetricsV2 from "./components/MetricsV2";
import ServicesV2 from "./components/ServicesV2";
import ExperienceV2 from "./components/ExperienceV2";
import WorksV2 from "./components/WorksV2";
import AboutV2 from "./components/AboutV2";
import FooterV2 from "./components/FooterV2";
import ScrollTopV2 from "./components/ScrollTopV2";

// Template 3 — "Orbit": deep, atmospheric, 3D particle field.
import NavV3 from "./components/NavV3";
import HeroV3 from "./components/HeroV3";
import MetricsV3 from "./components/MetricsV3";
import ServicesV3 from "./components/ServicesV3";
import ExperienceV3 from "./components/ExperienceV3";
import WorksV3 from "./components/WorksV3";
import AboutV3 from "./components/AboutV3";
import FooterV3 from "./components/FooterV3";
import ScrollTopV3 from "./components/ScrollTopV3";

function Site() {
  const { isSignal, isOrbit } = useTheme();

  if (isOrbit) {
    return (
      <>
        <NavV3 />
        <main>
          <HeroV3 />
          <MetricsV3 />
          <ServicesV3 />
          <ExperienceV3 />
          <WorksV3 />
          <AboutV3 />
        </main>
        <FooterV3 />
        <ScrollTopV3 />
      </>
    );
  }

  if (isSignal) {
    return (
      <>
        <NavV2 />
        <main>
          <HeroV2 />
          <MetricsV2 />
          <ServicesV2 />
          <ExperienceV2 />
          <WorksV2 />
          <AboutV2 />
        </main>
        <FooterV2 />
        <ScrollTopV2 />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Experience />
        <Works />
        <About />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}

function App() {
  return (
    // reducedMotion="user" makes every motion component honor the OS
    // "reduce motion" setting instead of animating transforms.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Site />
        <ThemeSwitch />
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
