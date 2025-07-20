import { useState, useEffect } from 'react';
import './Loading.css';

export default function Loading() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500); 
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="loader">
      <img src="/sunshine_icon.png" alt="Loading…" />
      <p>Loading{dots}</p>
    </div>
  );
}