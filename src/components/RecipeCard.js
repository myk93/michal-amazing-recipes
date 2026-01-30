import React from 'react';
import { Clock, Flame, Users } from 'lucide-react';

function RecipeCard({ recipe, onClick }) {
  return (
    <article className="recipe-card" onClick={onClick}>
      <div className="recipe-card-image">
        {recipe.images && recipe.images.length > 0 ? (
          <img src={recipe.images[0]} alt={recipe.name} />
        ) : (
          <span className="placeholder-icon">🍽️</span>
        )}
      </div>
      <div className="recipe-card-content">
        {recipe.category && (
          <span className="recipe-card-category">{recipe.category}</span>
        )}
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">
          {recipe.description || 'אין תיאור'}
        </p>
        <div className="recipe-card-meta">
          {recipe.prepTime && (
            <span>
              <Clock size={14} />
              {recipe.prepTime}
            </span>
          )}
          {recipe.cookTime && (
            <span>
              <Flame size={14} />
              {recipe.cookTime}
            </span>
          )}
          {recipe.servings && (
            <span>
              <Users size={14} />
              {recipe.servings}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
