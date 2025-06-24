import { motion, easeOut } from 'framer-motion';
import { SignInButton,SignOutButton, useUser} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  visible: boolean;
  scrollProgress?: number;
}

const Navigation = ({ visible, scrollProgress = 0 }: NavigationProps) => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const navItems = [
    { number: '1', text: 'GET STARTED', action: () => navigate('/app') },
    { number: '2', text: 'LEARN MORE', action: () => navigate('/learn') },
    { number: '3', text: (!isSignedIn) ? 'SIGN IN': 'SIGN OUT'}

  ];

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 1.8
      }
    },
    hidden: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween" as const,
        ease: easeOut 
      }
    },
    hidden: {
      y: -120,
      opacity: 0
    }
  };

  const getItemOpacity = (index: number) => {
    const thresholds = [0.1, 0.4, 0.6]; 
    const threshold = thresholds[index];
    
    if (scrollProgress >= threshold) {
      return 0; 
    }
    
    const fadeStart = Math.max(0, threshold - 0.05);
    if (scrollProgress >= fadeStart) {
      return 1 - ((scrollProgress - fadeStart) / 0.05);
    }
    
    return 1; 
  };

  const getItemY = (index: number) => {
    const thresholds = [0.1, 0.4, 0.6];
    const threshold = thresholds[index];
    
    if (scrollProgress >= threshold) {
      return -100; 
    }
    
     const fadeStart = Math.max(0, threshold - 0.05);
    if (scrollProgress >= fadeStart) {
      const progress = (scrollProgress - fadeStart) / 0.05;
      return progress * -100;
    }
    
    return 0;
  };

  return (
    <motion.nav
      className="fixed top-56 left-8 z-50 space-y-4 flex flex-col-reverse"
      variants={containerVariants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      {navItems.slice().reverse().map((item, index) => {
        const originalIndex = navItems.length - 1 - index; 
        return (
          <motion.div
            key={originalIndex}
            variants={itemVariants}
            className="flex flex-col items-start font-fira-code"
            animate={{
              opacity: getItemOpacity(originalIndex),
              y: getItemY(originalIndex)
            }}
            transition={{
              type: "tween" as const,
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <span className="text-5xl font-bold text-persian-indigo">
              {item.number}
            </span>

            {item.number != '3' ? (
                  <button onClick={item.action}
                          className="text-3xl text-persian-indigo hover:text-pumpkin-orange transition-colors duration-200 cursor-pointer">
                    {item.text}
                  </button>
            ) 
            : (
                  !isSignedIn ? (
                  <SignInButton mode="modal">
                    <button className="text-3xl text-persian-indigo hover:text-pumpkin-orange transition-colors duration-200 cursor-pointer">
                      {item.text}
                    </button>
                  </SignInButton>
                ) : (
                  <SignOutButton>
                    <button className="text-3xl text-persian-indigo hover:text-pumpkin-orange transition-colors duration-200 cursor-pointer">
                      {item.text}
                    </button>
                  </SignOutButton>
                )
            )}  
          </motion.div>
        );
      })}
    </motion.nav>
  );
};

export default Navigation;