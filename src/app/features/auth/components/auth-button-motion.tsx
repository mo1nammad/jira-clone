import { motion } from "framer-motion";

import { Button, ButtonProps } from "@/components/ui/button";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";

type AuthButtonMotionProps = ButtonProps;
const AuthButtonMotion = (props: AuthButtonMotionProps) => {
  const transitionDuration = 300;

  const labelVariants = {
    stage1: { opacity: 1, x: 10 },
    stage2: { opacity: 0, x: -10 },
  };
  const iconVariants = {
    stage1: { opacity: 0, x: 10 },
    stage2: { opacity: 1, x: -20 },
  };

  return (
    <Button
      {...props}
      className={cn(
        `transition-colors duration-[${transitionDuration}] `,
        props.className
      )}
    >
      <motion.span
        initial={"stage1"}
        animate={props.disabled ? "stage2" : "stage1"}
        variants={labelVariants}
        transition={{ duration: (transitionDuration * 0.7) / 1000 }}
      >
        {props.children}
      </motion.span>

      <motion.span
        variants={iconVariants}
        initial={"stage1"}
        animate={props.disabled ? "stage2" : "stage1"}
        transition={{ duration: transitionDuration / 1000 }}
      >
        <Loader className="ml-1.5 size-5" />
      </motion.span>
    </Button>
  );
};

export default AuthButtonMotion;
