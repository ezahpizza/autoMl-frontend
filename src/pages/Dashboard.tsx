
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const Dashboard = () => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-persian-indigo">
          <motion.div
            className="container mx-auto px-8 py-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-biorhyme-expanded text-5xl md:text-7xl font-bold text-pumpkin-orange mb-8">
              Welcome to ensoML
            </h1>
            <div className="max-w-4xl">
              <p className="font-biorhyme text-xl md:text-2xl text-white leading-relaxed mb-8">
                Your no-code AutoML platform is ready. Begin your journey toward data enlightenment.
              </p>
              <p className="font-biorhyme text-lg text-white/80 leading-relaxed">
                Coming soon: Your intuitive dashboard for machine learning excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </SignedIn>
    </>
  );
};

export default Dashboard;
