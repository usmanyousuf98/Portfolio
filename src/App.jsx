import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Works from "./components/Works";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    // reducedMotion="user" makes every motion component honor the OS
    // "reduce motion" setting instead of animating transforms.
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}

export default App;
