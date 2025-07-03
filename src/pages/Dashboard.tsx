import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import DockNav from '@/components/DockNav';
import EdaHistory from '@/components/main/EdaHistory';
import ModelHistory from '@/components/main/ModelHistory';
import CardStack from '@/components/main/CardStack';
import CardStackData from '@/data/CardStackData'
import MobileCarouselData from '@/data/MobileCarouselData'
import ServiceCards from '@/components/main/ServiceCards';
import MobileCarousel from '@/components/main/MobileCarousel';

const Dashboard= () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="select-none min-h-screen bg-persian-indigo relative pb-20 overflow-hidden">
          <DockNav />

          {/* Main content */}
          <div className="container mx-auto px-4 md:px-8 pt-12 space-y-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
            <h1 className="font-biorhyme-expanded text-5xl font-bold text-pumpkin-orange mb-8">
              ensoML
            </h1>
            <div className="max-w-4xl">
              <p className="font-biorhyme text-xl text-almond-white leading-relaxed mb-8">
                The numbers do tell us something. Though mostly we have no idea what.
              </p>
            </div>
            </motion.div>

            {/* Responsive grid layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section (Main) */}
              <div className="w-full md:w-2/3 space-y-6">

                <motion.div
                  className="text-almond-white text-2xl font-fira-code"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                    At your service, Master Analyst:
                </motion.div>

                <ServiceCards />

                <motion.div
                  className="text-almond-white text-2xl font-fira-code"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Your activity
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="h-auto overflow-hidden scroll-hidden"><EdaHistory /></div>
                  <div className="h-auto overflow-hidden scroll-hidden"><ModelHistory /></div>

                  </motion.div>
              </div>

              {/* Right Section (Sidebar) */}
              <motion.div
                className="hidden sm:block w-1/3 text-almond-white text-lg h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                    <CardStack cards={CardStackData}/>
              </motion.div>

              <motion.div
                className="block sm:hidden flex justify-center relative h-[300px] w-full text-almond-white text-lg h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                    <MobileCarousel 
                      items={MobileCarouselData}
                      baseWidth={300}
                      autoplay={true}
                      autoplayDelay={3000}
                      pauseOnHover={true}
                      loop={true}
                      round={false}
                      backgroundColor='bg-gradient-to-r from-pumpkin-orange to-rose-pink'/>
              </motion.div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Dashboard;
