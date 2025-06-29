
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardSwap, { Card } from '@/components/ui/CardSwap'

const CardStack: React.FC = () => {

    const navigate = useNavigate();

    const handleCardClick = (idx: number) => {
        const routes = ['/dashboard/model', '/dashboard/eda', '/'];
        navigate(routes[idx] || '/');
    };
    
    return (
        <div className="h-[500px] relative">
            <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                width={450}
                height={420}
                onCardClick={handleCardClick}
            >
                <Card>
                <div className="p-2 rounded-lg overflow-hidden h-full flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Machine Learning</h3>
                    <p className="text-sm text-gray-300">
                    Explore models and pipelines to power intelligent applications.
                    </p>
                    <img
                    src="/images/mlflowProfile.webp"
                    alt="ML"
                    className="w-full h-auto max-h-[82%] rounded-md object-cover"
                    />
                </div>
                </Card>

                <Card>
                <div className="p-2 rounded-lg overflow-hidden h-full flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Data Analysis</h3>
                    <p className="text-sm text-gray-300">
                    Visualize, clean, and summarize your datasets with ease.
                    </p>
                    <img
                    src="/images/edaflowProfile.webp"
                    alt="EDA"
                    className="w-full h-auto max-h-[82%] rounded-md object-cover"
                    />
                </div>
                </Card>

                <Card>
                <div className="p-2 rounded-lg overflow-hidden h-full flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Your Complete ML Solution</h3>
                    <p className="text-sm text-gray-300">
                    An all-in-one platform from raw data to deployable models.
                    </p>
                    <img
                    src="/images/ensoProfile.webp"
                    alt="ML Solution"
                    className="w-full h-auto max-h-[82%] rounded-md object-cover"
                    />
                </div>
                </Card>
            </CardSwap>
        </div>
    );
}

export default CardStack;
