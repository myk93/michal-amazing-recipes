import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import RecipeCard from './RecipeCard';

const CATEGORIES = [
  { value: '', label: 'כל הקטגוריות' },
  { value: 'appetizer', label: 'מנה ראשונה' },
  { value: 'main', label: 'מנה עיקרית' },
  { value: 'side', label: 'תוספות' },
  { value: 'soup', label: 'מרקים' },
  { value: 'salad', label: 'סלטים' },
  { value: 'cake', label: 'עוגות' },
  { value: 'cookies', label: 'עוגיות' },
  { value: 'dessert', label: 'קינוחים' },
  { value: 'bread', label: 'לחמים ומאפים' },
  { value: 'drink', label: 'משקאות' },
  { value: 'breakfast', label: 'ארוחת בוקר' },
  { value: 'snack', label: 'חטיפים' },
  { value: 'other', label: 'אחר' }
];

const KOSHER_TYPES = [
  { value: '', label: 'הכל' },
  { value: 'meat', label: 'בשרי' },
  { value: 'dairy', label: 'חלבי' },
  { value: 'pareve', label: 'פרווה' }
];

function RecipeList({ recipes, loading, onViewRecipe, onAddClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [kosherFilter, setKosherFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search term filter
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term || 
        recipe.name?.toLowerCase().includes(term) ||
        recipe.description?.toLowerCase().includes(term) ||
        recipe.category?.toLowerCase().includes(term);

      // Category filter
      const matchesCategory = !categoryFilter || recipe.category === categoryFilter;

      // Kosher type filter
      const matchesKosher = !kosherFilter || recipe.kosherType === kosherFilter;

      return matchesSearch && matchesCategory && matchesKosher;
    });
  }, [recipes, searchTerm, categoryFilter, kosherFilter]);

  const activeFiltersCount = (categoryFilter ? 1 : 0) + (kosherFilter ? 1 : 0);

  const clearFilters = () => {
    setCategoryFilter('');
    setKosherFilter('');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>טוען מתכונים...</p>
      </div>
    );
  }

  return (
    <section className="recipes-section">
      <div className="search-filter-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="חיפוש מתכונים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
        
        <button 
          className={`btn btn-filter ${showFilters || activeFiltersCount > 0 ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          סינון
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>קטגוריה</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>בשרי / חלבי / פרווה</label>
            <select 
              value={kosherFilter} 
              onChange={(e) => setKosherFilter(e.target.value)}
            >
              {KOSHER_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {activeFiltersCount > 0 && (
            <button className="btn btn-clear-filters" onClick={clearFilters}>
              נקה סינון
            </button>
          )}
        </div>
      )}

      {filteredRecipes.length > 0 ? (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onViewRecipe(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {searchTerm || activeFiltersCount > 0 ? (
            <>
              <span className="empty-icon">🔍</span>
              <h3>לא נמצאו מתכונים</h3>
              <p>נסה לשנות את הסינון או מילת החיפוש</p>
              {activeFiltersCount > 0 && (
                <button className="btn btn-secondary" onClick={clearFilters}>
                  נקה סינון
                </button>
              )}
            </>
          ) : (
            <>
              <span className="empty-icon">📝</span>
              <h3>אין עדיין מתכונים!</h3>
              <p>התחל בהוספת המתכון הראשון שלך</p>
              <button className="btn btn-primary" onClick={onAddClick}>
                הוסף מתכון
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default RecipeList;
