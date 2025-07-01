import { CardStackItem } from '@/components/main/CardStack';

const CardStackData: CardStackItem[] = [
  {
    title: "Machine Learning",
    description: "Explore models and pipelines to power intelligent applications.",
    imageSrc: "/images/mlflowProfile.webp",
    route: "/dashboard/model",
  },
  {
    title: "Data Analysis",
    description: "Visualize, clean, and summarize your datasets with ease.",
    imageSrc: "/images/edaflowProfile.webp",
    route: "/dashboard/eda",
  },
  {
    title: "Your Complete ML Solution",
    description: "An all-in-one platform from raw data to deployable models.",
    imageSrc: "/images/ensoProfile.webp",
    route: "/",
  },
];

export default CardStackData;
