import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="story-card glass skeleton-wrapper">
      <div className="story-rank skeleton skeleton-text" style={{ width: '20px', height: '24px' }}></div>
      <div className="story-content">
        <div className="story-title skeleton skeleton-text" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
        <div className="story-title skeleton skeleton-text" style={{ width: '60%', height: '20px', marginBottom: '12px' }}></div>
        <div className="story-meta">
          <div className="skeleton skeleton-text" style={{ width: '80px', height: '14px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '100px', height: '14px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '120px', height: '14px' }}></div>
        </div>
      </div>
      <div className="skeleton skeleton-circle" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
    </div>
  );
};

export default SkeletonCard;
