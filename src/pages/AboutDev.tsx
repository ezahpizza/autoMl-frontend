import { useEffect } from 'react';
import InfoPageLayout from '@/components/layouts/InfoPageLayout';
import { Button } from '@/components/ui/button';
import { FaBehance, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { motion } from 'framer-motion';

const AboutDev = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    "Full Stack Development", 
    "AI/ML", 
    "Music Technology", 
    "UI/UX Design", 
    "Data Science",
    "Mental Health Tech"
  ];
  
  return (
    <InfoPageLayout
      title="Meet The Dev"
      subtitle="Empowering Everyone to Unleash Their Data's Potential"
    >
      <div className="w-full max-w-6xl space-y-8">
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Bio Section */}
          <section className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <div className="space-y-4 font-fira-code font-semibold text-almond-white/80">
                <p>
                  Hello! I'm the creator of EnsoML. My journey with ensoML began with a fascination for ML, and then a profound frustration in the world of data and models and pipelines. As a Computer Science and Data Science major, I spent countless hours grappling with the tedious realities of machine learning development. I'm talking about writing lines upon lines of Python code just for a single Matplotlib or Seaborn plot, wrestling with data preprocessing nuances, and slogging through model training scripts.
                </p>
                <p>
                  It felt like a constant uphill battle, trying to keep up with ever-changing library and package updates, deprecations, and the labyrinthine world of different virtual environments. I understood the power of ML, but as an undergraduate developer, I also deeply understood the immense time drain and technical complexities involved. I thought, "There has to be a better way to bypass all of this."
                </p>
                <p>
                  That frustration became my motivation. EnsoML represents the culmination of my desire to slice development times by going around the time taken to do extensive EDA and cumbersome model training manually. I knew the core concepts of ML were powerful, but the sheer technicality of getting a model from idea to deployment was a significant barrier that killed a lot of time, even for someone like me immersed in a CS program.
                </p>
                <p>
                  When I'm not focused on making ML simpler, you'll find me diving into complex algorithms, perhaps debating the merits of different data structures, or simply trying to get my Python environment to cooperate (and then putting it all to the side to engross myself into my Monster-fueled, Mitski blasting in my ears, digital art sessions). I'm driven by the belief that robust machine learning should be accessible to everyone, not just those willing to navigate a jungle of code and configurations.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-biorhyme font-semibold mb-4 text-almond-white">Connect With Me</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com/ezahpizza" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="gap-2 bg-almond-white text-persian-indigo hover:bg-red hover:text-almond-white font-fira-code">
                      <FaGithub size={16} /> GitHub
                    </Button>
                  </a>

                  <a href="https://linkedin.com/in/prateekmp/" target="_blank" rel="noopener noreferrer">
                    <Button  size="sm" className="gap-2 bg-almond-white text-persian-indigo hover:bg-red hover:text-almond-white  font-fira-code">
                      <FaLinkedin size={16} /> LinkedIn
                    </Button>
                  </a>

                  <a href="https://www.behance.net/prateekmohapat" target="_blank" rel="noopener noreferrer">
                    <Button  size="sm" className="gap-2 bg-almond-white text-persian-indigo hover:bg-red hover:text-almond-white  font-fira-code">
                      <FaBehance size={16} /> Behance
                    </Button>
                  </a>

                  <a href="mailto:prateekmsoa@gmail.com">
                    <Button  size="sm" className="gap-2 bg-almond-white text-persian-indigo hover:bg-red hover:text-almond-white  font-fira-code">
                      <IoMdMail size={16} /> Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-pumpkin-orange to-rose-pink rounded-lg p-6 text-almond-white h-full"
              >
                <div className="aspect-square rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden bg-almond-white/20">
                      <img 
                        src="images/Prateek-Mohapatra.webp" 
                        alt="Chro.mA hero" 
                        className="w-full h-full object-cover rounded-full"
                      />
                </div>

                <h3 className="text-xl font-biorhyme font-bold text-center mb-2">Founder & Developer</h3>
                <p className="text-almond-white/90 text-center font-fira-code">
                  My mission is to eliminate the unnecessary complexities of machine learning, making powerful data analysis and model training intuitive and efficient for users of all skill levels.
                </p>
                <p className='text-lg text-persian-indigo text-center font-fira-code font-semibold'>
                  because ai doesn't have to, and shouldn't be inaccessible. not to cs majors, not to you.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* Skills & Expertise */}
          <section>
            <h2 className="text-2xl font-biorhyme font-bold mb-6 text-almond-white">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-pumpkin-orange/10 text-pumpkin-orange px-4 py-2 rounded-full text-sm font-fira-code font-medium border border-pumpkin-orange/20"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </section>
        
          
          {/* Vision for the Future */}
          <section className="bg-gradient-to-r from-almond-white/10 via-rose-pink/10 to-pumpkin-orange/10 p-8 rounded-xl border border-almond-white/20">
            <h2 className="text-2xl font-biorhyme font-bold mb-4 text-almond-white">Vision for the Future</h2>
            <p className="mb-6 font-biorhyme text-almond-white/80">
              EnsoML is evolving to become the go-to platform for frictionless machine learning and data analysis. The roadmap includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 font-biorhyme text-almond-white/70">
              <li>Enhanced Deployment Capabilities: Streamlining the process of putting trained models into production.</li>
              <li>Collaborative Workspaces: Features for teams to work together on datasets and models seamlessly.</li>
              <li>Integrated Data Source Connectors: Making it even easier to pull data directly from various sources.</li>
              <li>Advanced Explainability Features: Deepening our "whitebox" approach to model understanding.</li>
              <li>No-Code Feature Engineering: Automating even more aspects of the data preparation pipeline.</li>
            </ul>
            <p className="font-biorhyme text-almond-white/80">
              The ultimate vision for EnsoML is to create a world where anyone, regardless of their coding background, can leverage the full potential of machine learning to gain insights and build intelligent applications, turning data into real-world impact with unprecedented ease.
            </p>
          </section>
        </motion.div>
      </div>

    </InfoPageLayout>
    
  );
};

export default AboutDev;
