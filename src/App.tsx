import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Personas from "./components/Personas";
import Flow from "./components/Flow";
import Screener from "./components/Screener";
import Symptoms, { RedFlags } from "./components/Symptoms";
import Labs from "./components/Labs";
import Myths from "./components/Myths";
import Faq from "./components/Faq";
import Ethics from "./components/Ethics";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Personas />
        <Flow />
        <Screener />
        <Symptoms />
        <RedFlags />
        <Labs />
        <Myths />
        <Faq />
        <Ethics />
      </main>
      <Footer />
    </div>
  );
}
