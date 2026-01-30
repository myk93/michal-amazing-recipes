import React, { useState, useEffect } from 'react';
import { Plus, X, Camera } from 'lucide-react';
import { useImageUpload } from '../hooks/useImageUpload';

const CATEGORIES = [
  { value: '', label: 'בחר קטגוריה' },
  { value: 'breakfast', label: 'ארוחת בוקר' },
  { value: 'lunch', label: 'ארוחת צהריים' },
  { value: 'dinner', label: 'ארוחת ערב' },
  { value: 'dessert', label: 'קינוח' },
  { value: 'snack', label: 'חטיף' },
  { value: 'drink', label: 'משקה' },
  { value: 'other', label: 'אחר' }
];

function RecipeForm({ recipe, isEditing, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const { images, handleUpload, removeImage, clearImages, setInitialImages } = useImageUpload();

  // Initialize form with recipe data if editing
  useEffect(() => {
    if (recipe) {
      setName(recipe.name || '');
      setDescription(recipe.description || '');
      setPrepTime(recipe.prepTime || '');
      setCookTime(recipe.cookTime || '');
      setServings(recipe.servings || '');
      setCategory(recipe.category || '');
      setIngredients(recipe.ingredients?.length > 0 ? recipe.ingredients : ['']);
      setInstructions(recipe.instructions?.length > 0 ? recipe.instructions : ['']);
      setInitialImages(recipe.images || []);
    }
  }, [recipe, setInitialImages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredIngredients = ingredients.filter(i => i.trim());
    const filteredInstructions = instructions.filter(i => i.trim());

    if (filteredIngredients.length === 0) {
      alert('יש להוסיף לפחות מרכיב אחד');
      return;
    }

    if (filteredInstructions.length === 0) {
      alert('יש להוסיף לפחות הוראה אחת');
      return;
    }

    const recipeData = {
      name: name.trim(),
      description: description.trim(),
      prepTime: prepTime.trim(),
      cookTime: cookTime.trim(),
      servings: servings.trim(),
      category,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      images,
      ...(recipe && { createdAt: recipe.createdAt })
    };

    onSubmit(recipeData);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrepTime('');
    setCookTime('');
    setServings('');
    setCategory('');
    setIngredients(['']);
    setInstructions(['']);
    clearImages();
  };

  // Ingredient handlers
  const addIngredient = () => setIngredients([...ingredients, '']);
  
  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };
  
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  // Instruction handlers
  const addInstruction = () => setInstructions([...instructions, '']);
  
  const updateInstruction = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };
  
  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  return (
    <div className={isEditing ? 'modal active' : ''}>
      <div className={isEditing ? 'modal-content' : 'form-container'}>
        {isEditing && (
          <button className="modal-close" onClick={onCancel}>
            <X size={24} />
          </button>
        )}
        
        <h2 className="form-title">
          {isEditing ? 'עריכת מתכון' : 'הוספת מתכון חדש'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="recipe-name">שם המתכון *</label>
            <input
              type="text"
              id="recipe-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="הכנס שם מתכון"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipe-description">תיאור</label>
            <textarea
              id="recipe-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="תיאור קצר של המתכון"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prep-time">זמן הכנה</label>
              <input
                type="text"
                id="prep-time"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="למשל: 15 דקות"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cook-time">זמן בישול</label>
              <input
                type="text"
                id="cook-time"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                placeholder="למשל: 30 דקות"
              />
            </div>
            <div className="form-group">
              <label htmlFor="servings">מנות</label>
              <input
                type="text"
                id="servings"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="למשל: 4"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="recipe-category">קטגוריה</label>
            <select
              id="recipe-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label>מרכיבים *</label>
            <div className="dynamic-list">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="list-item">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`למשל: 2 כוסות קמח`}
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeIngredient(index)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-small"
              onClick={addIngredient}
            >
              <Plus size={16} /> הוסף מרכיב
            </button>
          </div>

          {/* Instructions */}
          <div className="form-group">
            <label>הוראות הכנה *</label>
            <div className="dynamic-list">
              {instructions.map((instruction, index) => (
                <div key={index} className="list-item instruction-item">
                  <span className="step-number">{index + 1}</span>
                  <textarea
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    placeholder={`תאר שלב ${index + 1}...`}
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeInstruction(index)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-small"
              onClick={addInstruction}
            >
              <Plus size={16} /> הוסף שלב
            </button>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>תמונות</label>
            <div className="image-upload-area">
              <input
                type="file"
                id="image-input"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                hidden
              />
              <div
                className="upload-placeholder"
                onClick={() => document.getElementById('image-input').click()}
              >
                <Camera size={40} className="upload-icon" />
                <p>לחץ להעלאת תמונות</p>
                <small>JPG, PNG, GIF עד 5MB</small>
              </div>
            </div>
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((img, index) => (
                  <div key={index} className="preview-item">
                    <img src={img} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="preview-remove"
                      onClick={() => removeImage(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={isEditing ? onCancel : resetForm}
            >
              {isEditing ? 'ביטול' : 'נקה'}
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'שמור שינויים' : 'שמור מתכון'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
