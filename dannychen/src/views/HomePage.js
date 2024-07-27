import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const HomePageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  overflow: hidden;
`;

const LoaderSection = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 100;
`;

const Name = styled(motion.h1)`
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const ContentSection = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin: 2rem 0;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.colors.text};
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ScrollText = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HomePageWrapper>
      <AnimatePresence>
        {isLoading && (
          <LoaderSection
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          >
            <Name
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Danny Chen
            </Name>
          </LoaderSection>
        )}
      </AnimatePresence>

      <ContentSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <h2>Welcome to my portfolio</h2>
        <ProfileImage
          src="/path/to/your/image.jpg"
          alt="Danny Chen"
          whileHover={{ scale: 1.05 }}
        />
        <p>Front-end developer & designer</p>
      </ContentSection>

      <ScrollIndicator>
        <ScrollCircle
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <ScrollText>Scroll Down</ScrollText>
        <FaArrowDown />
      </ScrollIndicator>
    </HomePageWrapper>
  );
};

export default HomePage;