import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax({ children, offset = 50, className = "", style = {} }) {
    const ref = useRef(null);
    
    // We use the scrollYProgress of the element entering/leaving the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Maps the scroll progress (0 to 1) to the Y offset translation (-offset to +offset)
    // When the element is at the very bottom of the viewport, it is shifted up by -offset.
    // When the element is at the very top of the viewport, it is shifted down by +offset.
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <motion.div ref={ref} style={{ y, ...style }} className={className}>
            {children}
        </motion.div>
    );
}
