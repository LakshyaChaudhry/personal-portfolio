import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

export default function MagneticLetter({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for the position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    // We attach the listener to the window in a useEffect for "true" magnetic effect vs 
    // just hovering over the element? 
    // Actually, usually "magnetic" buttons work on hover. 
    // But for text that "reacts" like a field, we want it to react when NEAR.
    // The issue with onMouseMove on the element is it only fires when INSIDE.
    // So let's use a global window listener BUT only calculate if close?
    // That's expensive for every letter.
    // Compromise: Add a large invisible padding/hitbox?
    // OR: Just trust that for a portfolio landing page, 15 event listeners on window is fine.

    // Let's go with window listener for best effect.

    React.useEffect(() => {
        const handleWindowMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = ref.current.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

            if (distance < 250) {
                const pullStrength = 0.3;
                // Attract
                const moveX = (clientX - centerX) * pullStrength;
                const moveY = (clientY - centerY) * pullStrength;
                x.set(moveX);
                y.set(moveY);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener('mousemove', handleWindowMouseMove);
        return () => window.removeEventListener('mousemove', handleWindowMouseMove);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            style={{ x: mouseX, y: mouseY, display: 'inline-block' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
