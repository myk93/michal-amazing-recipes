import React from 'react';
import { X, Clock, Flame, Users, Edit, Trash2 } from 'lucide-react';

function RecipeDetail({ recipe, onClose, onEdit, onDelete }) {
  if (!recipe) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="recipe-detail">
          <div className="recipe-detail-header">
            {recipe.images && recipe.images.length > 0 ? (
              <img src={recipe.images[0]} alt={recipe.name} />
            ) : (
              <span className="placeholder-icon">🍽️</span>
            )}
          </div>

          <div className="recipe-detail-body">
            {recipe.category && (
              <span className="recipe-detail-category">{recipe.category}</span>
            )}
            
            <h1 className="recipe-detail-title">{recipe.name}</h1>
            
            {recipe.description && (
              <p className="recipe-detail-description">{recipe.description}</p>
            )}

            <div className="recipe-detail-meta">
              {recipe.prepTime && (
                <div className="meta-item">
                  <Clock size={24} className="meta-icon" />
                  <span className="meta-label">זמן הכנה</span>
                  <span className="meta-value">{recipe.prepTime}</span>
                </div>
              )}
              {recipe.cookTime && (
                <div className="meta-item">
                  <Flame size={24} className="meta-icon" />
                  <span className="meta-label">זמן בישול</span>
                  <span className="meta-value">{recipe.cookTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="meta-item">
                  <Users size={24} className="meta-icon" />
                  <span className="meta-label">מנות</span>
                  <span className="meta-value">{recipe.servings}</span>
                </div>
              )}
            </div>

            <div className="recipe-section">
              <h3>🥗 מרכיבים</h3>
              <ul className="ingredients-list">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h3>👨‍🍳 הוראות הכנה</h3>
              <ol className="instructions-list">
                {recipe.instructions?.map((instruction, index) => (
                  <li key={index}>
                    <span className="step-num">{index + 1}</span>
                    <span className="step-text">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.images && recipe.images.length > 1 && (
              <div className="recipe-section">
                <h3>📸 תמונות נוספות</h3>
                <div className="recipe-images">
                  {recipe.images.slice(1).map((img, index) => (
                    <img key={index} src={img} alt={`${recipe.name} ${index + 2}`} />
                  ))}
                </div>
              </div>
            )}

            <div className="recipe-detail-actions">
              <button
                className="btn btn-secondary"
                onClick={() => onEdit(recipe)}
              >
                <Edit size={18} /> עריכה
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(recipe.id)}
              >
                <Trash2 size={18} /> מחיקה
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
