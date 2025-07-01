import { GiArtificialIntelligence } from "react-icons/gi";
import { BarChart3 } from 'lucide-react';
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { CarouselItem } from '@/components/main/MobileCarousel';

const MobileCarouselData: CarouselItem[]  = [
  {
    title: "Machine Learning",
    description: "Explore models and pipelines to power intelligent applications.",
    id: 1,
    icon: <GiArtificialIntelligence className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/images/mlflowProfile.webp",
  },
  {
    title: "Data Analysis",
    description: "Visualize, clean, and summarize your datasets with ease.",
    id: 2,
    icon: <BarChart3 className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/images/edaflowProfile.webp",
  },
  {
    title: "Your Complete ML Solution",
    description: "An all-in-one platform from raw data to deployable models.",
    id: 3,
    icon: <MdOutlineIncompleteCircle className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/images/ensoProfile.webp",
  },
];

export default MobileCarouselData;