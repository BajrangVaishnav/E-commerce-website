import React, { useState, useEffect, useCallback } from 'react';
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]);

  return (
    <button
      onClick={scrollToTop}
      className={`h-10 w-10 fixed bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-lg transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'} hover:bg-[#f38282] `}
      aria-label="Scroll to top"
    >
      <IoIosArrowUp className='animate-bounce'/>
    </button>
  );
};

export default ScrollToTopButton;
