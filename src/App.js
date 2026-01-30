import React, { useState } from 'react';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import { useRecipes } from './hooks/useRecipes';
import Notification from './components/Notification';

function App() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [notification, setNotification] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const {
    recipes,
    loading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    isFirebaseEnabled
  } = useRecipes();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddRecipe = (recipe) => {
    addRecipe(recipe);
    showNotification('המתכון נשמר בהצלחה!');
    setActiveTab('recipes');
  };

  const handleUpdateRecipe = (id, recipe) => {
    updateRecipe(id, recipe);
    showNotification('המתכון עודכן בהצלחה!');
    setEditingRecipe(null);
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המתכון?')) {
      deleteRecipe(id);
      showNotification('המתכון נמחק');
      setSelectedRecipe(null);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setSelectedRecipe(null);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const handleCloseEdit = () => {
    setEditingRecipe(null);
  };

  return (
    <div className="app-container">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isFirebaseEnabled={isFirebaseEnabled}
      />

      <main className="main-content">
        {activeTab === 'recipes' && (
          <RecipeList
            recipes={recipes}
            loading={loading}
            onViewRecipe={handleViewRecipe}
            onAddClick={() => setActiveTab('add')}
          />
        )}

        {activeTab === 'add' && (
          <RecipeForm
            onSubmit={handleAddRecipe}
            onCancel={() => setActiveTab('recipes')}
          />
        )}
      </main>

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={handleCloseDetail}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          isEditing={true}
          onSubmit={(recipe) => handleUpdateRecipe(editingRecipe.id, recipe)}
          onCancel={handleCloseEdit}
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default App;
