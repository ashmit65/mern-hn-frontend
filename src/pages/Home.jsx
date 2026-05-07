import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import StoryCard from '../components/StoryCard';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeMessage, setScrapeMessage] = useState(null);
  const { user } = useAuth();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/stories?page=${page}&limit=10`);
      setStories(res.data.stories);
      setTotalPages(res.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookmarks = async () => {
    if (!user) return;
    try {
      const res = await api.get('/stories/bookmarks');
      setUserBookmarks(res.data.map(b => b._id));
    } catch (err) {
      console.error('Failed to fetch bookmarks');
    }
  };

  useEffect(() => {
    fetchStories();
  }, [page]);

  useEffect(() => {
    fetchUserBookmarks();
  }, [user]);

  const toggleBookmark = async (id) => {
    try {
      const res = await api.post(`/stories/${id}/bookmark`);
      if (res.data.bookmarked) {
        setUserBookmarks(prev => [...prev, id]);
      } else {
        setUserBookmarks(prev => prev.filter(bid => bid !== id));
      }
    } catch (err) {
      console.error('Bookmark toggle failed');
    }
  };

  const handleManualScrape = async () => {
    try {
      setIsScraping(true);
      setError(null);
      setScrapeMessage(null);
      
      const res = await api.post('/stories/scrape');
      
      if (res.data.newStories > 0) {
        setScrapeMessage(`Success! Added ${res.data.newStories} new stories.`);
      } else {
        setScrapeMessage('Already up to date. No new stories found.');
      }

      // After scraping, go back to page 1 and refresh
      setPage(1);
      await fetchStories();

      // Clear message after 5 seconds
      setTimeout(() => setScrapeMessage(null), 5000);
    } catch (err) {
      setError('Scraping failed. The server might be busy.');
    } finally {
      setIsScraping(false);
    }
  };

  if (loading && stories.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <RefreshCw className="animate-spin" size={40} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Top Hacker News Stories</h2>
        {user && (
          <button 
            onClick={handleManualScrape} 
            className="btn-outline" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            disabled={isScraping}
          >
            <RefreshCw size={16} className={isScraping ? 'animate-spin' : ''} />
            {isScraping ? 'Scraping...' : 'Refresh Now'}
          </button>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}
      {scrapeMessage && (
        <div className="glass" style={{ padding: '0.8rem 1.2rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', color: 'var(--primary)', fontWeight: '500', fontSize: '0.9rem' }}>
          {scrapeMessage}
        </div>
      )}

      <div className="stories-grid">
        {stories.map((story, index) => (
          <StoryCard 
            key={story._id}
            story={story}
            rank={(page - 1) * 10 + index + 1}
            isBookmarked={userBookmarks.includes(story._id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      <div className="pagination">
        <button 
          className="btn-outline" 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          <ChevronLeft size={20} />
        </button>
        <span style={{ color: 'var(--text-dim)' }}>Page {page} of {totalPages}</span>
        <button 
          className="btn-outline" 
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Home;
