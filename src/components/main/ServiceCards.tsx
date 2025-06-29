
import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/main/SpotlightCard';
import { Card, CardContent } from '@/components/ui/card';
import StarBorder from '@/components/ui/StarBorder';
import { GiArtificialIntelligence } from "react-icons/gi";
import { BarChart3 } from 'lucide-react';

const ServiceCards: React.FC = () => {

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
        >
            <div className="text-almond-white text-lg">
                <SpotlightCard className="custom-spotlight-card bg-gradient-to-r from-pumpkin-orange to-persian-indigo" spotlightColor="rgba(243, 112, 30, 1)">
                    <Card className="bg-pumpkin-orange">
                    <CardContent className="text-center py-2">
                        <BarChart3 className="h-12 w-12 text-persian-indigo mx-auto mb-6" />
                            <p className="font-biorhyme text-md text-persian-indigo mb-2">
                                Get an insightful (AND interactive!) analysis of your data. Get the full story, no awkward silences, no paper airplanes required. :)
                            </p>
                            <StarBorder
                                as="button"
                                thickness={2.5}
                                className="custom-class"
                                color="white"
                                speed="2.5s"
                                buttonclass="font-fira-code text-almond-white text-md font-semibold rounded-md bg-persian-indigo"
                            >
                                <Link to="/dashboard/eda">
                                    Get a Report
                                </Link>
                            </StarBorder>
                    </CardContent>
                </Card>
                </SpotlightCard>
            </div>
            <div className="text-almond-white text-lg">
            <SpotlightCard className="custom-spotlight-card bg-gradient-to-r from-persian-indigo to-rose-pink" spotlightColor="rgba(45, 28, 127, 1)">
                <Card className="bg-rose-pink">
                    <CardContent className="text-center py-2">
                        <GiArtificialIntelligence className="h-12 w-12 text-persian-indigo mx-auto mb-6" />
                            <p className="font-biorhyme text-md text-persian-indigo mb-2">
                                A wide selection of models to choose from for your next ML application. We think, why waste time write lot code, when few click do trick. :)
                            </p>
                            <StarBorder
                                as="button"
                                thickness={2.5}
                                className="custom-class"
                                color="white"
                                speed="2.5s"
                                buttonclass="font-fira-code text-almond-white text-md font-semibold rounded-md bg-persian-indigo"
                            >
                                <Link to="/dashboard/model">
                                    Train a model
                                </Link>
                                
                            </StarBorder>
                    </CardContent>
                </Card>
            </SpotlightCard>
            </div>
        </motion.div>

    );
}

export default ServiceCards;

