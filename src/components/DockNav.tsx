import { VscHome, VscAccount } from 'react-icons/vsc';
import { IoIosInformationCircleOutline } from "react-icons/io";
import Dock from './ui/Dock';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DockNav = () => {
    const navigate = useNavigate();

    const items = [
        { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
        { icon: <IoIosInformationCircleOutline size={23} />, label: 'Learn More', onClick: () => navigate('/learn') },
        { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
      ];

    return (
      <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.0
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
    )
}

export default DockNav;