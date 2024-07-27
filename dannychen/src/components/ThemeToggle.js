import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.isDarkMode ? '#1a202c' : '#edf2f7'};
  color: ${props => props.isDarkMode ? '#edf2f7' : '#1a202c'};
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#2d3748' : '#e2e8f0'};
  }
`;

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <ToggleButton onClick={toggleTheme} isDarkMode={isDarkMode} aria-label="Toggle theme">
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;

