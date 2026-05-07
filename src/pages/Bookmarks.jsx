import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StoryCard from '../components/StoryCard';
import { RefreshCw, Bookmark } from 'lucide-react';

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stories/bookmarks');
      setStories(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      await api.post(`/stories/${id}/bookmark`);
      // Since we are in the bookmarks page, we remove it from the list
      setStories(prev => prev.filter(story => story._id !== id));
    } catch (err) {
      console.error('Failed to remove bookmark');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <RefreshCw className="animate-spin" size={40} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bookmark size={28} color="var(--primary)" />
          Your Bookmarks
        </h2>
        <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>
          Stories you've saved for later.
        </p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {stories.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <Bookmark size={48} color="var(--text-dim)" style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <p style={{ color: 'var(--text-dim)' }}>You haven't bookmarked any stories yet.</p>
        </div>
      ) : (
        <div className="stories-grid">
          {stories.map((story, index) => (
            <StoryCard 
              key={story._id}
              story={story}
              rank={index + 1}
              isBookmarked={true}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
