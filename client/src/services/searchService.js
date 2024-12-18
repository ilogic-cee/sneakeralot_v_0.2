// Constants
const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

// Mock data for trending searches (replace with API call later)
const mockTrendingSearches = [
  { id: 1, text: 'Nike Dunk Low', searches: 15234, trending: true },
  { id: 2, text: 'Jordan 4 Retro', searches: 12456, trending: true },
  { id: 3, text: 'Yeezy Slides', searches: 10789, trending: true },
  { id: 4, text: 'New Balance 550', searches: 9876, trending: true },
  { id: 5, text: 'Air Force 1', searches: 8765, trending: false }
];

// Mock data for personalized suggestions (replace with API call later)
const mockPersonalizedSuggestions = [
  { id: 1, text: 'Nike Air Max', reason: 'Based on your recent purchase' },
  { id: 2, text: 'Jordan 1 Low', reason: 'Similar to items you viewed' },
  { id: 3, text: 'Adidas Ultra Boost', reason: 'You might like this' }
];

// Levenshtein distance for spell checking
const getLevenshteinDistance = (str1, str2) => {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) track[0][i] = i;
  for (let j = 0; j <= str2.length; j++) track[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
};

export const searchService = {
  // Get search history
  getSearchHistory: () => {
    try {
      const history = localStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  },

  // Add search to history
  addToHistory: (searchTerm) => {
    try {
      const history = searchService.getSearchHistory();
      const timestamp = new Date().toISOString();
      
      // Remove existing entry if present
      const filteredHistory = history.filter(item => item.text !== searchTerm);
      
      // Add new entry at the beginning
      const newHistory = [
        { text: searchTerm, timestamp },
        ...filteredHistory
      ].slice(0, MAX_HISTORY_ITEMS);

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    } catch (error) {
      console.error('Error adding to search history:', error);
      return [];
    }
  },

  // Clear search history
  clearHistory: () => {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing search history:', error);
      return false;
    }
  },

  // Get trending searches
  getTrendingSearches: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTrendingSearches), 300);
    });
  },

  // Get personalized suggestions
  getPersonalizedSuggestions: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => resolve(mockPersonalizedSuggestions), 300);
    });
  },

  // Get spell suggestions
  getSpellSuggestions: (query, dictionary) => {
    if (!query || query.length < 2) return [];

    // Dictionary would be a list of valid search terms
    // For now, we'll use a mock dictionary
    const mockDictionary = [
      'nike', 'adidas', 'jordan', 'yeezy', 'boost', 'air max', 'dunk',
      'ultra boost', 'air force', 'new balance', 'reebok', 'puma',
      'converse', 'vans', 'asics', 'saucony'
    ];

    const suggestions = mockDictionary
      .map(word => ({
        word,
        distance: getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
      }))
      .filter(({ distance }) => distance > 0 && distance <= 3)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map(({ word }) => word);

    return suggestions;
  },

  // Format relative time
  formatRelativeTime: (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  }
}; 