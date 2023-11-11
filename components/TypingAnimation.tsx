import { motion, Variants } from "framer-motion";


const typingVariants: Variants = {
    start: {
      opacity: 0.5,
      color: 'transparent', // Set the text color to transparent at the start
    },
    end: {
      opacity: 1,
      color: 'white', // Set the text color to white at the end
      transition: {
        duration: 0.5,
      },
    },
  };  
  

  

const TypingAnimation: React.FC = () => {
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
        transition={{ delay: 0.2 }} // Ajoutez un délai ici
      >
        .
      </motion.span>
      <motion.span
        variants={typingVariants}
        initial="start"
        animate="end"
        transition={{ delay: 0.4 }} // Ajoutez un délai ici
      >
        .
      </motion.span>
    </div>
  );
};

export default TypingAnimation;
