import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, loading, onViewRecipe, onAddClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipes;
    
    const term = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
      recipe.name?.toLowerCase().includes(term) ||
      recipe.description?.toLowerCase().includes(term) ||
      recipe.category?.toLowerCase().includes(term)
    );
  }, [recipes, searchTerm]);

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
      <div className="search-bar">
        <input
          type="text"
          placeholder="חיפוש מתכונים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" size={20} />
      </div>

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
          {searchTerm ? (
            <>
              <span className="empty-icon">🔍</span>
              <h3>לא נמצאו מתכונים</h3>
              <p>נסה מילת חיפוש אחרת</p>
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
