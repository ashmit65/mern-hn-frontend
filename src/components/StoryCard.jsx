import React from 'react';
import { Bookmark, ExternalLink, ThumbsUp, User, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const StoryCard = ({ story, rank, isBookmarked, onToggleBookmark }) => {
  const { user } = useAuth();

  return (
    <motion.div 
      className="story-card glass"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
    >
      <div className="story-rank">{rank}.</div>
      
      <div className="story-content">
        <h3 className="story-title">
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
        </h3>
        
        <div className="story-meta">
          <span><ThumbsUp size={14} /> {story.points} points</span>
          <span><User size={14} /> {story.author}</span>
          {story.postedAt && <span><Clock size={14} /> {story.postedAt}</span>}
          <a href={`https://news.ycombinator.com/item?id=${story.hnId}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            <ExternalLink size={14} style={{ verticalAlign: 'middle' }} /> HN
          </a>
        </div>
      </div>

      {user && (
        <button 
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={() => onToggleBookmark(story._id)}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      )}
    </motion.div>
  );
};

export default StoryCard;
