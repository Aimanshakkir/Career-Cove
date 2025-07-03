import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ from = 0, to = 1000, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);
  const [final, setFinal] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration });
    controls.then(() => setFinal(to));
    return controls.stop;
  }, [to]);

  return (
    <motion.span>
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;
