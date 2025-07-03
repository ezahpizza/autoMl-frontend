import { CardStackItem } from '@/components/main/CardStack';

const CardStackData: CardStackItem[] = [
  {
    title: "No notebooks, no code. We FlyPNB here.",
    description: "Growth is the only env you need to be at. We've got the models.",
    imageSrc: "/images/mlflowProfile.webp",
    route: "/dashboard/model",
  },
  {
    title: "Sayonara Seaborn.",
    description: "Get an interactive and extensive report of your data in 3 clicks.",
    imageSrc: "/images/edaflowProfile.webp",
    route: "/dashboard/eda",
  },
  {
    title: "ensoMl ensemble",
    description: "An all-in-one platform from raw data to deployable models.",
    imageSrc: "/images/ensoProfile.webp",
    route: "/",
  },
];

export default CardStackData;
