import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on devices with a pointing device (hide on mobile touch)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Add listeners to all interactive elements
        const interactiveSelectors = 'a, button, input, textarea, select, .timeline-content, .card-cinematic, [role="button"]';
        const attachListeners = () => {
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        // Small delay to allow react to render the DOM
        setTimeout(attachListeners, 100);

        // Mutation observer to handle dynamically added elements (like FAQs expanding)
        const observer = new MutationObserver(() => attachListeners());
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            observer.disconnect();
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* The inner bright dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '6px', height: '6px',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    boxShadow: '0 0 10px var(--color-accent)'
                }}
                animate={{
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3,
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            {/* The outer glowing ring */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '32px', height: '32px',
                    border: '1px solid var(--color-accent)',
                    backgroundColor: 'rgba(0, 214, 143, 0.05)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                }}
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.8 : 1,
                    backgroundColor: isHovering ? 'rgba(0, 214, 143, 0.15)' : 'rgba(0, 214, 143, 0.05)',
                    borderColor: isHovering ? 'transparent' : 'var(--color-accent)',
                    backdropFilter: isHovering ? 'blur(2px)' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
            />
        </>
    );
}
