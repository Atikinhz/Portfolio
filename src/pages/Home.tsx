import Hero from '../components/Hero';
import Works from '../components/Works';
import Journal from '../components/Journal';
import Explorations from '../components/Explorations';
import Stats from '../components/Stats';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Works />
      <Journal />
      <Explorations />
      <Stats />
      <Footer />
    </>
  );
}
