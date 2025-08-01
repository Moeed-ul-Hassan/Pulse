import React from 'react';

const Watermark: React.FC = () => {
  return (
    <div 
      className="fixed bottom-4 right-4 z-50 pointer-events-none select-none"
      style={{
        transform: 'rotate(-15deg)',
        opacity: 0.3,
        fontSize: '12px',
        color: '#6b7280',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      A project of Team Legends @Moeed ul Hassan
    </div>
  );
};

export default Watermark; 