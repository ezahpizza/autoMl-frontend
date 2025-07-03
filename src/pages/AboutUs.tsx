import { useEffect } from 'react';
import InfoPageLayout from '@/components/layouts/InfoPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaChartArea } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import { LiaThinkPeaks } from "react-icons/lia";
import { IoSparkles } from "react-icons/io5";
import { FaShieldHeart,FaGaugeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const AboutUs = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const navigate = useNavigate();

  const features = [
    {
      icon: <LiaThinkPeaks className="h-8 w-8" />,
      title: "Effortless Usage",
      description: "Securely upload your tabular datasets in common formats, ready for immediate analysis and model building."
    },
    {
      icon: <FaChartArea className="h-8 w-8" />,
      title: "Automated Analysis",
      description: "Generate rich, comprehensive EDA reports with a single click, enabled by YData Profiling. Understand your data's distributions, correlations, and missing values instantly."
    },
    {
      icon: <GiArtificialHive className="h-8 w-8" />,
      title: "Simplified Training",
      description: "Train powerful models ( XGBoost, LightGBM, the whole deal) with PyCaret under the hood, all through an intuitive interface. No code required."
    },
    {
      icon: <IoSparkles className="h-8 w-8" />,
      title: "Auto Evaluation & Export",
      description: "Clear evaluation plots to assess model performance and easily export your trained models for deployment or further use."
    },
    {
      icon: <FaShieldHeart className="h-8 w-8" />,
      title: "Secure Data Management",
      description: "Benefit from per-user model and file management, with controls to keep your workspace organized and secure."
    },
    {
      icon: <FaGaugeHigh className="h-8 w-8" />,
      title: "Built for Performance & Scale",
      description: "Our FastAPI, PyCaret, and MongoDB backend ensures the platform is optimized for performance and designed to scale with your needs."
    }
  ];

  return (

    <InfoPageLayout
      title="About ensoML"
      subtitle="Empowering your ML so you focus on your product"
    >
      <div className="w-full max-w-6xl space-y-8">
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Mission Statement */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-biorhyme font-bold text-pumpkin-orange">Our Mission</h2>
            <p className="text-lg font-fira-code text-almond-white/80 max-w-4xl mx-auto leading-relaxed">
              At EnsoML, we believe that the true power of data and machine learning should be accessible to everyone, not just expert coders. Our mission is to democratize AI by providing an intuitive, no-code platform that empowers users to effortlessly analyze their data, build robust machine learning models, and gain actionable insights without the typical technical barriers.
            </p>
          </section>

          {/* What Makes Us Different */}
          <section className="bg-gradient-to-r from-pumpkin-orange to-rose-pink p-8 rounded-xl">
            <h2 className="text-2xl font-biorhyme font-bold mb-6 text-persian-indigo text-center">What Makes ensoML Different</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-biorhyme font-semibold text-almond-white">Beyond Complex Code</h3>
                <p className="font-fira-code text-persian-indigo text-justify">
                  While traditional data science often requires extensive coding and deep technical expertise, EnsoML eliminates the complexity. We provide a clean, drag-and-drop interface that allows you to perform advanced exploratory data analysis and train optimized machine learning models with just a few clicks.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-biorhyme font-semibold text-almond-white">Flows, Not Just Tools</h3>
                <p className="font-fira-code text-persian-indigo text-justify">
                  We're more than just a collection of ML libraries. EnsoML offers an end-to-end, streamlined workflow, from data upload and automated EDA reports to model training, evaluation, and export. Every step is designed for efficiency and ease of use, cutting down development time significantly.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-biorhyme font-semibold text-almond-white">Transparent, Explainable ML</h3>
                <p className="font-fira-code text-persian-indigo text-justify">
                  With our whitebox philosophy, you're not just getting predictions; you're getting understanding. EnsoML helps demystify the machine learning process, providing clear evaluation plots and insights into your models.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-2xl font-biorhyme font-bold mb-8 text-rose-pink text-center">How ensoML Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-br from-red to-persian-indigo">
                    <CardHeader className="pb-4">
                      <div className="text-persian-indigo mb-2">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg font-biorhyme text-almond-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-fira-code text-almond-white text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* The Science Behind It */}
          <section>
            <h2 className="text-2xl font-biorhyme font-bold mb-6 text-red">The Science Behind ensoML</h2>
            <Card className="bg-persian-indigo">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-biorhyme font-semibold text-pumpkin-orange mb-3">Robust ML Libraries</h3>
                    <p className="font-fira-code text-almond-white">
                      We leverage industry-leading Python libraries like PyCaret(which further has Scikit-learn, LightGBM and XGBoost under the hood) for efficient AutoML and model management, enabling rapid experimentation and optimization.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-biorhyme font-semibold text-rose-pink mb-3">Comprehensive Data Profiling</h3>
                    <p className="font-fira-code text-almond-white">
                      Our integration with YData Profiling automates the tedious aspects of EDA, providing a deep, insightful overview of your dataset's characteristics.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-biorhyme font-semibold text-red mb-3">State-of-the-Art Architecture</h3>
                    <p className="font-fira-code text-almond-white">
                      Built on FastAPI for high performance and MongoDB for flexible data storage, our backend ensures a smooth and responsive user experience, even with complex tasks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-persian-indigo to-rose-pink p-8 rounded-xl text-almond-white">
            <h2 className="text-2xl font-biorhyme font-bold mb-4">Ready to See What Your Data's Hiding?</h2>
            <p className="font-biorhyme mb-6 opacity-90">
              Join the movement of users transforming their data into actionable insights without the code. Start your journey with EnsoML today and experience the future of machine learning.
            </p>
            <motion.div>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-red text-almond-white hover:bg-rose-pink font-fira-code "
              >
                    Start Your Analysis
               </Button>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </InfoPageLayout>
  );
};

export default AboutUs;
