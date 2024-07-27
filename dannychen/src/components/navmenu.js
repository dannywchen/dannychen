import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaPaintBrush, FaLightbulb, FaCamera, FaTwitter, FaGithub, FaEnvelope, FaMoon, FaVolumeUp } from 'react-icons/fa';

const jiggle = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const NavigationBar = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
`;

const NavItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;

  &:hover {
    animation: ${jiggle} 0.5s ease-in-out;
  }
`;

const NavItemCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.$active ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NavItemIcon = styled.div`
  z-index: 1;
  color: #555;
  transition: all 0.3s ease;

  svg {
    font-size: 1.2rem;
  }

  ${NavItemWrapper}:hover & {
    color: #000;
    transform: scale(1.2);
  }
`;

const NavLabel = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const NavMenu = () => {
  const [activeNavItem, setActiveNavItem] = useState(3);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);

  const navItems = [
    { icon: FaHome, label: 'Home' },
    { icon: FaPaintBrush, label: 'Design' },
    { icon: FaLightbulb, label: 'Ideas' },
    { icon: FaCamera, label: 'Photos' },
    { icon: FaTwitter, label: 'Twitter' },
    { icon: FaGithub, label: 'GitHub' },
    { icon: FaEnvelope, label: 'Contact' },
    { icon: FaMoon, label: 'Dark Mode' },
    { icon: FaVolumeUp, label: 'Sound' },
  ];

  return (
    <NavigationBar>
      {navItems.map((item, index) => (
        <NavItemWrapper
          key={index}
          onMouseEnter={() => setHoveredNavItem(index)}
          onMouseLeave={() => setHoveredNavItem(null)}
          onClick={() => setActiveNavItem(index)}
          style={{
            transform: `scale(${
              hoveredNavItem === index ? 1.2 :
              hoveredNavItem === index - 1 || hoveredNavItem === index + 1 ? 1.1 :
              1
            })`,
            zIndex: hoveredNavItem === index ? 2 : 1
          }}
        >
          <NavItemCircle $active={activeNavItem === index} />
          <NavItemIcon>
            <item.icon />
          </NavItemIcon>
          <NavLabel style={{ opacity: hoveredNavItem === index ? 1 : 0 }}>
            {item.label}
          </NavLabel>
        </NavItemWrapper>
      ))}
    </NavigationBar>
  );
};

export default NavMenu;
