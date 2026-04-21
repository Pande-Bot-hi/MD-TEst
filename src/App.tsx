import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerReviews from './pages/CustomerReviews';

export default function App() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Prevent dragging images or elements
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    // Prevent text selection globally except in input and textarea
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      input, textarea {
        -webkit-user-select: auto !important;
        -khtml-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<CustomerReviews />} />
      </Routes>
    </Router>
  );
}
