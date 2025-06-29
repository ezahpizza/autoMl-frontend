
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import EdaUploadForm from '@/components/eda/EdaUploadForm';
import LoadingGallery  from '@/components/ui/LoadingGallery';
import EdaTabs from '@/components/eda/EdaTabs';
import DockNav from '@/components/DockNav';

const EdaDashboard: React.FC = () => {
  const { isLoaded } = useUser();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 
  

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-persian-indigo flex items-center justify-center">
            <LoadingGallery/>
      </div>
    );
  }

  return (
        <>
          <SignedOut>
              <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
                <div className="select-none min-h-screen bg-persian-indigo overflow-x-hidden">
                  <DockNav/>
                  <div className="container mx-auto px-4 py-8 pb-32 max-w-7x">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-center mb-12"
                    >
                          <h1 className="font-biorhyme font-black text-4xl md:text-6xl text-pumpkin-orange mb-4">
                                Analysis Playground
                          </h1>
                          <p className="font-biorhyme text-almond-white/70 text-lg max-w-2xl mx-auto">
                              Elusive Data Insights? We Make Your Data Talk. :) <br/> (No Therapy or PowerBI Needed)
                          </p>
                    </motion.div>
                    
                    <div className="space-y-8">
                        <EdaUploadForm />
                        <EdaTabs />
                    </div>
                  </div>
                </div>
          </SignedIn>

    </>
  );
};

export default EdaDashboard;
