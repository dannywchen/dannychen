import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 9999;
`;

const CursorCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 50%;
`;

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      mixBlendMode: 'difference'
    }
  };

  const textEnter = () => setCursorVariant('text');
  const textLeave = () => setCursorVariant('default');

  useEffect(() => {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
    textElements.forEach(element => {
      element.addEventListener('mouseenter', textEnter);
      element.addEventListener('mouseleave', textLeave);
    });

    return () => {
      textElements.forEach(element => {
        element.removeEventListener('mouseenter', textEnter);
        element.removeEventListener('mouseleave', textLeave);
      });
    };
  }, []);

  return (
    <CursorWrapper variants={variants} animate={cursorVariant}>
      <CursorCircle />
      <CursorDot />
    </CursorWrapper>
  );
};

export default CustomCursor;