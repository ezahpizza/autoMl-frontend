
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  delay: number;
}

const TestimonialCard = ({ quote, author, delay }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-pumpkin-orange p-8 rounded-lg shadow-lg w-full h-full flex flex-col justify-between"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <blockquote className="font-biorhyme font-semibold text-persian-indigo text-lg md:text-4xl mb-4 leading-relaxed">
        "{quote}"
      </blockquote>

      <cite className="font-fira-code font-semibold text-persian-indigo text-sm md:text-xl mt-8">
        — {author}
      </cite>
    </motion.div>
  );
};


export default TestimonialCard;
