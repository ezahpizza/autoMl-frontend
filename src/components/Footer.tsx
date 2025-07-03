
import { motion, easeOut } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerItems = [
    { number: '1', text: 'ABOUT ensoML', route: '/about'},
    { number: '2', text: 'ABOUT THE DEV', route: '/aboutdev'}, 
    { number: '3', text: 'CONTACT', route: '/contact' },
    { number: '4', text: 'TERMS' },
    { number: '5', text: 'PRIVACY POLICY' }
  ];

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    hidden: {}
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
      y: 120,
      opacity: 0
    }
  };

  return (
    <footer className="absolute bottom-20 md:bottom-8 right-0 w-full md:w-auto px-6 py-10">
      <motion.div
        className="w-full max-w-4xl ml-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-right">
          <div className="space-y-6">
            {[1, 2, 3].map((num) => {
              const item = footerItems.find(i => i.number === num.toString());
              return (
                <motion.div
                  key={item?.number}
                  variants={itemVariants}
                  className="flex flex-col items-end font-fira-code"
                >
                  <span className="text-3xl md:text-5xl font-bold text-pumpkin-orange">
                    {item?.number}
                  </span>
                  <Link 
                    to={item?.route}
                    className="text-xl md:text-3xl text-white hover:text-rose-pink transition-colors duration-200"
                  >
                    {item?.text}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;