import  React, { useRef, useEffect, useMemo  } from 'react';
import { motion, } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import testimonials from '../data/TestimonialsData';
import images from '../data/MasonryData';

import TestimonialCard from '../components/TestimonialCard';
import Dock from '../components/ui/Dock';
import Masonry from '../components/ui/Masonry';
import FlowingMenu from '../components/ui/FlowingMenu'

import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { VscHome, VscAccount, VscSignIn, VscSignOut } from 'react-icons/vsc';
import { IoIosInformationCircleOutline } from "react-icons/io";
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  const { isSignedIn } = useUser();
  const signInRef = useRef<HTMLButtonElement>(null);
  const signOutRef = useRef<HTMLButtonElement>(null);
  
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <IoIosInformationCircleOutline size={23} />, label: 'Learn More', onClick: () => navigate('/learn') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    {
      icon: isSignedIn ? <VscSignOut size={18} /> : <VscSignIn size={18} />,
      label: isSignedIn ? 'Sign Out' : 'Sign In',
      onClick: () => {
        if (isSignedIn) {
          signOutRef.current?.click();
        } else {
          signInRef.current?.click();
        }
      },
    },
  ];

  const demoItems = useMemo(() => [
    { link: "/app", text: isSignedIn ? 'dashboard' : 'Get Started', image: '/images/mlflow.webp' },
    { link: "/dashboard/eda", text: 'reports', image: '/images/edaflow.webp' },
    { link: "/dashboard/model", text: 'models', image: '/images/ml.webp' }
  ], [isSignedIn]);

  return (
    <div className="select-none relative overflow-hidden max-w-screen">
      {/* Hidden Clerk buttons */}
      <div style={{ display: 'none' }}>
        <SignInButton mode="modal">
          <button ref={signInRef} />
        </SignInButton>
        <SignOutButton>
          <button ref={signOutRef} />
        </SignOutButton>
      </div>
      
      {/* Dock - Fixed positioning */}
      <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.5
            }}
          >
        <div className="pointer-events-auto">
          <Dock 
            className={`bg-rose-pink`}
            items={items}
            panelHeight={90}
            baseItemSize={60}
            magnification={90}
          />
        </div>
      </motion.div>
      
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

        {/* decrypted Text */}
        <div className="absolute bottom-32 md:bottom-2 left-8">
          <DecryptedText
              text={`AI_FOR → \n (EVERYONE) \n //SIMPLY.`}
              sequential={true}
              speed={60}
              className="revealed font-fira-code bottom-2 text-4xl md:text-[3vw] font-semibold text-persian-indigo leading-tight whitespace-pre-line"
              animateOn="view"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
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
      </section>

      {/* Learn More Section */}
      <section className="bg-persian-indigo py-24 px-8 z-10 relative">
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

      <section className="bg-persian-indigo py-2 md:py-24">
        <div className="h-[250px] relative">
          <FlowingMenu items={demoItems} />
        </div>
      </section>

      {/* Image gallery */}
      <section className="bg-persian-indigo py-12 px-8 md:py-24 relative z-10">
          <div className="relative w-full">
            <Masonry
              items={images}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </section>


      {/* Testimonials Section */}
      <section className="bg-persian-indigo mt-18 md:mt-0 py-16 md:pb-64 px-8">
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
      <section className=" bg-persian-indigo relative min-h-[60vh] pt-24 px-8 pb-40">
        <Footer />
      </section>
    </div>
  );
};

export default Index;