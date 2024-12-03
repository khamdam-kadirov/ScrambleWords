// src/components/MatrixBackground.js
import React, { useRef, useEffect } from 'react';
import './MatrixBackground.css'; // Ensure this CSS file exists with appropriate styles

function MatrixBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const columnsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is available
    const ctx = canvas.getContext('2d');

    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Letters to display (English letters only)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Fixed font size
    const FONT_SIZE = 20; // Fixed size for consistency
    const LETTER_SPACING = 5; // Additional spacing between letters

    // Function to calculate columns based on fixed font size
    const recalculateLayout = () => {
      // Calculate the number of columns based on canvas width and font size
      const columns = Math.floor(canvas.width / FONT_SIZE);
      columnsRef.current = []; // Reset columns

      for (let i = 0; i < columns; i++) {
        const speed = 0.5 + Math.random() * 1.5; // Random speed between 0.5 and 2
        const initialY = Math.random() * canvas.height; // Random starting position

        columnsRef.current.push({
          speed: speed,
          y: initialY,
          x: i * FONT_SIZE,
          // Optionally, you can track the current letter if you want to change letters per column
        });
      }
    };

    // Initialize columns data
    const initializeColumns = () => {
      recalculateLayout();
    };

    initializeColumns();

    // Function to draw and update letters
    const animate = () => {
      // Clear the canvas with white background
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Solid white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set letter styles
      ctx.fillStyle = '#808080'; // Grey letters
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = 'top';

      // Update and draw each column's letter
      columnsRef.current.forEach(column => {
        // Select a random letter
        const letter = letters.charAt(Math.floor(Math.random() * letters.length));

        // Draw the letter at the current position
        ctx.fillText(letter, column.x, column.y);

        // Update the y position
        column.y += column.speed;

        // If the letter moves beyond the canvas, reset to top
        if (column.y > canvas.height) {
          column.y = -FONT_SIZE; // Start above the canvas
        }
      });

      // Request the next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      recalculateLayout();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return <canvas className="matrix-canvas" ref={canvasRef}></canvas>;
}

export default MatrixBackground;
