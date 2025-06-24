import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';
import Navigation from '../components/Navigation';
import ImageCarousel from '../components/ImageCarousel';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';

const Index = () => {
  const [showNavigation, setShowNavigation] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  
  const navigationOpacity = useTransform(
    scrollY,
    [0, 200],
    [1, 0]
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const progress = latest / window.innerHeight;
      setScrollProgress(progress);
      
      setShowNavigation(latest < window.innerHeight);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const testimonials = [
    {
      quote: "ensoML transformed how we approach data science. The intuitive interface made complex ML accessible to our entire team.",
      author: "Sarah Chen, Data Scientist"
    },
    {
      quote: "Finally, a platform that embodies the zen of simplicity while delivering powerful results. Machine learning shouldn't be overwhelming.",
      author: "Marcus Rodriguez, Product Manager"
    },
    {
      quote: "The philosophy behind ensoML resonates deeply. It's not just about the technology, it's about harmony between human and artificial intelligence.",
      author: "Dr. Aisha Patel, AI Researcher"
    }
  ];

  return (
    <div className="relative bg-persian-indigo overflow-hidden max-w-screen">
      
     {/* Hero Section */}
      <section className="min-h-screen bg-almond-white relative z-40 overflow-visible">
        {/* Logo */}
        <div className="absolute top-12 w-full flex justify-center">
          <motion.h1
            className="font-biorhyme-expanded text-5xl md:text-8xl lg:text-9xl font-bold text-pumpkin-orange"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.5
            }}
          >
            ensoML
          </motion.h1>
        </div>

        {/* Typewriter Text */}
        <div className="absolute bottom-16 md:bottom-2 left-8">
          <TypewriterText
            text={`AI_FOR → \n (EVERYONE) \n //SIMPLY.`}
            delay={1500}
            speed={50}
          />
        </div>

        {/* Enso Circle */}
        <div className="absolute z-50 -bottom-16 -right-12 md:-bottom-64 md:-right-32 pointer-events-none">
            <motion.img
              src="/images/enso-cluster.svg"
              alt="Enso Circle"
              className="w-64 h-64 md:w-[50vw] md:h-[50vw]"
              initial={{ x: 2400, rotate: 360, opacity: 0 }}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.8,
                ease: "easeOut"
              }}
            />
          </div>

        <Navigation visible={showNavigation} scrollProgress={scrollProgress} />
      </section>

      {/* Learn More Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 z-10 relative">
        <motion.div
          className="max-w-4xl"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="font-biorhyme text-2xl md:text-3xl lg:text-4xl text-pumpkin-orange leading-relaxed mb-8">
            Unravel your data with an intuitive, no-code auto ML platform designed for everyone.
          </p>
          <p className="font-biorhyme text-xl md:text-2xl text-white leading-relaxed">
            ai doesn't have to and shouldn't be inaccessible.
          </p>
        </motion.div>
      </section>

      {/* Image Carousel */}
      <section className="mt-24 overflow-visible">
          <ImageCarousel />
      </section>

      {/* Testimonials Section */}
      <section className="mt-24 py-24 px-8">  

        <motion.h2
          className="font-fira-code text-4xl md:text-6xl font-bold text-white text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          What The ML Monks Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:max-w-7xl md:max-h-[25vw] mx-auto items-stretch">

          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              delay={index * 0.2}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="relative min-h-[60vh] pt-24 px-8 pb-40">
        <Footer />
      </section>
    </div>
  );
};

export default Index;