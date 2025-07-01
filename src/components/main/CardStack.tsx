import { useNavigate } from 'react-router-dom';
import CardSwap, { Card } from '@/components/ui/CardSwap';
import React from 'react';

export interface CardStackItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  route?: string;
}

export interface CardStackProps {
  cards: CardStackItem[];
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
}

const CardStack: React.FC<CardStackProps> = ({
  cards,
  width = 450,
  height = 420,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = true,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (idx: number) => {
    const route = cards[idx]?.route;
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="h-[500px] relative">
      <CardSwap
        cardDistance={cardDistance}
        verticalDistance={verticalDistance}
        delay={delay}
        pauseOnHover={pauseOnHover}
        width={width}
        height={height}
        onCardClick={handleCardClick}
      >
        {cards.map((card, idx) => (
          <Card key={idx}>
            <div className="p-2 rounded-lg overflow-hidden h-full flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-300">{card.description}</p>
              <img
                src={card.imageSrc}
                alt={card.imageAlt || card.title}
                className="w-full h-auto max-h-[82%] rounded-md object-cover"
              />
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default CardStack;
