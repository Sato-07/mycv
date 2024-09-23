import { motion, Variants } from "framer-motion";


const typingVariants: Variants = {
    start: {
      opacity: 0.5,
      color: 'transparent', 
    },
    end: {
      opacity: 1,
      color: 'white', 
      transition: {
        duration: 0.5,
      },
    },
  };  
  

  

export const TypingAnimation: React.FC = () => {
  return (
    <div className="flex  items-center">
      <motion.span
        className="mr-1"
        variants={typingVariants}
        initial="start"
        animate="end"
      >
        .
      </motion.span>
      <motion.span
        className="mr-1"
        variants={typingVariants}
        initial="start"
        animate="end"
        transition={{ delay: 0.2 }} 
      >
        .
      </motion.span>
      <motion.span
        variants={typingVariants}
        initial="start"
        animate="end"
        transition={{ delay: 0.4 }} 
      >
        .
      </motion.span>
    </div>
  );
};

